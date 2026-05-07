import './App.css';
import AdminApp from "./pages/AdminApp";
import {ThemeProvider} from "./ui/ThemeProvider";

function App() {
  return <ThemeProvider>
    <AdminApp />
  </ThemeProvider>;
}

export default App;
