# Pricing Engine Admin Panel
Admin tool using the RuleInspector UI in which you can:
- Upload a basket (items + number of)
- View what rules applied
- View Dp-graph
- View totals
- Change rule setup
- Debug in real-time

## Architecture
Starting with the main components built upon the RuleInspector tracing.

**Main project structure**
```
├── api
├── components
│   ├── CartEditor.jsx
│   ├── RuleSetSelector.jsx
│   ├── ruledebugger
│   └── ruleinspector
├── index.css
├── index.js
├── pages
│   └── AdminApp.jsx
```

### RuleInspector UI - Starting point
JavaScript (React) component for displaying rule events.  
`RuleInspector.jsx` - Initial version
```jsx
export function RuleInspector({ events }) {
  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h2>Rule Inspector</h2>

      {events.map((e, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3>{e.ruleName}</h3>

          <div>Applied: {String(e.applied)}</div>

          <h4>Delta</h4>
          <pre>{JSON.stringify(e.delta, null, 2)}</pre>

          <h4>Before</h4>
          <pre>{JSON.stringify(e.before, null, 2)}</pre>

          <h4>After</h4>
          <pre>{JSON.stringify(e.after, null, 2)}</pre>

          <hr />
        </div>
      ))}
    </div>
  );
}
```
---
### RuleInspector 3.0 – React UI
An interactive, collapsible timeline with:
- Rule-timeline
- Delta
- Context before/after
- DP-graph per SKU
- Sku-breakdown
- Final total

1. Main component: `<RuleInspector/>`  
   `RuleInspector.jsx`
    ```jsx
    import React, { useState } from "react";
    
    export function RuleInspector({ trace }) {
      return (
        <div style={styles.container}>
          <h1 style={styles.header}>Rule Inspector</h1>
    
          <Section title="Rule Execution">
            <RuleTimeline events={trace.events} />
          </Section>
    
          <Section title="SKU Breakdown">
            <SkuBreakdown skuTraces={trace.skuTraces} />
          </Section>
    
          <Section title="Dynamic Programming Paths">
            <DPSection dpTraces={trace.dpTraces} />
          </Section>
    
          <Section title="Final Total">
            <div style={styles.total}>{trace.finalTotal} kr</div>
          </Section>
        </div>
      );
    }
    ```
2. Section-wrapper
   `Section.jsx`
    ```jsx
    function Section({ title, children }) {
      return (
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>{title}</h2>
          {children}
        </div>
      );
    }
    ```
3. Rule-timeline (collapsible)
   `RuleTimeLine.jsx`
    ```jsx
    function RuleTimeline({ events }) {
      return (
        <div>
          {events.map((e, i) => (
            <RuleEvent key={i} event={e} index={i} />
          ))}
        </div>
      );
    }
    
    function RuleEvent({ event, index }) {
      const [open, setOpen] = useState(false);
    
      return (
        <div style={styles.event}>
          <div style={styles.eventHeader} onClick={() => setOpen(!open)}>
            <strong>{index + 1}. {event.ruleName}</strong>
            <span>{event.applied ? "✔ Applied" : "✖ Skipped"}</span>
          </div>
    
          {open && (
            <div style={styles.eventBody}>
              <pre>Delta: {JSON.stringify(event.delta, null, 2)}</pre>
              <pre>Before: {JSON.stringify(event.before, null, 2)}</pre>
              <pre>After: {JSON.stringify(event.after, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    }
    ```
4. SKU breakdown (collapsible per SKU)
   `SkuBreakdown.jsx`
    ```jsx
    function SkuBreakdown({ skuTraces }) {
      return (
        <div>
          {skuTraces.map((s, i) => (
            <SkuItem key={i} sku={s} />
          ))}
        </div>
      );
    }
    
    function SkuItem({ sku }) {
      const [open, setOpen] = useState(false);
    
      return (
        <div style={styles.sku}>
          <div style={styles.skuHeader} onClick={() => setOpen(!open)}>
            <strong>{sku.sku}</strong>
            <span>{sku.total} kr</span>
          </div>
    
          {open && (
            <div style={styles.skuBody}>
              <pre>{JSON.stringify(sku, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    }
    ```
5. DP-graph per SKU (collapsible)
   `DPSection.jsx`
    ```jsx
    function DPSection({ dpTraces }) {
      return (
        <div>
          {dpTraces.map((dp, i) => (
            <DPTraceView key={i} dp={dp} />
          ))}
        </div>
      );
    }
    
    function DPTraceView({ dp }) {
      const [open, setOpen] = useState(false);
    
      return (
        <div style={styles.dp}>
          <div style={styles.dpHeader} onClick={() => setOpen(!open)}>
            <strong>SKU {dp.sku}</strong>
            <span>Remaining: {dp.remaining}</span>
          </div>
    
          {open && (
            <div style={styles.dpBody}>
              {dp.nodes.map((node) => (
                <div key={node.index} style={styles.dpNode}>
                  <strong>[{node.index}] → {node.price} kr</strong>
                  <pre>{node.explanation.join("\n")}</pre>
                </div>
              ))}
    
              <h4>Winning Path</h4>
              <pre>{dp.winningPath.join("\n")}</pre>
    
              <h4>Total</h4>
              <div>{dp.finalPrice} kr</div>
            </div>
          )}
        </div>
      );
    }
    ```
6. Styling
   `Styles.jsx`
    ```jsx
    const styles = {
      container: {
        fontFamily: "monospace",
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
        background: "#121212",
        color: "#E0E0E0",
      },
      header: {
        textAlign: "center",
        marginBottom: 30,
        color: "#BB86FC",
      },
      section: {
        marginBottom: 40,
      },
      sectionHeader: {
        borderBottom: "1px solid #333",
        paddingBottom: 5,
        marginBottom: 15,
        color: "#BB86FC",
      },
      event: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
      },
      eventHeader: {
        padding: 10,
        background: "#2A2A2A",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
      },
      eventBody: {
        padding: 10,
        background: "#1A1A1A",
      },
      sku: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
      },
      skuHeader: {
        padding: 10,
        background: "#263238",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        color: "#80CBC4",
      },
      skuBody: {
        padding: 10,
        background: "#1A1A1A",
      },
      dp: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
      },
      dpHeader: {
        padding: 10,
        background: "#2E3A59",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        color: "#82B1FF",
      },
      dpBody: {
        padding: 10,
        background: "#1A1A1A",
      },
      dpNode: {
        marginBottom: 10,
        padding: 10,
        background: "#222",
        borderLeft: "3px solid #555",
      },
      total: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#03DAC6",
      },
    };
    ```
---
### Admin tool
#### Structure
```
├── App.css
├── App.js
├── api
│   └── pricingEngine.js
├── components
│   ├── CartEditor.jsx
│   ├── Layout.jsx
│   ├── RuleSetSelector.jsx
│   └── ruleinspector
│       ├── DPSection.jsx
│       ├── RuleInspector.jsx
│       ├── RuleTimeLine.jsx
│       ├── Section.jsx
│       ├── SkuBreakdown.jsx
│       └── Styles.jsx
├── index.css
├── index.js
├── pages
│   └── AdminApp.jsx
```
#### Components
- CartEditor – Input SKU + number
- RuleSetSelector – Choose rule setup to use
- RuleInspector – Main UI
- AdminApp – Combines everything

**Main panel:**
`AdminApp.jsx`
```jsx
import React, { useState } from "react";
import { CartEditor } from "../components/CartEditor";
import { RuleSetSelector } from "../components/RuleSetSelector";
import { RuleInspector } from "../components/RuleInspector";
import { runPricingEngine } from "../api/pricingEngine";

export function AdminApp() {
  const [cart, setCart] = useState({});
  const [ruleSet, setRuleSet] = useState("default");
  const [trace, setTrace] = useState(null);

  async function evaluate() {
    const result = await runPricingEngine(cart, ruleSet);
    setTrace(result.trace);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Pricing Engine Admin</h1>

      <div style={styles.controls}>
        <RuleSetSelector value={ruleSet} onChange={setRuleSet} />
        <CartEditor cart={cart} onChange={setCart} />
        <button style={styles.button} onClick={evaluate}>
          Evaluate
        </button>
      </div>

      {trace && <RuleInspector trace={trace} />}
    </div>
  );
}

const styles = {
  container: {
    background: "#121212",
    minHeight: "100vh",
    color: "#E0E0E0",
    padding: 20,
    fontFamily: "monospace",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    color: "#BB86FC",
  },
  controls: {
    display: "flex",
    gap: 20,
    marginBottom: 40,
  },
  button: {
    background: "#BB86FC",
    border: "none",
    padding: "10px 20px",
    borderRadius: 4,
    cursor: "pointer",
    color: "#000",
    fontWeight: "bold",
  },
};
```
**Edit customer cart:**
`CartEditor.jsx`
```jsx
import React from "react";

export function CartEditor({ cart, onChange }) {
  function updateSku(sku, qty) {
    const next = { ...cart };
    if (qty <= 0) delete next[sku];
    else next[sku] = qty;
    onChange(next);
  }

  return (
    <div style={styles.box}>
      <h3 style={styles.title}>Cart</h3>

      {Object.entries(cart).map(([sku, qty]) => (
        <div key={sku} style={styles.row}>
          <span>{sku}</span>
          <input
            type="number"
            value={qty}
            onChange={(e) => updateSku(sku, Number(e.target.value))}
            style={styles.input}
          />
        </div>
      ))}

      <AddSkuForm onAdd={updateSku} />
    </div>
  );
}

function AddSkuForm({ onAdd }) {
  const [sku, setSku] = React.useState("");
  const [qty, setQty] = React.useState(1);

  function submit() {
    if (!sku) return;
    onAdd(sku, qty);
    setSku("");
    setQty(1);
  }

  return (
    <div style={styles.addRow}>
      <input
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        style={styles.input}
      />
      <button style={styles.addButton} onClick={submit}>
        Add
      </button>
    </div>
  );
}

const styles = {
  box: {
    background: "#1E1E1E",
    padding: 15,
    borderRadius: 4,
    minWidth: 200,
  },
  title: {
    color: "#80CBC4",
    marginBottom: 10,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  input: {
    background: "#2A2A2A",
    border: "1px solid #333",
    color: "#E0E0E0",
    padding: 5,
    width: 60,
  },
  addRow: {
    marginTop: 10,
    display: "flex",
    gap: 5,
  },
  addButton: {
    background: "#03DAC6",
    border: "none",
    padding: "5px 10px",
    borderRadius: 4,
    cursor: "pointer",
    color: "#000",
  },
};
```
**Choose rule setup:**
`RuleSetSelector.jsx`
```jsx
export function RuleSetSelector({ value, onChange }) {
  return (
    <div style={styles.box}>
      <h3 style={styles.title}>Rule Set</h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.select}
      >
        <option value="default">Default</option>
        <option value="campaignA">Campaign A</option>
        <option value="campaignB">Campaign B</option>
      </select>
    </div>
  );
}

const styles = {
  box: {
    background: "#1E1E1E",
    padding: 15,
    borderRadius: 4,
  },
  title: {
    color: "#82B1FF",
    marginBottom: 10,
  },
  select: {
    background: "#2A2A2A",
    border: "1px solid #333",
    color: "#E0E0E0",
    padding: 5,
    width: "100%",
  },
};
```
**API call to backend (java-engine):**
`pricingEngine.jsx`
```js
export async function runPricingEngine(cart, ruleSet) {
  const res = await fetch("/api/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart, ruleSet }),
  });

  return await res.json();
}
```
---
### Rule Debugger
#### Structure
```
ruledebugger
├── ChainOverview.jsx
├── DPGraph.jsx
├── PriceEvolutionChart.jsx
├── RuleDebugger.css
├── RuleDebugger.jsx
└── RuleTimeline.jsx
```
#### Components
1. `RuleDebugger.jsx`
   ```jsx
   import React from "react";
   import {ChainOverview} from "./ChainOverview";
   import {RuleTimeline} from "./RuleTimeline";
   import {DPGraph} from "./DPGraph";
   import {PriceEvolutionChart} from "./PriceEvolutionChart";

   export function RuleDebugger({ trace }) {
        if (!trace) {
            return (
                <div className="rule-debugger empty">
                    <p>No trace available. Run a pricing evaluation.</p>
                </div>
            );
        }

        return (
            <div className="rule-debugger">
                <h2>Rule Debugger</h2>

                <div className="debugger-grid">
                    <ChainOverview steps={trace.steps} />
                    <RuleTimeline rules={trace.rules} />
                    <DPGraph dp={trace.dp} />
                    <PriceEvolutionChart prices={trace.priceEvolution} />
                </div>
            </div>
        );
   }
   ```
2. `ChainOverview.jsx`
   ```jsx
   export function ChainOverview({ steps }) {
    return (
        <section className="chain-overview">
            <h3>Pricing Chain</h3>
            <ul>
                {steps.map((s, i) => (
                    <li key={i} className="chain-step">
                        <div className="step-title">{s.step}</div>
                        <div className="step-desc">{s.description}</div>
                        <div className="step-price">
                            {s.priceBefore} → {s.priceAfter}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
   }
   ```
3. `RuleTimeline.jsx`
   ```jsx
   export function RuleTimeline({ rules }) {
    return (
        <section className="rule-timeline">
            <h3>Rule Timeline</h3>

            <div className="timeline">
                {rules.map((r) => (
                    <div
                        key={r.id}
                        className={`timeline-item ${r.matched ? "matched" : "skipped"}`}
                    >
                        <span className="rule-name">{r.name}</span>
                        <span className="rule-delta">
                        {r.delta > 0 ? "+" : ""}
                            {r.delta}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
   }
   ```
4. `DPGraph.jsx`
   ```jsx
   export function DPGraph({ dp }) {
    return (
        <section className="dp-graph">
            <h3>DP States</h3>

            <ul>
                {dp.map((state, i) => (
                    <li key={i} className="dp-state">
                        <div className="dp-label">{state.state}</div>
                        <div className="dp-options">
                            Options: {state.options.join(", ")}
                        </div>
                        <div className="dp-chosen">Chosen: {state.chosen}</div>
                        <div className="dp-price">Price: {state.price}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
   }
   ```
5. `PriceEvolutionChart.jsx`
   ```jsx
   export function PriceEvolutionChart({ prices }) {
    return (
        <section className="price-evolution">
            <h3>Price Evolution</h3>

            <div className="chart-placeholder">
                {prices.map((p, i) => (
                    <div key={i} className="chart-bar">
                        <span>{p}</span>
                    </div>
                ))}
            </div>
        </section>
    );
   }
   ```
6. ```css
   .rule-debugger {
    background: #1a1a1a;
    padding: 16px;
    border-radius: 8px;
    color: #eee;
   }

   .debugger-grid {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 16px;
   }

   section {
     background: #222;
     padding: 12px;
     border-radius: 6px;
   }

   .timeline-item.matched {
     color: #4caf50;
   }

   .timeline-item.skipped {
     color: #f44336;
   }

   .chart-placeholder {
     display: flex;
     gap: 4px;
   }
   ```
**API-call to backend**  
`pricingTrace.jsx`
```jsx

```
`pricingEngine.jsx`
```js
export async function runPricingTrace(cart, ruleSet) {
   const res = await fetch("/api/pricing/trace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, ruleSet }),
   });

   return await res.json();
}
```
**Adding to main app**  
`AdminApp.jsx`
```jsx
//... Add at top
const [traceNew, setNewTrace] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
async function getTrace() {
   const result = await runPricingTrace(cart, ruleSet);
   setNewTrace((result.trace));
   setLoading(result.loading);
   setError(result.error);
}

//... add in to controls-div
<button style={styles.button} onClick={getTrace}>
   Get trace
</button>
//... add to container-div
{loading && <p>Evaluating pricing…</p>}
{error && <p>Error loading trace</p>}
<RuleDebugger trace={traceNew} />
```
****  
``
```js

```
---
#### Improvements
**Rule Debugger**  
Fixing styling of module by moving css-style to jsx-file of Rule Debugger.  
``
```jsx
```
**Chain Overview**  

``
```jsx
```

---
### Refactoring RuleInspector
Fixing styling of module by separating Styles-file and moving parts to relevant module.  
`RuleInspector.jsx`
```jsx
```
`Section.jsx`
```jsx
```
`RuleTimeLine.jsx`
```jsx
```
`SkuBreakdown.jsx`
```jsx
```
`DPSection.jsx`
```jsx
```
### Current structure
```

```