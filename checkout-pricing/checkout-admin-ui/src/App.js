import './App.css';
import AdminApp from "./pages/AdminApp";
import {ThemeProvider} from "./ui/theme/ThemeProvider";
import "./ui/theme/scrollbar.css";
import "./ui/json/highlighting/json.css";

function App() {
  return <ThemeProvider>
    <AdminApp />
  </ThemeProvider>;
}

export default App;
