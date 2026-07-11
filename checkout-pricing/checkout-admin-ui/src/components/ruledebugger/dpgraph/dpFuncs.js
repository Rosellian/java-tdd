export function addGlobalIndex(dp) {
    return dp.map((node, idx) => ({
        ...node,
        globalIndex: idx
    }));
}

export function groupBySku(indexedDP) {
    return indexedDP.reduce((acc, node) => {
        if (!acc[node.sku]) acc[node.sku] = [];
        acc[node.sku].push(node);
        return acc;
    }, {});
}

export function renderEmptyState(isDark) {
    return (
        <div style={{
            ...styles.dpEmpty,
            ...(isDark ? styles.emptyDark : styles.emptyLight)
        }}>
            No dynamic programming steps recorded.
        </div>
    )
}

const styles = {
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