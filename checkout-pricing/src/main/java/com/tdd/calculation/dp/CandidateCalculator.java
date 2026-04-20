package com.tdd.calculation.dp;

import com.tdd.PricingRules;
import com.tdd.rules.PricingOption;

import java.util.List;

import static com.tdd.calculation.dp.CandidateUtils.*;

public class CandidateCalculator {
    private final double unitPrice;
    private final List<PricingOption> pricingOptions;
    private final String sku;

    public CandidateCalculator(PricingRules rules, String sku) {
        this.unitPrice = rules.getUnitPrice(sku);
        this.pricingOptions = rules.getPricingOptions(sku);
        this.sku = sku;
    }

    //TODO dp is updated (side-effect)
    public Candidate candidateFor(double[] dp, int i, List<List<String>> path) {
        dp[i] = i * unitPrice;
        List<String> best = createUnitPriceEntry(i, unitPrice);
        List<String> optionsLabels = createOptionsLabels(i, dp);

        for(PricingOption opt: pricingOptions) {
            if(i >= opt.quantity()) {
                double candidate = calculateCandidate(opt, dp, i);
                optionsLabels.add(opt.quantity() + " for " + opt.price() + " -> " + candidate);

                if(candidate < dp[i]) {
                    dp[i] = candidate;
                    best = createBestPriceList(opt, path, i);
                }
            }
        }

        return new Candidate(best, optionsLabels, sku);
    }

    private double calculateCandidate(PricingOption opt, double[] dp, int i) {
        int quantity = opt.quantity();
        double price = opt.price();

        if(opt.stackable()) {// chain
            return dp[i - quantity] + price;
        }
        else {//only once: rest unit price
            return price + (i - quantity) * unitPrice;
        }
    }
}
