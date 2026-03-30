import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/src/db/schema";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "db", "shorturl.db");

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbPath);

// Create table if not exists (no migration runner needed)
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    original_url TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    ip TEXT,
    clicks INTEGER NOT NULL DEFAULT 0
  );
  CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
  CREATE INDEX IF NOT EXISTS idx_links_expires_at ON links(expires_at);
`);

export const db = drizzle(sqlite, { schema });
