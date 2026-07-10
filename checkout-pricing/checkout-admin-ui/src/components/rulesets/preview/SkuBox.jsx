export function SkuBox({ rules }) {
    let skuMap = createSkuMap(rules);

    return (
        <div style={styles.skuBox}>
            <div style={styles.skuTitle}>SKU Impact</div>

            {Object.entries(skuMap).map(([sku, list]) => (
                <div key={sku} style={styles.skuRow}>
                    <strong>
                        {sku === "_global" ? "Global" : sku}
                    </strong>

                    <span style={styles.skuRules}>
                            {list.length} rule{list.length > 1 ? "s" : ""}
                    </span>
                </div>
            ))}
        </div>
    )
}

function createSkuMap(rules) {
    let skuMap = {};
    for (let rule of rules) {
        let sku = rule.sku ?? "_global";
        skuMap[sku] = skuMap[sku] || [];
        skuMap[sku].push(rule);
    }
    return skuMap;
}

const styles = {
    skuBox: {
        padding: 8,
        borderRadius: 6,
        background: "rgba(187,134,252,0.15)"
    },
    skuTitle: {
        fontSize: 13,
        opacity: 0.7,
        marginBottom: 6
    },
    skuRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        fontSize: 14
    },
    skuRules: {
        opacity: 0.8
    }
}