package com.tdd.api.rulesets;

import com.tdd.api.data.DataRepository;
import com.tdd.api.rest.ruleset.Ruleset;

import java.util.List;

public class RulesetRepository implements DataRepository<Ruleset> {

    @Override
    public Ruleset load(String name) {
        return null;
    }

    @Override
    public void save(String name, Ruleset ruleset) {

    }

    @Override
    public List<String> list() {
        return List.of();
    }
}
