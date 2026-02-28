CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  dog_name TEXT NOT NULL,
  caption TEXT,
  link TEXT,
  image_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_status ON submissions(status);
