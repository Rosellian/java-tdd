package com.tdd.tracing.debug;

import java.time.Instant;
import java.util.List;

public class PricingTraceCollector {
    private final PricingTrace trace = new PricingTrace();

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

    public void recordStep(StepTrace st) {
        trace.getSteps().add(st);
        trace.getPriceEvolution().add(st.getPriceAfter());
    }

    public void recordStep(String step, String description, double before, double after) {
        StepTrace st = new StepTrace();
        st.setStep(step);
        st.setDescription(description);
        st.setPriceBefore(before);
        st.setPriceAfter(after);

        trace.getSteps().add(st);
        trace.getPriceEvolution().add(after);
    }

    public void recordDP(DPTrace dp) {
        trace.getDp().add(dp);
    }

    public void recordDP(String stateLabel, List<String> options, String chosen, double priceAfter) {
        DPTrace dp = new DPTrace();
        dp.setState(stateLabel);
        dp.setOptions(options);
        dp.setChosen(chosen);
        dp.setPrice(priceAfter);

        trace.getDp().add(dp);
    }

    public void setFinalPrice(double finalPrice) {
        trace.setFinalPrice(finalPrice);
    }

    public PricingTrace build() {
        return trace;
    }
}
