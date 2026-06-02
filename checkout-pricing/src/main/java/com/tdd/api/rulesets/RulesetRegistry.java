package com.tdd.api.rulesets;

import com.tdd.api.data.DataRegistry;
import com.tdd.api.rulesets.data.Ruleset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RulesetRegistry implements DataRegistry<Ruleset> {
    private static final Logger logger = LoggerFactory.getLogger(RulesetRegistry.class);

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
        logger.debug("Saving ruleset {} {}", name, ruleset);
        cache.put(name, ruleset);
        repository.save(name, ruleset);
    }

    public Set<String> listNames() {
        Set<String> names = cache.keySet();
        logger.debug("Ruleset names {}", names);
        return names;
    }

    public void loadAll() {
        for (String name : repository.list()) {
            cache.put(name, repository.load(name));
        }
    }
}