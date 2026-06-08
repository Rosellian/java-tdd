package com.tdd.calculation.dp;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.candidate.Candidate;
import com.tdd.calculation.dp.candidate.CandidateCalculator;
import com.tdd.calculation.dp.utility.PathEntry;
import com.tdd.calculation.dp.utility.SkuRuleRecorder;
import com.tdd.tracing.DPNode;
import com.tdd.tracing.DPTrace;
import com.tdd.tracing.debug.PricingTraceCollector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

import static com.tdd.calculation.dp.DpUtils.*;

public class BestPriceAlgorithm {
    private static final Logger logger = LoggerFactory.getLogger(BestPriceAlgorithm.class);

    private final PricingRules rules;
    private final PricingTraceCollector collector;

    public BestPriceAlgorithm(PricingRules rules, PricingTraceCollector collector) {
        this.rules = rules;
        this.collector = collector;
    }

    public DPTrace bestPriceFor(String sku, int remaining) {
        log("Running DP-algorithm for SKU {}", sku);
        if(remaining <= 0) return noResult(sku, remaining, collector);

        double[] dp = initDp(remaining);
        List<PathEntry> path = createPathStart();
        List<DPNode> nodes = new ArrayList<>();

        double unitPrice = rules.getUnitPrice(sku);
        SkuRuleRecorder skuRuleRecorder = new SkuRuleRecorder(sku, unitPrice, collector);

        for(int i = 1; i <= remaining; i++) {
            CandidateCalculator calculator = new CandidateCalculator(rules, sku, skuRuleRecorder);
            Candidate candidate = calculator.candidateFor(dp, i, path);

            updateResults(candidate, path, nodes, i, dp);
        }

        double finalPrice = dp[remaining];
        PathEntry finalPath = path.get(remaining);
        skuRuleRecorder.recordTrace(remaining, finalPrice, finalPath.appliedRules());

        DPTrace dpTrace = new DPTrace(sku, remaining, nodes, finalPrice, finalPath.stringPath());
        log("Finished DP-algorithm for SKU {} with result {}", sku, dpTrace);

        return dpTrace;
    }

    private void log(String message, Object ... args) {
        if (collector != null) {
            logger.info(message, args);
        }
    }

    private void updateResults(Candidate candidate, List<PathEntry> path, List<DPNode> nodes, int i, double[] dp) {
        path.add(candidate.pathEntry());

        List<String> best = candidate.pathEntry().stringPath();
        DPNode dpNode = new DPNode(i, dp[i], List.copyOf(best));
        nodes.add(dpNode);

        if(collector != null) {
            collector.recordDP("i=" + i, i, candidate.optionsLabels(), String.join(" + ", best),
                    dp[i], candidate.sku());
        }
    }
}
