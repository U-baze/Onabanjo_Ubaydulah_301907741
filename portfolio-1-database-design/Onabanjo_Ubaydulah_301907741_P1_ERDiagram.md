# Realtime Leaderboard for Live CTF Competition — ER diagram

```mermaid
erDiagram
    direction LR
    team {
        bigint id PK
        text team_name UK
        timestamptz created_at
    }
    challenge {
        bigint id PK
        text challenge_name UK
        integer points
        boolean is_active
    }
    submission {
        bigint id PK
        bigint team_id FK
        bigint challenge_id FK
        timestamptz submitted_at
        text verdict
    }
    team ||--o{ submission : "team_id"
    challenge ||--o{ submission : "challenge_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Onabanjo_Ubaydulah_301907741_ERDiagram.png)
