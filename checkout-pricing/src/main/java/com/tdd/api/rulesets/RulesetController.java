package com.tdd.api.rulesets;

import com.tdd.api.data.DataController;
import com.tdd.api.rest.ruleset.Ruleset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/rulesets")
public class RulesetController implements DataController<Ruleset> {
    private static final Logger logger = LoggerFactory.getLogger(RulesetController.class);
    private final RulesetRegistry registry;

    public RulesetController(RulesetRegistry registry) {
        this.registry = registry;
    }

    @GetMapping
    public Set<String> list() {
        logger.info("Incoming request for list of rulesets");
        Set<String> rulesets = registry.listNames();
        logger.info("Returning available rulesets {}", rulesets);

        return rulesets;
    }

    @GetMapping("/{name}")
    public Ruleset load(@PathVariable String name) {
        logger.info("Incoming request for ruleset {}", name);
        Ruleset ruleset = registry.get(name);
        logger.info("Response {}", ruleset);

        return ruleset;
    }

    @PostMapping("/{name}")
    public void save(@PathVariable String name, @RequestBody Ruleset ruleset) {
        logger.info("Incoming request to save ruleset {}: {}", name, ruleset);
        registry.save(name, ruleset);
    }
}
