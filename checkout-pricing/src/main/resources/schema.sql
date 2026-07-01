-- Runs against primary data source (h2)
CREATE TABLE IF NOT EXISTS rulesets (
    id          UUID PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    version     INT NOT NULL,
    json        TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);