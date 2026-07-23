#!/usr/bin/env bash

DB="resources"
USER="postgres"
HOST="localhost"

echo "----------------------------------------"
echo "RESOURCE DATABASE CONTENT ($DB)"
echo "----------------------------------------"

echo ""
echo "Listing tables..."
psql -h $HOST -U $USER -d $DB -c "\dt"

echo ""
echo "resource_lists:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM resource_lists ORDER BY name;"

echo ""
echo "resources:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM resources ORDER BY list_id;"
