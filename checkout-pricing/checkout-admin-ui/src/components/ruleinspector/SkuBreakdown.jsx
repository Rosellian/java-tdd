import {useState} from "react";
import {Section} from "../../ui/Section";
import {SkuHeader} from "./skubreakdown/SkuHeader";
import {SkuBody} from "./skubreakdown/SkuBody";
import {AnimatedBody} from "../../ui/AnimatedBody";
import {useTheme} from "../../ui/ThemeProvider";

export function SkuBreakdown({ skuTraces }) {
    return (
        <Section title="SKU Breakdown">
            <div>
                {skuTraces.map((s, i) => (
                    <SkuItem key={i} sku={s} />
                ))}
            </div>
        </Section>
    );
}

function SkuItem({ sku }) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            ...styles.sku,
            ...(theme === "dark" ? styles.skuDark : styles.skuLight)
        }}>
            <SkuHeader sku={sku} onClick={() => setOpen(!open)}/>

            <AnimatedBody open={open}>
                <SkuBody sku={sku} />
            </AnimatedBody>
        </div>
    );
}

const styles = {
    sku: {
        marginBottom: 10,
        borderRadius: 4,
        border: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    skuDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#eee",
    },
    skuLight: {
        background: "#fafafa",
        borderColor: "#ccc",
        color: "#222",
    }
}