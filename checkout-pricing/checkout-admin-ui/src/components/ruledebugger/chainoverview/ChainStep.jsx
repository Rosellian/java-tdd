import {ChainContent} from "./ChainContent";
import {useTheme} from "../../../ui/ThemeProvider";

export function ChainStep({ step, index, selectedStep, setSelectedStep }) {
    const { theme } = useTheme();

    const isActive = selectedStep === index;

    return (
        <li key={index} onClick={() => setSelectedStep(index)} style={{
            ...styles.chainItem,
            ...(theme === "dark" ? styles.dark : styles.light),
            ...(isActive ?
                theme === "dark" ? styles.activeDark : styles.activeLight
                : {})
        }}>
            <div style={{
                ...styles.chainIndex,
                ...(theme === "dark" ? styles.indexDark : styles.indexLight),
                ...(isActive ?
                    theme === "dark" ? styles.indexActiveDark : styles.indexActiveLight
                    : {})
            }}>{index + 1}</div>

            <ChainContent step={step}/>
        </li>
    );
}

const styles = {
    chainItem: {
        display: "flex",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid",
        cursor: "pointer",
        transition: "background 0.25s ease, border-left 0.25s ease",
    },
    dark: {
        borderColor: "#333",
        background: "#1a1a1a",
        color: "#eee",
    },
    light: {
        borderColor: "#ddd",
        background: "#fafafa",
        color: "#000",
    },
    activeDark: {
        background: "#222",
        borderLeft: "3px solid #4caf50",
    },
    activeLight: {
        background: "#e8f5e9",
        borderLeft: "3px solid #2e7d32",
    },
    chainIndex: {
        width: 28,
        height: 28,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    indexDark: {
        background: "#333",
        color: "#aaa",
    },
    indexLight: {
        background: "#ddd",
        color: "#555",
    },
    indexActiveDark: {
        background: "#4caf50",
        color: "#fff",
    },
    indexActiveLight: {
        background: "#2e7d32",
        color: "#fff",
    },
}