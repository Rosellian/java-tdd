package com.tdd.hospital.api.triage;

import com.tdd.hospital.database.DataList;
import com.tdd.hospital.engine.triage.rules.TriageRule;

import java.util.List;

public record TriageRuleListRequest(
        DataList list,
        List<TriageRule> rules
) {}
