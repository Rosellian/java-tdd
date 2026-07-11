import {Section} from "../../../ui/Section";
import {SkuItem} from "./skuitem/SkuItem";

export function SkuBreakdown({ skuTraces }) {
    return (
        <Section title="SKU Breakdown">
            <div>
                {skuTraces.map((st, i) => (
                    <SkuItem key={i} skuData={st} />
                ))}
            </div>
        </Section>
    )
}