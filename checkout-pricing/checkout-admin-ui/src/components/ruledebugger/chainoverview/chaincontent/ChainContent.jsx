import {ChainPrice} from "./ChainPrice";
import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function ChainContent({ step }) {
    const { theme } = useTheme();

    let isDark = theme === "dark";
    return (
        <div style={styles.chainContent}>
            <div style={{
                ...styles.chainStep,
                ...(isDark ? styles.stepDark : styles.stepLight)
            }}>
                {step.step}
            </div>

            <div style={{
                ...styles.chainDesc,
                ...(isDark ? styles.descDark : styles.descLight)
            }}>
                {step.description}
            </div>

            <ChainPrice step={step}/>
        </div>
    );
}

const styles = {
    chainContent: {
        flex: 1,
        minWidth: 220
    },
    chainStep: {
        fontSize: "1rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        transition: "color 0.25s ease"
    },
    chainDesc: {
        fontSize: "0.85rem",
        transition: "color 0.25s ease",
        marginTop: 2,
        whiteSpace: "normal",
        wordBreak: "break-word"
    },
    stepDark: {
        color: "#fff"
    },
    stepLight: {
        color: "#222"
    },
    descDark: {
        color: "#bbb"
    },
    descLight: {
        color: "#555"
    }
}