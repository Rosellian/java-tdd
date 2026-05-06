package com.tdd.calculation.dp.candidate;

import com.tdd.calculation.dp.utility.PathEntry;

import java.util.List;

public record Candidate(PathEntry pathEntry, List<String> optionsLabels, String sku) {}
