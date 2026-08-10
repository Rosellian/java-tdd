import {nextTheme, useTheme} from "../../theme/ThemeProvider";

export function Layout({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="layout">
            <button onClick={toggleTheme}>
                {toggleButtonText(theme)}
            </button>

            {children}
        </div>
    )
}

function toggleButtonText(theme) {
    let capitalizedTheme = capitalize(theme);
    let next = capitalize(nextTheme(theme));

    return `${capitalizedTheme} Mode (next = ${next})`
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}