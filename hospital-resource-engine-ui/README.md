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
#### Patients
For displaying and managing patient lists and patients.
```jsx
<PatientPanel patients={patients} selected={selectedPatient} setPatients={setPatients}
              onSelect={setSelectedPatient} onUpdate={updatePatient} />
```
Subcomponents:
##### TODO "ListPanel"
```jsx

```
PatientListSelector
```jsx
<PatientListSelector lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />
```
Inputs
```jsx
<Inputs selected={selectedList} onUpdate={updateListField} />
```
Controls
```jsx
<Controls load={handleLoad} save={handleSave} onCreate={onCreate} />
```
---
##### PatientList
```jsx
<PatientList patients={patients} selected={selected} onSelect={onSelect} />
```
---
##### PatientEditor
```jsx
<PatientEditor patient={selected} onChange={onUpdate} onCreate={onCreatePatient} />
```
PatientForm
```jsx
<PatientForm patient={patient} onChange={onChange} />
 ```
```jsx
<VitalsForm vitals={draft.vitals} onUpdate={updateVitals} />
```
---

#### Triage
For running triage engine on patients and displaying results.
```jsx
<TriagePanel patient={selected} />
```
Subcomponents:
```jsx
<TraceTimeline steps={result.trace} />
```
---

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