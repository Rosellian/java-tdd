import {useTheme} from "../theme/ThemeProvider";

export function Layout({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="layout">
            <button onClick={toggleTheme}>
                {theme === "light" ? "Dark mode" : "Light mode"}
            </button>

            {children}
        </div>
    )
}