import {useTraceSync} from "../TraceSyncProvider";
import {DPDetails} from "./dpgraph/DPDetails";
import {DPNodes} from "./dpgraph/DPNodes";
import {useTheme} from "../../ui/ThemeProvider";

export function DPGraph({ dp }) {
    const { theme } = useTheme();
    const { selectedStep } = useTraceSync();

    if (!dp) {
        return (
            <div style={{
                ...styles.dpEmpty,
                ...(theme === "dark" ? styles.emptyDark : styles.emptyLight)
            }}>
                No dynamic programming steps recorded.
            </div>
        );
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

            {Object.entries(grouped).map(([sku, nodes]) => (
                <div key={sku} style={{
                    ...styles.skuBlock,
                    ...(theme === "dark" ? styles.skuDark : styles.skuLight)
                }}>
                    <h3 style={{
                        ...styles.skuHeader,
                        ...(theme === "dark" ? styles.skuHeaderDark : styles.skuHeaderLight)
                    }}>{sku}</h3>
                    <DPNodes nodes={nodes} />
                </div>
            ))}

            {selectedStep !== null && (
                <DPDetails node={dp[selectedStep]} index={selectedStep} />
            )}
        </div>
    );
}

function addGlobalIndex(dp) {
    return dp.map((node, idx) => ({
        ...node,
        globalIndex: idx
    }));
}

function groupBySku(indexedDP) {
    return indexedDP.reduce((acc, node) => {
        if (!acc[node.sku]) acc[node.sku] = [];
        acc[node.sku].push(node);
        return acc;
    }, {});
}

const styles = {
    dpWrapper: {
        padding: 16,
        borderRadius: 8,
        transition: "background 0.25s ease, color 0.25s ease",
    },
    wrapperLight: {
        background: "#f5f5f5",
        color: "#000",
    },
    dpHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    headerDark: {
        color: "#fff",
    },
    headerLight: {
        color: "#3A1F6B",
    },
    skuBlock: {
        marginBottom: 24,
        padding: 12,
        borderRadius: 8,
        transition: "background 0.25s ease, color 0.25s ease",
    },
    skuDark: {
        background: "#222",
    },
    skuLight: {
        background: "#fff",
        border: "1px solid #ddd",
    },
    skuHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    skuHeaderDark: {
        color: "#BB86FC",
    },
    skuHeaderLight: {
        color: "#5A2DA8",
    },
    dpEmpty: {
        padding: 16,
        borderRadius: 8,
        fontStyle: "italic",
        transition: "background 0.25s ease, color 0.25s ease",
    },
    emptyDark: {
        background: "#1a1a1a",
        color: "#777",
    },
    emptyLight: {
        background: "#fafafa",
        color: "#666",
    }
}