# Portfolio 4 — NoSQL and Advanced Data Models

I used MongoDB collection ctf_events for submission_received and solve_accepted events. These are fictional event examples based on submission, team, challenge.

## Document model

| Field | Meaning |
| --- | --- |
| _id | Unique string event ID |
| eventType | One of the two selected case event labels |
| occurredAt | Native BSON Date; sample timestamps are in 2030 |
| source | Original entity, primary key and saved JSON snapshot |
| embedded | Linked record snapshots read with the event |
| references | Keys for linked sources kept outside the embedded snapshots |
| details | Event metadata whose fields vary |

Related team, challenge details are stored as snapshots with the event. This makes an event readable in one document. It duplicates some information, and later SQL changes do not automatically update the snapshots. PostgreSQL continues to enforce the relational rules.

## Example document

```javascript
{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "submission_received",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "submission",
        "key": {
            "id": 301
        },
        "snapshot": {
            "id": 301,
            "team_id": 101,
            "challenge_id": 201,
            "submitted_at": "2026-11-15T13:00:00Z",
            "verdict": "accepted"
        }
    },
    "embedded": {
        "team": [
            {
                "key": {
                    "id": 101
                },
                "snapshot": {
                    "id": 101,
                    "team_name": "CipherFoxes",
                    "created_at": "2026-11-15T12:00:00Z"
                },
                "via": [
                    "submission.team_id → team"
                ]
            }
        ],
        "challenge": [
            {
                "key": {
                    "id": 201
                },
                "snapshot": {
                    "id": 201,
                    "challenge_name": "Warmup",
                    "points": 100,
                    "is_active": true
                },
                "via": [
                    "submission.challenge_id → challenge"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}
```

## Queries and results

| Query | Returned documents |
| --- | --- |
| Find the first sample event type (up to five documents). | 3 |
| Find events for the first source record using nested key fields (up to five). | 2 |
| Find events in the sample time range using a MongoDB Date filter (up to five). | 5 |
| Count documents for each event type. | 2 |

## 1. Find the first sample event type (up to five documents).

```javascript
db.getCollection("ctf_events").find({"eventType":"submission_received"}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "submission_received",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "id": 301
    }
  },
  {
    "_id": "event_000003",
    "eventType": "submission_received",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "id": 302
    }
  },
  {
    "_id": "event_000005",
    "eventType": "submission_received",
    "occurredAt": {
      "$date": "2030-01-01T10:04:00Z"
    },
    "source": {
      "id": 303
    }
  }
]
```

## 2. Find events for the first source record using nested key fields (up to five).

```javascript
db.getCollection("ctf_events").find({"source.key.id":301}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "submission_received",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "id": 301
    }
  },
  {
    "_id": "event_000002",
    "eventType": "solve_accepted",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "id": 301
    }
  }
]
```

## 3. Find events in the sample time range using a MongoDB Date filter (up to five).

```javascript
db.getCollection("ctf_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "submission_received",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "id": 301
    }
  },
  {
    "_id": "event_000002",
    "eventType": "solve_accepted",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "id": 301
    }
  },
  {
    "_id": "event_000003",
    "eventType": "submission_received",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "id": 302
    }
  },
  {
    "_id": "event_000004",
    "eventType": "solve_accepted",
    "occurredAt": {
      "$date": "2030-01-01T10:03:00Z"
    },
    "source": {
      "id": 302
    }
  },
  {
    "_id": "event_000005",
    "eventType": "submission_received",
    "occurredAt": {
      "$date": "2030-01-01T10:04:00Z"
    },
    "source": {
      "id": 303
    }
  }
]
```

## 4. Count documents for each event type.

```javascript
db.getCollection("ctf_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray();
```

| _id | documentCount |
| --- | --- |
| solve_accepted | 3 |
| submission_received | 3 |

## Validation and suitability

MongoDB inserted 6 documents. An invalid date type was rejected with code 121 and a repeated event ID with 11000. The collection still contained 6 valid documents. The compound eventType/occurredAt index supports those access fields; this exercise does not measure its speed.

The details field can vary across event types, while the common fields have a validator. Events can be added as separate documents rather than growing one large history record.

## Run the script

Connect mongosh to a fresh exercise database and run Onabanjo_Ubaydulah_301907741_P4_MongoDB.js. It selects portfolio_nosql, creates the collection, inserts the sample documents and displays the query results. [Implementation evidence](screenshots/Onabanjo_Ubaydulah_301907741_P4_DocumentsAndQueries.png).

## References

- [MongoDB — data modelling](https://www.mongodb.com/docs/manual/data-modeling/)

