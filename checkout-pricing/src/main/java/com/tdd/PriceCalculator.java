package com.tdd;

import com.tdd.engine.RuleContext;
import com.tdd.engine.SkuMod;
import com.tdd.logging.DPNode;
import com.tdd.logging.DPTrace;
import com.tdd.rules.PricingOption;

import java.util.ArrayList;
import java.util.List;

public class PriceCalculator {
    public static final String ITEMS_0_KR = "0 items -> 0 kr";
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

        if(remaining <= 0) {
            return new DPTrace(sku, remaining, List.of(), 0, List.of(ITEMS_0_KR));
        }

        int n = (int) remaining;
        int[] dp = new int[n + 1];
        List<List<String>> path = new ArrayList<>();
        List<DPNode>  nodes = new ArrayList<>();

        path.add(List.of(ITEMS_0_KR));
        dp[0] = 0;

        for(int i = 1; i <= n; i++) {
            dp[i] = i *  unitPrice;
            List<String> best = new ArrayList<>();
            best.add(i + " x " + unitPrice + " = " + dp[i] + " kr");

            for(PricingOption opt: options) {
                int quantity = opt.quantity();
                int price = opt.price();

                if(i >= quantity) {
                    int candidate;
                    if(opt.stackable()) {// chain
                        candidate = dp[i - quantity] + price;
                    }
                    else {//only once: rest unit price
                        candidate = price + (i - quantity) * unitPrice;
                    }

                    if(candidate < dp[i]) {
                        dp[i] = candidate;
                        if(opt.stackable()) {
                            best = new ArrayList<>(path.get(i - quantity));
                        }
                        else {
                            best = new ArrayList<>();
                        }
                        best.add(quantity + "-for-" + price + (opt.stackable() ? "" : " (non-stackable)"));
                    }
                }
            }
            path.add(best);
            nodes.add(new DPNode(i, dp[i], List.copyOf(best)));
        }

        return new DPTrace(sku, remaining, nodes, dp[n], path.get(n));
    }
}
