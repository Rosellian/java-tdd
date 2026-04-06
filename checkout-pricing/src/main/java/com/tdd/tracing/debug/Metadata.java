package com.tdd.tracing.debug;

public class Metadata {
    private String ruleSet;
    private String timestamp;
    private String engineVersion;

    public String getRuleSet() {
        return ruleSet;
    }

    public void setRuleSet(String ruleSet) {
        this.ruleSet = ruleSet;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getEngineVersion() {
        return engineVersion;
    }

    public void setEngineVersion(String engineVersion) {
        this.engineVersion = engineVersion;
    }

    public static Metadata from(String ruleSet, String timestamp, String engineVersion) {
        Metadata metadata = new Metadata();
        metadata.ruleSet = ruleSet;
        metadata.timestamp = timestamp;
        metadata.engineVersion = engineVersion;

        return metadata;
    }
}