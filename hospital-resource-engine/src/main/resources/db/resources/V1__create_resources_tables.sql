CREATE TABLE resource_lists (
    id          UUID PRIMARY KEY,
    name        VARCHAR(255),
    version     VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
    id          UUID PRIMARY KEY,
    list_id     UUID NOT NULL REFERENCES resource_lists(id) ON DELETE CASCADE,
    data        TEXT NOT NULL
);

CREATE INDEX idx_resource_list_id ON resources(list_id);