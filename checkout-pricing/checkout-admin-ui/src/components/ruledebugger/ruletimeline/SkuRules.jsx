import {RuleItem} from "./ruleitem/RuleItem";
import {useTheme} from "../../../ui/theme/ThemeProvider";

export function SkuRules({ rules }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const groupedBySku = groupBySku(rules);
    const sortedSkuKeys = Object.keys(groupedBySku).sort();

    return (
        sortedSkuKeys.map(sku => {
            return (
                <li key={sku}>
                    <div style={{
                        ...styles.skuHeader,
                        ...(isDark ? styles.headerDark : styles.headerLight)
                    }}>
                        {sku}
                    </div>

                    <ul style={styles.list}>
                        {groupedBySku[sku].map((r, i) => (
                            <RuleItem key={`${sku}-${i}`} rule={r}/>
                        ))}
                    </ul>
                </li>
            )
        })
    )
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
        transition: "color 0.25s ease"
    },
    list: {
        paddingLeft: 0,
        margin: 0,
        listStyle: "none"
    },
    headerDark: {
        color: "#BB86FC"
    },
    headerLight: {
        color: "#5A2DA8"
    }
}