import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {SkuData} from "./SkuData";

export function SkuBody({ skuData }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.skuBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
            <SkuData skuData={skuData} />
        </div>
    )
}

const styles = {
    skuBody: {
        padding: 10,
        borderTop: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    bodyDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee",
    },
    bodyLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#222",
    }
}