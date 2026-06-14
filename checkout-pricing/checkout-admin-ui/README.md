# Pricing Engine Admin Panel
Admin tool using the RuleInspector UI in which you can:
- Upload a basket (items and number of)
- View what rules applied
- View Dp-graph
- View totals
- Change rule setup
- Debug in real-time

## Architecture
Starting with the main parts built upon the RuleInspector tracing.

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

### RuleInspector UI starting point
JavaScript (React) component for displaying rule events.  
`RuleInspector.jsx` - Initial version
```jsx
export function RuleInspector({ events }) {}
```
Content per event:
- Rule name
- Applied
- Delta
- Before
- After
---
### RuleInspector 3.0 – React UI
An interactive, collapsible timeline with:
- Rule-timeline
- Sku-breakdown
- DP-graph per SKU
- Final total

1. Main component:
   `RuleInspector.jsx`
    ```jsx
    export function RuleInspector({ trace }) {}
    ```
2. Section-wrapper for sub components
   `Section.jsx`
    ```jsx
    function Section({ title, children }) {}
    ```
3. Rule-timeline (collapsible)
   `RuleTimeLine.jsx`
    ```jsx
    function RuleTimeline({ events }) {}
    
    function RuleEvent({ event, index }) {}
    ```
4. SKU breakdown (collapsible per SKU)
   `SkuBreakdown.jsx`
    ```jsx
    function SkuBreakdown({ skuTraces }) {}
    
    function SkuItem({ sku }) {}
    ```
5. DP-graph per SKU (collapsible)
   `DPSection.jsx`
    ```jsx
    function DPSection({ dpTraces }) {}
    
    function DPTraceView({ dp }) {}
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
- CartEditor – Input SKU plus number and add button, holds cart
- RuleSetSelector – 
- RuleInspector – Main evaluation result UI
- AdminApp
  - Combines everything
  - Runs selected ruleset on current cart when button `Evaluate` is pressed

**Main panel:** `AdminApp.jsx`
```jsx
export function AdminApp() {}
```
**Edit customer cart:** `CartEditor.jsx`
```jsx
export function CartEditor({ cart, onChange }) {}

function AddSkuForm({ onAdd }) {}
```
- Enter SKU and number, press add to add a new product
- Use up and down arrows to change the current number

**Choose rule setup:** `RuleSetSelector.jsx`
```jsx
export function RuleSetSelector({ value, onChange }) {}
```
Choose what ruleset to use from a dropdown list

**API call to backend (java-engine)**
`pricingEngine.jsx`
```js
export async function runPricingEngine(cart, ruleSet) {}
```
- Endpoint `"/api/pricing/evaluate"`
- Output: tracing events in json-format
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
   export function RuleDebugger({ trace }) {}
   ```
2. `ChainOverview.jsx`
   ```jsx
   export function ChainOverview({ steps }) {}
   ```
   Shows evaluation steps with a price effect.
3. `RuleTimeline.jsx`
   ```jsx
   export function RuleTimeline({ rules }) {}
   ```
   Shows applied rules and price effect.
4. `DPGraph.jsx`
   ```jsx
   export function DPGraph({ dp }) {}
   ```
   Shows DP-algorithm steps with options, chosen and price.
5. `PriceEvolutionChart.jsx`
   ```jsx
   export function PriceEvolutionChart({ prices }) {}
   ```
**API-call to backend**
`pricingEngine.jsx`
```js
export async function runPricingTrace(cart, ruleSet) {}
```
- Endpoint `"/api/pricing/trace"`
- Output: new PricingTrace data in json-format

**Adding to main app**  
`AdminApp.jsx`
```jsx
async function getTrace() {}
```
Adding call run evaluation and get the new output when pressing `Get trace` button.

---
#### Improvements
**Rule Debugger**  
Fixing styling of the module by moving css-style to jsx-file of Rule Debugger.
Styling separated and added in: 
- `RuleDebugger.jsx`
- `RuleTimeline.jsx`
- `PriceEvolutionChart.jsx`

**Chain Overview** `ChainOverview.jsx`  
Improving graphical display with layout and styling changes.  
**Adding loading and error status display**  
Changes in: 
- `AdminApp.jsx`
- `usePricingTrace.js`
- `pricingEngine.js`
---
### Refactoring RuleInspector
Fixing styling of the module by separating the Style-file and moving parts to the relevant module.  
Changes done in:
- `RuleInspector.jsx`
- `Section.jsx`
- `RuleTimeLine.jsx`
- `SkuBreakdown.jsx`
- `DPSection.jsx`
### Improve the graphical display of Rule Debugger:
#### RuleTimeline
- Better styling
- Handle missing input
- Making sure all important data is included.
#### DPGraph
- Better styling
- Handle missing input
#### PriceEvolutionChart
- Better styling
- Handle missing input
---
### Improve the graphical display of RuleDebugger:
#### Collapsible RuleTimeline
Displaying rule name as entry and more info when expanding on click.
#### Interactive DPGraph
Features:
- Hover -> highlight node
- Click → set the node as selected
- Selected node shows details
#### PriceEvolutionChart – interactive SVG Line Chart
- The line is drawn with <polyline>
- Nodes are <circle> with a hover effect
- Tooltip is shown under the graph
- Scaling is automatic based on min/max‑price
---
### Synchronization between Rule Debugger components
Allowing UI to display connections between data in the different components.  
Introducing **TraceSyncContext** that holds:
- `selectedStep` (DPGraph‑index)
- `setSelectedStep(stepIndex)`
- `selectedRule` (rule name or id)
- `setSelectedRule(ruleName)`
- `selectedChainStep`
- `setSelectedChainStep(stepIndex)`

This works like:
- Click in DPGraph → highlight in RuleTimeline + ChainOverview
- Click on RuleTimeline → highlight in DPGraph + ChainOverview
- Click on ChainOverview → highlight in DPGraph + RuleTimeline

#### Implementation steps:  
1. Create TraceSyncContext
   `TraceSyncProvider.jsx`
   ```jsx
   export function TraceSyncProvider({ children }) {}
   
   export function useTraceSync() {}
   ```
2. Wrap RuleDebugger within the provider in `RuleDebugger.jsx`
3. DPGraph ->
   - writes selectedStep
   - it highlights when RuleTimeline is clicked
4. RuleTimeline → highlight rules that belong to selectedStep  
   If every rule has a field like stepIndex or similar use that.  
   If not, you can connect rules to a DP step by the trace-structure.
5. ChainOverview → highlight the DP step
---
### Improve the graphical display of RuleInspector:
#### Include it in synchronization
1. Include RuleInspector within the provider
2. Rule Execution
3. SKU Breakdown
4. DP Paths
---
### Mark or divide DP steps in DPGraph by SKU
Some ways to do this:
- Show DP nodes grouped by SKU, or
- Mark which SKU each step belongs to, or
- Let the user click on a SKU and filter DPGraph, or
- Color code by SKU, or
- Show titles or sections per SKU.

#### Group DP-nodes by SKU
The chosen path is SKU-grouping with expandable details.

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
1. `CartEditor.jsx`
    ```jsx
    export function CartEditor({ cart, onChange }) {}
    ```
2. `AddSkuForm.jsx`
    ```jsx
    export function AddSkuForm({ onAdd }) {}
    ```
3. The new feature: `CartLoader.jsx`
    ```jsx
    export function CartLoader({cart, setCart}) {}
    ```
---
#### Recent carts
Extra feature for Cart editor:  
A list of the last five carts
- Stored in `localStorage`
- Updates every time the user updates the cart
- Shown as a drop-down in UI

`RecentCarts.jsx`
```jsx
export function RecentCarts({ cart, setCart}) {}
```
Hook used to update recent carts in local storage:  
`useRecentCarts.js`
```js
export function useRecentCarts(cart) {}
```
#### Adding tooltip for drop-down
Show cart details for dropdown choice on hover.
1. Wrap every `<option>` in a custom dropdown row
2. Build a custom dropdown with an absolute-positioned list
3. Tooltip is shown when hovering on a row

Also moving RecentCarts into separate folder.
`RecentCartsDropdown.jsx`
```jsx
export function RecentCartsDropdown({recent, onSelect}) {}

function RecentCartList({recent, onSelect, setOpen}) {}
```
`RecentCartRow.jsx`
```jsx
export function RecentCartRow({ index, cart, onSelect }) {}

function CartTooltip({ cart }) {}
```
Replacing `<select>` with custom component in `<RecentCartsDropdown recent={recent} onSelect={setCart} />`

---

### Refactoring
- Minor code styling fixes
- Extraction into helper-methods when appropriate
- Separated Trace action buttons into separate component
   `AdminApp.jsx`
   ```jsx
   <ButtonPanel cart={cart} ruleSet={ruleSet} getTrace={getTrace} setTrace={setTrace} />
   ```
- Created function for per-SKU cart display part
   `CartEditor.jsx`
   ```jsx
   {Object.entries(cart).map(([sku, qty]) => (
       <SkuRow sku={sku} qty={qty} updateSku={updateSku} />
   ))}
   ```
#### Rule Debugger
- Separated Chain Overview content into nested components
  1. Chain Overview
  2. ChainStep
  3. ChainContent
  4. ChainPrice
  
   `ChainOverview.jsx`
   ```jsx
   <ChainStep step={s} index={i} selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
   ```
   `ChainStep.jsx`
   ```jsx
   <ChainContent step={step}/>
   ```
   `ChainContent.jsx`
   ```jsx
   <ChainPrice step={step}/>
   ```
- Separated DP Graph into separate components
  1. DPGraph `<DPGraph dp={trace.dp} />`
  2. DPNode `<DPNodes nodes={nodes}></DPNodes>`
  3. DPDetails `<DPDetails node={dp[selectedStep]} index={selectedStep} />`   
  subcomponents: 
  `<DPDetail label={"LABEL"} value={NODE.VALUE} />`  
  `<DPOptions node={node} />`


- Separated Rule Timeline into separate components
  1. RuleTimeline `<RuleTimeline rules={trace.rules} />`
  2. RuleItem `<RuleItem key={i} rule={r} />`
  3. RuleEntry `<RuleEntry rule={rule} onClick={selectOnClick} open={open} />`
  4. RuleBody `<RuleBody rule={rule} />`


- Separated Price Evolution Chart into separate components
  1. PriceEvolutionChart `<PriceEvolutionChart prices={trace.priceEvolution} />`
  2. PriceGraph `<PriceGraph prices={prices} path={path} points={points} />`  
  subcomponents:  
  `<DrawGraph path={path}/>`  
  `<DrawPoint i={i} p={p} hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} />`
  3. PriceTooltip `<PriceTooltip prices={prices} hoverIndex={hoverIndex}/>`

#### Rule Inspector
- Embedding `Section` in subcomponents
- Separated Rule TimeLine into separate components
  1. RuleTimeLine `<RuleTimeline events={trace.events} />`  
  subcomponents: `<RuleEvent key={i} event={e} index={i} />`
  2. EventHeader `<EventHeader event={event} index={index} onClick={openAndSelect} />`
  3. EventBody `<EventBody event={event}/>`


- Separated Sku Breakdown into separate components
  1. SkuBreakdown `<SkuBreakdown skuTraces={trace.skuTraces} />`  
  subcomponents: `<SkuItem key={i} sku={s} />`
  2. SkuHeader `<SkuHeader sku={sku} onClick={() => setOpen(!open)}/>`
  3. SkuBody `<SkuBody sku={sku} />`


- Separated DP Section into separate components
  1. DPSection `<DPSection dpTraces={trace.dpTraces} />`  
  subcomponents: `<DPTraceView key={i} dp={dp} />`
  2. DPHeader `<DPHeader dp={dp} onClick={() => setOpen(!open)} />`
  3. DPBody `<DPBody dp={dp} />`
  4. DPNode `<DPNode node={node} />`  
  subcomponents: `<DPResult dp={dp} />`
---

### UI data and layout fixes
#### Button panel layout
Changing styling to avoid buttons flexing along with Rule- and Cart-editor.  
Changes in: `ButtonPanel.jsx`
#### Normalize discount values in RuleTimeLine (Rule Inspector)
Changes in server code.
#### Including SKU-rules in the debugger timeline
Changes to `RuleTimeline.jsx`
- Cross-SKU rules and SKU discounts are displayed at the top as before
- SKU-rules displayed per SKU in separate subcomponent `<SkuRules rules={rules} />`
#### Add more data for rules in the debugger timeline
Adding fields:
- before
- after
#### Mark rules as applied or not in the debugger timeline
- Adding mark as in inspector
- Fixing graphical alignment
---
### UI improvements
#### Adding smooth expand/collapse animation
Using framer-motion lib.  
Creating reusable component `<AnimatedBody open={open} />` using children as body.
- Debugger
  - Rule timeline
- Inspector
  - Rule timeline
  - SKU breakdown
  - DP section
#### Disabled state for the button panel
Making buttons disabled when the cart is empty.
#### Adding light and dark theme with a toggle button
- Theme provider
- Toggle button
- Applied to parts:
  - AdminApp
  - ButtonPanel
  - RulesetSelector
  - RuleInspector shell
  - RuleDebugger shell
  - CartEditor
---
### New feature: Ruleset Editor
Shall have the following functions:
- display complete rulesets
- create and add rules
- edit rules
- save and load rulesets (moved to RulesetHandler)
- preview effects of changes (TODO)
#### Components
1. RulesetEditor  
   Main part holding subcomponents and controls.
   ```jsx
   <RulesetEditor ruleset={ruleset} onChange={setRuleset} />
   ```
2. RuleList  
   List of rules in active ruleset.
   ```jsx
   <RuleList rules={draft.rules} selectedRule={safeIndex} onSelect={setSelectedRule}
                      onAdd={addRule} onDelete={deleteRule}/>
   ```
   subcomponents:
   - RuleItem, a selectable element for each rule.
     ```jsx
     <RuleItem i={i} rule={rule} isSelected={selectedRule} onSelect={onSelect} />
     ```
   - ButtonPanel, controls for adding and deleting rules.
     ```jsx
     <ButtonPanel onAdd={onAdd} onDelete={() => onDelete(selectedRule)} />
     ```
3. RuleForm  
   Interface to add a new rule or edit a currently selected one.
   ```jsx
   <RuleForm rule={rule} onChange={(r) => updateRule(safeIndex, r)}/>
   ```
   subcomponents:
   - RuleTypeSelector, a dropdown for selecting the type of rule.
     ```jsx
     <RuleTypeSelector value={rule.type} onChange={(newType) => update("type", newType)} />
     ```
   - A form for the currently selected rule type. These are created using the following:  
     ```jsx
     <SpecialPriceForm rule={rule} onChange={onChange} />
     <BuyXGetYFreeForm rule={rule} onChange={onChange} />
     <BuyXGetYDiscountForm rule={rule} onChange={onChange} />
     <SkuDiscountForm rule={rule} onChange={onChange} />
     <CrossSkuBuyXGetYFreeForm rule={rule} onChange={onChange} />
     <CrossSkuBuyXGetYDiscountForm rule={rule} onChange={onChange} />
     ```
     Using the following template components:
     - ```jsx
       <FormTemplate title="RULE TYPE">
       {children}
       </FormTemplate>
       ```
     - ```jsx
       <TextInput label="LABEL" field="FIELD" value={rule.FIELD} update={update} />
       <NumberInput label="LABEL" field="FIELD" value={rule.FIELD} update={update} />
       <StackableField rule={rule} update={update} />
       ```
4. RulePreview  
   TODO

### Ruleset handler
Building upon the RulesetSelector to include persistence for rulesets.  
Enabling:
- Create new rulesets
- Save changes to rulesets to backend
- Load rulesets from the backend
#### Component setup
1. RulesetHandler is added as a main component to the AdminApp to operate on the rulesets.
   ```jsx
   <RulesetHandler onRulesetChange={setRuleset} />
   ```
2. RulesetSelector to display and switch between rulesets.
   ```jsx
   <RulesetSelector value={selected} onChange={(v) => {
                setMode("existing");
                setSelected(v);
            }} names={rulesetNames} />
   ```
3. RuleEditor to display and edit rules.
   ```jsx
   <RulesetEditor ruleset={ruleset} onChange={setRuleset} />
   ```

### API calls
API calls to backend are contained in a separate js-file `rulesets.js`.
Sample ruleset json-files are used as a fallback, mainly for testing.
```js
export async function getRulesetList() {}

export async function getRulesetWithFallback(name) {}

export async function getRuleset(name) {}

export async function saveRuleset(name, ruleset) {}
```
---
### Price list handler
Following the same structure and functionality as the Ruleset handler.
#### Component setup
1. PriceListHandler is added as a main component to the AdminApp to operate on the price lists.
   ```jsx
   <PriceListHandler onPriceListChange={setPriceList} />
   ```
2. PriceListSelector to display and switch between price lists.
   ```jsx
   <PriceListSelector value={selected} onChange={(v) => {
                setMode("existing");
                setSelected(v);
            }} names={priceListNames}/>
   ```
3. PriceListEditor to display and edit price lists.
   ```jsx
   <PriceListEditor priceList={priceList} onChange={setPriceList} />
   ```

### API calls
API calls to backend are contained in a separate js-file `prices.js`.
Sample price list json-files are used as a fallback, mainly for testing.
```js
export async function getPriceListNames() {}

export async function getPriceListWithFallback(name) {}

export async function getPriceList(name) {}

export async function savePriceList(name, priceList) {}
```
---

### Refactoring and improvements
- Refactoring RulesetHandler using similar pattern as price lists
- Make RulesetHandler more compact
- Make PriceListHandler more compact
- Add scrollbars
  - Rules in RulesetEditor
  - Prices in PriceListEditor
  - Cart(SKU and quantity) in CartEditor
  - Better dark theme scrollbar look
- Adding confirmation prompt when saving changes to database
  - Rulesets
  - Price lists
- Improved contrast for buttons in light mode
- Adjust to merged pricing endpoints
- Using PricingRequest with metadata

#### Adding delete button
- RulesetHandler
- PriceListHandler
- Adding delete protection for defaults

#### Major refactoring and code styling
Going through the code and fixing minor bugs, refactoring and keeping code clean.
- API
- CartEditor
- Prices (PriceListHandler etc.)
- Rulesets (RulesetHandler etc.)
- RuleDebugger
- RuleInspector

#### Applying dark/light theme to rest of application
- RuleDebugger
  - ChainOverview
  - DPGraph
  - PriceEvolutionChart
  - RuleTimeline
- RuleInspector
  - RuleTimeLine
  - SkuBreakdown
  - DPSection
---

### Customer panel
Being able to view and edit customer data included in pricing evaluation requests.
#### Components
Two versions created as prototypes:
```jsx
<CustomerPanel customer={customer} />
<CustomerPanelV2 customer={customer} setCustomer={setCustomer} originalCustomer={originalCustomer} />
```
1. Minimalistic, collapsible design(similar to Rule inspector) with JSON fields.
2. Design like Cart editor with a combination of input fields and collapsible JSON fields.

### Current structure
```

```