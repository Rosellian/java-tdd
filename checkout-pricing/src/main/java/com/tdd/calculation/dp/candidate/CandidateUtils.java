package com.tdd.calculation.dp.candidate;

import com.tdd.calculation.dp.utility.PathEntry;
import com.tdd.rules.PricingOption;

import java.util.ArrayList;
import java.util.List;

public class CandidateUtils {

    private CandidateUtils() {}

    static List<String> createOptionsLabels(int i, double[] dp) {
        List<String> optionsLabels = new ArrayList<>();
        optionsLabels.add("unitPrice x " + i + " = " + dp[i]);

        return optionsLabels;
    }

    static String createOptionLabel(PricingOption opt, double candidate) {
        return opt.quantity() + "-for-" + opt.price() + " -> " + candidate;
    }

    static String createUnitPriceEntry(int n, double unitPrice) {
        return n + " x " + unitPrice + " = " + n*unitPrice + " kr";
    }

    static List<String> createBestPriceList(List<PathEntry> path, PricingOption opt, int i, double unitPrice) {
        List<String> best = new ArrayList<>();
        int quantity = opt.quantity();
        int remaining = i - quantity;

        if(opt.stackable()) {
            best = new ArrayList<>(path.get(i - quantity).stringPath());
        }
        else if(remaining > 0) {
            best.add(createUnitPriceEntry(remaining, unitPrice));
        }

        best.add(quantity + "-for-" + opt.price() + (opt.stackable() ? "" : " (non-stackable)"));

        return best;
    }

    static List<PricingOption> createAppliedRules(List<PathEntry> path, PricingOption opt, int i) {
        List<PricingOption> newAppliedRules;
        int quantity = opt.quantity();

        if(i == quantity) {
            newAppliedRules = new ArrayList<>();
        }
        else {
            List<PricingOption> stillActiveRules = path.get(i - quantity).appliedRules();
            newAppliedRules = new ArrayList<>(stillActiveRules);
        }

        newAppliedRules.add(opt);

        return newAppliedRules;
    }
}
