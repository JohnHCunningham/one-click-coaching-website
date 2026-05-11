-- OCC Sales Copilot Database Schema
-- Run this after provisioning Vercel Postgres

-- Teams (Slack workspaces)
CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  team_name TEXT NOT NULL,
  slack_team_id TEXT UNIQUE NOT NULL,
  installed_at TIMESTAMP DEFAULT NOW(),
  plan TEXT DEFAULT 'trial', -- trial, paid, enterprise
  active BOOLEAN DEFAULT true
);

-- Users (Sales reps)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  slack_user_id TEXT UNIQUE NOT NULL,
  team_id TEXT REFERENCES teams(id),
  name TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP
);

-- Copilot Interactions (Every question asked)
CREATE TABLE IF NOT EXISTS copilot_interactions (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(slack_user_id),
  team_id TEXT REFERENCES teams(id),
  question TEXT NOT NULL,
  intent_matched TEXT, -- e.g., "explore_pain"
  response TEXT NOT NULL,
  channel TEXT, -- Slack channel ID
  slack_timestamp TEXT, -- For threading
  created_at TIMESTAMP DEFAULT NOW()
);

-- Copilot Feedback (👍 👎 button clicks)
CREATE TABLE IF NOT EXISTS copilot_feedback (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(slack_user_id),
  interaction_id INTEGER REFERENCES copilot_interactions(id),
  intent_name TEXT,
  helpful BOOLEAN NOT NULL, -- true = 👍, false = 👎
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_interactions_user ON copilot_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON copilot_interactions(created_at);
CREATE INDEX IF NOT EXISTS idx_interactions_intent ON copilot_interactions(intent_matched);
CREATE INDEX IF NOT EXISTS idx_feedback_intent ON copilot_feedback(intent_name);
CREATE INDEX IF NOT EXISTS idx_users_slack ON users(slack_user_id);
CREATE INDEX IF NOT EXISTS idx_teams_slack ON teams(slack_team_id);
