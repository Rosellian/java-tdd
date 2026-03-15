package com.tdd;

import com.tdd.engine.RuleContext;
import com.tdd.engine.SkuMod;
import com.tdd.tracing.DPNode;
import com.tdd.tracing.DPTrace;
import com.tdd.rules.PricingOption;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.ArrayList;
import java.util.List;

public class PriceCalculator {
    public static final String ITEMS_0_KR = "0 items -> 0 kr";
    private final PricingRules rules;

    public PriceCalculator(PricingRules rules) {
        this.rules = rules;
    }

    public int calculateTotal(RuleContext context, PricingTraceCollector collector) {
        int total = 0;

        for(var entry : context.counts().entrySet()) {
            String sku = entry.getKey();
            SkuMod mod = context.modOf(sku);

            long discounted = mod.discounted();

            long remaining = entry.getValue() - mod.free() - discounted;
            if(remaining < 0) remaining = 0;

            int discountedPrice = (int)(discounted * rules.getUnitPrice(sku) * mod.rate());
            DPTrace dpTrace = bestPriceFor(sku, remaining, collector);
            total += discountedPrice + dpTrace.finalPrice();
        }

        return total;
    }

    public DPTrace bestPriceFor(String sku, long remaining) {
        return bestPriceFor(sku, remaining, null);
    }
    public DPTrace bestPriceFor(String sku, long remaining, PricingTraceCollector collector) {
        if(remaining <= 0) {
            if(collector != null)
                collector.recordDP("i=0", List.of(), ITEMS_0_KR, 0);

            return new DPTrace(sku, remaining, List.of(), 0, List.of(ITEMS_0_KR));
        }

        int unitPrice = rules.getUnitPrice(sku);
        List<PricingOption> options = rules.getPricingOptions(sku);

        int n = (int) remaining;
        int[] dp = new int[n + 1];
        dp[0] = 0;
        List<List<String>> path = new ArrayList<>();
        path.add(List.of(ITEMS_0_KR));
        List<DPNode>  nodes = new ArrayList<>();

        for(int i = 1; i <= n; i++) {
            dp[i] = i * unitPrice;
            List<String> best = createUnitPriceEntry(i, unitPrice);

            List<String> optionsLabels = new ArrayList<>();
            optionsLabels.add("unitPrice x" + i + " = " + dp[i]);

            for(PricingOption opt: options) {
                if(i >= opt.quantity()) {
                    int candidate = calculateCandidate(opt, dp, i, unitPrice);
                    optionsLabels.add(opt.quantity() + " for " + opt.price() + " -> " + candidate);

                    if(candidate < dp[i]) {
                        dp[i] = candidate;
                        best = createBestPriceList(opt, path, i);
                    }
                }
            }
            path.add(best);
            nodes.add(new DPNode(i, dp[i], List.copyOf(best)));
            if(collector != null)
                collector.recordDP("i=" + i, optionsLabels, String.join(" + ", best), dp[i]);
        }

        return new DPTrace(sku, remaining, nodes, dp[n], path.get(n));
    }

    private List<String> createUnitPriceEntry(int i, int unitPrice) {
        List<String> best = new ArrayList<>();
        best.add(i + " x " + unitPrice + " = " + i*unitPrice + " kr");
        return best;
    }

    private List<String> createBestPriceList(PricingOption opt, List<List<String>> path, int i) {
        List<String> best;
        int quantity = opt.quantity();
        if(opt.stackable()) {
            best = new ArrayList<>(path.get(i - quantity));
        }
        else {
            best = new ArrayList<>();
        }
        best.add(quantity + "-for-" + opt.price() + (opt.stackable() ? "" : " (non-stackable)"));
        return best;
    }

    private int calculateCandidate(PricingOption opt, int[] dp, int i, int unitPrice) {
        int quantity = opt.quantity();
        int price = opt.price();
        if(opt.stackable()) {// chain
            return dp[i - quantity] + price;
        }
        else {//only once: rest unit price
            return price + (i - quantity) * unitPrice;
        }
    }
}
