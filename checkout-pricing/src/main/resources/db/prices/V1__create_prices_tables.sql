CREATE TABLE price_lists (
    id          UUID PRIMARY KEY,
    name        VARCHAR(255),
    version     VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prices (
    id          SERIAL PRIMARY KEY,
    list_id     UUID NOT NULL REFERENCES price_lists(id) ON DELETE CASCADE,
    sku         VARCHAR(255) NOT NULL,
    price       NUMERIC(10,2) NOT NULL
);

CREATE INDEX idx_prices_list_id ON prices(list_id);
CREATE INDEX idx_prices_sku ON prices(sku);