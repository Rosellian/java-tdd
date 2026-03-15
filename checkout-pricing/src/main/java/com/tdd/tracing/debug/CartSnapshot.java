package com.tdd.tracing.debug;

import java.util.List;
import java.util.Map;

public record CartSnapshot(List<CartItem> items, CustomerInfo customer, Map<String, Object> context) {}