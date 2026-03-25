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
---
#### Improvements
**Rule Debugger**  
Fixing styling of module by moving css-style to jsx-file of Rule Debugger.  
`RuleDebugger.jsx`
```jsx
//... adding main styles here
export const styles = {
   ruleDebugger: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#eee",
   },

   debuggerGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
   },

   section: {
      background: "#222",
      padding: 12,
      borderRadius: 6,
   },
}
```
`RuleTimeline.jsx`
```jsx
//...
const styles = {
   timelineItemMatched: {
      color: "#4caf50",
   },

   timelineItemSkipped: {
      color: "#f44336",
   },
}
```
`PriceEvolutionChart.jsx`
```jsx
//...
const styles = {
   chartPlaceholder: {
      display: "flex",
      gap: 4,
   },
}
```
**Chain Overview**  
Improving graphical display.
`ChainOverview.jsx`
```jsx
export function ChainOverview({ steps }) {
   return (
           <section style={styles.chainOverview}>
              <h3>Pricing Chain</h3>

              <ul style={styles.chainList}>
                 {steps.map((s, i) => (
                         <li key={i} style={styles.chainItem}>
                            <div style={styles.chainIndex}>{i + 1}</div>

                            <div style={styles.chainContent}>
                               <div style={styles.chainStep}>{s.step}</div>
                               <div style={styles.chainDesc}>{s.description}</div>

                               <div style={styles.chainPrice}>
                                  <span style={styles.priceBefore}>{s.priceBefore}</span>
                                  <span style={styles.priceArrow}>→</span>
                                  <span style={styles.priceAfter}>{s.priceAfter}</span>
                               </div>
                            </div>
                         </li>
                 ))}
              </ul>
           </section>
   );
}

const styles = {
   chainOverview: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#eee",
   },

   chainList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
   },

   chainItem: {
      display: "flex",
      gap: 12,
      padding: "12px 0",
      borderBottom: "1px solid #333",
   },

   chainItemLast: {
      borderBottom: "none",
   },

   chainIndex: {
      width: 28,
      height: 28,
      background: "#333",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "#aaa",
   },

   chainContent: {
      flex: 1,
   },

   chainStep: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#fff",
   },

   chainDesc: {
      fontSize: "0.85rem",
      color: "#bbb",
      marginTop: 2,
   },

   chainPrice: {
      marginTop: 6,
      fontSize: "0.9rem",
      color: "#ccc",
   },

   priceBefore: {
      color: "#f44336",
   },

   priceAfter: {
      color: "#4caf50",
   },

   priceArrow: {
      margin: "0 6px",
      color: "#888",
   },
};
```
**Adding loading and error status display**  
`AdminApp.jsx`
```jsx
//...
const { traceNew, loading, error, getTrace } = usePricingTrace(cart, ruleSet);
//...
<button style={styles.button} onClick={() => getTrace(cart, ruleSet)}>
   Get trace
</button>
//...
{loading && <p>Evaluating pricing…</p>}
{error && <p style={{ color: "red" }}>Error loading trace: {error}</p>}
``` 
`usePricingTrace.js`
```js
export function usePricingTrace() {
   const [trace, setTrace] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   async function getTrace(cart, ruleSet) {
      if (!cart || !ruleSet) {
         setError("Missing cart or ruleSet");
         return;
      }

      setLoading(true);
      setError(null);

      try {
         const result = await runPricingTrace(cart, ruleSet);
         setTrace(result);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   }

   return {
      traceNew: trace,
      loading,
      error,
      getTrace,
   };
}
``` 
`pricingEngine.js`
```js
export async function runPricingTrace(cart, ruleSet) {
   const res = await fetch("/api/pricing/trace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, ruleSet }),
   });

   if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error: ${res.status} ${text}`);
   }

   return await res.json();
}
```
---
### Refactoring RuleInspector
Fixing styling of module by separating Styles-file and moving parts to relevant module.  
`RuleInspector.jsx`
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
   total: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#03DAC6",
   },
}
```
`Section.jsx`
```jsx
const styles = {
   section: {
      marginBottom: 40,
   },
   sectionHeader: {
      borderBottom: "1px solid #333",
      paddingBottom: 5,
      marginBottom: 15,
      color: "#BB86FC",
   },
}
```
`RuleTimeLine.jsx`
```jsx
const styles = {
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
}
```
`SkuBreakdown.jsx`
```jsx
const styles = {
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
}
```
`DPSection.jsx`
```jsx
const styles = {
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
}
```
### Improve graphical display - Rule Debugger:
#### RuleTimeline
`RuleTimeline.jsx`
```jsx
if (!rules) {
   return (
           <div style={styles.timelineEmpty}>
              No rules matched in this step.
           </div>
   );
}

return (
        <div style={styles.timelineWrapper}>
           <h3 style={styles.timelineHeader}>Rule Timeline</h3>

           <ul style={styles.timelineList}>
              {rules.map((r, i) => (
                      <li key={i} style={styles.timelineItem}>
                         <div style={styles.ruleName}>{r.name}</div>
                         <div style={styles.ruleDesc}>{r.description}</div>
                         <div style={styles.ruleEffect}>
                            {r.effect}
                         </div>
                      </li>
              ))}
           </ul>
        </div>
);

const styles = {
   timelineWrapper: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#eee",
   },

   timelineHeader: {
      marginBottom: 12,
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#fff",
   },

   timelineList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
   },

   timelineItem: {
      padding: "10px 0",
      borderBottom: "1px solid #333",
   },

   ruleName: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#BB86FC",
   },

   ruleDesc: {
      fontSize: "0.85rem",
      color: "#bbb",
      marginTop: 2,
   },

   ruleEffect: {
      marginTop: 4,
      fontSize: "0.85rem",
      color: "#4caf50",
   },

   timelineEmpty: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#777",
      fontStyle: "italic",
   },
};
```
#### DPGraph
`DPGraph.jsx`
```jsx
if (!dp) {
   return (
           <div style={styles.dpEmpty}>
              No dynamic programming steps recorded.
           </div>
   );
}

return (
        <div style={styles.dpWrapper}>
           <h3 style={styles.dpHeader}>DP Graph</h3>

           <ul style={styles.dpList}>
              {dp.map((node, i) => (
                      <li key={i} style={styles.dpItem}>
                         <div style={styles.dpState}>State: {node.state}</div>
                         <div style={styles.dpValue}>Value: {node.value}</div>
                      </li>
              ))}
           </ul>
        </div>
);

const styles = {
   dpWrapper: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#eee",
   },
   dpHeader: {
      marginBottom: 12,
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#fff",
   },
   dpList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
   },
   dpItem: {
      padding: "10px 0",
      borderBottom: "1px solid #333",
   },
   dpState: {
      fontSize: "0.9rem",
      color: "#BB86FC",
   },
   dpValue: {
      fontSize: "0.85rem",
      color: "#4caf50",
      marginTop: 2,
   },
   dpEmpty: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#777",
      fontStyle: "italic",
   },
};
```
#### PriceEvolutionChart
`PriceEvolutionChart.jsx`
```jsx
if (!prices) {
   return (
           <div style={styles.priceEmpty}>
              No price evolution data available.
           </div>
   );
}

return (
        <div style={styles.priceWrapper}>
           <h3 style={styles.priceHeader}>Price Evolution</h3>

           <ul style={styles.priceList}>
              {prices.map((p, i) => (
                      <li key={i} style={styles.priceItem}>
                         <span style={styles.priceStep}>Step {i + 1}</span>
                         <span style={styles.priceValue}>{p}</span>
                      </li>
              ))}
           </ul>
        </div>
);

const styles = {
   chartPlaceholder: {
      display: "flex",
      gap: 4,
   },
   priceWrapper: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#eee",
   },
   priceHeader: {
      marginBottom: 12,
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#fff",
   },
   priceList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
   },
   priceItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px solid #333",
   },
   priceStep: {
      color: "#BB86FC",
   },
   priceValue: {
      color: "#4caf50",
      fontWeight: 600,
   },
   priceEmpty: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#777",
      fontStyle: "italic",
   },
}
```
---
### Improve graphical display - RuleDebugger:
#### Collapsible RuleTimeline  
`RuleTimeline.jsx`
```jsx
//...
return (
        <div style={styles.timelineWrapper}>
           <h3 style={styles.timelineHeader}>Rule Timeline</h3>

           <ul style={styles.timelineList}>
              {rules.map((r, i) => (
                      <RuleItem key={i} rule={r} />
              ))}
           </ul>
        </div>
);

function RuleItem({ rule }) {
   const [open, setOpen] = useState(false);

   return (
           <li style={styles.timelineItem}>
              <div style={styles.ruleHeader} onClick={() => setOpen(!open)}>
                 <span style={styles.ruleName}>{rule.name}</span>
                 <span style={styles.ruleToggle}>{open ? "▲" : "▼"}</span>
              </div>

              {open && (
                      <div style={styles.ruleBody}>
                         <div style={styles.ruleDesc}>{rule.description}</div>
                         <div style={styles.ruleEffect}>{rule.delta}</div>
                      </div>
              )}
           </li>
   );
}

const styles = {
//...
    ruleHeader: {
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        userSelect: "none",
    },

    ruleToggle: {
        color: "#888",
        fontSize: "0.9rem",
    },

    ruleBody: {
        marginTop: 8,
        paddingLeft: 4,
    },
   //...
}
```
#### Interactive DPGraph
Features:
- Hover -> highlight node
- Click -> set node as selected
- Selected node shows details

`DPGraph.jsx`
```jsx
const [hoverIndex, setHoverIndex] = useState(null);
const [selectedIndex, setSelectedIndex] = useState(null);
//...
<div style={styles.dpNodes}>
   {dp.map((node, i) => {
      const isHovered = hoverIndex === i;
      const isSelected = selectedIndex === i;

      return (
              <div
                      key={i}
                      style={{
                         ...styles.dpNode,
                         ...(isHovered ? styles.dpNodeHover : {}),
                         ...(isSelected ? styles.dpNodeSelected : {}),
                      }}
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                      onClick={() => setSelectedIndex(i)}
              >
                 {node.state}
              </div>
      );
   })}
</div>

{selectedIndex !== null && (
        <DPDetails node={dp[selectedIndex]} index={selectedIndex} />
)}
//...
function DPDetails({ node, index }) {
   return (
           <div style={styles.dpDetails}>
              <h4 style={styles.dpDetailsHeader}>
                 Step {index + 1}
              </h4>

              <div style={styles.dpDetailsRow}>
                 <span style={styles.dpLabel}>State:</span>
                 <span style={styles.dpValue}>{node.state}</span>
              </div>

              <div style={styles.dpDetailsRow}>
                 <span style={styles.dpLabel}>Chosen:</span>
                 <span style={styles.dpValue}>{node.chosen}</span>
              </div>

              <div style={styles.dpDetailsRow}>
                 <span style={styles.dpLabel}>Price:</span>
                 <span style={styles.dpValue}>{node.price}</span>
              </div>

              <div style={styles.dpDetailsRow}>
                 <span style={styles.dpLabel}>Options:</span>
                 <span style={styles.dpValueList}>
                    {node.options && node.options.length > 0
                            ? node.options.join(", ")
                            : "None"}
                </span>
              </div>
           </div>
   );
}

const styles = {
   dpWrapper: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#eee",
   },
   dpHeader: {
      marginBottom: 12,
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#fff",
   },
   dpNodes: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 16,
   },
   dpNode: {
      padding: "10px 14px",
      borderRadius: 6,
      background: "#333",
      cursor: "pointer",
      transition: "all 0.15s ease",
      color: "#ccc",
      border: "1px solid #444",
   },
   dpNodeHover: {
      background: "#444",
      borderColor: "#666",
      color: "#fff",
   },
   dpNodeSelected: {
      background: "#BB86FC",
      borderColor: "#BB86FC",
      color: "#000",
      fontWeight: 600,
   },
   dpDetails: {
      background: "#111",
      padding: 12,
      borderRadius: 6,
      border: "1px solid #333",
   },
   dpDetailsHeader: {
      marginBottom: 8,
      fontSize: "1rem",
      fontWeight: 600,
      color: "#BB86FC",
   },
   dpDetailsRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6,
   },
   dpLabel: {
      color: "#bbb",
   },
   dpValue: {
      color: "#4caf50",
      fontWeight: 600,
   },
   dpValueList: {
      color: "#ccc",
      fontStyle: "italic",
   },
   dpEmpty: {
      background: "#1a1a1a",
      padding: 16,
      borderRadius: 8,
      color: "#777",
      fontStyle: "italic",
   },
};
```
#### PriceEvolutionChart – interactive SVG Line Chart
- The line is drawn with <polyline>
- Nodes är <circle> with hover‑effect
- Tooltip is shown under the graph
- Scaling is automatic based on min/max‑price

`PriceEvolutionChart.jsx`
```jsx
const [hoverIndex, setHoverIndex] = useState(null);
//...
const width = 500;
const height = 200;
const padding = 30;
const max = Math.max(...prices);
const min = Math.min(...prices);

const points = prices.map((p, i) => {
   const x = padding + (i / (prices.length - 1)) * (width - padding * 2);
   const y = height - padding - ((p - min) / (max - min)) * (height - padding * 2);
   return { x, y, value: p };
});

const path = points.map((p) => `${p.x},${p.y}`).join(" ");
//...
<svg width={width} height={height} style={styles.svg}>
   {/* Line */}
   <polyline
           fill="none"
           stroke="#BB86FC"
           strokeWidth="2"
           points={path}
   />

   {/* Points */}
   {points.map((p, i) => (
           <circle
                   key={i}
                   cx={p.x}
                   cy={p.y}
                   r={hoverIndex === i ? 6 : 4}
                   fill={hoverIndex === i ? "#4caf50" : "#fff"}
                   stroke="#333"
                   strokeWidth="1"
                   onMouseEnter={() => setHoverIndex(i)}
                   onMouseLeave={() => setHoverIndex(null)}
           />
   ))}
</svg>

{/* Tooltip */}
{hoverIndex !== null && (
        <div style={styles.tooltip}>
           Step {hoverIndex + 1}: {prices[hoverIndex]}
        </div>
)}
//...
const styles = {
    //...
   svg: {
      background: "#111",
      borderRadius: 6,
      border: "1px solid #333",
   },
   tooltip: {
      marginTop: 10,
      padding: "6px 10px",
      background: "#333",
      borderRadius: 4,
      color: "#fff",
      fontSize: "0.85rem",
      display: "inline-block",
   },
   //...
}
```
---
### Synchronization between Rule Debugger components
Introducing **TraceSyncContext** that holds:
- `selectedStep` (DPGraph‑index)
- `setSelectedStep(stepIndex)`
- `selectedRule` (rule name or id)
- `setSelectedRule(ruleName)`
- `selectedChainStep`
- `setSelectedChainStep(stepIndex)`

This works like:
- Click in DPGraph → highlight in RuleTimeline + ChainOverview
- Click in RuleTimeline → highlight in DPGraph + ChainOverview
- Click in ChainOverview → highlight in DPGraph + RuleTimeline

#### Implementation steps:  
1. Create TraceSyncContext
   `TraceSyncProvider.jsx`
   ```jsx
   import { createContext, useContext, useState } from "react";
   
   const TraceSyncContext = createContext(null);
   
   export function TraceSyncProvider({ children }) {
       const [selectedStep, setSelectedStep] = useState(null);
       const [selectedRule, setSelectedRule] = useState(null);
       const [selectedChainStep, setSelectedChainStep] = useState(null);
   
       return (
           <TraceSyncContext.Provider value={{
               selectedStep,
               setSelectedStep,
               selectedRule,
               setSelectedRule,
               selectedChainStep,
               setSelectedChainStep
           }}>
               {children}
           </TraceSyncContext.Provider>
       );
   }
   
   export function useTraceSync() {
       return useContext(TraceSyncContext);
   }
   ```
2. Wrap RuleDebugger within the provider
   `RuleDebugger.jsx`
   ```jsx
   //...
   <TraceSyncProvider>
       <ChainOverview steps={trace.steps} />
       <DPGraph dp={trace.dp} />
       <RuleTimeline rules={trace.rules} />
   </TraceSyncProvider>
   //...
   ```
3. DPGraph ->
   - writes selectedStep
   - highlights when RuleTimeline is clicked
     `DPGraph.jsx`
      ```jsx
      //...
      const {selectedStep, setSelectedStep, selectedRule } = useTraceSync();

      const isSelectedByRule = node.appliedRules?.includes(selectedRule);
      //...
      const isSelected = selectedStep === i;
      //...
      ...(isSelectedByRule ? styles.dpNodeSelectedByRule : {})
      //...
      onClick={() => setSelectedStep(i)}
      //...
      const styles = {
        dpNodeSelectedByRule: {
        background: "#4caf50",
        borderColor: "#4caf50",
        color: "#000",
        fontWeight: 600,
        },
      }
      ```
4. RuleTimeline -> highlight rules that belongs to selectedStep  
   If every rule has a field like stepIndex or similar use that.  
   If not, you can connect rules to DP-step by the trace-structure.
   `RuleTimeline.jsx`
   ```jsx
   //...
   const { selectedStep, setSelectedRule } = useTraceSync();
   //...
   const isActive = rule.stepIndex === selectedStep;
   //...
   <div style={{
    ...styles.ruleHeader,
    ...(isActive ? styles.ruleActive : {})
   }}></div>
   //...
   <div onClick={() => setSelectedRule(rule.name)}></div>
   //...
   const styles = {
    ruleActive: {
        background: "#333",
        borderLeft: "3px solid #BB86FC",
    },
   }
   ```
5. ChainOverview -> highlight the DP-step
   `ChainOverview.jsx`
   ```jsx
   //...
   const { selectedStep, setSelectedChainStep } = useTraceSync();
   //...
   const isActive = index === selectedStep;
   //...
   
   <div onClick={() => setSelectedChainStep(index)}></div>
   //...
   const styles = {
    chainActive: {
        background: "#222",
        borderLeft: "3px solid #4caf50",
    },
   }
   ```
---
### Improve graphical display - RuleInspector:
#### Include in synchronization  
**Rule Execution**  
`RuleTimeline.jsx`
```jsx
//...
const { selectedStep, setSelectedStep } = useTraceSync();
const isActive = event.stepIndex === selectedStep;
//...
<div style={{
   ...styles.event,
   ...(isActive ? styles.eventActive : {})
}}>
   <div style={styles.eventHeader} onClick={() =>
   {
      setOpen(!open);
      setSelectedStep(event.stepIndex);
   }}>
      <strong>{index + 1}. {event.ruleName}</strong>
      <span style={{ color: event.applied ? "#7CFC7C" : "#FF6B6B" }}>
          {event.applied ? "✔ Applied" : "✖ Skipped"}
        </span>
   </div>
//...
```
**SKU Breakdown**  
`.jsx`
```jsx
```
**DP Paths**  
`.jsx`
```jsx
```
**Sync**  
`AdminApp.jsx`
```jsx
//...
<TraceSyncProvider>
   <RuleInspector trace={trace} />
   <RuleDebugger trace={traceNew} />
</TraceSyncProvider>
//...
```
### Mark or divide DP-steps in DPGraph by SKU
Some ways to do this:
- Show DP-nodes grouped by SKU, or
- Mark which SKU each step belongs to, or
- Let the user click on a SKU and filter DPGraph, or
- Color code by SKU, or
- Show titles or sections per SKU.

#### Group DP-nodes by SKU
Chosen path SKU-grouping.  
`DPGraph.jsx`
```jsx
//...
const indexedDP = dp.map((node, idx) => ({
   ...node,
   globalIndex: idx
}));
const grouped = indexedDP.reduce((acc, node) => {
   if (!acc[node.sku]) acc[node.sku] = [];
   acc[node.sku].push(node);
   return acc;
}, {});
//...
{Object.entries(grouped).map(([sku, nodes]) => (
        <div key={sku} style={styles.skuBlock}>
           <h3 style={styles.skuHeader}>{sku}</h3>
           <DPNodes nodes={nodes}></DPNodes>
        </div>
))}
//...
function DPNodes({ nodes }) {
    const i = node.globalIndex;
}
//...
```
---
### New feature: Export/Import of cart
This intends to improve manual use and testing by adding the following:
1. Export cart to JSON
   - Click on `Export cart`
   - UI gets `context.counts()` or similar cart-model
   - Output as JSON
2. Import cart as JSON
   - Click on `Import cart`
   - Paste a JSON
   - UI updates cart-state
3. A standard cart to use for testing
   - Click `Load default cart`
   - UI loads default cart-state

Refactoring this component into its own separate part of the project structure.
`CartEditor.jsx`
```jsx
//...
<CartLoader cart={cart} setCart={onChange} />
//...
```
`AddSkuForm.jsx`
```jsx
//... Full component moved to separate file
```
The new feature:  
`CartLoader.jsx`
```jsx
export function CartLoader({cart, setCart}) {
   const [importText, setImportText] = useState("");

   function copyCart() {
      const json = JSON.stringify(cart, null, 2);
      navigator.clipboard.writeText(json);
   }

   function importCart() {
      try {
         const parsed = JSON.parse(importText);
         if(typeof parsed !== "object" || Array.isArray(parsed)) {
            alert("Invalid cart format")
            return;
         }
         setCart(parsed);
      } catch (error) {
         alert("Invalid JSON");
      }
   }

   function loadStandardCart() {
      const defaultCart = {
         "A": 5,
         "B": 4,
         "C": 3,
         "D": 2,
         "E": 1
      };
      setCart(defaultCart);
   }

   return (
           <div style={styles.tools}>
              <button style={styles.button} onClick={copyCart}>Copy cart</button>
              <button style={styles.button} onClick={loadStandardCart}>Load standard cart</button>
              <textarea style={styles.textarea}
                        placeholder={"Paste cart JSON here..."}
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}/>
              <button style={styles.importButton} onClick={importCart}>Import cart</button>
           </div>
   );
}

const styles = {
   tools: {
      marginTop: 15,
      display: "flex",
      gap: 10,
   },
   button: {
      background: "#333",
      border: "1px solid #444",
      padding: "6px 10px",
      borderRadius: 4,
      cursor: "pointer",
      color: "#E0E0E0",
   },
   textarea: {
      marginTop: 10,
      width: "100%",
      height: 100,
      background: "#2A2A2A",
      border: "1px solid #333",
      color: "#E0E0E0",
      padding: 8,
      fontFamily: "monospace",
      borderRadius: 4,
   },
   importButton: {
      marginTop: 8,
      background: "#BB86FC",
      border: "none",
      padding: "6px 12px",
      borderRadius: 4,
      cursor: "pointer",
      color: "#000",
      fontWeight: "bold",
   }
};
```
---


### Current structure
```

```