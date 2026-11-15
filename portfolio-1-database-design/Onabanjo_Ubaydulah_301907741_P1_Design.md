# Realtime Leaderboard for Live CTF Competition — database design

My case study records team, challenge, submission.

## Users

- Competitors submitting challenge attempts
- Organizers monitoring solves and standings

## Main operations

- Record accepted and rejected submissions and display the current leaderboard.
- Filter submissions by verdict and time window, then join matching rows to Team and Challenge for attempt details.
- Aggregate accepted submissions joined to Challenge, group by Team, sum challenge points, and order teams by total points.
- Separate benchmark plan: generate 50000 synthetic submissions, compare the same submitted_at time-window filter with and without a B-tree index, and compare result correctness and query plans; record no assumed timing or outcome.

## Entities

| Entity | Information stored |
| --- | --- |
| team | A synthetic competition team that submits challenge attempts. |
| challenge | A competition challenge and its fixed point value. |
| submission | A team's attempt at a challenge, including its time and verdict. |

## team

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| id | BIGINT | PK | Yes |
| team_name | TEXT | Unique | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- Unique key: (team_name).

## challenge

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| id | BIGINT | PK | Yes |
| challenge_name | TEXT | Unique | Yes |
| points | INTEGER |  | Yes |
| is_active | BOOLEAN |  | Yes |
- Unique key: (challenge_name).

## submission

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| id | BIGINT | PK | Yes |
| team_id | BIGINT | FK | Yes |
| challenge_id | BIGINT | FK | Yes |
| submitted_at | TIMESTAMPTZ |  | Yes |
| verdict | TEXT |  | Yes |
- team_id → team.id
- challenge_id → challenge.id

## Relationships and business rules

- Each synthetic team has a distinct non-empty team name.
- Each challenge has a distinct non-empty name.
- Challenge point values must be greater than zero.
- A submission verdict must be accepted or rejected.
- Every submission must reference an existing team.
- Every submission must reference an existing challenge.
- A partial unique constraint on team_id and challenge_id where verdict is accepted permits at most one accepted solve per team and challenge.

## Assumptions

- Challenge point values remain fixed for the duration of the competition.
- A team can earn points for a challenge only through its first accepted solve.
- A submission verdict is either accepted or rejected.
- The leaderboard is computed from accepted submissions rather than maintained as a separate score table.

