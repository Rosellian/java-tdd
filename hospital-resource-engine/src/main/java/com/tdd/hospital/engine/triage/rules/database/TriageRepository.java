package com.tdd.hospital.engine.triage.rules.database;

import com.tdd.hospital.database.DataEntry;
import com.tdd.hospital.database.DataList;
import com.tdd.hospital.database.DataRepository;
import com.tdd.hospital.engine.triage.rules.TriageRule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.engine.triage.rules.database.RepositoryUtils.*;

@Repository
public class TriageRepository implements DataRepository<TriageRule> {
    private static final Logger logger = LoggerFactory.getLogger(TriageRepository.class);

    private final JdbcTemplate jdbcTemplate;

    public TriageRepository(@Qualifier("triageJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //TODO refactor to reuse more code

    @Override
    public List<DataList> getLists() {
        try {
            logger.info("Loading rule lists");

            List<DataList> lists = jdbcTemplate.query(GET_RULE_LISTS, listRowMapper);
            logger.info("Loaded rule lists {}", lists);

            return lists;
        }  catch (Exception e) {
            logger.error("Failed to load rule lists", e);
            return null;
        }
    }

    @Override
    public List<TriageRule> getList(UUID listId) {
        try {
            logger.info("Loading rule list by id: {}", listId);
            List<String> ruleData = jdbcTemplate.queryForList(GET_RULES, String.class, listId);

            List<TriageRule> rules = readRuleData(ruleData);
            logger.info("Loaded rule list: {}", rules);

            return rules;
        }  catch (Exception e) {
            logger.error("Failed to load rule list", e);
            return null;
        }
    }

    @Override
    public void saveList(DataList list, List<TriageRule> rules) {
        try {
            logger.info("Saving rule list: {}", list);
            jdbcTemplate.update(SAVE_RULE_LIST, list.id(), list.name(), list.version());

            logger.info("Deleting rules in list {}", list);
            jdbcTemplate.update(DELETE_RULES_IN_LIST, list.id());

            saveRules(list, rules);

            logger.info("Saved rule list {} {}", list, rules);
        }  catch (Exception e) {
            logger.error("Failed to save rule lists", e);
        }
    }

    private void saveRules(DataList list, List<TriageRule> rules) {
        logger.info("Saving rules in list {} {}", list, rules);

        rules.stream()
                .map(patient -> toEntry(patient, list.id()))
                .forEach(this::saveRule);
    }

    private void saveRule(DataEntry rule) {
        logger.info("Saving rule data as json {}", rule);

        jdbcTemplate.update(SAVE_RULE, rule.id(), rule.listId(), rule.data());
    }
}
