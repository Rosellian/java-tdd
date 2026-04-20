package com.tdd.tracing.inspector;

import com.tdd.tracing.DPTrace;
import com.tdd.tracing.RuleTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RuleInspectorView {
    private static final Logger logger = LoggerFactory.getLogger(RuleInspectorView.class);

    public static void print(RuleTrace trace) {
        logger.info("=== RULE INSPECTOR 2.0 ===");

        logger.info(printRuleExecution(trace));

        logger.info(printSkuBreakdown(trace));

        logger.info("--- DP Trace ---\n{}", printDPs(trace));

        logger.info("--- FINAL TOTAL ---{}", trace.finalTotal());
    }

    private static String printRuleExecution(RuleTrace trace) {
        StringBuilder ruleExecution = new StringBuilder("--- Rule Execution ---");

        for (var e : trace.events()) {
            ruleExecution.append("Rule: ").append(e.ruleName()).append("\n");
            ruleExecution.append("Applied: ").append(e.applied()).append("\n");
            ruleExecution.append("Delta: ").append(e.delta()).append("\n");
            ruleExecution.append("Before: ").append(e.before()).append("\n");
            ruleExecution.append("After: ").append(e.after()).append("\n");
        }

        return ruleExecution.toString();
    }

    private static String printSkuBreakdown(RuleTrace trace) {
        StringBuilder skuBreakdown = new StringBuilder("--- SKU Breakdown ---\n");

        for (var s : trace.skuTraces()) {
            skuBreakdown.append("SKU: ").append(s.sku()).append("\n");
            skuBreakdown.append("  Count:       ").append(s.count()).append("\n");
            skuBreakdown.append("  Free:        ").append(s.free()).append("\n");
            skuBreakdown.append("  Discounted:  ").append(s.discounted()).append("\n");
            skuBreakdown.append("  Rate:        ").append(s.rate()).append("\n");
            skuBreakdown.append("  Remaining:   ").append(s.remaining()).append("\n");
            skuBreakdown.append("  Unit price:  ").append(s.unitPrice()).append("\n");
            skuBreakdown.append("  Disc price:  ").append(s.discountedPrice()).append("\n");
            skuBreakdown.append("  DP price:    ").append(s.dpPrice()).append("\n");
            skuBreakdown.append("  Total:       ").append(s.total()).append("\n");
        }

        return skuBreakdown.toString();
    }

    private static String printDPs(RuleTrace trace) {
        StringBuilder dps = new StringBuilder();

        for(var dp : trace.dpTraces()) {
            dps.append(printDP(dp));
        }

        return dps.toString();
    }

    private static String printDP(DPTrace dp) {
        StringBuilder dpForSku = new StringBuilder("DP Path for SKU " + dp.sku() +
                " (remaining = " + dp.remaining() + ")\n");

        for (var node : dp.nodes()) {
            dpForSku.append("[").append(node.stepIndex()).append("] → ").append(node.price()).append(" kr\n");
            for (var line : node.explanation()) {
                dpForSku.append("     ").append(line).append("\n");
            }
        }

        dpForSku.append("Winning path:\n");
        for (var step : dp.winningPath()) {
            dpForSku.append("  - ").append(step).append("\n");
        }

        dpForSku.append("Total: ").append(dp.finalPrice()).append(" kr\n");

        return dpForSku.toString();
    }
}
