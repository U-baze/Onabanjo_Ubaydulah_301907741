// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("ctf_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("ctf_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "submission_received",
                    "solve_accepted"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "submission"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("ctf_events").insertMany([
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
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "solve_accepted",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "submission_id": "illustrative submission_id",
                "event_time": "illustrative event_time",
                "metadata": "illustrative metadata"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "submission_received",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "submission",
            "key": {
                "id": 302
            },
            "snapshot": {
                "id": 302,
                "team_id": 101,
                "challenge_id": 202,
                "submitted_at": "2026-11-15T13:10:00+00:00",
                "verdict": "rejected"
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
                        "id": 202
                    },
                    "snapshot": {
                        "id": 202,
                        "challenge_name": "PacketTrail",
                        "points": 250,
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
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "solve_accepted",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "submission",
            "key": {
                "id": 302
            },
            "snapshot": {
                "id": 302,
                "team_id": 101,
                "challenge_id": 202,
                "submitted_at": "2026-11-15T13:10:00+00:00",
                "verdict": "rejected"
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
                        "id": 202
                    },
                    "snapshot": {
                        "id": 202,
                        "challenge_name": "PacketTrail",
                        "points": 250,
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "submission_id": "illustrative submission_id",
                "event_time": "illustrative event_time",
                "metadata": "illustrative metadata"
            }
        }
    },
    {
        "_id": "event_000005",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "submission_received",
        "occurredAt": ISODate("2030-01-01T10:04:00Z"),
        "source": {
            "entity": "submission",
            "key": {
                "id": 303
            },
            "snapshot": {
                "id": 303,
                "team_id": 102,
                "challenge_id": 201,
                "submitted_at": "2026-11-15T13:15:00Z",
                "verdict": "accepted"
            }
        },
        "embedded": {
            "team": [
                {
                    "key": {
                        "id": 102
                    },
                    "snapshot": {
                        "id": 102,
                        "team_name": "ByteBadgers",
                        "created_at": "2026-11-15T12:05:00+00:00"
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
    },
    {
        "_id": "event_000006",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "solve_accepted",
        "occurredAt": ISODate("2030-01-01T10:05:00Z"),
        "source": {
            "entity": "submission",
            "key": {
                "id": 303
            },
            "snapshot": {
                "id": 303,
                "team_id": 102,
                "challenge_id": 201,
                "submitted_at": "2026-11-15T13:15:00Z",
                "verdict": "accepted"
            }
        },
        "embedded": {
            "team": [
                {
                    "key": {
                        "id": 102
                    },
                    "snapshot": {
                        "id": 102,
                        "team_name": "ByteBadgers",
                        "created_at": "2026-11-15T12:05:00+00:00"
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "submission_id": "illustrative submission_id",
                "event_time": "illustrative event_time",
                "metadata": "illustrative metadata"
            }
        }
    }
]));
  await db.getCollection("ctf_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("ctf_events").find({"eventType":"submission_received"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("ctf_events").find({"source.key.id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("ctf_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("ctf_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("ctf_events").insertOne({...{
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
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("ctf_events").insertOne({
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
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("ctf_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
