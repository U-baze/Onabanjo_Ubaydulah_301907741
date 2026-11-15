-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. test pk team. Expected: pk_team, SQLSTATE 23505.
INSERT INTO portfolio."team" ("id", "team_name", "created_at")
VALUES (101, 'FreshTeamName', '2026-11-15T14:00:00Z');

-- 2. test uq team. Expected: uq_team_0, SQLSTATE 23505.
INSERT INTO portfolio."team" ("id", "team_name", "created_at")
VALUES (901, 'CipherFoxes', '2026-11-15T14:01:00Z');

-- 3. test nn team name. Expected: team_name, SQLSTATE 23502.
INSERT INTO portfolio."team" ("id", "team_name", "created_at")
VALUES (902, NULL, '2026-11-15T14:02:00Z');

-- 4. test pk challenge. Expected: pk_challenge, SQLSTATE 23505.
INSERT INTO portfolio."challenge" ("id", "challenge_name", "points", "is_active")
VALUES (201, 'NewChallengeName', 50, TRUE);

-- 5. test uq challenge. Expected: uq_challenge_0, SQLSTATE 23505.
INSERT INTO portfolio."challenge" ("id", "challenge_name", "points", "is_active")
VALUES (903, 'Warmup', 50, TRUE);

-- 6. test pk submission. Expected: pk_submission, SQLSTATE 23505.
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict")
VALUES (301, 102, 202, '2026-11-15T14:03:00Z', 'rejected');

-- 7. test fk submission team. Expected: fk_submission_0, SQLSTATE 23503.
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict")
VALUES (904, 9991, 202, '2026-11-15T14:04:00Z', 'rejected');

-- 8. test fk submission challenge. Expected: fk_submission_1, SQLSTATE 23503.
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict")
VALUES (905, 102, 9992, '2026-11-15T14:05:00Z', 'rejected');

-- 9. test check challenge points. Expected: positive_challenge_points, SQLSTATE 23514.
INSERT INTO portfolio."challenge" ("id", "challenge_name", "points", "is_active")
VALUES (906, 'InvalidPointsChallenge', 0, TRUE);

-- 10. test check submission verdict. Expected: valid_submission_verdict, SQLSTATE 23514.
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict")
VALUES (907, 102, 202, '2026-11-15T14:06:00Z', 'pending');

-- 11. test partial unique solve. Expected: one_accepted_solve, SQLSTATE 23505.
INSERT INTO portfolio."submission" ("id", "team_id", "challenge_id", "submitted_at", "verdict")
VALUES (908, 101, 201, '2026-11-15T14:07:00Z', 'accepted');
