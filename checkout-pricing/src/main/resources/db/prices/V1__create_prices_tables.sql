CREATE TABLE price_lists (
    name        VARCHAR(255) PRIMARY KEY,
    version     VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prices (
    id          SERIAL PRIMARY KEY,
    list_name   VARCHAR(255) NOT NULL REFERENCES price_lists(name) ON DELETE CASCADE,
    sku         VARCHAR(255) NOT NULL,
    price       NUMERIC(10,2) NOT NULL
);

CREATE INDEX idx_prices_list_name ON prices(list_name);
CREATE INDEX idx_prices_sku ON prices(sku);