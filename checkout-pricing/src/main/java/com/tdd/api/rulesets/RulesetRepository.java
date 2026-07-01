package com.tdd.api.rulesets;

import com.tdd.api.data.DataRepository;
import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.RulesetEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.UUID;

import static com.tdd.api.rulesets.RepositoryUtils.*;

@Repository
public class RulesetRepository implements DataRepository<Ruleset, RulesetEntry> {
    private static final Logger logger = LoggerFactory.getLogger(RulesetRepository.class);

    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper = new ObjectMapper();

    public RulesetRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Ruleset load(UUID id) {
        try {
            String json = jdbc.queryForObject(LOAD_RULESET, String.class, id);
            logger.debug("Loaded ruleset json {}", json);

            Ruleset ruleset = mapper.readValue(json, Ruleset.class);
            logger.debug("Loaded ruleset {}", ruleset);

            return ruleset;
        } catch (EmptyResultDataAccessException e) {
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to load ruleset with id " + id, e);
        }
    }

    @Override
    public RulesetEntry loadEntryByName(String name) {
        try {
            RulesetEntry entry = jdbc.queryForObject(LOAD_RULESET_ENTRY_BY_NAME, rulesetRowMapper, name);
            logger.debug("Loaded ruleset entry {}", entry);

            return entry;
        } catch (EmptyResultDataAccessException e) {
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to load ruleset " + name, e);
        }
    }

    @Override
    public void save(Ruleset ruleset) {
        UUID id = ruleset.id();
        try {
            String json = mapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(ruleset);
            logger.debug("Saving ruleset json {}", json);

            String query = getSaveByDialect(jdbc);
            logger.debug("using save query {}", query);

            jdbc.update(query, id, ruleset.name(), ruleset.version(), json);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save ruleset with id " + id, e);
        }
    }

    @Override
    public void delete(UUID id) {
        try {
            logger.info("Deleting ruleset with id {}", id);
            jdbc.update(DELETE_RULESET, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete ruleset with id " + id, e);
        }
    }

    @Override
    public List<RulesetEntry> list() {
        try {
            List<RulesetEntry> entries = jdbc.query(LIST_RULESETS, rulesetRowMapper);
            logger.debug("Loaded list of ruleset entries {}", entries);

            return entries;
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to load ruleset list names", e);
        }
    }
}
