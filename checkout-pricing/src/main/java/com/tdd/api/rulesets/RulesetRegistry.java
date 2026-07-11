package com.tdd.api.rulesets;

import com.tdd.api.data.DataRegistry;
import com.tdd.api.rulesets.data.CachedRuleset;
import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.RulesetEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import static com.tdd.api.rulesets.data.CachedRuleset.from;
import static java.util.stream.Collectors.toSet;

@Component
public class RulesetRegistry implements DataRegistry<Ruleset, RulesetEntry> {
    private static final Logger logger = LoggerFactory.getLogger(RulesetRegistry.class);

    private final RulesetRepository repository;
    private final Map<UUID, CachedRuleset> cache = new ConcurrentHashMap<>();

    public RulesetRegistry(RulesetRepository repository) {
        this.repository = repository;
        loadAll();
    }

    public Ruleset get(UUID id) {
        CachedRuleset ruleset = cache.get(id);

        return ruleset != null ? ruleset.ruleset() : null;
    }

    public void save(Ruleset ruleset) {
        UUID id = ruleset.id();
        logger.debug("Saving ruleset {} {}", id, ruleset);
        cache.put(id, from(ruleset));
        repository.save(ruleset);
    }

    @Override
    public void delete(UUID id) {
        logger.debug("Deleting ruleset with id {}", id);
        cache.remove(id);
        repository.delete(id);
    }

    public Set<RulesetEntry> list() {
        Set<RulesetEntry> entries = getCachedEntries();
        logger.debug("Rulesets {}", entries);

        return entries;
    }

    public void loadAll() {
        for (RulesetEntry entry : repository.list()) {
            UUID id = entry.id();
            Ruleset ruleset = repository.load(id);
            cache.put(id, from(ruleset));
        }
    }

    private Set<RulesetEntry> getCachedEntries() {
        return cache.values().stream()
                .map(CachedRuleset::entry)
                .collect(toSet());
    }
}