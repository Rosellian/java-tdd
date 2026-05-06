package com.tdd.calculation.dp;

import com.tdd.calculation.dp.utility.PathEntry;
import com.tdd.tracing.DPTrace;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;

public class DpUtils {
    static final String ITEMS_0_KR = "0 items -> 0 kr";

    static DPTrace noResult(String sku, int remaining, PricingTraceCollector collector) {
        if(collector != null)
            collector.recordDP("i=0", 0, List.of(), ITEMS_0_KR, 0, sku);

        return new DPTrace(sku, remaining, List.of(), 0, List.of(ITEMS_0_KR));
    }

    static double [] initDp(int n) {
        double[] dp = new double[n + 1];
        dp[0] = 0;
        return dp;
    }

    static List<PathEntry> createPathStart() {
        List<PathEntry> path = new ArrayList<>();
        path.add(new PathEntry(List.of(ITEMS_0_KR), emptyList()));

        return path;
    }
}
