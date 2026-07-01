# Sandboxes & Interactive Tuners

A sandbox or tuning tool is a playground for testing logic, algorithms, UI animation curves, or text templates in isolation. It enables the user to change parameters visually, see the system state adapt in real time, and export the resulting configurations or code blocks back to the codebase.

This reference provides layout patterns and interaction constraints for sandboxes and tuners.

---

## Core Guidelines

1. **Split Screen Layout (Split Panel).**
   * **Left (or Top on mobile):** Input controls (sliders, select menus, checkboxes, template inputs).
   * **Right (or Bottom on mobile):** Visualization canvas or live outputs (rendered cards, logs, system rings, animation previews).
2. **Preset Shortcuts.**
   * Do not make the user drag 5 sliders to test a baseline scenario. Provide **Preset Buttons** (e.g., "Muted Elastic", "Immediate Response", "Default Fallback") that instantly configure the settings.
3. **High-Frequency Reactivity.**
   * If a slider changes value, updates to the UI must feel instantaneous.
   * If updating the output requires expensive processing (e.g., calling regex parser, heavy DOM math, simulated network request), **debounce/throttle the calculation** while letting the slider value indicators update instantly.
4. **Live Code/Config Generation.**
   * The terminal output of a sandbox is the code/config that replicates the visual result.
   * Always render a `<pre><code>` block at the bottom containing the generated config (e.g., CSS bezier curves, JSON configs). Provide a **"Copy Config" or "Copy Code"** button.

---

## When to Reach for a Sandbox

* **Tuning UI Animations:** Adjusting duration, delay, translation distance, scale, or cubic-bezier controls.
* **Testing Dynamic Text Templates:** Tuning system prompts or string templates with placeholders, where variables are updated via inputs.
* **Algorithm Visualizer:** Watching how a rate limiter counts request windows, how consistent hashing distributes keys, or how search indexing chunks a document.

---

## Layout Structure

For a balanced look, default tools to a clean sans-serif layout (`var(--sans)`) and prioritize structural information density over airy editorial margins:

```css
body {
  font: 14px/1.4 var(--sans);
  max-width: none;
  margin: 0;
  padding: 0;
}
.sandbox-app {
  display: grid;
  grid-template-columns: 320px 1fr;
  height: 100vh;
}
@media (max-width: 768px) {
  .sandbox-app {
    grid-template-columns: 1fr;
    height: auto;
  }
}
```

---

## 易混淆场景

**确定是本 reference 的信号：**
- 用户要反复实验/调参——动滑块看动画变化、切换预设看不同效果
- 输出包含可复制的代码/配置（CSS、JSON、prompt）
- 典型信号："tune""playground""sandbox""调一下""试一下不同参数"

**容易混淆的场景 → 换 reference：**
- 用户只是要看一下交互原型对不对（不是调参实验）→ [design-and-prototypes.md]，animation prototype 展示动画效果；sandbox 导出可用的配置
- 用户要一次性操作工具（分类/排序/标注）→ [custom-editors.md]，sandbox 有预设切换 + 持续实验；custom-editor 是一次性操作
- 用户要调的是动画参数但属于设计原型阶段 → [design-and-prototypes.md]，设计原型关注"交互对不对"；sandbox 关注"参数是多少 + 复制代码"

## Example Skeleton: Transition & Code Exporter Sandbox

This sandbox allows the user to visually test transition speeds and easing functions, watch the resulting CSS change, and copy it to their clipboard.

```html
<div class="sandbox-app">
  <!-- Controls Side Panel -->
  <aside class="panel">
    <h2>Transition Tuner</h2>
    <p class="desc">Visually configure transition speeds and copy the resulting CSS rules.</p>
    
    <!-- Presets -->
    <div class="control-group">
      <span class="group-label">Presets</span>
      <div class="preset-buttons">
        <button class="btn-preset" data-dur="250" data-ease="cubic-bezier(0.25, 1, 0.5, 1)">Fast Out</button>
        <button class="btn-preset" data-dur="600" data-ease="cubic-bezier(0.34, 1.56, 0.64, 1)">Snappy Bounce</button>
        <button class="btn-preset" data-dur="1000" data-ease="linear">Slow Linear</button>
      </div>
    </div>
    
    <!-- Sliders -->
    <div class="control-group">
      <label for="slide-dur">Duration: <span id="val-dur">400</span>ms</label>
      <input type="range" id="slide-dur" min="100" max="2000" step="50" value="400" />
    </div>

    <!-- Dropdowns -->
    <div class="control-group">
      <label for="select-ease">Easing Function</label>
      <select id="select-ease">
        <option value="cubic-bezier(0.25, 1, 0.5, 1)">Ease Out (Cubic)</option>
        <option value="cubic-bezier(0.34, 1.56, 0.64, 1)">Snappy Spring</option>
        <option value="ease-in-out">Ease In Out (Native)</option>
        <option value="linear">Linear</option>
      </select>
    </div>
    
    <!-- Visual Easing Bezier Curve Specimen -->
    <div class="bezier-preview">
      <div class="bezier-node" id="bezier-vis"></div>
    </div>
  </aside>
  
  <!-- Canvas Preview Stage -->
  <main class="stage">
    <div class="preview-area">
      <div class="box-specimen" id="box-specimen">Preview Area</div>
      <button class="btn-action" id="btn-trigger">Trigger Animation</button>
    </div>
    
    <!-- Code Generator & Exporter -->
    <div class="code-export">
      <div class="code-header">
        <span>Generated CSS Rules</span>
        <button id="btn-copy" class="btn-copy">Copy CSS</button>
      </div>
      <pre><code id="code-output">.element {
  transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
}</code></pre>
    </div>
  </main>
</div>

<style>
  :root {
    --bg: #fafaf7;
    --surface: #ffffff;
    --ink: #1a1a1f;
    --ink-soft: #555560;
    --rule: #e7e5df;
    --accent: #a9583e;
    --accent-2: #cc785c;
    --accent-soft: #f5e4dc;
    --sans: system-ui, -apple-system, sans-serif;
    --mono: ui-monospace, Menlo, Monaco, monospace;
  }
  
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--sans);
    height: 100vh;
    overflow: hidden;
  }
  .sandbox-app {
    display: grid;
    grid-template-columns: 320px 1fr;
    height: 100vh;
  }
  .panel {
    background: var(--surface);
    border-right: 1px solid var(--rule);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    overflow-y: auto;
  }
  .panel h2 {
    margin: 0;
    font-size: 1.25rem;
  }
  .desc {
    font-size: 0.85rem;
    color: var(--ink-soft);
    margin: 0;
  }
  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .group-label, label {
    font-size: 0.85rem;
    font-weight: 600;
  }
  .preset-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .btn-preset {
    background: var(--bg);
    border: 1px solid var(--rule);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .btn-preset:hover {
    border-color: var(--accent);
  }
  input[type="range"], select {
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid var(--rule);
    background: var(--bg);
  }
  .bezier-preview {
    height: 60px;
    border: 1px solid var(--rule);
    border-radius: 6px;
    background: var(--bg);
    position: relative;
    overflow: hidden;
    margin-top: auto;
  }
  .bezier-node {
    position: absolute;
    bottom: 0; left: 0;
    width: 10px; height: 10px;
    background: var(--accent);
    border-radius: 50%;
  }

  /* Main Canvas Stage */
  .stage {
    display: grid;
    grid-template-rows: 1fr 180px;
    height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
    gap: 1.5rem;
  }
  .preview-area {
    background: var(--surface);
    border: 1px solid var(--rule);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .box-specimen {
    width: 120px; height: 120px;
    background: var(--accent);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: bold;
    transform: translateX(0);
  }
  .btn-action {
    background: var(--ink);
    color: var(--bg);
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-action:hover {
    background: var(--accent);
  }

  /* Exporter CSS */
  .code-export {
    background: var(--surface);
    border: 1px solid var(--rule);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
  }
  .code-header {
    background: var(--bg);
    border-bottom: 1px solid var(--rule);
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .btn-copy {
    background: var(--surface);
    border: 1px solid var(--rule);
    padding: 2px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;
  }
  .btn-copy:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  pre {
    margin: 0;
    padding: 12px;
    overflow-x: auto;
  }
  pre code {
    font-family: var(--mono);
    font-size: 0.85rem;
  }
</style>

<script>
  (function() {
    const durInput = document.getElementById('slide-dur');
    const easeInput = document.getElementById('select-ease');
    const valDur = document.getElementById('val-dur');
    const target = document.getElementById('box-specimen');
    const trigger = document.getElementById('btn-trigger');
    const codeOutput = document.getElementById('code-output');
    const btnCopy = document.getElementById('btn-copy');
    const presets = document.querySelectorAll('.btn-preset');
    
    let duration = 400;
    let easing = "cubic-bezier(0.25, 1, 0.5, 1)";
    
    function update() {
      valDur.textContent = duration;
      
      // Update code blocks
      const cssRule = `.element {
  transition: transform ${duration}ms ${easing};
}`;
      codeOutput.textContent = cssRule;
      
      // Update targets transition speed
      target.style.transition = `transform ${duration}ms ${easing}`;
    }
    
    // Sliders and Inputs
    durInput.addEventListener('input', function() {
      duration = this.value;
      update();
    });
    
    easeInput.addEventListener('change', function() {
      easing = this.value;
      update();
    });
    
    // Trigger Sandbox Motion
    let activeState = false;
    trigger.addEventListener('click', function() {
      activeState = !activeState;
      target.style.transform = activeState ? 'translateX(100px) rotate(45deg)' : 'translateX(0) rotate(0deg)';
    });
    
    // Preset Listeners
    presets.forEach(btn => {
      btn.addEventListener('click', function() {
        duration = this.getAttribute('data-dur');
        easing = this.getAttribute('data-ease');
        durInput.value = duration;
        easeInput.value = easing;
        update();
      });
    });
    
    // Copy Clipboard
    btnCopy.addEventListener('click', function() {
      navigator.clipboard.writeText(codeOutput.textContent).then(() => {
        const oldText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => this.textContent = oldText, 1500);
      });
    });
  })();
</script>
```
