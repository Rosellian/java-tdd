package com.tdd.config.rulesets;

import com.tdd.api.rulesets.RulesetRegistry;
import com.tdd.api.rulesets.RulesetRepository;
import com.tdd.api.rulesets.data.Ruleset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.UUID;

@Component
public class RulesetDataLoader {
    private static final Logger logger = LoggerFactory.getLogger(RulesetDataLoader.class);

    private final RulesetRepository repository;
    private final ObjectMapper mapper = new ObjectMapper();
    private final RulesetRegistry registry;

    public RulesetDataLoader(RulesetRepository repository, RulesetRegistry registry) {
        this.repository = repository;
        this.registry = registry;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loadSamples() {
        loadSample("Default");
        loadSample("CampaignA");
        loadSample("CampaignB");
        loadSample("NoCrossNoSku-Discount");

        registry.loadAll();
    }

    private void loadSample(String name) {
        if (repository.loadEntryByName(name) != null) {
            logger.info("Ruleset '{}' already exists. Skipping import.", name);
            return;
        }

        try (InputStream is = getClass().getResourceAsStream("/samples/" + name + ".json")) {
            if (is == null) {
                logger.warn("Sample ruleset '{}' is missing from /samples folder.", name);
                return;
            }

            var ruleset = mapper.readValue(is, Ruleset.class);
            var rulesetWithID = new Ruleset(UUID.randomUUID(), ruleset.name(), ruleset.version(), ruleset.rules());

            repository.save(rulesetWithID);

            logger.info("Imported sample ruleset: {}", name);
        } catch (Exception e) {
            logger.error("Failed to import sample ruleset '{}': {}", name, e.getMessage(), e);
        }
    }
}
