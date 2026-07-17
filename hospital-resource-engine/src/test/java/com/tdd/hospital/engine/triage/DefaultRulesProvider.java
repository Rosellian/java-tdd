package com.tdd.hospital.engine.triage;

import com.tdd.hospital.engine.triage.rules.TriageConfig;
import com.tdd.hospital.engine.triage.rules.TriageRule;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;

import java.util.List;
import java.util.stream.Stream;

public class DefaultRulesProvider implements ArgumentsProvider {

    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
        List<TriageRule> rules = new TriageConfig().defaultRules();

        return rules.stream().map(Arguments::of);
    }
}
