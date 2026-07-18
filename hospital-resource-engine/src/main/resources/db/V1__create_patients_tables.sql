CREATE TABLE patient_lists (
    id          UUID PRIMARY KEY,
    name        VARCHAR(255),
    version     VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
    id          UUID PRIMARY KEY,
    list_id     UUID NOT NULL REFERENCES patient_lists(id) ON DELETE CASCADE,
    data        TEXT NOT NULL
);

CREATE INDEX idx_patient_list_id ON patients(list_id);