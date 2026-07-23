package com.tdd.hospital.engine.triage.rules.database;

import com.tdd.hospital.database.DataEntry;
import com.tdd.hospital.engine.triage.rules.TriageRule;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.database.DataRepository.*;

public class RepositoryUtils {
    private static final String lIST_TABLE_NAME = "rule_lists";
    private static final String DATA_TABLE_NAME = "rules";

    public static final String GET_RULE_LISTS = getListsQuery(lIST_TABLE_NAME);
    public static final String GET_RULES = getDataItemsQuery(DATA_TABLE_NAME);
    public static final String SAVE_RULE_LIST = saveListQuery(lIST_TABLE_NAME);
    public static final String DELETE_RULES_IN_LIST = deleteDataItemsQuery(DATA_TABLE_NAME);
    public static final String SAVE_RULE = saveDataItemQuery(DATA_TABLE_NAME);

    private static final ObjectMapper mapper = new ObjectMapper();

    private RepositoryUtils() {}

    static List<TriageRuleDTO> readRuleData(List<String> rulesData) {
        return rulesData.stream()
                .map(data -> mapper.readValue(data, TriageRuleDTO.class))
                .toList();
    }

    static DataEntry toEntry(TriageRule rule, UUID listId) {
        String json = mapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(rule);

        return new DataEntry(rule.id(), listId, json);
    }
}
