package com.tdd.config.rulesets;

import com.tdd.api.rulesets.RulesetRepository;
import com.tdd.api.rulesets.data.Ruleset;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;

@Component
public class RulesetDataLoader implements CommandLineRunner {

    private final RulesetRepository repository;
    private final ObjectMapper mapper = new ObjectMapper();

    public RulesetDataLoader(RulesetRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        loadSample("default");
        loadSample("campaignA");
        loadSample("campaignB");
        loadSample("noCrossNoSkuDiscount");
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
