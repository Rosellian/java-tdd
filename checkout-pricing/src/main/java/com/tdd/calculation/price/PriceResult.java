package com.tdd.calculation.price;

import com.tdd.tracing.DPTrace;

public record PriceResult(int remaining, double discountedPrice, DPTrace dpTrace, double dpPrice, double total) {}
