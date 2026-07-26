import './App.css';
import "./ui/theme/theme.css";
import "./ui/layout/main/layout.css";
import "./ui/layout/main/main.css";
import "./ui/layout/panel.css";
import "./ui/layout/form.css";
import "./ui/layout/controls.css";
import "./ui/layout/list.css";
import "./ui/collapsible/collapsible.css";
import "./ui/layout/patients/form.css";
import "./ui/layout/patients/patient.css";
import "./ui/layout/triage/triage.css";
import "./ui/layout/triage/rules.css"
import "./ui/layout/triage/trace.css";
import "./ui/layout/resources/resources.css";
import {Main} from "./pages/Main";
import {ThemeProvider} from "./ui/theme/ThemeProvider";

function App() {
  return (
      <ThemeProvider>
        <Main />
      </ThemeProvider>
  )
}

export default App;
