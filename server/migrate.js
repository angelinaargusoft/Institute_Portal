const fs = require("fs");
const path = require("path");
const pool = require("./config/database");

async function runMigrations() {
  try {
    const migrationDir = path.join(__dirname, "db_migrations");
    const files = fs.readdirSync(migrationDir).sort();
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationDir, file), "utf8");
      console.log(`Running migration: ${file}`);
      await pool.query(sql);
    }
    console.log("All migrations applied");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

runMigrations();





