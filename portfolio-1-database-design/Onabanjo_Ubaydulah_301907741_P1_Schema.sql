-- Realtime Leaderboard for Live CTF Competition: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."team" (
  "id" bigint NOT NULL,
  "team_name" text NOT NULL,
  "created_at" timestamptz NOT NULL,
  CONSTRAINT "pk_team" PRIMARY KEY ("id"),
  CONSTRAINT "uq_team_0" UNIQUE ("team_name")
);
CREATE TABLE portfolio."challenge" (
  "id" bigint NOT NULL,
  "challenge_name" text NOT NULL,
  "points" bigint NOT NULL,
  "is_active" boolean NOT NULL,
  CONSTRAINT "pk_challenge" PRIMARY KEY ("id"),
  CONSTRAINT "uq_challenge_0" UNIQUE ("challenge_name")
);
CREATE TABLE portfolio."submission" (
  "id" bigint NOT NULL,
  "team_id" bigint NOT NULL,
  "challenge_id" bigint NOT NULL,
  "submitted_at" timestamptz NOT NULL,
  "verdict" text NOT NULL,
  CONSTRAINT "pk_submission" PRIMARY KEY ("id")
);
ALTER TABLE portfolio."submission" ADD CONSTRAINT "fk_submission_0" FOREIGN KEY ("team_id") REFERENCES portfolio."team" ("id");
ALTER TABLE portfolio."submission" ADD CONSTRAINT "fk_submission_1" FOREIGN KEY ("challenge_id") REFERENCES portfolio."challenge" ("id");
ALTER TABLE portfolio."challenge" ADD CONSTRAINT "positive_challenge_points" CHECK ("points" > 0);
ALTER TABLE portfolio."submission" ADD CONSTRAINT "valid_submission_verdict" CHECK (("verdict" = 'accepted') OR ("verdict" = 'rejected'));
CREATE UNIQUE INDEX "one_accepted_solve" ON portfolio."submission" ("team_id", "challenge_id") WHERE ("verdict" = 'accepted');
COMMIT;
