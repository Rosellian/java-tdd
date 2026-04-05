package com.tdd.tracing;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;

import java.util.ArrayList;
import java.util.List;

public class RuleTracer {
    private final List<RuleTraceEvent> events = new ArrayList<>();

    public void log(String ruleName, boolean applied, RuleDelta delta, RuleContext before, RuleContext after,
                    int stepIndex) {
        events.add(new RuleTraceEvent(ruleName, applied, delta, before, after, stepIndex));
    }

    public List<RuleTraceEvent> getEvents() {
        return events;
    }

    public void print() {
        for (var e : events) {
            String logEntry = "→ Rule: " + e.ruleName() +
                    "   Applied: " + e.applied() +
                    "   Delta: " + e.delta() +
                    "   Before: " + e.before() +
                    "   After: " + e.after() +
                    "\n";

            System.out.println(logEntry);
        }
    }
}
