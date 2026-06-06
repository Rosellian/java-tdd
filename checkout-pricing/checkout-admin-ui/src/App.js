import './App.css';
import AdminApp from "./pages/AdminApp";
import {ThemeProvider} from "./ui/ThemeProvider";
import "./ui/scrollbar.css";

function App() {
  return <ThemeProvider>
    <AdminApp />
  </ThemeProvider>;
}

export default App;
