# Realtime Leaderboard for Live CTF Competition — SQL queries

## 1. Find submission records where submitted_at matches "2026-11-15T13:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."submission"
WHERE "submitted_at" IS NOT DISTINCT FROM '2026-11-15T13:00:00Z'
ORDER BY "id"
LIMIT 20;
```

| id | team_id | challenge_id | submitted_at | verdict |
| --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-11-15T13:00:00+00:00 | accepted |

## 2. Show related submission, team, challenge records (up to 20).

```sql
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
```

| submission_id | submission_submitted_at | team_id | team_team_name | challenge_id | challenge_challenge_name |
| --- | --- | --- | --- | --- | --- |
| 301 | 2026-11-15T13:00:00+00:00 | 101 | CipherFoxes | 201 | Warmup |
| 302 | 2026-11-15T13:10:00+00:00 | 101 | CipherFoxes | 202 | PacketTrail |
| 303 | 2026-11-15T13:15:00+00:00 | 102 | ByteBadgers | 201 | Warmup |

## 3. Count submission records for each team_id (up to 20 groups).

```sql
SELECT "team_id", count(*) AS record_count
FROM portfolio."submission"
GROUP BY "team_id"
ORDER BY record_count DESC, "team_id" NULLS LAST
LIMIT 20;
```

| team_id | record_count |
| --- | --- |
| 101 | 2 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 2.346 | 2.316, 2.355, 2.346 | Sort → Seq Scan | 274 |
| After index | 0.296 | 0.294, 0.307, 0.296 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 55 |

The median execution time changed from 2.346 ms to 0.296 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=2.28..2.283 rows=50 loops=1)
  Seq Scan on submission (actual time=0.014..2.242 rows=50 loops=1)
Planning Time: 0.336 ms
Execution Time: 2.316 ms
```

### Before index, run 2

```text
Sort (actual time=2.322..2.325 rows=50 loops=1)
  Seq Scan on submission (actual time=0.015..2.283 rows=50 loops=1)
Planning Time: 0.316 ms
Execution Time: 2.355 ms
```

### Before index, run 3

```text
Sort (actual time=2.312..2.315 rows=50 loops=1)
  Seq Scan on submission (actual time=0.015..2.272 rows=50 loops=1)
Planning Time: 0.352 ms
Execution Time: 2.346 ms
```

### After index, run 1

```text
Sort (actual time=0.233..0.236 rows=50 loops=1)
  Bitmap Heap Scan on submission (actual time=0.05..0.194 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.016..0.016 rows=50 loops=1)
Planning Time: 0.504 ms
Execution Time: 0.294 ms
```

### After index, run 2

```text
Sort (actual time=0.227..0.229 rows=50 loops=1)
  Bitmap Heap Scan on submission (actual time=0.032..0.185 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.017 rows=50 loops=1)
Planning Time: 0.513 ms
Execution Time: 0.307 ms
```

### After index, run 3

```text
Sort (actual time=0.233..0.235 rows=50 loops=1)
  Bitmap Heap Scan on submission (actual time=0.034..0.191 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.017 rows=50 loops=1)
Planning Time: 0.546 ms
Execution Time: 0.296 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Onabanjo_Ubaydulah_301907741_P2_Queries.sql, then Onabanjo_Ubaydulah_301907741_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Onabanjo_Ubaydulah_301907741_P2_QueryResults.png) · [Index comparison](screenshots/Onabanjo_Ubaydulah_301907741_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

