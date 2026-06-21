(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.buildUnifiedDiff = api.buildUnifiedDiff;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const HARD_LIMITS = Object.freeze({
    maxBytes: 200000,
    maxLines: 2000,
    maxEditDistance: 1000,
    contextLines: 5,
  });

  function stricterLimit(value, fallback, minimum) {
    if (!Number.isFinite(value)) return fallback;
    return Math.max(minimum, Math.min(fallback, Math.floor(value)));
  }

  function splitDocument(text) {
    const normalized = text.replace(/\r\n?/g, "\n");
    const hasFinalNewline = normalized.endsWith("\n");
    if (normalized === "") return { normalized, lines: [], hasFinalNewline: false };
    const lines = normalized.split("\n");
    if (hasFinalNewline) lines.pop();
    return { normalized, lines, hasFinalNewline };
  }

  function utf8Bytes(text) {
    return new TextEncoder().encode(text).length;
  }

  function read(map, key) {
    return map.has(key) ? map.get(key) : -Infinity;
  }

  function annotate(edits) {
    let oldIndex = 0;
    let newIndex = 0;
    return edits.map((edit) => {
      const item = { type: edit.type, text: edit.text };
      if (edit.type === "equal") {
        item.oldIndex = oldIndex++;
        item.newIndex = newIndex++;
      } else if (edit.type === "delete") {
        item.oldIndex = oldIndex++;
      } else {
        item.newIndex = newIndex++;
      }
      return item;
    });
  }

  function backtrack(trace, oldLines, newLines) {
    let x = oldLines.length;
    let y = newLines.length;
    const reversed = [];

    for (let d = trace.length - 1; d > 0; d -= 1) {
      const previous = trace[d - 1];
      const k = x - y;
      const previousK =
        k === -d || (k !== d && read(previous, k - 1) < read(previous, k + 1))
          ? k + 1
          : k - 1;
      const previousX = read(previous, previousK);
      const previousY = previousX - previousK;

      while (x > previousX && y > previousY) {
        reversed.push({ type: "equal", text: oldLines[x - 1] });
        x -= 1;
        y -= 1;
      }

      if (x === previousX) {
        reversed.push({ type: "add", text: newLines[y - 1] });
        y -= 1;
      } else {
        reversed.push({ type: "delete", text: oldLines[x - 1] });
        x -= 1;
      }
    }

    while (x > 0 && y > 0) {
      reversed.push({ type: "equal", text: oldLines[x - 1] });
      x -= 1;
      y -= 1;
    }
    while (x > 0) {
      reversed.push({ type: "delete", text: oldLines[x - 1] });
      x -= 1;
    }
    while (y > 0) {
      reversed.push({ type: "add", text: newLines[y - 1] });
      y -= 1;
    }

    return annotate(reversed.reverse());
  }

  function boundedMyers(oldLines, newLines, maxEditDistance) {
    const maximum = oldLines.length + newLines.length;
    const limit = Math.min(maximum, maxEditDistance);
    let frontier = new Map([[1, 0]]);
    const trace = [];

    for (let distance = 0; distance <= limit; distance += 1) {
      const current = new Map();
      for (let k = -distance; k <= distance; k += 2) {
        let x;
        if (
          k === -distance ||
          (k !== distance && read(frontier, k - 1) < read(frontier, k + 1))
        ) {
          x = read(frontier, k + 1);
        } else {
          x = read(frontier, k - 1) + 1;
        }
        if (!Number.isFinite(x)) x = 0;
        let y = x - k;
        while (x < oldLines.length && y < newLines.length && oldLines[x] === newLines[y]) {
          x += 1;
          y += 1;
        }
        current.set(k, x);
        if (x >= oldLines.length && y >= newLines.length) {
          trace.push(current);
          return { status: "ok", editDistance: distance, edits: backtrack(trace, oldLines, newLines) };
        }
      }
      trace.push(current);
      frontier = current;
    }

    return { status: "too-different", editDistance: null, edits: null };
  }

  function finalNewlineOnlyEdits(oldDoc, newDoc) {
    if (
      oldDoc.hasFinalNewline === newDoc.hasFinalNewline ||
      oldDoc.lines.length === 0 ||
      oldDoc.lines.length !== newDoc.lines.length ||
      !oldDoc.lines.every((line, index) => line === newDoc.lines[index])
    ) {
      return null;
    }
    const edits = oldDoc.lines.slice(0, -1).map((text) => ({ type: "equal", text }));
    const finalLine = oldDoc.lines[oldDoc.lines.length - 1];
    edits.push({ type: "delete", text: finalLine }, { type: "add", text: finalLine });
    return annotate(edits);
  }

  function makeHunks(edits, contextLines) {
    const changeIndexes = [];
    edits.forEach((edit, index) => {
      if (edit.type !== "equal") changeIndexes.push(index);
    });
    const hunks = [];
    for (const index of changeIndexes) {
      const start = Math.max(0, index - contextLines);
      const end = Math.min(edits.length - 1, index + contextLines);
      const previous = hunks[hunks.length - 1];
      if (previous && start <= previous.end + 1) previous.end = Math.max(previous.end, end);
      else hunks.push({ start, end });
    }
    return hunks;
  }

  function linePosition(edits, end) {
    let oldLine = 1;
    let newLine = 1;
    for (let index = 0; index < end; index += 1) {
      const type = edits[index].type;
      if (type === "equal" || type === "delete") oldLine += 1;
      if (type === "equal" || type === "add") newLine += 1;
    }
    return { oldLine, newLine };
  }

  function noNewlineMarker(edit, oldDoc, newDoc) {
    if (edit.type === "delete") {
      return !oldDoc.hasFinalNewline && edit.oldIndex === oldDoc.lines.length - 1;
    }
    if (edit.type === "add") {
      return !newDoc.hasFinalNewline && edit.newIndex === newDoc.lines.length - 1;
    }
    return (
      (!oldDoc.hasFinalNewline && edit.oldIndex === oldDoc.lines.length - 1) ||
      (!newDoc.hasFinalNewline && edit.newIndex === newDoc.lines.length - 1)
    );
  }

  function safeFilename(filename) {
    const normalized = String(filename || "document.txt")
      .replace(/[\r\n]/g, "_")
      .replace(/\\/g, "/")
      .replace(/^(?:[A-Za-z]:)?\/+/, "");
    return normalized || "document.txt";
  }

  function renderUnifiedDiff(edits, hunks, filename, oldDoc, newDoc) {
    const path = safeFilename(filename);
    let output = `--- a/${path}\n+++ b/${path}\n`;

    for (const hunk of hunks) {
      const slice = edits.slice(hunk.start, hunk.end + 1);
      const position = linePosition(edits, hunk.start);
      const oldCount = slice.filter((edit) => edit.type !== "add").length;
      const newCount = slice.filter((edit) => edit.type !== "delete").length;
      const oldStart = oldCount === 0 ? Math.max(0, position.oldLine - 1) : position.oldLine;
      const newStart = newCount === 0 ? Math.max(0, position.newLine - 1) : position.newLine;
      output += `@@ -${oldStart},${oldCount} +${newStart},${newCount} @@\n`;

      for (const edit of slice) {
        const prefix = edit.type === "equal" ? " " : edit.type === "delete" ? "-" : "+";
        output += `${prefix}${edit.text}\n`;
        if (noNewlineMarker(edit, oldDoc, newDoc)) output += "\\ No newline at end of file\n";
      }
    }
    return output;
  }

  function buildUnifiedDiff(oldText, newText, filename, options) {
    if (typeof oldText !== "string" || typeof newText !== "string") {
      throw new TypeError("buildUnifiedDiff expects string oldText and newText values");
    }

    const settings = options || {};
    const maxBytes = stricterLimit(settings.maxBytes, HARD_LIMITS.maxBytes, 1);
    const maxLines = stricterLimit(settings.maxLines, HARD_LIMITS.maxLines, 1);
    const maxEditDistance = stricterLimit(
      settings.maxEditDistance,
      HARD_LIMITS.maxEditDistance,
      0
    );
    const contextLines = stricterLimit(settings.contextLines, HARD_LIMITS.contextLines, 0);
    const oldDoc = splitDocument(oldText);
    const newDoc = splitDocument(newText);

    if (oldDoc.normalized === newDoc.normalized) {
      return { status: "unchanged", diff: null, message: "No changes – nothing to export" };
    }

    if (
      utf8Bytes(oldText) > maxBytes ||
      utf8Bytes(newText) > maxBytes ||
      oldDoc.lines.length > maxLines ||
      newDoc.lines.length > maxLines
    ) {
      return {
        status: "too-large",
        diff: null,
        message: `Full-document diff is limited to ${maxBytes} UTF-8 bytes and ${maxLines} lines per document. Use section-level binding.`,
      };
    }

    const newlineEdits = finalNewlineOnlyEdits(oldDoc, newDoc);
    const result = newlineEdits
      ? { status: "ok", editDistance: 2, edits: newlineEdits }
      : boundedMyers(oldDoc.lines, newDoc.lines, maxEditDistance);
    if (result.status === "too-different") {
      return {
        status: "too-different",
        diff: null,
        message: `Edit distance exceeds ${maxEditDistance}. Use a narrower section-level editor.`,
      };
    }

    const hunks = makeHunks(result.edits, contextLines);
    return {
      status: "ok",
      diff: renderUnifiedDiff(result.edits, hunks, filename, oldDoc, newDoc),
      message: null,
      stats: {
        oldLines: oldDoc.lines.length,
        newLines: newDoc.lines.length,
        editDistance: result.editDistance,
        hunks: hunks.length,
      },
    };
  }

  return { buildUnifiedDiff, HARD_LIMITS };
});
