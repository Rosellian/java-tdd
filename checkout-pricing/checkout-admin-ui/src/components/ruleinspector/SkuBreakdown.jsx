import {useState} from "react";
import {Section} from "../../ui/Section";
import {SkuHeader} from "./skubreakdown/SkuHeader";
import {SkuBody} from "./skubreakdown/SkuBody";
import {AnimatedBody} from "../../ui/AnimatedBody";

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

            <AnimatedBody open={open}>
                <SkuBody sku={sku} />
            </AnimatedBody>
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