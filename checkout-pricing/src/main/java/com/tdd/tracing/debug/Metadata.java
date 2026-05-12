package com.tdd.tracing.debug;

public class Metadata {
    private String ruleset;
    private String timestamp;
    private String engineVersion;

    public String getRuleset() {
        return ruleset;
    }

    public void setRuleset(String ruleset) {
        this.ruleset = ruleset;
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

    public static Metadata from(String ruleset, String timestamp, String engineVersion) {
        Metadata metadata = new Metadata();
        metadata.ruleset = ruleset;
        metadata.timestamp = timestamp;
        metadata.engineVersion = engineVersion;

        return metadata;
    }
}