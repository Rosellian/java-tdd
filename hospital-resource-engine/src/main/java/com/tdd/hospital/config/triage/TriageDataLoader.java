package com.tdd.hospital.config.triage;

import com.tdd.hospital.engine.triage.rules.TriageConfig;
import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.database.DataList;
import com.tdd.hospital.engine.triage.rules.database.TriageRepository;
import com.tdd.hospital.engine.triage.rules.database.TriageRuleDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class TriageDataLoader {
    private static final Logger logger = LoggerFactory.getLogger(TriageDataLoader.class);

    private final TriageRepository repository;

    public TriageDataLoader(TriageRepository repository) {
        this.repository = repository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void run() {
        String name = "Default";

        //TODO Make more robust, maybe add more standard lists
        List<DataList> lists = repository.getLists();

        if(lists != null && !lists.isEmpty()) {
            logger.info("Triage rule list '{}' already exists. Skipping import.", lists.getFirst());
            return;
        }

        logger.info("Creating default triage rule list: {}", name);
        DataList list = new DataList(UUID.randomUUID(), name, "v1");

        List<TriageRule> rules = new TriageConfig().defaultRules();
        logger.info("Using default rules {}", rules);

        List<TriageRuleDTO> dtoRules = rules.stream().map(TriageRuleDTO::from).toList();
        logger.info("Storing as DTOs: {}", dtoRules);
        repository.saveList(list, dtoRules);
    }
}
