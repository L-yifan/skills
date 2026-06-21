"use strict";

const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { buildUnifiedDiff, HARD_LIMITS } = require("./build-unified-diff.js");

function expectOk(oldText, newText, needle, options) {
  const result = buildUnifiedDiff(oldText, newText, "docs/plan.md", options);
  assert.equal(result.status, "ok");
  assert.match(result.diff, /^--- a\/docs\/plan\.md\n\+\+\+ b\/docs\/plan\.md\n/);
  assert.match(result.diff, needle);
  return result;
}

function assertPatchApplies(oldText, newText, filename) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "html-artifacts-diff-"));
  try {
    const source = path.join(root, ...filename.split("/"));
    fs.mkdirSync(path.dirname(source), { recursive: true });
    fs.writeFileSync(source, oldText, "utf8");
    const result = buildUnifiedDiff(oldText, newText, filename);
    assert.equal(result.status, "ok");
    const patchFile = path.join(root, "change.diff");
    fs.writeFileSync(patchFile, result.diff, "utf8");
    childProcess.execFileSync(
      "git",
      ["-c", "core.autocrlf=false", "apply", "--check", "change.diff"],
      { cwd: root }
    );
    childProcess.execFileSync(
      "git",
      ["-c", "core.autocrlf=false", "apply", "change.diff"],
      { cwd: root }
    );
    assert.equal(fs.readFileSync(source, "utf8"), newText);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

assert.deepEqual(buildUnifiedDiff("same\n", "same\n", "same.md"), {
  status: "unchanged",
  diff: null,
  message: "No changes – nothing to export",
});

expectOk("one\ntwo\n", "zero\none\ntwo\nthree\n", /\+zero[\s\S]*\+three/);
expectOk("one\ntwo\nthree\n", "one\nthree\n", /-two/);
expectOk("one\ntwo\n", "one\nsecond\n", /-two\n\+second/);

const many = Array.from({ length: 24 }, (_, index) => `line-${index + 1}`);
const changed = many.slice();
changed[1] = "changed-near-start";
changed[21] = "changed-near-end";
const multi = expectOk(many.join("\n"), changed.join("\n"), /changed-near-start/, {
  contextLines: 1,
});
assert.equal(multi.stats.hunks, 2);
assert.match(multi.diff, /changed-near-end/);

expectOk("alpha\r\nbeta\r\n", "alpha\r\ngamma\r\n", /-beta\n\+gamma/);
const noFinalNewline = expectOk("alpha\nbeta", "alpha\ngamma", /No newline at end of file/);
assert.equal(noFinalNewline.stats.editDistance, 2);
const addFinalNewline = expectOk("alpha", "alpha\n", /-alpha\n\\ No newline at end of file\n\+alpha/);
assert.equal(addFinalNewline.stats.editDistance, 2);

assertPatchApplies("one\ntwo\n", "zero\none\nsecond\n", "docs/plan.md");
assertPatchApplies("alpha\nbeta", "alpha\ngamma", "docs/no-final-newline.md");
assertPatchApplies("alpha", "alpha\n", "docs/add-final-newline.md");

const tooManyChars = buildUnifiedDiff(
  "a".repeat(HARD_LIMITS.maxBytes + 1),
  "b",
  "large.txt"
);
assert.equal(tooManyChars.status, "too-large");
assert.equal(tooManyChars.diff, null);

const tooManyLines = buildUnifiedDiff(
  Array.from({ length: HARD_LIMITS.maxLines + 1 }, () => "a").join("\n"),
  "b",
  "large.txt"
);
assert.equal(tooManyLines.status, "too-large");

const distantOld = Array.from({ length: HARD_LIMITS.maxEditDistance + 1 }, (_, i) => `old-${i}`).join("\n");
const distantNew = Array.from({ length: HARD_LIMITS.maxEditDistance + 1 }, (_, i) => `new-${i}`).join("\n");
const tooDifferent = buildUnifiedDiff(distantOld, distantNew, "distant.txt");
assert.equal(tooDifferent.status, "too-different");
assert.equal(tooDifferent.diff, null);

const stricter = buildUnifiedDiff("12345", "123456", "strict.txt", { maxBytes: 5 });
assert.equal(stricter.status, "too-large");

const utf8Limit = buildUnifiedDiff("汉字", "汉字变化", "utf8.txt", { maxBytes: 10 });
assert.equal(utf8Limit.status, "too-large");

console.log("build-unified-diff: all tests passed");

if (process.argv[2] === "--write-fixture") {
  const destination = process.argv[3];
  if (!destination) throw new Error("--write-fixture requires a destination path");
  const helper = fs.readFileSync(path.join(__dirname, "build-unified-diff.js"), "utf8");
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Document-bound editor fixture</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0 auto; padding: 24px; max-width: 760px; font: 16px/1.5 system-ui, sans-serif; }
    textarea, pre { width: 100%; min-height: 150px; padding: 12px; overflow: auto; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0; }
    button { min-height: 40px; }
    @media (max-width: 480px) { body { padding: 12px; } .actions { display: grid; } }
  </style>
</head>
<body>
  <main data-artifact-type="document-bound-editor" data-patch-version="1">
    <h1>Implementation Plan Editor</h1>
    <p>Bound to <code>docs/plan.md</code>, H2 Implementation Plan, occurrence 1.</p>
    <textarea id="editor" aria-label="Implementation Plan body"></textarea>
    <div class="actions">
      <button id="copy-patch">Copy Patch JSON</button>
      <button id="copy-diff">Copy Markdown Diff</button>
      <button id="copy-instruction">Copy Agent Instruction</button>
    </div>
    <p id="status" role="status">Ready</p>
    <pre id="output"></pre>
  </main>
  <script>${helper}</script>
  <script>
    const originalText = "1. Audit the flow.\\n2. Add focused tests.";
    const editor = document.getElementById("editor");
    const output = document.getElementById("output");
    const status = document.getElementById("status");
    editor.value = originalText;
    window.clipboardWrites = 0;
    window.lastCopied = null;

    function buildState() {
      return {
        artifactType: "document-bound-editor",
        version: 1,
        sourceFiles: [{ path: "docs/plan.md", kind: "markdown" }],
        changes: [{
          id: "implementation-plan",
          sourceFile: "docs/plan.md",
          operation: "replaceMarkdownSection",
          selector: { heading: "Implementation Plan", level: 2, occurrence: 1 },
          originalText,
          content: editor.value,
        }],
      };
    }

    function outputs() {
      const state = buildState();
      const patch = JSON.stringify(state, null, 2);
      const markdown = "# Patch Preview\\n\\n## docs/plan.md\\n\\nBefore:\\n" +
        state.changes[0].originalText + "\\n\\nAfter:\\n" + state.changes[0].content;
      const instruction = "Apply this patch after validating originalText exactly.\\n\\n" + patch;
      return { state, patch, markdown, instruction };
    }

    function commitCopy(text, label) {
      window.clipboardWrites += 1;
      window.lastCopied = text;
      output.textContent = text;
      status.textContent = label + " ready";
    }

    function exportFull(oldText, newText) {
      const result = buildUnifiedDiff(oldText, newText, "docs/plan.md");
      status.textContent = result.status;
      if (result.status === "ok") commitCopy(result.diff, "Unified diff");
      return result;
    }

    document.getElementById("copy-patch").addEventListener("click", () => commitCopy(outputs().patch, "Patch JSON"));
    document.getElementById("copy-diff").addEventListener("click", () => commitCopy(outputs().markdown, "Markdown diff"));
    document.getElementById("copy-instruction").addEventListener("click", () => commitCopy(outputs().instruction, "Agent instruction"));
    window.fixtureApi = { buildState, outputs, exportFull };
  </script>
</body>
</html>`;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html, "utf8");
  console.log(`fixture written: ${destination}`);
}
