import {ChainContent} from "./chaincontent/ChainContent";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {ChainIndex} from "./chaincontent/ChainIndex";

export function ChainStep({ step, index, selectedStep, setSelectedStep }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let isActive = selectedStep === index;

    return (
        <li key={index} onClick={() => setSelectedStep(index)} style={{
            ...styles.chainItem,
            ...(isDark ? styles.dark : styles.light),
            ...getActiveStyle(isActive, isDark)
        }}>
            <ChainIndex index={index} isActive={isActive} isDark={isDark} />

            <ChainContent step={step}/>
        </li>
    )
}

function getActiveStyle(isActive, isDark) {
    return isActive ?
        isDark ? styles.activeDark : styles.activeLight
        : {};
}

const baseBorderDark = "1px solid #333";
const baseBorderLight = "1px solid #ddd";
const styles = {
    chainItem: {
        display: "flex",
        gap: 12,
        padding: "10px 10px",
        cursor: "pointer",
        transition: "background 0.25s ease, border-left 0.25s ease"
    },
    dark: {
        borderTop: baseBorderDark,
        borderRight: baseBorderDark,
        borderBottom: baseBorderDark,
        borderLeft: baseBorderDark,
        background: "#1a1a1a",
        color: "#eee"
    },
    light: {
        borderTop: baseBorderLight,
        borderRight: baseBorderLight,
        borderBottom: baseBorderLight,
        borderLeft: baseBorderLight,
        background: "#fafafa",
        color: "#000"
    },
    activeDark: {
        background: "#222",
        borderLeft: "3px solid #4caf50"
    },
    activeLight: {
        background: "#e8f5e9",
        borderLeft: "3px solid #2e7d32"
    }
}