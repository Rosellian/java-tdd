#!/usr/bin/env bash

DB="triage"
USER="postgres"
HOST="localhost"

echo "----------------------------------------"
echo "TRIAGE DATABASE CONTENT ($DB)"
echo "----------------------------------------"

echo ""
echo "Listing tables..."
psql -h $HOST -U $USER -d $DB -c "\dt"

echo ""
echo "rule_lists:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM rule_lists ORDER BY name;"

echo ""
echo "rules:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM rules ORDER BY list_id;"
