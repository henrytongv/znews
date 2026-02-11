-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  article_id VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  source_id VARCHAR(255),
  source_name VARCHAR(255),
  source_url TEXT,
  link TEXT NOT NULL,
  pub_date TIMESTAMP NOT NULL,
  category TEXT[],
  language VARCHAR(10),
  country TEXT[],
  keywords TEXT[],
  creator TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_id ON articles(article_id);
CREATE INDEX IF NOT EXISTS idx_pub_date ON articles(pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_created_at ON articles(created_at DESC);

-- Sync log table
CREATE TABLE IF NOT EXISTS sync_log (
  sync_date DATE PRIMARY KEY,
  articles_count INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  error_message TEXT,
  synced_at TIMESTAMP DEFAULT NOW()
);
