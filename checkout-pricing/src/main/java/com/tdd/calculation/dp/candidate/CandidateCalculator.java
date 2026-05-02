package com.tdd.calculation.dp.candidate;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.utility.SkuRuleRecorder;
import com.tdd.rules.PricingOption;

import java.util.List;

import static com.tdd.calculation.dp.candidate.CandidateUtils.*;

public class CandidateCalculator {
    private final double unitPrice;
    private final List<PricingOption> pricingOptions;
    private final String sku;
    private final SkuRuleRecorder recorder;

    public CandidateCalculator(PricingRules rules, String sku, SkuRuleRecorder recorder) {
        this.unitPrice = rules.getUnitPrice(sku);
        this.pricingOptions = rules.getPricingOptions(sku);
        this.recorder = recorder;
        this.sku = sku;
    }

    //TODO dp is updated (side-effect)
    public Candidate candidateFor(double[] dp, int i, List<List<String>> path) {
        dp[i] = i * unitPrice;
        List<String> best = createUnitPriceEntry(i, unitPrice);
        List<String> optionsLabels = createOptionsLabels(i, dp);

        for(PricingOption opt : pricingOptions) {
            if(i >= opt.quantity()) {
                double current = getCurrentCandidate(dp, i, opt);
                double candidate = calculateCandidate(opt, current, i);

                optionsLabels.add(createOptionLabel(opt, candidate));

                if(candidate < dp[i]) {
                    dp[i] = candidate;
                    best = createBestPriceList(opt, path, i);

                    recorder.addAppliedSkuRule(i, opt, unitPrice);
                }
            }
        }

        return new Candidate(best, optionsLabels, sku);
    }

    private double getCurrentCandidate(double[] dp, int i, PricingOption opt) {
        return dp[i - opt.quantity()];
    }

    private double calculateCandidate(PricingOption opt, double currentCandidate, int i) {
        int quantity = opt.quantity();
        double price = opt.price();

        if(opt.stackable()) {// chain
            return currentCandidate + price;
        }
        else {//only once: rest unit price
            return price + (i - quantity) * unitPrice;
        }
    }
}
