#!/usr/bin/env bash

DB_NAME="pricelists"

echo "----------------------------------------"
echo " Verifying that database '$DB_NAME' is empty"
echo "----------------------------------------"

TABLE_COUNT=$(sudo -u postgres psql -d "$DB_NAME" -t -c \
  "SELECT count(*) FROM pg_tables WHERE schemaname='public';" | tr -d ' ')

if [ "$TABLE_COUNT" -eq 0 ]; then
    echo "✔ Database '$DB_NAME' is empty (0 tables in schema public)"
    exit 0
else
    echo "✘ Database '$DB_NAME' is NOT empty ($TABLE_COUNT tables found)"
    echo ""
    echo "Existing tables:"
    sudo -u postgres psql -d "$DB_NAME" -c "\dt"
    exit 1
fi
