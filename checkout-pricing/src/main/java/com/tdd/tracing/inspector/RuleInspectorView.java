package com.tdd.tracing.inspector;

import com.tdd.tracing.DPTrace;
import com.tdd.tracing.RuleTrace;

public class RuleInspectorView {

    public static void print(RuleTrace trace) {
        System.out.println("=== RULE INSPECTOR 2.0 ===");

        System.out.println("\n--- Rule Execution ---");
        for (var e : trace.events()) {
            System.out.println("Rule: " + e.ruleName());
            System.out.println("Applied: " + e.applied());
            System.out.println("Delta: " + e.delta());
            System.out.println("Before: " + e.before());
            System.out.println("After: " + e.after());
            System.out.println();
        }

        System.out.println("\n--- SKU Breakdown ---");
        for (var s : trace.skuTraces()) {
            System.out.println("SKU: " + s.sku());
            System.out.println("  Count:       " + s.count());
            System.out.println("  Free:        " + s.free());
            System.out.println("  Discounted:  " + s.discounted());
            System.out.println("  Rate:        " + s.rate());
            System.out.println("  Remaining:   " + s.remaining());
            System.out.println("  Unit price:  " + s.unitPrice());
            System.out.println("  Disc price:  " + s.discountedPrice());
            System.out.println("  DP price:    " + s.dpPrice());
            System.out.println("  Total:       " + s.total());
            System.out.println();
        }

        System.out.println("--- FINAL TOTAL ---");
        System.out.println(trace.finalTotal());
    }

    public static void printDP(DPTrace dp) {
        System.out.println("DP Path for SKU " + dp.sku() +
                " (remaining = " + dp.remaining() + ")");

        for (var node : dp.nodes()) {
            System.out.println("[" + node.stepIndex() + "] → " + node.price() + " kr");
            for (var line : node.explanation()) {
                System.out.println("     " + line);
            }
        }

        System.out.println("Winning path:");
        for (var step : dp.winningPath()) {
            System.out.println("  - " + step);
        }

        System.out.println("Total: " + dp.finalPrice() + " kr\n");
    }
}
