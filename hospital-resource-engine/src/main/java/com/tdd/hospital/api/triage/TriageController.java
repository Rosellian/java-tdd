package com.tdd.hospital.api.triage;

import com.tdd.hospital.database.DataList;
import com.tdd.hospital.engine.triage.TriageEngine;
import com.tdd.hospital.engine.triage.TriageResult;
import com.tdd.hospital.engine.triage.rules.TriageService;
import com.tdd.hospital.engine.triage.rules.database.dto.TriageRuleDTO;
import com.tdd.hospital.patients.Patient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/triage")
public class TriageController {
    private static final Logger logger = LoggerFactory.getLogger(TriageController.class);

    private final TriageEngine engine;
    private final TriageService service;

    public TriageController(TriageEngine engine, TriageService service) {
        this.engine = engine;
        this.service = service;
    }

    @PostMapping
    public TriageResult triage(@RequestBody Patient patient) {
        logger.info("Request to run triage for patient: {}", patient);

        return run(patient);
    }

    private TriageResult run(Patient patient) {
        TriageResult result = engine.evaluate(patient);
        logger.info("Triage result: {}", result);

        return result;
    }

    @GetMapping("/rules")
    public List<DataList> getLists() {
        logger.info("Request for all triage rule lists");

        List<DataList> lists = service.getLists();
        logger.info("Response returned triage rule lists: {}", lists);

        return lists;
    }

    @GetMapping("/rules/{listId}")
    public List<TriageRuleDTO> getList(@PathVariable UUID listId) {
        logger.info("Request for triage rule list with id: {}", listId);

        List<TriageRuleDTO> rules = service.getList(listId);
        logger.info("Response triage rule list: {}", rules);

        return rules;
    }

    @PostMapping("/rules")
    public void save(@RequestBody TriageRuleListRequest request) {
        logger.info("Request to save triage rule list");

        service.save(request.list(), request.rules());
    }

    @GetMapping("/levels")
    public List<String> getLevels() {
        logger.info("Request for all triage levels");

        List<String> levels = service.getLevels();
        logger.info("Response returned triage levels: {}", levels);

        return levels;
    }
}
