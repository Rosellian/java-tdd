#!/usr/bin/env bash

DB="patients"
USER="postgres"
HOST="localhost"

echo "----------------------------------------"
echo "PATIENT DATABASE CONTENT ($DB)"
echo "----------------------------------------"

echo ""
echo "Listing tables..."
psql -h $HOST -U $USER -d $DB -c "\dt"

echo ""
echo "patient_lists:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM patient_lists ORDER BY name;"

echo ""
echo "patients:"
psql -h $HOST -U $USER -d $DB -c "SELECT * FROM patients ORDER BY list_id;"
