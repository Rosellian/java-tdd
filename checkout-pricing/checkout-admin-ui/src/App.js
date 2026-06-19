import './App.css';
import AdminApp from "./pages/AdminApp";
import {ThemeProvider} from "./ui/theme/ThemeProvider";
import "./ui/theme/scrollbar.css";
import "./ui/json/highlighting/json.css";
import "./components/ruleinspector/dpsection/highlighting/explanation.css";

function App() {
  return <ThemeProvider>
    <AdminApp />
  </ThemeProvider>;
}

export default App;
