package com.tdd.engine.application.rules;

import com.tdd.engine.application.rules.utility.RuleApplication;
import com.tdd.engine.utility.RuleContext;
import com.tdd.rules.SkuDiscount;
import com.tdd.rules.cross.CrossSkuRule;

import java.util.concurrent.atomic.AtomicInteger;

public interface IRuleApplier {
    RuleApplication apply(RuleContext context, CrossSkuRule rule, boolean skip, AtomicInteger stepIndex);

    RuleApplication apply(RuleContext context, SkuDiscount rule, AtomicInteger stepIndex);
}
