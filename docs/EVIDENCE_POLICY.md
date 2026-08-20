# Evidence policy

A source record stores:
- entity and field
- primary source URL
- source class/publisher
- retrieval time
- normalized snapshot
- SHA-256 of that normalized snapshot
- verification state

`isEntityIndexable()` requires a `verified` entity with at least one valid primary evidence receipt.

This verifies the entity identity represented by that receipt only. It does not transitively verify every field on the page.
