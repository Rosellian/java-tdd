package com.tdd.api.rulesets;

import com.tdd.api.data.DataController;
import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.RulesetEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/rulesets", produces = "application/json; charset=utf-8")
public class RulesetController implements DataController<Ruleset, RulesetEntry> {
    private static final Set<String> PROTECTED = Set.of(
            "default", "campaigna", "campaignb", "nocrossnosku-discount"
    );
    private static final Logger logger = LoggerFactory.getLogger(RulesetController.class);
    private final RulesetRegistry registry;

    public RulesetController(RulesetRegistry registry) {
        this.registry = registry;
    }

    @Override
    public Set<RulesetEntry> list() {
        logger.info("Incoming request for list of rulesets");
        Set<RulesetEntry> rulesets = registry.list();
        logger.info("Returning available rulesets {}", rulesets);

        return rulesets;
    }

    @Override
    public Ruleset load(UUID id) {
        logger.info("Incoming request for ruleset with id {}", id);
        Ruleset ruleset = registry.get(id);
        logger.info("Response {}", ruleset);

        return ruleset;
    }

    @Override
    public void save(UUID id, Ruleset ruleset) {
        logger.info("Incoming request to save ruleset {}: {}", id, ruleset);
        registry.save(ruleset);
    }

    @Override
    public ResponseEntity<Void> delete(UUID id) {
        logger.info("Incoming request to delete ruleset with id {}", id);

        if(isProtected(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        registry.delete(id);

        return ResponseEntity.noContent().build();
    }

    private boolean isProtected(UUID id) {
        Ruleset ruleset = registry.get(id);

        String normalizedName = ruleset.name().replace(" ", "").toLowerCase();

        return PROTECTED.contains(normalizedName);
    }
}
