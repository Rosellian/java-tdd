import {DPNodes} from "./dpnodes/DPNodes";
import {useTheme} from "../../../ui/ThemeProvider";

export function SkuNodes({ sku, nodes }) {
    const { theme } = useTheme();

    return (
        <div key={sku} style={{
            ...styles.skuBlock,
            ...(theme === "dark" ? styles.skuDark : styles.skuLight)
        }}>
            <h3 style={{
                ...styles.skuHeader,
                ...(theme === "dark" ? styles.skuHeaderDark : styles.skuHeaderLight)
            }}>{sku}</h3>
            <DPNodes nodes={nodes}/>
        </div>
    )
}

const styles = {
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
    }
}