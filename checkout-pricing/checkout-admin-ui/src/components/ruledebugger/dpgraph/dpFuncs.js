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