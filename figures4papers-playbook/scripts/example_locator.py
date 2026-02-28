"""Locate the closest figures4papers example scripts by intent.

Usage examples:
  python example_locator.py --keyword bar --chart-type grouped_bar
  python example_locator.py --domain biomed --keyword heatmap
  python example_locator.py --json
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class Example:
    folder: str
    domain: str
    chart_types: tuple[str, ...]
    tags: tuple[str, ...]
    scripts: tuple[str, ...]
    notes: str


EXAMPLES: tuple[Example, ...] = (
    Example(
        folder="figure_CellSpliceNet",
        domain="single-cell-splicing",
        chart_types=("grouped_bar", "ablation_bar"),
        tags=("bar", "comparison", "ablation", "benchmark"),
        scripts=("figure_CellSpliceNet/plot_comparison.py", "figure_CellSpliceNet/plot_ablation.py"),
        notes="CellSpliceNet benchmark and ablation bar panels.",
    ),
    Example(
        folder="figure_Cflows",
        domain="generative-biology",
        chart_types=("grouped_bar", "ablation_bar", "concept_scatter"),
        tags=("bar", "comparison", "trajectory", "gene-regulatory", "swiss-roll"),
        scripts=(
            "figure_Cflows/plot_comparison_Ablation.py",
            "figure_Cflows/plot_comparison_GeneRegulatory.py",
            "figure_Cflows/plot_comparison_Trajectory.py",
            "figure_Cflows/diffusion_swiss_roll.py",
        ),
        notes="CFlows comparisons plus swiss-roll conceptual visualization.",
    ),
    Example(
        folder="figure_Dispersion",
        domain="llm-representation-learning",
        chart_types=("concept_illustration", "sphere_illustration"),
        tags=("concept", "geometry", "3d", "sphere", "diagram"),
        scripts=("figure_Dispersion/plot_idea.py", "figure_Dispersion/plot_illustration.py"),
        notes="Conceptual illustrations for embedding dispersion papers.",
    ),
    Example(
        folder="figure_FPGM",
        domain="frequency-prior-modeling",
        chart_types=("line", "bar", "mixed_panel"),
        tags=("frequency", "prior", "comparison"),
        scripts=("figure_FPGM/plot_freq_prior.py",),
        notes="Frequency prior comparisons with publication-style styling.",
    ),
    Example(
        folder="figure_ImmunoStruct",
        domain="immunogenicity-prediction",
        chart_types=("grouped_bar", "benchmark_bar"),
        tags=("bar", "comparison", "iedb", "cedar"),
        scripts=("figure_ImmunoStruct/plot_bars.py", "figure_ImmunoStruct/raw_data.py"),
        notes="High-density benchmark bars used in ImmunoStruct paper figures.",
    ),
    Example(
        folder="figure_RNAGenScape",
        domain="rna-generation",
        chart_types=("heatmap", "line", "manifold_scatter", "sweep"),
        tags=("heatmap", "optimization", "manifold", "sweep", "comparison"),
        scripts=(
            "figure_RNAGenScape/plot_comparison.py",
            "figure_RNAGenScape/plot_hole_manifold.py",
            "figure_RNAGenScape/plot_manifold.py",
            "figure_RNAGenScape/plot_sweep.py",
        ),
        notes="Heatmap and manifold visualizations for RNAGenScape analyses.",
    ),
    Example(
        folder="figure_brainteaser",
        domain="llm-evaluation",
        chart_types=("grouped_bar", "stacked_bar", "category_bar"),
        tags=("bar", "brainteaser", "category", "correctness", "reasoning"),
        scripts=(
            "figure_brainteaser/plot_brute_force.py",
            "figure_brainteaser/plot_correctness_by_category.py",
            "figure_brainteaser/plot_correctness_by_subcategory.py",
            "figure_brainteaser/plot_rewriting.py",
            "figure_brainteaser/plot_selfcorrection_math.py",
        ),
        notes="LLM correctness and brute-force composition bar analyses.",
    ),
    Example(
        folder="figure_ophthal_review",
        domain="medical-vision-survey",
        chart_types=("trend", "composition_bar"),
        tags=("trend", "timeline", "month", "composition"),
        scripts=("figure_ophthal_review/plot_trend.py", "figure_ophthal_review/plot_composition.py"),
        notes="Timeline trend and composition plots for ophthalmology review data.",
    ),
)


def _contains_any(haystack: str, needles: Iterable[str]) -> bool:
    lowered = haystack.lower()
    return any(n in lowered for n in needles)


def _score(example: Example, chart_type: str | None, domain: str | None, keywords: list[str]) -> int:
    score = 0

    if chart_type:
        chart_type_lower = chart_type.lower()
        if chart_type_lower in example.chart_types:
            score += 6
        elif _contains_any(" ".join(example.chart_types), [chart_type_lower]):
            score += 3

    if domain:
        domain_lower = domain.lower()
        if domain_lower == example.domain:
            score += 5
        elif domain_lower in example.domain:
            score += 3

    blob = " ".join((example.folder, example.domain, " ".join(example.chart_types), " ".join(example.tags), " ".join(example.scripts))).lower()
    for kw in keywords:
        if kw in blob:
            score += 2

    return score


def locate(chart_type: str | None, domain: str | None, keywords: list[str]) -> list[tuple[int, Example]]:
    cleaned_keywords = [k.strip().lower() for k in keywords if k and k.strip()]
    rows: list[tuple[int, Example]] = []
    for ex in EXAMPLES:
        s = _score(ex, chart_type, domain, cleaned_keywords)
        if not chart_type and not domain and not cleaned_keywords:
            s = 1
        if s > 0:
            rows.append((s, ex))
    rows.sort(key=lambda item: (-item[0], item[1].folder))
    return rows


def to_json(rows: list[tuple[int, Example]], limit: int) -> str:
    payload = []
    for score, ex in rows[:limit]:
        payload.append(
            {
                "score": score,
                "folder": ex.folder,
                "domain": ex.domain,
                "chart_types": list(ex.chart_types),
                "tags": list(ex.tags),
                "scripts": list(ex.scripts),
                "notes": ex.notes,
            }
        )
    return json.dumps(payload, indent=2, ensure_ascii=True)


def to_text(rows: list[tuple[int, Example]], limit: int) -> str:
    lines: list[str] = []
    if not rows:
        return "No matches found. Try broader keywords or remove filters."

    for idx, (score, ex) in enumerate(rows[:limit], 1):
        lines.append(f"{idx}. {ex.folder}  (score={score})")
        lines.append(f"   domain: {ex.domain}")
        lines.append(f"   chart_types: {', '.join(ex.chart_types)}")
        lines.append(f"   tags: {', '.join(ex.tags)}")
        lines.append("   scripts:")
        for script in ex.scripts:
            lines.append(f"   - {script}")
            lines.append(f"     run: python {script}")
        lines.append(f"   notes: {ex.notes}")
    return "\n".join(lines)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Find closest figures4papers example scripts")
    parser.add_argument("--keyword", action="append", default=[], help="Keyword filter, repeatable")
    parser.add_argument("--chart-type", default=None, help="Chart type filter (e.g., grouped_bar, heatmap)")
    parser.add_argument("--domain", default=None, help="Domain filter (e.g., llm-evaluation)")
    parser.add_argument("--limit", type=int, default=10, help="Max results to print")
    parser.add_argument("--json", action="store_true", help="Print JSON output")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    rows = locate(args.chart_type, args.domain, args.keyword)
    if args.json:
        print(to_json(rows, max(1, args.limit)))
    else:
        print(to_text(rows, max(1, args.limit)))


if __name__ == "__main__":
    main()
