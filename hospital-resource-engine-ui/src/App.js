import './App.css';
import "./ui/theme/theme.css";
import "./ui/layout/layout.css";
import "./ui/layout/panel.css";
import "./ui/layout/form.css";
import "./ui/layout/controls.css";
import "./ui/layout/list.css";
import "./ui/layout/triage.css";
import "./ui/layout/trace.css";
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
