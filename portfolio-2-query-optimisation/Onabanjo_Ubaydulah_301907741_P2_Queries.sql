-- Find submission records where submitted_at matches "2026-11-15T13:00:00Z" (up to 20).
SELECT * FROM portfolio."submission"
WHERE "submitted_at" IS NOT DISTINCT FROM '2026-11-15T13:00:00Z'
ORDER BY "id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."submission"
WHERE "submitted_at" IS NOT DISTINCT FROM '2026-11-15T13:00:00Z'
ORDER BY "id"
LIMIT 20;

-- Show related submission, team, challenge records (up to 20).
SELECT t0."id" AS "submission_id",
       t0."submitted_at" AS "submission_submitted_at",
       t1."id" AS "team_id",
       t1."team_name" AS "team_team_name",
       t2."id" AS "challenge_id",
       t2."challenge_name" AS "challenge_challenge_name"
FROM portfolio."submission" t0
JOIN portfolio."team" t1 ON t0."team_id" = t1."id"
JOIN portfolio."challenge" t2 ON t0."challenge_id" = t2."id"
ORDER BY t0."id", t1."id", t2."id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."id" AS "submission_id",
       t0."submitted_at" AS "submission_submitted_at",
       t1."id" AS "team_id",
       t1."team_name" AS "team_team_name",
       t2."id" AS "challenge_id",
       t2."challenge_name" AS "challenge_challenge_name"
FROM portfolio."submission" t0
JOIN portfolio."team" t1 ON t0."team_id" = t1."id"
JOIN portfolio."challenge" t2 ON t0."challenge_id" = t2."id"
ORDER BY t0."id", t1."id", t2."id"
LIMIT 20;

-- Count submission records for each team_id (up to 20 groups).
SELECT "team_id", count(*) AS record_count
FROM portfolio."submission"
GROUP BY "team_id"
ORDER BY record_count DESC, "team_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "team_id", count(*) AS record_count
FROM portfolio."submission"
GROUP BY "team_id"
ORDER BY record_count DESC, "team_id" NULLS LAST
LIMIT 20;
