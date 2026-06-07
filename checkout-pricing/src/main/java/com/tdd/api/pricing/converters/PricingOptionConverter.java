package com.tdd.api.pricing.converters;

import com.tdd.api.rulesets.data.rules.sku.BuyXGetYDiscount;
import com.tdd.api.rulesets.data.rules.sku.BuyXGetYFree;
import com.tdd.api.rulesets.data.rules.sku.SkuRule;
import com.tdd.api.rulesets.data.rules.sku.SpecialPrice;
import com.tdd.rules.PricingOption;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.*;

public class PricingOptionConverter {

    private PricingOptionConverter() {}

    public static Map<String, List<PricingOption>> convertToPricingOptions(List<SkuRule> rules,
                                                                           Map<String, Double> unitPrices) {
        return rules.stream()
                .map(ruleData -> PricingOptionInput.from(ruleData, unitPrices))
                .map(PricingOptionConverter::toInternal)
                .collect(groupingBy(PricingOptionOutput::sku, mapping(PricingOptionOutput::option, toList())));
    }

    record PricingOptionInput(String sku, double unitPrice, SkuRule ruleData) {
        static PricingOptionInput from(SkuRule ruleData, Map<String, Double> unitPrices) {
            String sku = ruleData.getSku();
            double unitPrice = unitPrices.get(sku);

            return new PricingOptionInput(sku, unitPrice, ruleData);
        }
    }

    record PricingOptionOutput(String sku, PricingOption option) {}

    private static PricingOptionOutput toInternal(PricingOptionInput input) {
        SkuRule ruleData = input.ruleData;
        double unitPrice = input.unitPrice;

        PricingOption option = switch (ruleData.getClass().getSimpleName()) {
            case "SpecialPrice" -> toInternal((SpecialPrice) ruleData);
            case "BuyXGetYFree" -> toInternal((BuyXGetYFree) ruleData, unitPrice);
            case "BuyXGetYDiscount" -> toInternal((BuyXGetYDiscount) ruleData, unitPrice);
            default -> null; //TODO handle better
        };

        return new PricingOptionOutput(input.sku, option);
    }

    private static com.tdd.rules.SpecialPrice toInternal(SpecialPrice ruleData) {
        return new com.tdd.rules.SpecialPrice(ruleData.getQuantity(), ruleData.getPrice(),
                ruleData.getPriority(), ruleData.isStackable());
    }

    private static com.tdd.rules.BuyXGetYFree toInternal(BuyXGetYFree ruleData, double unitPrice) {
        return com.tdd.rules.BuyXGetYFree.from(ruleData.getBuy(), ruleData.getGet(), unitPrice,
                ruleData.getPriority(), ruleData.isStackable());
    }

    private static com.tdd.rules.BuyXGetYDiscount toInternal(BuyXGetYDiscount ruleData, double unitPrice) {
        return com.tdd.rules.BuyXGetYDiscount.from(ruleData.getBuy(), ruleData.getGet(), unitPrice,
                ruleData.getDiscount(), ruleData.getPriority(), ruleData.isStackable());
    }
}
