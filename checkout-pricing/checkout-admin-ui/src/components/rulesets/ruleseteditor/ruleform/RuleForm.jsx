import {SpecialPriceForm} from "./forms/SpecialPriceForm";
import {BuyXGetYFreeForm} from "./forms/BuyXGetYFreeForm";
import {SkuDiscountForm} from "./forms/SkuDiscountForm";
import {RuleTypeSelector} from "./RuleTypeSelector";
import {BuyXGetYDiscountForm} from "./forms/BuyXGetYDiscountForm";
import {CrossSkuBuyXGetYFreeForm} from "./forms/CrossSkuBuyXGetYFreeForm";
import {CrossSkuBuyXGetYDiscountForm} from "./forms/CrossSkuBuyXGetYDiscountForm";

export function RuleForm({ rule, onChange }) {
    if (!rule) return null;

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <div>
            <RuleTypeSelector value={rule.type} onChange={(newType) => update("type", newType)} />

            {rule.type === "SpecialPrice" && (
                <SpecialPriceForm rule={rule} onChange={onChange} />
            )}

            {rule.type === "BuyXGetYFree" && (
                <BuyXGetYFreeForm rule={rule} onChange={onChange} />
            )}

            {rule.type === "BuyXGetYDiscount" && (
                <BuyXGetYDiscountForm rule={rule} onChange={onChange} />
            )}

            {rule.type === "SkuDiscount" && (
                <SkuDiscountForm rule={rule} onChange={onChange} />
            )}

            {rule.type === "CrossSkuBuyXGetYFree" && (
                <CrossSkuBuyXGetYFreeForm rule={rule} onChange={onChange} />
            )}

            {rule.type === "CrossSkuBuyXGetYDiscount" && (
                <CrossSkuBuyXGetYDiscountForm rule={rule} onChange={onChange} />
            )}
        </div>
    )
}