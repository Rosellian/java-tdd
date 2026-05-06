package com.tdd.calculation.dp.utility;

import com.tdd.rules.PricingOption;

import java.util.List;

public record PathEntry(List<String> stringPath, List<PricingOption> appliedRules) {}