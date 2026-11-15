# Realtime Leaderboard for Live CTF Competition — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| team_id | submission records (list) |
| --- | --- |
| 101 | [301,302] |
| 102 | [303] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| submission.id | submission.team_id | submission.challenge_id | submission.verdict | team.id | team.team_name | challenge.id | challenge.challenge_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | accepted | 101 | CipherFoxes | 201 | Warmup |
| 302 | 101 | 202 | rejected | 101 | CipherFoxes | 202 | PacketTrail |
| 303 | 102 | 201 | accepted | 102 | ByteBadgers | 201 | Warmup |

Key: id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## submission_example

| submission.id | submission.team_id | submission.challenge_id | submission.verdict | team.id | team.team_name | challenge.id | challenge.challenge_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | accepted | 101 | CipherFoxes | 201 | Warmup |
| 302 | 101 | 202 | rejected | 101 | CipherFoxes | 202 | PacketTrail |
| 303 | 102 | 201 | accepted | 102 | ByteBadgers | 201 | Warmup |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## team

| id | team_name | created_at |
| --- | --- | --- |
| 101 | CipherFoxes | 2026-11-15T12:00:00+00:00 |
| 102 | ByteBadgers | 2026-11-15T12:05:00+00:00 |

## challenge

| id | challenge_name | points | is_active |
| --- | --- | --- | --- |
| 201 | Warmup | 100 | true |
| 202 | PacketTrail | 250 | true |

## submission

| id | team_id | challenge_id | submitted_at | verdict |
| --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-11-15T13:00:00+00:00 | accepted |
| 302 | 101 | 202 | 2026-11-15T13:10:00+00:00 | rejected |
| 303 | 102 | 201 | 2026-11-15T13:15:00+00:00 | accepted |

## Dependencies

- team: (id) → team_name, created_at
- challenge: (id) → challenge_name, points, is_active
- submission: (id) → team_id, challenge_id, submitted_at, verdict

Joining the decomposed sample tables reproduces the original 3 example rows. The design assumes the declared keys describe the relevant business dependencies.
