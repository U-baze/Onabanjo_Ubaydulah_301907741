# MIT 8103 Advanced Database Systems

**Realtime Leaderboard for Live CTF Competition** · Ubaydulah Onabanjo · Student ID 301907741

## Case study

My case study is Realtime Leaderboard for Live CTF Competition. I designed the database for competitors submitting challenge attempts and organizers monitoring solves and standings, with separate tables named team, challenge and submission. It supports these operations: record accepted and rejected submissions and display the current leaderboard; filter submissions by verdict and time window, then join matching rows to Team and Challenge for attempt details; aggregate accepted submissions joined to Challenge, group by Team, sum challenge points, and order teams by total points; separate benchmark plan: generate 50000 synthetic submissions, compare the same submitted_at time-window filter with and without a B-tree index, and compare result correctness and query plans; record no assumed timing or outcome.

## Portfolio 1: Database Design and Modelling

I organised the relational design into 3 tables. Primary keys identify records, foreign keys preserve the links, and checks enforce the stated business rules. A partial unique constraint on team_id and challenge_id where verdict is accepted permits at most one accepted solve per team and challenge. The normalisation examples show the sample data at 1NF, 2NF and 3NF. All 11 deliberately invalid inserts were rejected without changing the valid sample rows.

![Realtime Leaderboard for Live CTF Competition ER diagram](images/Onabanjo_Ubaydulah_301907741_ERDiagram.png)

Figure 1. Tables, keys and relationships. PK: primary key; FK: foreign key; UK: unique value.

<!-- PAGE BREAK -->

## Portfolio 2: Query Processing and Optimisation

I ran three SQL queries against the sample records. The join returned 3 rows and included CipherFoxes with Warmup. For the index comparison, I used 50,000 separate performance rows. The median lookup time changed from 2.346 ms to 0.296 ms. Both phases returned the same records. The measured plan used the new index. These timings apply to this lookup and environment.

## Portfolio 3: Transactions and Concurrency

I used a temporary counter on submission to test COMMIT, ROLLBACK and READ COMMITTED isolation. The uncommitted update remained hidden from the other session, and ROLLBACK restored the earlier committed value. Without locking, two increments left the counter at 2. With SELECT FOR UPDATE, Session B waited for Session A and the final value was 3. The helper is confined to this exercise; the case's original business fields stay unchanged.

## Portfolio 4: NoSQL and Advanced Data Models

I used ctf_events for the case's event documents. MongoDB inserted 6 sample events and returned the expected results for 4 queries. Validation rejected an invalid date type and a duplicate event ID. Embedded snapshots keep related details with an event, while the details field can differ by event type. These are fictional events; PostgreSQL continues to enforce its relational rules.

## Repository and evidence

https://github.com/U-baze/Onabanjo_Ubaydulah_301907741

The portfolio folders contain the SQL and JavaScript, explanations, query plans, result tables and screenshots.


<!-- PAGE BREAK -->

## Portfolio 5: Distributed and Cloud Database Exercise

I proposed three MongoDB replica members across separate failure zones. The discussion covers primary elections, majority acknowledgement, secondary lag and sharding trade-offs for ctf_events. Replication supports availability, while backups address recovery. PostgreSQL needs its own availability plan. This is the permitted discussion option; no live replica set or failover test was deployed.

## Individual reflection

I kept team, challenge, submission in separate tables so their details could be maintained without repeating them in every related record. A partial unique constraint on team_id and challenge_id where verdict is accepted permits at most one accepted solve per team and challenge. The constraint tests check this alongside the required values and record links. One issue illustrated by the two-session exercise is that both sessions can read the same value before either update is committed. Locking the row before reading preserves both increments. The index comparison also shows why I need to check the execution plan as well as the final answer: the same result can require different amounts of database work.

## AI-use declaration

I used GitHub Copilot and the portfolio generator to help prepare the database model, scripts and explanations. The generator ran the PostgreSQL and MongoDB exercises, checked their outputs and captured the result images.  I remain responsible for checking and explaining the submitted work.

## References

- [PostgreSQL: constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)
- [PostgreSQL: EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)
- [PostgreSQL: isolation](https://www.postgresql.org/docs/17/transaction-iso.html)
- [PostgreSQL: row locks](https://www.postgresql.org/docs/17/explicit-locking.html)
- [MongoDB: data modelling](https://www.mongodb.com/docs/manual/data-modeling/)
- [MongoDB: replication](https://www.mongodb.com/docs/manual/replication/)
- [MongoDB: sharding](https://www.mongodb.com/docs/manual/sharding/)
- [Mermaid: ER diagrams](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)

