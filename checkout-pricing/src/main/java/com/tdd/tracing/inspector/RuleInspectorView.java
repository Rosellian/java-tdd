package com.tdd.tracing.inspector;

import com.tdd.tracing.DPTrace;
import com.tdd.tracing.RuleTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RuleInspectorView {
    private static final Logger logger = LoggerFactory.getLogger(RuleInspectorView.class);

    private RuleInspectorView() {}

    public static void print(RuleTrace trace) {
        for (var e : trace.events()) {
            logger.info("{\"type\":\"rule_event\",\"rule\":\"{}\",\"applied\":{},\"delta\":{},\"before\":{},\"after\":{}}",
                    e.ruleName(), e.applied(), e.delta(), e.before(), e.after());
        }

        for (var s : trace.skuTraces()) {
            logger.info("{\"type\":\"sku_breakdown\",\"sku\":\"{}\",\"count\":{},\"free\":{},\"discounted\":{},"
                            + "\"rate\":{},\"remaining\":{},\"unit_price\":{},\"discounted_price\":{},"
                            + "\"dp_price\":{},\"total\":{}}",
                    s.sku(), s.count(), s.free(), s.discounted(),
                    s.rate(), s.remaining(), s.unitPrice(), s.discountedPrice(),
                    s.dpPrice(), s.total());
        }

        for (var dp : trace.dpTraces()) {
            logDP(dp);
        }

        logger.info("{\"type\":\"final_total\",\"total\":{}}", trace.finalTotal());
    }

    private static void logDP(DPTrace dp) {
        logger.info(
                "{\"type\":\"dp_trace\","
                        + "\"sku\":\"{}\","
                        + "\"remaining\":{},"
                        + "\"nodes\":{},"
                        + "\"winning_path\":{},"
                        + "\"final_price\":{}}",
                dp.sku(),
                dp.remaining(),
                dp.nodes(),
                dp.winningPath(),
                dp.finalPrice()
        );
    }
}
