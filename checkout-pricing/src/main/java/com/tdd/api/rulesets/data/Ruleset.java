package com.tdd.api.rulesets.data;

import com.tdd.api.rulesets.data.rules.Rule;

import java.util.List;

public class Ruleset {
    private String name;
    private String version;
    private List<Rule> rules;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }

    public List<Rule> getRules() {
        return rules;
    }
    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }
}
