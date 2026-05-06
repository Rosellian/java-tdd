package com.tdd.calculation.dp;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.candidate.Candidate;
import com.tdd.calculation.dp.candidate.CandidateCalculator;
import com.tdd.calculation.dp.utility.PathEntry;
import com.tdd.calculation.dp.utility.SkuRuleRecorder;
import com.tdd.tracing.DPNode;
import com.tdd.tracing.DPTrace;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.ArrayList;
import java.util.List;

import static com.tdd.calculation.dp.DpUtils.*;

public class BestPriceAlgorithm {
    private final PricingRules rules;
    private final PricingTraceCollector collector;

    public BestPriceAlgorithm(PricingRules rules, PricingTraceCollector collector) {
        this.rules = rules;
        this.collector = collector;
    }

    public DPTrace bestPriceFor(String sku, int remaining) {
        if(remaining <= 0) return noResult(sku, remaining, collector);

        double[] dp = initDp(remaining);
        List<PathEntry> path = createPathStart();
        List<DPNode> nodes = new ArrayList<>();

        SkuRuleRecorder skuRuleRecorder = new SkuRuleRecorder(sku, rules.getUnitPrice(sku), collector);

        for(int i = 1; i <= remaining; i++) {
            CandidateCalculator calculator = new CandidateCalculator(rules, sku, skuRuleRecorder);
            Candidate candidate = calculator.candidateFor(dp, i, path);

            updateResults(candidate, path, nodes, i, dp);
        }

        double finalPrice = dp[remaining];
        PathEntry finalPath = path.get(remaining);
        skuRuleRecorder.recordTrace(remaining, finalPrice, finalPath.appliedRules());

        return new DPTrace(sku, remaining, nodes, finalPrice, finalPath.stringPath());
    }

    private void updateResults(Candidate candidate, List<PathEntry> path, List<DPNode> nodes, int i, double[] dp) {
        List<String> best = candidate.pathEntry().stringPath();

        path.add(candidate.pathEntry());
        nodes.add(new DPNode(i, dp[i], List.copyOf(best)));

        if(collector != null) {
            collector.recordDP("i=" + i, i, candidate.optionsLabels(), String.join(" + ", best),
                    dp[i], candidate.sku());
        }
    }
}
