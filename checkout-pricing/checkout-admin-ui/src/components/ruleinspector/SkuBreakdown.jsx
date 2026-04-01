import {useState} from "react";
import {Section} from "./Section";
import {SkuHeader} from "./skubreakdown/SkuHeader";
import {SkuBody} from "./skubreakdown/SkuBody";

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
    const [open, setOpen] = useState(false);

    return (
        <div style={styles.sku}>
            <SkuHeader sku={sku} onClick={() => setOpen(!open)}/>

            {open && <SkuBody sku={sku} />}
        </div>
    );
}

const styles = {
    sku: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
    }
}