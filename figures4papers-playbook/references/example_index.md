# figures4papers Example Index

## Table of Contents

- [How to use this index](#how-to-use-this-index)
- [Chart type to folder map](#chart-type-to-folder-map)
- [Folder details](#folder-details)
  - [figure_ImmunoStruct](#figure_immunostruct)
  - [figure_CellSpliceNet](#figure_cellsplicenet)
  - [figure_Cflows](#figure_cflows)
  - [figure_RNAGenScape](#figure_rnagenscape)
  - [figure_brainteaser](#figure_brainteaser)
  - [figure_ophthal_review](#figure_ophthal_review)
  - [figure_Dispersion](#figure_dispersion)
  - [figure_FPGM](#figure_fpgm)
- [Reuse playbook](#reuse-playbook)

## How to use this index

1. Start from chart type and select a matching folder.
2. Pick the smallest script that already matches your intended visual grammar.
3. Replace only data arrays and text labels first.
4. Keep export format as `.png` plus `.pdf`.
5. If style drift appears, apply `scientific-figure-pro` helper defaults.

## Chart type to folder map

- Grouped/benchmark bars:
  - `figure_ImmunoStruct`
  - `figure_CellSpliceNet`
  - `figure_brainteaser`
  - `figure_Cflows`
- Trend/time-series plots:
  - `figure_ophthal_review`
  - `figure_FPGM`
  - `figure_RNAGenScape` (sweep variants)
- Heatmaps:
  - `figure_RNAGenScape`
- Manifold or conceptual scatter:
  - `figure_RNAGenScape`
  - `figure_Cflows`
- Conceptual illustration and shaded geometry:
  - `figure_Dispersion`

## Folder details

### figure_ImmunoStruct

- Domain: immunogenicity prediction benchmarks.
- Scripts:
  - `figure_ImmunoStruct/plot_bars.py`
  - `figure_ImmunoStruct/raw_data.py`
- Typical use: dense multi-method benchmark bars.

### figure_CellSpliceNet

- Domain: single-cell splice modeling.
- Scripts:
  - `figure_CellSpliceNet/plot_comparison.py`
  - `figure_CellSpliceNet/plot_ablation.py`
- Typical use: grouped comparison bars and ablation bars.

### figure_Cflows

- Domain: biological trajectory and flow modeling.
- Scripts:
  - `figure_Cflows/plot_comparison_Ablation.py`
  - `figure_Cflows/plot_comparison_GeneRegulatory.py`
  - `figure_Cflows/plot_comparison_Trajectory.py`
  - `figure_Cflows/diffusion_swiss_roll.py`
- Typical use: task-specific comparisons and concept visualization.

### figure_RNAGenScape

- Domain: mRNA sequence generation and optimization.
- Scripts:
  - `figure_RNAGenScape/plot_comparison.py`
  - `figure_RNAGenScape/plot_hole_manifold.py`
  - `figure_RNAGenScape/plot_manifold.py`
  - `figure_RNAGenScape/plot_sweep.py`
- Typical use: heatmap comparisons, manifold views, and sweep trends.

### figure_brainteaser

- Domain: LLM reasoning and correctness analysis.
- Scripts:
  - `figure_brainteaser/plot_brute_force.py`
  - `figure_brainteaser/plot_correctness_by_category.py`
  - `figure_brainteaser/plot_correctness_by_subcategory.py`
  - `figure_brainteaser/plot_rewriting.py`
  - `figure_brainteaser/plot_selfcorrection_math.py`
- Typical use: category/subcategory bar compositions and reasoning diagnostics.

### figure_ophthal_review

- Domain: ophthalmology literature survey.
- Scripts:
  - `figure_ophthal_review/plot_trend.py`
  - `figure_ophthal_review/plot_composition.py`
- Typical use: publication trend timelines and composition summaries.

### figure_Dispersion

- Domain: representation geometry in language models.
- Scripts:
  - `figure_Dispersion/plot_idea.py`
  - `figure_Dispersion/plot_illustration.py`
- Typical use: conceptual diagrams and shaded sphere illustrations.

### figure_FPGM

- Domain: frequency-prior guidance methods.
- Scripts:
  - `figure_FPGM/plot_freq_prior.py`
- Typical use: mixed line/bar comparisons with paper-style layout.

## Reuse playbook

1. Select source script by matching chart type first.
2. Keep the original axis and legend structure.
3. Replace data arrays and labels.
4. Verify y-limits after data replacement.
5. Save both `.png` and `.pdf`.
