import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext(null);

const themes = ["dark", "light", "colorful"];

export function nextTheme(t) {
    let nextThemeIndex = (themes.indexOf(t) + 1) % themes.length;

    return themes[nextThemeIndex];
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(t => nextTheme(t));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}