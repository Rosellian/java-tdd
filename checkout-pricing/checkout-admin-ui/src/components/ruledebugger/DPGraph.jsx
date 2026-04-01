import {useTraceSync} from "../TraceSyncProvider";
import {DPDetails} from "./dpgraph/DPDetails";
import {DPNodes} from "./dpgraph/DPNodes";

export function DPGraph({ dp }) {
    const { selectedStep, setSelectedStep } = useTraceSync();

    if (!dp) {
        return (
            <div style={styles.dpEmpty}>
                No dynamic programming steps recorded.
            </div>
        );
    }

    const indexedDP = addGlobalIndex(dp);
    const grouped = groupBySku(indexedDP);

    return (
        <div style={styles.dpWrapper}>
            <h3 style={styles.dpHeader}>DP Graph</h3>

            {Object.entries(grouped).map(([sku, nodes]) => (
                <div key={sku} style={styles.skuBlock}>
                    <h3 style={styles.skuHeader}>{sku}</h3>
                    <DPNodes nodes={nodes}></DPNodes>
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
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#eee",
    },
    dpHeader: {
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#fff",
    },
    skuBlock: {
        marginBottom: 24,
        padding: 12,
        background: "#1a1a1a",
        borderRadius: 8,
    },
    skuHeader: {
        color: "#BB86FC",
        marginBottom: 12,
        fontSize: "1.1rem",
        fontWeight: 600,
    },
    dpEmpty: {
        background: "#1a1a1a",
        padding: 16,
        borderRadius: 8,
        color: "#777",
        fontStyle: "italic",
    }
}