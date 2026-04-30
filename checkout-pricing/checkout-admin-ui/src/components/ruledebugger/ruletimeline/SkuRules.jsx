import {RuleItem} from "./RuleItem";

export function SkuRules({ rules }) {
    const groupedBySku = groupBySku(rules);
    const sortedSkuKeys = Object.keys(groupedBySku).sort();

    return (
        sortedSkuKeys.map(sku => (
            <li key={sku}>
                <div style={styles.skuHeader}>{sku}</div>

                {groupedBySku[sku].map((r, i) => (
                    <RuleItem key={`${sku}-${i}`} rule={r} />
                ))}
            </li>
        ))
    );
}

function groupBySku(rules) {
    return rules.filter(r => r.sku)
        .reduce((acc, r) => {
            acc[r.sku] = acc[r.sku] || [];
            acc[r.sku].push(r);
            return acc;
        }, {});
}

const styles = {
    skuHeader: {
        marginTop: 12,
        marginBottom: 6,
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "#fff",
    }
}