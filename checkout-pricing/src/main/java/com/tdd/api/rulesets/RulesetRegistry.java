package com.tdd.api.rulesets;

import com.tdd.api.data.DataRegistry;
import com.tdd.api.rest.ruleset.Ruleset;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RulesetRegistry implements DataRegistry<Ruleset> {
    private final RulesetRepository repository;
    private final Map<String, Ruleset> cache = new ConcurrentHashMap<>();

    public RulesetRegistry(RulesetRepository repository) {
        this.repository = repository;
        loadAll();
    }

    public Ruleset get(String name) {
        return cache.get(name);
    }

    public void save(String name, Ruleset ruleset) {
        cache.put(name, ruleset);
        repository.save(name, ruleset);
    }

    public Set<String> listNames() {
        return cache.keySet();
    }

    public void loadAll() {
        for (String name : repository.list()) {
            cache.put(name, repository.load(name));
        }
    }
}