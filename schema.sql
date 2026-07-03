-- Blog API — Database Schema
-- Run this file to create all required tables from scratch.
-- Safe to run multiple times — IF NOT EXISTS prevents errors.

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT NOT NULL,
  author     VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);