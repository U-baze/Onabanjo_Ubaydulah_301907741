# Portfolio 1 — Database Design and Modelling

I organised the data into team, challenge, submission. The design document explains the fields, keys, relationships and business rules. The normalisation document shows the sample tables at 1NF, 2NF and 3NF.

## Database checks

| Table | Rows |
| --- | --- |
| team | 2 |
| challenge | 2 |
| submission | 3 |

The 11 invalid inserts were rejected at their expected constraints, and the valid sample rows remained unchanged.

## Files

- [Design](Onabanjo_Ubaydulah_301907741_P1_Design.md)
- [ER diagram](Onabanjo_Ubaydulah_301907741_P1_ERDiagram.md)
- [Normalisation](Onabanjo_Ubaydulah_301907741_P1_Normalisation.md)
- [Schema](Onabanjo_Ubaydulah_301907741_P1_Schema.sql)
- [Sample data](Onabanjo_Ubaydulah_301907741_P1_SampleData.sql)
- [Constraint tests](Onabanjo_Ubaydulah_301907741_P1_ConstraintTests.sql)
- [Table and constraint evidence](screenshots/Onabanjo_Ubaydulah_301907741_P1_DatabaseResults.png)

## Run the SQL

Create a fresh PostgreSQL database. Run the schema first, then the sample data. Run the deliberately invalid statements in ConstraintTests.sql individually outside a transaction; each is expected to produce an error.

## References

- [PostgreSQL — constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)

