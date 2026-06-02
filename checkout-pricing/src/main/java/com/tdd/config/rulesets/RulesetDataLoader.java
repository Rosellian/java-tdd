package com.tdd.config.rulesets;

import com.tdd.api.rulesets.RulesetRegistry;
import com.tdd.api.rulesets.RulesetRepository;
import com.tdd.api.rulesets.data.Ruleset;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;

@Component
public class RulesetDataLoader {

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
        loadSample("NoCrossNoSkuDiscount");

        registry.loadAll();
    }

    private void loadSample(String name) {
        if (repository.load(name) != null) {
            return;
        }

        try (InputStream is = getClass().getResourceAsStream("/samples/" + name + ".json")) {
            if (is == null) {
                System.err.println("Sample missing: " + name);
                return;
            }

            Ruleset ruleset = mapper.readValue(is, Ruleset.class);
            repository.save(name, ruleset);

            System.out.println("Imported sample ruleset: " + name);
        } catch (Exception e) {
            System.err.println("Failed to import sample " + name + ": " + e.getMessage());
        }
    }
}
