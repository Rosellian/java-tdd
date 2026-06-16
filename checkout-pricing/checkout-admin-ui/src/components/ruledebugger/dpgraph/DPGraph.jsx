import {useTraceSync} from "../../TraceSyncProvider";
import {DPDetails} from "./dpdetails/DPDetails";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {addGlobalIndex, groupBySku} from "./dpFuncs";
import {SkuNodes} from "./SkuNodes";

export function DPGraph({ dp }) {
    const { theme } = useTheme();
    const { selectedStep } = useTraceSync();

    if (!dp) {
        return (
            <div style={{
                ...styles.dpEmpty,
                ...(theme === "dark" ? styles.emptyDark : styles.emptyLight)
            }}>No dynamic programming steps recorded.</div>
        )
    }

    const indexedDP = addGlobalIndex(dp);
    const grouped = groupBySku(indexedDP);

    return (
        <div style={{
            ...styles.dpWrapper,
            ...(theme === "dark" ? styles.wrapperDark : styles.wrapperLight)
        }}>
            <h3 style={{
                ...styles.dpHeader,
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}>DP Graph</h3>

            <div style={styles.scrollSection}>
                {Object.entries(grouped).map(([sku, nodes]) =>
                    <SkuNodes key={sku} sku={sku} nodes={nodes} />
                )}
            </div>

            {selectedStep !== null && (
                <DPDetails node={dp[selectedStep]} index={selectedStep} />
            )}
        </div>
    )
}

const styles = {
    dpWrapper: {
        padding: 16,
        borderRadius: 8,
        transition: "background 0.25s ease, color 0.25s ease"
    },
    wrapperLight: {
        background: "#f5f5f5",
        color: "#000"
    },
    dpHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    headerDark: {
        color: "#fff"
    },
    headerLight: {
        color: "#3A1F6B"
    },
    scrollSection: {
        maxHeight: 300,
        overflowY: "auto",
        paddingRight: 6,
        marginBottom: 15
    },
    dpEmpty: {
        padding: 16,
        borderRadius: 8,
        fontStyle: "italic",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    emptyDark: {
        background: "#1a1a1a",
        color: "#777"
    },
    emptyLight: {
        background: "#fafafa",
        color: "#666"
    }
}