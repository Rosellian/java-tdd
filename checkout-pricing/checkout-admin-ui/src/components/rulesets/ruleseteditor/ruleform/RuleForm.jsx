import {SpecialPriceForm} from "./forms/SpecialPriceForm";
import {BuyXGetYFreeForm} from "./forms/BuyXGetYFreeForm";
import {SkuDiscountForm} from "./forms/SkuDiscountForm";
import {RuleTypeSelector} from "./RuleTypeSelector";
import {BuyXGetYDiscountForm} from "./forms/BuyXGetYDiscountForm";
import {CrossSkuBuyXGetYFreeForm} from "./forms/CrossSkuBuyXGetYFreeForm";
import {CrossSkuBuyXGetYDiscountForm} from "./forms/CrossSkuBuyXGetYDiscountForm";

export function RuleForm({ rule, originalRule, priceList, onChange }) {
    if (!rule) return null;

    function update(field, value) {
        onChange({ ...rule, [field]: value });
    }

    return (
        <div>
            <RuleTypeSelector value={rule.type} originalValue={originalRule?.type}
                              onChange={(newType) => update("type", newType)} />

            {rule.type === "SpecialPrice" && (
                <SpecialPriceForm rule={rule} originalRule={originalRule} onChange={onChange} />
            )}

            {rule.type === "BuyXGetYFree" && (
                <BuyXGetYFreeForm rule={rule} originalRule={originalRule} onChange={onChange} />
            )}

            {rule.type === "BuyXGetYDiscount" && (
                <BuyXGetYDiscountForm rule={rule} originalRule={originalRule}
                                      unitPrice={getUnitPrice(priceList, rule.sku)} onChange={onChange} />
            )}

            {rule.type === "SkuDiscount" && (
                <SkuDiscountForm rule={rule} originalRule={originalRule} onChange={onChange} />
            )}

            {rule.type === "CrossSkuBuyXGetYFree" && (
                <CrossSkuBuyXGetYFreeForm rule={rule} originalRule={originalRule} onChange={onChange} />
            )}

            {rule.type === "CrossSkuBuyXGetYDiscount" && (
                <CrossSkuBuyXGetYDiscountForm rule={rule} originalRule={originalRule} onChange={onChange} />
            )}
        </div>
    )
}

function getUnitPrice(priceList, sku) {
    if (!priceList || !priceList.unitPrices) return 0;

    let skuEntry = priceList.unitPrices.find(price => price.sku === sku);

    return skuEntry ? skuEntry.price : 0;
}