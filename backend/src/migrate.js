const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Database connection
const client = new Client({
  connectionString: `${process.env.POSTGRES_URL_NON_POOLING}?sslmode=require`,
  ssl: {
    rejectUnauthorized: false
  }
});

// Migration files directory
const migrationsDir = path.join(__dirname, '../migrations');

// Create migration tracking table
async function createMigrationTable() {
  try {
    await client.query('DROP TABLE IF EXISTS schema_migrations');
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✓ Migration tracking table ready');
  } catch (error) {
    console.error('Error creating migration table:', error);
    process.exit(1);
  }
}

// Get executed migrations
async function getExecutedMigrations() {
  try {
    const result = await client.query(
      'SELECT migration_name FROM schema_migrations ORDER BY migration_name'
    );
    return result.rows.map(row => row.migration_name);
  } catch (error) {
    console.error('Error getting executed migrations:', error);
    return [];
  }
}

// Execute migration file
async function executeMigration(migrationFile) {
  try {
    const sqlContent = fs.readFileSync(migrationFile, 'utf8');
    await client.query(sqlContent);
    
    const migrationName = path.basename(migrationFile);
    await client.query(
      'INSERT INTO schema_migrations (migration_name) VALUES ($1)',
      [migrationName]
    );
    
    console.log(`✓ Successfully executed: ${migrationName}`);
    return true;
  } catch (error) {
    console.error(`✗ Error executing ${path.basename(migrationFile)}:`, error.message);
    return false;
  }
}

// Main migration function
async function runMigrations() {
  console.log('Empire Lane Limo Database Migration');
  console.log('========================================');
  
  try {
    // Connect to database
    await client.connect();
    console.log('✓ Connected to database');
    
    // Create migration tracking table
    await createMigrationTable();
    
    // Get migration files
    if (!fs.existsSync(migrationsDir)) {
      console.log('No migrations directory found');
      return;
    }
    
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort()
      .map(file => path.join(migrationsDir, file));
    
    if (migrationFiles.length === 0) {
      console.log('No migration files found');
      return;
    }
    
    // Get executed migrations
    const executedMigrations = await getExecutedMigrations();
    
    // Find pending migrations
    const pendingMigrations = migrationFiles.filter(file => {
      const migrationName = path.basename(file);
      return !executedMigrations.includes(migrationName);
    });
    
    if (pendingMigrations.length === 0) {
      console.log('✓ All migrations are up to date');
      return;
    }
    
    console.log(`\nExecuting ${pendingMigrations.length} pending migration(s):`);
    console.log('----------------------------------------');
    
    let successCount = 0;
    for (const migrationFile of pendingMigrations) {
      if (await executeMigration(migrationFile)) {
        successCount++;
      } else {
        console.log('Migration failed, stopping execution');
        break;
      }
    }
    
    console.log('----------------------------------------');
    console.log(`✓ Successfully executed ${successCount} migration(s)`);
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await client.end();
  }
}

// Run migrations if called directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
