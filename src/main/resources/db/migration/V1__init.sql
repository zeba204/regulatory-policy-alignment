-- ============================================================
-- V1: Initial Schema
-- Matches entities: PolicyRecord, User
-- ============================================================

-- Table: users
-- Matches entity: User (id, username, password)
CREATE TABLE IF NOT EXISTS users (
    id       BIGSERIAL    PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Table: policy_record
-- Matches entity: PolicyRecord (id, policyName→policy_name, description, category, status)
CREATE TABLE IF NOT EXISTS policy_record (
    id          BIGSERIAL    PRIMARY KEY,
    policy_name VARCHAR(50)  NOT NULL,
    description VARCHAR(200) NOT NULL,
    category    VARCHAR(255) NOT NULL,
    status      VARCHAR(255) NOT NULL
);

-- Indexes for policy_record
CREATE INDEX IF NOT EXISTS idx_policy_name     ON policy_record (policy_name);
CREATE INDEX IF NOT EXISTS idx_policy_category ON policy_record (category);
CREATE INDEX IF NOT EXISTS idx_policy_status   ON policy_record (status);
