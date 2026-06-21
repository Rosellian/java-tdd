import {DPNodes} from "./dpnodes/DPNodes";
import {useTheme} from "../../../ui/theme/ThemeProvider";

export function SkuNodes({ sku, nodes }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <div key={sku} style={{
            ...styles.skuBlock,
            ...(isDark ? styles.skuDark : styles.skuLight)
        }}>
            <h3 style={{
                ...styles.skuHeader,
                ...(isDark ? styles.skuHeaderDark : styles.skuHeaderLight)
            }}>
                {sku}
            </h3>

            <DPNodes nodes={nodes}/>
        </div>
    )
}

const styles = {
    skuBlock: {
        display: "flex",
        marginBottom: 10,
        padding: 5,
        gap: 10,
        borderRadius: 8,
        transition: "background 0.25s ease, color 0.25s ease"
    },
    skuDark: {
        background: "#222"
    },
    skuLight: {
        background: "#fff",
        border: "1px solid #ddd"
    },
    skuHeader: {
        fontSize: "1.1rem",
        fontWeight: 600,
        transition: "color 0.25s ease"
    },
    skuHeaderDark: {
        color: "#BB86FC"
    },
    skuHeaderLight: {
        color: "#5A2DA8"
    }
}