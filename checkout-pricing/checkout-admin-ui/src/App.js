import './App.css';
import AdminApp from "./pages/AdminApp";
import {ThemeProvider} from "./ui/theme/ThemeProvider";
import "./ui/theme/scrollbar.css";
import "./ui/json/highlighting/json.css";
import "./functions/dp/highlighting/explanation.css";
import "./components/ruleinspector/skubreakdown/badge.css";
import "./components/rulesets/ruleseteditor/ruleHighlight.css";

function App() {
  return <ThemeProvider>
    <AdminApp />
  </ThemeProvider>;
}

export default App;
