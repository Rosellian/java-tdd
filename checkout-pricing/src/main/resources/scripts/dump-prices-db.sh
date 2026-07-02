#!/usr/bin/env bash

DB="pricelists"
USER="postgres"
HOST="localhost"

echo "----------------------------------------"
echo "PRICE DATABASE CONTENT ($DB)"
echo "----------------------------------------"

echo ""
echo "Listing tables..."
psql -h $HOST -U $USER -d $DB -c "\dt"

echo ""
echo "price_lists:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM price_lists ORDER BY name;"

echo ""
echo "prices:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM prices ORDER BY list_id, sku;"
