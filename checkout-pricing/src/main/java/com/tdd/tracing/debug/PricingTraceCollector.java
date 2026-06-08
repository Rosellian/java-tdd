package com.tdd.tracing.debug;

import com.tdd.tracing.RuleTraceEvent;

import java.util.ArrayList;
import java.util.List;

public class PricingTraceCollector {
    private final PricingTrace trace = new PricingTrace();
    private final List<RuleTraceEvent> events = new ArrayList<>();

    public PricingTraceCollector() {
        this(CartSnapshot.from(new ArrayList<>()), "DEFAULT_UNDEFINED", "Default_Test_Engine");
    }

    public PricingTraceCollector(CartSnapshot cart, String ruleset, String engineVersion) {
        trace.setCart(cart);
        trace.setMetadata(Metadata.from(ruleset, engineVersion));
    }

    public void setCart(CartSnapshot cart) {
        trace.setCart(cart);
    }

    public void recordRule(RuleTrace rt) {
        trace.getRules().add(rt);
        trace.getPriceEvolution().add(rt.getAfter());
    }

    public void recordStep(String step, int stepIndex, String description, double before, double after) {
        StepTrace st = new StepTrace(step, stepIndex, description, before, after);

        trace.getSteps().add(st);
        trace.getPriceEvolution().add(after);
    }

    public void recordDP(String stateLabel, int stepIndex, List<String> options, String chosen, double price,
                         String sku) {
        DPTrace dp = new DPTrace(stateLabel, stepIndex, options, chosen, price, sku);

        trace.getDp().add(dp);
    }

    public void setFinalPrice(double finalPrice) {
        trace.setFinalPrice(finalPrice);
        trace.getPriceEvolution().add(finalPrice);
    }

    //TODO Maybe separate from collector logic
    public void addEvent(RuleTraceEvent event) {
        events.add(event);
    }
    public List<RuleTraceEvent> getEvents() { return events; }

    public PricingTrace build() {
        return trace;
    }
}
