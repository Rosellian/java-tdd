package com.tdd.tracing.debug;

import java.util.List;
import java.util.Map;

public record CustomerInfo(
        String id,
        String segment,
        Map<String, Object> basicInfo,
        Map<String, Object> metadata,
        List<Map<String, Object>> recentOrders,
        Map<String, Object> preferences
) {}