import './App.css';
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
