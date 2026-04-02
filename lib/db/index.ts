import Database from 'better-sqlite3';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';
import fs from 'fs';

let _db: BetterSQLite3Database<typeof schema> | null = null;

export function getDb() {
    if (_db) return _db;

    const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'discovery.db');

    // Ensure the data directory exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const sqlite = new Database(DB_PATH);
    sqlite.pragma('journal_mode = WAL');

    // Create table if not exists
    sqlite.exec(`
        CREATE TABLE IF NOT EXISTS briefs (
            id TEXT PRIMARY KEY,
            client_name TEXT NOT NULL,
            client_email TEXT NOT NULL,
            business_type TEXT,
            challenges TEXT,
            goals TEXT,
            scope TEXT,
            budget TEXT,
            timeline TEXT,
            summary TEXT,
            raw_answers TEXT,
            created_at INTEGER NOT NULL
        )
    `);

    _db = drizzle(sqlite, { schema });
    return _db;
}
