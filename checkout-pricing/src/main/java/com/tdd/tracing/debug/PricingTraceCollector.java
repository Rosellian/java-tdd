package com.tdd.tracing.debug;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.tracing.RuleTraceEvent;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class PricingTraceCollector {
    private final PricingTrace trace = new PricingTrace();
    private final List<RuleTraceEvent> events = new ArrayList<>();

    public PricingTraceCollector() {
        this(null, "DEFAULT_UNDEFINED", "Default_Test_Engine");
    }

    public PricingTraceCollector(CartSnapshot cart, String ruleset, String engineVersion) {
        trace.setCart(cart);
        Metadata metadata = new Metadata();
        metadata.setRuleSet(ruleset);
        metadata.setEngineVersion(engineVersion);
        metadata.setTimestamp(Instant.now().toString());
        trace.setMetadata(metadata);
    }

    public void recordRule(RuleTrace rt) {
        trace.getRules().add(rt);
        trace.getPriceEvolution().add(rt.getAfter());
    }

    public void recordStep(String step, int stepIndex, String description, double before, double after) {
        StepTrace st = new StepTrace();
        st.setStep(step);
        st.setStepIndex(stepIndex);
        st.setDescription(description);
        st.setPriceBefore(before);
        st.setPriceAfter(after);

        trace.getSteps().add(st);
        trace.getPriceEvolution().add(after);
    }

    public void recordDP(String stateLabel, int stepIndex, List<String> options, String chosen, double price,
                         String sku) {
        DPTrace dp = new DPTrace();
        dp.setState(stateLabel);
        dp.setStepIndex(stepIndex);
        dp.setOptions(options);
        dp.setChosen(chosen);
        dp.setPrice(price);
        dp.setSku(sku);

        trace.getDp().add(dp);
    }

    public void setFinalPrice(double finalPrice) {
        trace.setFinalPrice(finalPrice);
        trace.getPriceEvolution().add(finalPrice);
    }

    //TODO Separate from collector logic
    public void addEvent(String ruleName, boolean applied, RuleDelta delta, RuleContext before, RuleContext after,
                         int stepIndex) {
        events.add(new RuleTraceEvent(ruleName, applied, delta, before, after, stepIndex));
    }

    public List<RuleTraceEvent> getEvents() { return events; }

    public PricingTrace build() {
        return trace;
    }
}
