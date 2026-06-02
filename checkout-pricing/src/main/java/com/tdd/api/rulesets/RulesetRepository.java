package com.tdd.api.rulesets;

import com.tdd.api.data.DataRepository;
import com.tdd.api.rulesets.data.Ruleset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

import static com.tdd.api.rulesets.RepositoryUtils.*;

@Repository
public class RulesetRepository implements DataRepository<Ruleset> {
    private static final Logger logger = LoggerFactory.getLogger(RulesetRepository.class);

    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper = new ObjectMapper();

    public RulesetRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Ruleset load(String name) {
        try {
            String json = jdbc.queryForObject(LOAD_RULESET, String.class, name);
            logger.debug("Loaded ruleset json {}", json);

            Ruleset ruleset = mapper.readValue(json, Ruleset.class);
            logger.debug("Loaded ruleset {}", ruleset);
            return ruleset;
        } catch (EmptyResultDataAccessException e) {
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to load ruleset " + name, e);
        }
    }

    @Override
    public void save(String name, Ruleset ruleset) {
        try {
            String json = mapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(ruleset);
            logger.debug("Saving ruleset json {}", json);

            String query = getSaveByDialect(jdbc);
            logger.debug("using {}", query);

            jdbc.update(query, name, ruleset.getVersion(), json);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save ruleset " + name, e);
        }
    }

    @Override
    public List<String> list() {
        try {
            List<String> names = jdbc.queryForList(LIST_RULESETS, String.class);
            logger.debug("Loaded list of ruleset names {}", names);
            return names;
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to load ruleset list names", e);
        }
    }
}
