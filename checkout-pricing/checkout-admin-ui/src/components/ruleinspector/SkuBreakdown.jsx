import {useState} from "react";

export function SkuBreakdown({ skuTraces }) {
    return (
        <div>
            {skuTraces.map((s, i) => (
                <SkuItem key={i} sku={s} />
            ))}
        </div>
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