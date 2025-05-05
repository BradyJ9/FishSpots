# init_db.sh
#!/bin/bash

# Database credentials
DB_NAME="fishspots"
DB_USER="postgres"
DB_PWD="fishspots"
DB_HOST=localhost
DB_PORT=5432


# Check if the database exists
DB_EXISTS=$(PGPASSWORD=$DB_PWD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -lqt | cut -d \| -f 1 | grep -w $DB_NAME)

if [ "$DB_EXISTS" ]; then
    echo "Database $DB_NAME already exists."
else
    # Create the database
    PGPASSWORD=$DB_PWD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -c "CREATE DATABASE $DB_NAME;"
    echo "Database $DB_NAME created."
fi

# Set up the schema and data
PGPASSWORD=$DB_PWD psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f init-dev.sql
