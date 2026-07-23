package com.tdd.hospital.engine.triage.rules;

import com.tdd.hospital.database.DataList;
import com.tdd.hospital.engine.triage.rules.database.TriageRepository;
import com.tdd.hospital.engine.triage.rules.database.TriageRuleDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TriageService {
    private static final Logger logger = LoggerFactory.getLogger(TriageService.class);

    private final TriageRepository repository;

    public TriageService(TriageRepository repository) {
        this.repository = repository;
    }

    //TODO refactor to reuse more code

    public List<DataList> getLists() {
        logger.info("Getting rule lists");

        List<DataList> lists = repository.getLists();
        logger.info("Retrieved rule lists: {}", lists);

        return lists;
    }

    public List<TriageRuleDTO> getList(UUID id) {
        logger.info("Getting rule list with id: {}", id);

        List<TriageRuleDTO> rules = repository.getList(id);
        logger.info("Retrieved rules {}", rules);

        return rules;
    }

    public void save(DataList list, List<TriageRuleDTO> rules) {
        logger.info("Saving rule list {} {}", list, rules);

        repository.saveList(list, rules);
        logger.info("Saved rule list");
    }
}
