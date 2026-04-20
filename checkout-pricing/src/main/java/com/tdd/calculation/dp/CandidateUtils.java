package com.tdd.calculation.dp;

import com.tdd.rules.PricingOption;

import java.util.ArrayList;
import java.util.List;

public class CandidateUtils {

    static List<String> createOptionsLabels(int i, double[] dp) {
        List<String> optionsLabels = new ArrayList<>();
        optionsLabels.add("unitPrice x" + i + " = " + dp[i]);
        return optionsLabels;
    }

    static List<String> createUnitPriceEntry(int i, double unitPrice) {
        List<String> best = new ArrayList<>();
        best.add(i + " x " + unitPrice + " = " + i*unitPrice + " kr");
        return best;
    }

    static List<String> createBestPriceList(PricingOption opt, List<List<String>> path, int i) {
        List<String> best;
        int quantity = opt.quantity();

        if(opt.stackable()) {
            best = new ArrayList<>(path.get(i - quantity));
        }
        else {
            best = new ArrayList<>();
        }

        best.add(quantity + "-for-" + opt.price() + (opt.stackable() ? "" : " (non-stackable)"));
        return best;
    }
}
