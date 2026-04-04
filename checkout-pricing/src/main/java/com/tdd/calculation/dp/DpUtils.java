package com.tdd.calculation.dp;

import com.tdd.tracing.DPTrace;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.ArrayList;
import java.util.List;

public class DpUtils {
    static final String ITEMS_0_KR = "0 items -> 0 kr";

    static DPTrace noResult(String sku, long remaining, PricingTraceCollector collector) {
        if(collector != null)
            collector.recordDP("i=0", 0, List.of(), ITEMS_0_KR, 0, sku);

        return new DPTrace(sku, remaining, List.of(), 0, List.of(ITEMS_0_KR));
    }

    static int [] initDp(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 0;
        return dp;
    }

    static List<List<String>> createPath() {
        List<List<String>> path = new ArrayList<>();
        path.add(List.of(ITEMS_0_KR));
        return path;
    }
}
