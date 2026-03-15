package com.tdd.tracing.debug;

import java.util.Map;

public record RuleTrace(String id, String name, boolean matched, String reason, double before, double after,
                        double delta, Map<String, Object> inputs, Map<String, Object> outputs) {}