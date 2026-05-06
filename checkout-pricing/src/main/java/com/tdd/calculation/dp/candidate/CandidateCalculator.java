package com.tdd.calculation.dp.candidate;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.utility.PathEntry;
import com.tdd.calculation.dp.utility.SkuRuleRecorder;
import com.tdd.rules.PricingOption;

import java.util.ArrayList;
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
    public Candidate candidateFor(double[] dp, int i, List<PathEntry> path) {
        dp[i] = i * unitPrice;
        List<String> best = createUnitPriceEntry(i, unitPrice);
        List<PricingOption> appliedRules = new ArrayList<>();
        List<String> optionsLabels = createOptionsLabels(i, dp);

        for(PricingOption opt : pricingOptions) {
            if(i >= opt.quantity()) {
                double current = getCurrentCandidate(dp, i, opt);
                double candidate = calculateCandidate(opt, current, i);
                boolean isBetterCandidate = candidate < dp[i];

                optionsLabels.add(createOptionLabel(opt, candidate));
                recorder.addSkuRule(i, opt);

                if(isBetterCandidate) {
                    dp[i] = candidate;
                    best = createBestPriceList(path, opt, i);
                    appliedRules = createAppliedRule(path, opt, i);
                }
            }
        }

        return new Candidate(new PathEntry(best, appliedRules), optionsLabels, sku);
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
