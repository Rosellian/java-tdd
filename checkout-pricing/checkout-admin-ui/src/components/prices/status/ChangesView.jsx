import {useTheme} from "../../../ui/theme/ThemeProvider";

export function ChangesView({ priceList, originalPriceList }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div style={{
            ...styles.container,
            ...(isDark ? styles.containerDark : styles.containerLight)
        }}>
            <div style={styles.header}>
                Changes:
            </div>
            {diffPriceLists(originalPriceList, priceList).map((d, i) => (
                <div key={i} style={styles.diff}>
                    • {d}
                </div>
            ))}
        </div>
    )
}

function diffPriceLists(a, b) {
    if (!a || !b) return [];

    const diffs = [];

    if (a.name !== b.name) diffs.push("Name changed");

    const max = Math.max(a.unitPrices.length, b.unitPrices.length);

    for (let i = 0; i < max; i++) {
        const oldItem = a.unitPrices[i];
        const newItem = b.unitPrices[i];

        if (!oldItem || !newItem) {
            diffs.push("SKU list length changed");
            continue;
        }

        if (oldItem.sku !== newItem.sku) diffs.push(`SKU changed at row ${i + 1}`);
        if (oldItem.price !== newItem.price) diffs.push(`Price changed at row ${i + 1}`);
    }

    return diffs;
}

const styles = {
    container: {
        marginTop: 10,
        padding: "8px 12px",
        borderRadius: 4,
        fontSize: 13
    },
    containerDark: {
        background: "#263238"
    },
    containerLight: {
        background: "#ECEFF1"
    },
    header: {
        fontWeight: 600,
        marginBottom: 4
    },
    diff: {
        marginLeft: 8
    }
}