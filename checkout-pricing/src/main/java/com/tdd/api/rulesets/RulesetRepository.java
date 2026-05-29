package com.tdd.api.rulesets;

import com.tdd.api.data.DataRepository;
import com.tdd.api.rulesets.data.Ruleset;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

import static com.tdd.api.rulesets.RepositoryUtils.*;

@Repository
public class RulesetRepository implements DataRepository<Ruleset> {
    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper = new ObjectMapper();

    public RulesetRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Ruleset load(String name) {
        try {
            String json = jdbc.queryForObject(LOAD_RULESET, String.class, name);

            return mapper.readValue(json, Ruleset.class);
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

            String query = getSaveByDialect(jdbc);

            jdbc.update(query, name, ruleset.getVersion(), json);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save ruleset " + name, e);
        }
    }

    @Override
    public List<String> list() {
        return jdbc.queryForList(LIST_RULESETS, String.class);
    }
}
