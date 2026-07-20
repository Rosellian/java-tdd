#!/usr/bin/env bash

DB_NAME="patients"
DB_USER="postgres"

echo "----------------------------------------"
echo " Dropping database: $DB_NAME"
echo "----------------------------------------"
sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"

echo "----------------------------------------"
echo " Creating database: $DB_NAME"
echo "----------------------------------------"
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

echo "----------------------------------------"
echo " Verifying database exists"
echo "----------------------------------------"
sudo -u postgres psql -c "\l" | grep "$DB_NAME"

echo "----------------------------------------"
echo " Database reset complete"
echo " Start your Spring Boot app to let Flyway run V1"
echo "----------------------------------------"
