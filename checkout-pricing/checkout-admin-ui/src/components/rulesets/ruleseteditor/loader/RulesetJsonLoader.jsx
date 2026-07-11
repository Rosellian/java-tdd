import { useState } from "react";
import {useTheme} from "../../../../ui/theme/ThemeProvider";
import {exportRuleset, importRuleset} from "./ops";

export function RulesetJsonLoader({ ruleset, onImport }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [hover, setHover] = useState(null);

    const themeStyle = isDark ? styles.dark : styles.light;
    const hoverStyle = isDark ? styles.hoverDark : styles.hoverLight;

    return (
        <div style={styles.container}>
            <div style={{
                ...styles.base,
                ...themeStyle,
                ...(hover === "export" ? hoverStyle : {})
            }}
                 onMouseEnter={() => setHover("export")}
                 onMouseLeave={() => setHover(null)}
                 onClick={() => exportRuleset(ruleset)}
            >
                Export JSON
            </div>

            <div style={{
                ...styles.base,
                ...themeStyle,
                ...(hover === "import" ? hoverStyle : {})
            }}
                 onMouseEnter={() => setHover("import")}
                 onMouseLeave={() => setHover(null)}
                 onClick={() => importRuleset(onImport)}
            >
                Import JSON
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        gap: 8
    },
    base: {
        padding: "4px 8px",
        borderRadius: 4,
        fontSize: "0.8rem",
        cursor: "pointer",
        borderTop: "1px solid",
        borderRight: "1px solid",
        borderBottom: "1px solid",
        borderLeft: "1px solid",
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease"
    },
    dark: {
        background: "#1A1A1A",
        color: "#eee",
        borderColor: "#444"
    },
    light: {
        background: "#fff",
        color: "#222",
        borderColor: "#ccc"
    },
    hoverDark: {
        background: "#2A2A2A"
    },
    hoverLight: {
        background: "#f0f0f0"
    }
}