package com.tdd.tracing.debug;

public class PricingTraceCollector {
    private PricingTrace trace = new PricingTrace();

    public void recordRule(RuleTrace rt) {
        trace.rules().add(rt);
        trace.priceEvolution().add(rt.after());
    }

    public void recordStep(StepTrace st) {
        trace.steps().add(st);
        trace.priceEvolution().add(st.priceAfter());
    }

    public void recordDP(DPTrace dp) {
        trace.dp().add(dp);
    }

    public PricingTrace build() {
        return trace;
    }
}
