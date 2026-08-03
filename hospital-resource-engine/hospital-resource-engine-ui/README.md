# Hospital resource allocation engine UI
User interface application for this project.
Shall include ability to:
- Display and manage patient database
  - Access patient random generator on backend.
- Display and manage resource database
- Run Triage and resource allocation engine on server backend.
- Inspect results and traces for different scenarios

## Architecture
### Components
Subcomponents tend to be designed for reuse when same functionality and / or layout is needed.
Some are reused in different places in the project.
#### General components
These components are generically designed so they can be reused by other components 
when the same functionality is needed. This also helps to maintain a central look and styling.
##### Dataset list
For access to and management of a group of data with backend database.

###### TODO ListPanel

ListSelector - dropdown for available lists
```jsx
export function ListSelector({ lists, selected, onChange }) {}
```
Inputs - editable input fields for list values.
Values:
- Name
- Version
```jsx
export function Inputs({ selected, onUpdate }) {}
```
Controls - buttons for operations on a list.
Operations:
- Load
- Save
- Create
- Delete
```jsx
export function Controls({ selected, load, save, onCreate, onDelete }) {}
```
Subcomponents:  
`ConfirmModal`
---

##### Forms
Reusable components for input forms and value display.

Field - input field adapted for numerical values
```jsx
export function Field({ label, name, value, step = "1", className = "", onUpdate }) {}
```
TextField - input field adapted for text
```jsx
export function TextField({ label, name, value, className = "", readOnly = false, onUpdate }) {}
```
---

##### ConfirmModal
Can be used as a general prompt to require confirmation before an action.
```jsx
export function ConfirmModal({ message, onConfirm, onCancel }) {}
```

#### Patients
##### PatientPanel
Main component for displaying and managing patient lists and patients.
```jsx
<PatientPanel patients={patients} selected={selectedPatient} setPatients={setPatients}
              onSelect={setSelectedPatient} onUpdate={updatePatient} />
```
Subcomponents:  
`ListSelector`, `Inputs`, `Controls`, `PatientList`, `PatientEditor`

##### AllPatientsPanel
For displaying all patients regardless of list belonging.
```jsx
<AllPatientsPanel selected={selectedPatient} onSelect={setSelectedPatient} />
```
Subcomponents:  
`PatientList`

##### IncomingPanel
For creating new patients using random backend service.
```jsx
<IncomingPanel />
```
Subcomponents:  
`PatientList` `PatientForm`
---

##### Subcomponents
###### PatientList
Displays patients in a list of selectable items. 
Also supports drag and drop of patient data between lists.
```jsx
export function PatientList({ patients, selected, onSelect, onDrop }) {}
```
```jsx
<Patient patient={patient} onSelect={onSelect} />
```
---

###### PatientEditor
Displays and allows editing of a selected patient's data.
```jsx
export function PatientEditor({ patient, defaultOpen = false, onChange, onCreate }) {}
```
PatientForm - input form part of editor, which can be reused on its own.
```jsx
export function PatientForm({ patient, onChange }) {}
```
```jsx
<PatientFields draft={draft} updateField={updateField} />
<VitalsForm vitals={draft.vitals} onUpdate={updateVitals} />
<SymptomsForm draft={draft} updateField={updateField}/>
```
---

###### PatientInfo
For displaying a compact entry with patient information and status.
```jsx
export function PatientInfo({ patient }) {}
```
Subcomponents:  
`TriageBadge`
---

#### Triage
##### TriagePanel
For running triage engine on patients and displaying results.
```jsx
<TriagePanel patient={selectedPatient} onUpdate={updatePatient} />
```
Subcomponents:  
`PatientInfo`, `TraceTimeline`

##### Subcomponents
###### TraceTimeline
For displaying a trace (of a triage or allocation run) as a list of steps.
```jsx
export function TraceTimeline({ steps }) {}
```

###### TriageBadge
Displaying a compact badge indicating triage level.
```jsx
export function TriageBadge({ level }) {}
```

#### Triage rules
##### TriageRulePanel
Main component for displaying and managing triage rule lists and rules.
```jsx
<TriageRulePanel rules={triageRules} selected={selectedTriageRule} setRules={setTriageRules}
                 onSelect={setSelectedTriageRule} onUpdate={updateTriageRule} />
```
Subcomponents:  
`ListSelector`, `Inputs`, `Controls`, `RuleList`, `RuleEditor`

##### Subcomponents
###### RuleList
Displays triage rules in a list of selectable items.
```jsx
export function RuleList({ rules, selected, onSelect }) {}
```
```jsx
<Rule rule={rule} onSelect={onSelect} />
```
---

###### RuleEditor
Displays and allows editing of a selected triage rule's data.
```jsx
export function RuleEditor({ rule, onChange, onCreate }) {}
```
RuleForm - input form part of editor, which can be reused on its own.
```jsx
export function RuleForm({ rule, onChange }) {}
```
```jsx
<ConditionForm condition={draft.condition} onChange={updateField} />
<LevelSelector selected={rule} onSelect={value => updateField("result", value)} />
```
---

###### ConditionForm
For displaying and editing the condition matching patients to a rule.
```jsx
export function ConditionForm({ condition, onChange }) {}
```
```jsx
<FieldSelector selected={condition.field} onSelect={value => updateField("field", value)} />
<OperatorSelector selected={condition.operator} locked={symptomsSelected}
                  onSelect={value => updateField("operator", value)} />
```
---

#### Resources
##### ResourcePanel
Main component for displaying and managing resource lists and resources.
```jsx
<ResourcePanel resources={resources} selected={selectedResource} setResources={setResources}
               onSelect={setSelectedResource} onUpdate={updateResource} />
```
Subcomponents:  
`ListSelector`, `Inputs`, `Controls`, `ResourceList`, `ResourceEditor`

##### Subcomponents
###### ResourceList
Displays resources in a list of selectable items.
```jsx
export function ResourceList({ resources, selected, onSelect }) {}
```
```jsx
<Resource resource={resource} onSelect={onSelect} />
```
---

###### ResourceEditor
Displays and allows editing of a selected resource's data.
```jsx
export function ResourceEditor({ resource, onChange, onCreate }) {}
```
ResourceForm - input form part of editor, which can be reused on its own.
```jsx
export function ResourceForm({ resource, onChange }) {}
```
```jsx
<TypeSelector selected={resource} onSelect={(value) => updateField("type", value)} />
```
---

#### Resource allocation
##### TriagePanel
For running resource allocation engine on patients and displaying results.
```jsx
<AllocationPanel patient={selectedPatient} resources={resources} onUpdate={updatePatient} />
```
Subcomponents:  
`PatientInfo`, `AllocationDecision`

##### Subcomponents
###### AllocationDecision
Displays result and trace from resource allocation for selected patient.
```jsx
export function AllocationDecision({ decision, patient, resources }) {}
```
```jsx
<PatientRow patient={patient} decision={decision}/>
<ResourceRow resourceId={resourceId} resources={resources}/>
<TraceRow trace={decision.trace} />
```
---

#### Tracing
##### PatientHistory
For displaying trace history of triage and resource allocations for a selected patient.
```jsx
<PatientHistory patient={selectedPatient} />
```
Subcomponents:  
`HistoryEntry`

##### Subcomponents
###### HistoryEntry
For displaying a trace history entry, supporting both triage and allocation trace data.
```jsx
export function HistoryEntry({ entry }) {}
```
Subcomponents:  
`TriageBadge`, `TraceTimeline`
---

#### UI components
These components are used for purely layout-based functions.

Collapsible - enabling collapse/expand of content
```jsx
export function Collapsible({ title, children, defaultOpen = false, closedClass = {class: "", add: false} }) {}
```
Tooltip - for displaying a tooltip on hover
```jsx
export function Tooltip({ text, children }) {}
```

### Project structure

## Layout and styling
A centralized color theme with dark and light mode is used and controlled via:
```js
<ThemeProvider>
  <Main />
</ThemeProvider>
```
Where `Main` is the main application page. General color and styling is defined in css-files within `ui/theme/`
and `ui/layout/`. Specific styling for components are defined in separate css-files.

Main wraps its content in a Layout component which includes a button to switch between dark and light theme.
```jsx
<Layout>{children}<Layout/>
```