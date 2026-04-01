import {useState} from "react";
import {Section} from "./Section";

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
            <div style={styles.skuHeader} onClick={() => setOpen(!open)}>
                <strong>{sku.sku}</strong>
                <span>{sku.total} kr</span>
            </div>

            {open && (
                <div style={styles.skuBody}>
                    <pre>{JSON.stringify(sku, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

const styles = {
    sku: {
        border: "1px solid #333",
        marginBottom: 10,
        borderRadius: 4,
        background: "#1E1E1E",
    },
    skuHeader: {
        padding: 10,
        background: "#263238",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        color: "#80CBC4",
    },
    skuBody: {
        padding: 10,
        background: "#1A1A1A",
    }
}