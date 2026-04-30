package com.tdd.calculation.dp.candidate;

import com.tdd.PricingRules;
import com.tdd.rules.PricingOption;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.List;

import static com.tdd.calculation.dp.candidate.CandidateUtils.*;

public class CandidateCalculator {
    private final double unitPrice;
    private final List<PricingOption> pricingOptions;
    private final String sku;
    private final CandidateRecorder recorder;

    public CandidateCalculator(PricingRules rules, PricingTraceCollector collector, String sku) {
        this.unitPrice = rules.getUnitPrice(sku);
        this.pricingOptions = rules.getPricingOptions(sku);
        this.recorder = new CandidateRecorder(sku, collector);
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
                boolean isBetterCandidate = candidate < dp[i];

                optionsLabels.add(createOptionLabel(opt, candidate));

                if(isBetterCandidate) {
                    dp[i] = candidate;
                    best = createBestPriceList(opt, path, i);

                    recorder.recordSkuRule(i, opt, current, candidate, isBetterCandidate);
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
