package com.tdd.logging;

import com.tdd.engine.RuleContext;
import com.tdd.engine.RuleDelta;

import java.util.ArrayList;
import java.util.List;

public class RuleDebugger {
    private final List<RuleDebugEvent> events = new ArrayList<>();

    public void log(String ruleName, boolean applied, RuleDelta delta, RuleContext before, RuleContext after) {
        events.add(new RuleDebugEvent(ruleName, applied, delta, before, after));
    }

    public List<RuleDebugEvent> getEvents() {
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
