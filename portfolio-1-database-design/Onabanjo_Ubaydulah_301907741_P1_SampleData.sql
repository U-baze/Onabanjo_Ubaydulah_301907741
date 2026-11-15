-- Fictional sample records for Realtime Leaderboard for Live CTF Competition.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."team" ("id", "team_name", "created_at") VALUES (101, 'CipherFoxes', '2026-11-15T12:00:00Z');
INSERT INTO portfolio."team" ("id", "team_name", "created_at") VALUES (102, 'ByteBadgers', '2026-11-15T12:05:00+00:00');
INSERT INTO portfolio."challenge" ("id", "challenge_name", "points", "is_active") VALUES (201, 'Warmup', 100, TRUE);
INSERT INTO portfolio."challenge" ("id", "challenge_name", "points", "is_active") VALUES (202, 'PacketTrail', 250, TRUE);
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict") VALUES (301, 101, 201, '2026-11-15T13:00:00Z', 'accepted');
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict") VALUES (302, 101, 202, '2026-11-15T13:10:00+00:00', 'rejected');
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict") VALUES (303, 102, 201, '2026-11-15T13:15:00Z', 'accepted');
COMMIT;
