package com.tdd.api.rulesets;

import com.tdd.api.data.DataController;
import com.tdd.api.rulesets.data.Ruleset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(value = "/api/rulesets", produces = "application/json; charset=utf-8")
public class RulesetController implements DataController<Ruleset> {
    private static final Set<String> PROTECTED = Set.of(
            "default", "campaigna", "campaignb", "nocrossnoskudiscount"
    );
    private static final Logger logger = LoggerFactory.getLogger(RulesetController.class);
    private final RulesetRegistry registry;

    public RulesetController(RulesetRegistry registry) {
        this.registry = registry;
    }

    @Override
    public Set<String> list() {
        logger.info("Incoming request for list of rulesets");
        Set<String> rulesets = registry.listNames();
        logger.info("Returning available rulesets {}", rulesets);

        return rulesets;
    }

    @Override
    public Ruleset load(String name) {
        logger.info("Incoming request for ruleset {}", name);
        Ruleset ruleset = registry.get(name);
        logger.info("Response {}", ruleset);

        return ruleset;
    }

    @Override
    public void save(String name, Ruleset ruleset) {
        logger.info("Incoming request to save ruleset {}: {}", name, ruleset);
        registry.save(name, ruleset);
    }

    @Override
    public ResponseEntity<Void> delete(String name) {
        logger.info("Incoming request to delete ruleset {}", name);

        String normalizedName = name.replace(" ", "").toLowerCase();
        if(PROTECTED.contains(normalizedName)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        registry.delete(name);

        return ResponseEntity.noContent().build();
    }
}
