import {ChainPrice} from "./ChainPrice";
import {useTheme} from "../../../ui/ThemeProvider";

export function ChainContent({ step }) {
    const { theme } = useTheme();

    return (
        <div style={styles.chainContent}>
            <div style={{
                ...styles.chainStep,
                ...(theme === "dark" ? styles.stepDark : styles.stepLight)
            }}>{step.step}</div>

            <div style={{
                ...styles.chainDesc,
                ...(theme === "dark" ? styles.descDark : styles.descLight)
            }}>{step.description}</div>

            <ChainPrice step={step}/>
        </div>
    );
}

const styles = {
    chainContent: {
        flex: 1,
    },
    chainStep: {
        fontSize: "1rem",
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    chainDesc: {
        fontSize: "0.85rem",
        transition: "color 0.25s ease",
        marginTop: 2,
    },
    stepDark: {
        color: "#fff",
    },
    stepLight: {
        color: "#222",
    },
    descDark: {
        color: "#bbb",
    },
    descLight: {
        color: "#555",
    }
}