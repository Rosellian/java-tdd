package com.tdd;

import com.tdd.engine.RuleContext;
import com.tdd.engine.SkuMod;
import com.tdd.logging.DPNode;
import com.tdd.logging.DPTrace;
import com.tdd.rules.PricingOption;

import java.util.ArrayList;
import java.util.List;

public class PriceCalculator {
    private final PricingRules rules;

    public PriceCalculator(PricingRules rules) {
        this.rules = rules;
    }

    public int calculateTotal(RuleContext context) {
        int total = 0;

        for(var entry : context.counts().entrySet()) {
            String sku = entry.getKey();
            SkuMod mod = context.modOf(sku);

            long discounted = mod.discounted();

            long remaining = entry.getValue() - mod.free() - discounted;
            if(remaining < 0) remaining = 0;

            int discountedPrice = (int)(discounted * rules.getUnitPrice(sku) * mod.rate());
            DPTrace dpTrace = bestPriceFor(sku, remaining);
            total += discountedPrice + dpTrace.finalPrice();
        }


        return total;
    }

    public DPTrace bestPriceFor(String sku, long remaining) {
        int unitPrice = rules.getUnitPrice(sku);
        List<PricingOption> options = rules.getPricingOptions(sku);

        int[] dp = new int[(int) (remaining + 1)];
        List<List<String>> path = new ArrayList<>();
        List<DPNode>  nodes = new ArrayList<>();

        path.add(List.of("0 items -> 0 kr"));

        for(int i = 1; i <= remaining; i++) {
            dp[i] = i *  unitPrice;
            List<String> best = new ArrayList<>();
            best.add(i + " x " + unitPrice + " = " + dp[i] + " kr");

            for(PricingOption opt : options) {
                if(i >= opt.quantity()) {
                    int candidate = dp[i - opt.quantity()] + opt.price();
                    if(candidate < dp[i]) {
                        dp[i] = candidate;
                        best = new ArrayList<>(path.get(i - opt.quantity()));
                        best.add(opt.quantity() + "-for-" + opt.price());
                    }
                }
            }
            path.add(best);
            nodes.add(new DPNode(i, dp[i], List.copyOf(best)));
        }

        return new DPTrace(sku, remaining, nodes, dp[(int) remaining], path.get((int) remaining));
    }
}
