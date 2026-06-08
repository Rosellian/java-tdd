package com.tdd.tracing.debug;

import java.time.Instant;

public record Metadata(
        String ruleset,
        String timestamp,
        String engineVersion
) {

    public static Metadata from(String ruleset, String engineVersion) {
        String timestamp = Instant.now().toString();

        return new Metadata(ruleset, engineVersion, timestamp);
    }
}