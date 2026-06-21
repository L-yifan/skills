# Interactive Visualizations & Charts

Charts, metrics, and network maps represent high-density spatial data. Markdown renders these linearly; HTML displays them as clear visual shapes. However, AI often makes the mistake of loading heavy external libraries (like Chart.js or D3.js) via CDNs, which compromises offline usability and site performance.

This reference details how to build responsive, interactive charts and system flow diagrams using only **native SVG, CSS variables, and Vanilla JavaScript**.

---

## The Non-Negotiable Rules

1. **Zero External CDN Chart Libraries.** Do not load Chart.js, D3.js, Highcharts, or ApexCharts. All charts must be drawn using native inline SVG tags (`<rect>`, `<path>`, `<circle>`).
2. **Offline-First & Theme-Responsive.** Use CSS custom variables (`var(--accent)`, `var(--rule)`, `var(--ink)`) for styling SVG elements. When the system toggles between light and dark mode, the chart must adapt automatically.
3. **Responsive viewBox.** Never use fixed pixel width and height on `<svg>`. Always use `viewBox="0 0 W H"` and let CSS control the layout scale.
4. **Fallback to Tables.** If the chart cannot render due to layout or sizing limitations, or if screen reader accessibility is a primary concern, provide a corresponding `<table class="sr-only">` or toggleable textual dataset representation.

---

## When to use a Chart vs. a Table

* **Use a Table when:** 
  * The raw numbers must be exact and copyable.
  * You are comparing fewer than 5 discrete items across 1–2 dimensions.
  * The target is purely reference text (e.g., bundle metrics or API comparison matrix).
* **Use a Chart when:**
  * You are showing a trend over time (e.g., performance logs, incident duration timeline).
  * You want to highlight anomalies, peaks, or distributions.
  * The user's query asks for "visualizing", "plotting", or "tracking" metrics.

---

## SVG Chart Craftsmanship

### 1. The Grid and Axes
Always draw a clean coordinate space:
* Use `<line>` or `<path>` elements with `stroke="var(--rule)"` to form background grid lines.
* Keep stroke weight thin (`1px` or `1.5px`) so it does not distract from the data.

### 2. Bar Charts (`<rect>`)
* Use vertical or horizontal columns.
* Give columns a slight border radius using `rx` and `ry` attributes.
* **Hover Interaction:** Use CSS transitions on the columns to animate height or opacity on hover.
  ```css
  rect.bar {
    transition: opacity 0.2s, fill 0.2s;
    cursor: pointer;
  }
  rect.bar:hover {
    fill: var(--accent-2);
    opacity: 0.9;
  }
  ```

### 3. Line/Area Charts (`<path>`)
* Generate the `d` attribute programmatically or statically based on input datasets.
* Format: `M x1 y1 L x2 y2 L x3 y3 ...`
* For area charts, close the path to the baseline: `... L x_last baseline_y L x0 baseline_y Z` and give it a semi-transparent background fill (`fill="var(--accent-soft)"`).

### 4. Interactive Tooltips (Native JS)
To display hover readouts without a heavy graphing library:
* Set up a single tooltip element (`<div class="tooltip">`) in HTML positioned absolute.
* Add event listeners (`mouseover`, `mousemove`, `mouseout`) to chart data elements (bars or nodes).
* Read data attributes (e.g. `data-label`, `data-value`) from the hovered element and display them in the tooltip, adjusting the tooltip's `top` and `left` properties based on page coordinates.

---

## Example Skeleton: Self-Contained Interactive Bar Chart

This example demonstrates a responsive, offline-first bar chart with interactive tooltips and native CSS animation.

```html
<div class="chart-container">
  <h3>Weekly Outage Minutes</h3>
  <p class="chart-subtitle">Hover over bars to inspect details</p>
  
  <div class="chart-wrapper">
    <!-- SVG Area -->
    <svg viewBox="0 0 600 300" class="svg-chart">
      <!-- Background Grid -->
      <g class="grid-lines">
        <line x1="50" y1="50" x2="550" y2="50" stroke="var(--rule)" stroke-width="1" />
        <line x1="50" y1="125" x2="550" y2="125" stroke="var(--rule)" stroke-width="1" />
        <line x1="50" y1="200" x2="550" y2="200" stroke="var(--rule)" stroke-width="1" />
        <line x1="50" y1="250" x2="550" y2="250" stroke="var(--ink)" stroke-width="1.5" /> <!-- Baseline -->
      </g>
      
      <!-- Y-Axis Labels -->
      <g class="y-labels" fill="var(--ink-soft)" font-size="11" text-anchor="end">
        <text x="40" y="54">120m</text>
        <text x="40" y="129">60m</text>
        <text x="40" y="204">20m</text>
        <text x="40" y="254">0m</text>
      </g>

      <!-- Bar Chart Group -->
      <g class="bars">
        <!-- x = 50 + index * 100 + offset -->
        <rect class="bar" x="80" y="90" width="50" height="160" rx="4"
              fill="var(--accent)" data-label="Mon" data-value="88 mins" />
        <rect class="bar" x="180" y="170" width="50" height="80" rx="4"
              fill="var(--accent)" data-label="Tue" data-value="44 mins" />
        <rect class="bar" x="280" y="50" width="50" height="200" rx="4"
              fill="var(--accent)" data-label="Wed" data-value="120 mins (Peak)" />
        <rect class="bar" x="380" y="210" width="50" height="40" rx="4"
              fill="var(--accent)" data-label="Thu" data-value="20 mins" />
        <rect class="bar" x="480" y="230" width="50" height="20" rx="4"
              fill="var(--accent)" data-label="Fri" data-value="10 mins" />
      </g>
      
      <!-- X-Axis Labels -->
      <g class="x-labels" fill="var(--ink-soft)" font-size="12" text-anchor="middle">
        <text x="105" y="275">Mon</text>
        <text x="205" y="275">Tue</text>
        <text x="305" y="275">Wed</text>
        <text x="405" y="275">Thu</text>
        <text x="505" y="275">Fri</text>
      </g>
    </svg>
    
    <!-- Floating Tooltip -->
    <div id="chart-tooltip" class="chart-tooltip" style="opacity: 0;"></div>
  </div>
</div>

<style>
  .chart-container {
    background: var(--surface);
    border: 1px solid var(--rule);
    border-radius: 8px;
    padding: 1.5rem;
    max-width: 650px;
    margin: 2rem auto;
    font-family: var(--sans);
  }
  .chart-container h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.25rem;
    color: var(--ink);
  }
  .chart-subtitle {
    margin: 0 0 1.5rem 0;
    font-size: 0.85rem;
    color: var(--ink-soft);
  }
  .chart-wrapper {
    position: relative;
  }
  .svg-chart {
    width: 100%;
    height: auto;
    display: block;
    overflow: visible;
  }
  .bar {
    transition: fill 0.2s, opacity 0.2s;
    cursor: pointer;
  }
  .bar:hover {
    fill: var(--accent-2);
    opacity: 0.95;
  }
  /* Tooltip CSS */
  .chart-tooltip {
    position: absolute;
    background: var(--ink);
    color: var(--bg);
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 11px;
    pointer-events: none;
    transition: opacity 0.15s ease;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
</style>

<script>
  (function() {
    const tooltip = document.getElementById('chart-tooltip');
    const bars = document.querySelectorAll('.bar');
    
    bars.forEach(bar => {
      bar.addEventListener('mouseover', function(e) {
        const val = this.getAttribute('data-value');
        const label = this.getAttribute('data-label');
        tooltip.innerHTML = `<strong>${label}</strong>: ${val}`;
        tooltip.style.opacity = '1';
      });
      
      bar.addEventListener('mousemove', function(e) {
        const wrapper = this.closest('.chart-wrapper');
        const rect = wrapper.getBoundingClientRect();
        // Calculate tooltip coordinates relative to wrapper container
        const x = e.clientX - rect.left + 15;
        const y = e.clientY - rect.top - 35;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      });
      
      bar.addEventListener('mouseout', function() {
        tooltip.style.opacity = '0';
      });
    });
  })();
</script>
```
