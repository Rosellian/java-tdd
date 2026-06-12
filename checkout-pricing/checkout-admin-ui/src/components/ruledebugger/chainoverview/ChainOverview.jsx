import {useTraceSync} from "../../TraceSyncProvider";
import {ChainStep} from "./ChainStep";
import {useTheme} from "../../../ui/ThemeProvider";

export function ChainOverview({ steps }) {
    const { theme } = useTheme();
    const { selectedStep, setSelectedStep } = useTraceSync();

    if (!steps) return null;

    return (
        <section style={{
            ...styles.chainOverview,
            ...(theme === "dark" ? styles.dark : styles.light)
        }}>
            <h3 style={{
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}>Pricing Chain</h3>

            <ul style={styles.chainList}>
                {steps.map((s, i) => (
                    <ChainStep key={i} step={s} index={i}
                               selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
                ))}
            </ul>
        </section>
    );
}

const styles = {
    chainOverview: {
        padding: 16,
        borderRadius: 8,
        transition: "background 0.3s ease, color 0.3s ease",
    },
    dark: {
        background: "#1a1a1a",
        color: "#eee",
    },
    light: {
        background: "#f5f5f5",
        color: "#000",
    },
    headerDark: {
        color: "#BB86FC",
        marginBottom: 12,
    },
    headerLight: {
        color: "#5A2DA8",
        marginBottom: 12,
    },
    chainList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    }
}