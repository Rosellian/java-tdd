import {useTheme} from "../../../../../ui/theme/ThemeProvider";
import {SkuData} from "./SkuData";
import {Badge} from "../../Badge";

export function SkuBody({ skuData }) {
    const { theme } = useTheme();

    const base = skuData.unitPrice * skuData.count;
    const delta = skuData.dpPrice - base;

    return (
        <div style={{
            ...styles.skuBody,
            ...(theme === "dark" ? styles.bodyDark : styles.bodyLight)
        }}>
                <div style={styles.badges}>
                    {delta !== 0 && (
                        <Badge type="delta">
                            {delta > 0 ? `+${delta}` : delta} kr
                        </Badge>
                    )}

                    {skuData.free > 0 && (
                        <Badge type="discount">
                            {skuData.free} free
                        </Badge>
                    )}

                    {skuData.discounted > 0 && (
                        <Badge type="discount">
                            {skuData.discounted} discounted
                        </Badge>
                    )}

                    {skuData.rate !== 1 && (
                        <Badge type="discount">
                            rate {skuData.rate}
                        </Badge>
                    )}

                    {skuData.discountedPrice > 0 && (
                        <Badge type="discount">
                            −{skuData.discountedPrice} kr
                        </Badge>
                    )}
                </div>

            <SkuData skuData={skuData} />
        </div>
    )
}

const styles = {
    badges: {
        display: "flex",
        gap: 6,
        marginBottom: 6,
        flexWrap: "wrap"
    },
    skuBody: {
        padding: 10,
        borderTop: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease"
    },
    bodyDark: {
        background: "#1A1A1A",
        borderColor: "#333",
        color: "#eee"
    },
    bodyLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#222"
    }
}