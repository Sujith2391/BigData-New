## Student Record Management System

Node.js + Express + MongoDB web service for managing student records with full CRUD, advanced querying, and aggregation analytics.

---

### 1. Prerequisites
- Node.js 18+
- npm 9+
- MongoDB 5.2+ (required for the `$top` aggregation operator)

---

### 2. Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `env.template` to `.env` and adjust values:
   ```bash
   copy env.template .env   # Windows
   # or
   cp env.template .env     # macOS/Linux
   ```
3. Provision the database and seed sample data:
   ```bash
   npm run setup
   npm run seed
   ```
4. Launch the API:
   ```bash
   npm run start
   # or npm run dev for live reload
   ```
5. Run aggregation demo (for console screenshots):
   ```bash
   npm run analytics
   ```
6. Tear down the database when finished:
   ```bash
   npm run teardown
   ```

Environment variables:
- `MONGODB_URI` – Connection string (e.g., `mongodb://localhost:27017`)
- `MONGODB_DB_NAME` – Database name to create/manage (default `student_records`)
- `PORT` – Express server port (default `3000`)

---

### 3. API Surface

All endpoints are JSON-based and live under `http://localhost:3000` by default.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Service heartbeat |
| `POST` | `/api/students` | Create a student document |
| `GET` | `/api/students` | List students with optional filters (`minMarks`, `maxMarks`, `department`, `semester`, `sort`, `limit`) |
| `GET` | `/api/students/:id` | Retrieve a single student by Mongo `_id` |
| `PUT` | `/api/students/:id` | Update any subset of student fields |
| `DELETE` | `/api/students/:id` | Remove a student |
| `GET` | `/api/analytics/average-by-semester` | Aggregated averages per semester (supports `minMarks`) |
| `GET` | `/api/analytics/top-performers` | Top departments with champion student (supports `limit`) |

Sample request suite: `docs/sample-requests.http`

---

### 4. Data & Validation Strategy

- **Database creation/deletion** – `npm run setup` drops and recreates the `students` collection with a JSON Schema validator and unique `usn` index. `npm run teardown` drops the whole database for a clean reset.
- **Schema enforcement** – MongoDB validator mirrors the API-side Joi validators to ensure consistent rules for `name`, `usn`, `semester`, `marks`, nested `subjects`, and timestamp fields.
- **Seeding** – `npm run seed` inserts multiple curated records in a single bulk operation, enabling immediate exploration of queries and aggregations.
- **CRUD design** – Controllers in `src/controllers/studentController.js` centralize validation, type coercion, and error handling. The same collection utility handles mark range queries and dynamic sorting.
- **Query logic & sorting** – The listing endpoint translates query-string parameters into Mongo filters and sort documents, enabling combined filters (department + mark range) with ascending/descending marks sorting.
- **Aggregation pipelines** – Implemented in both REST routes (`src/controllers/aggregationController.js`) and the CLI demo script. Pipelines highlight `$match`, `$group`, `$sort`, and `$top`. Detailed explanations and sample outputs live in `docs/aggregation-examples.md`.

---

### 5. Testing & Evidence

- **HTTP examples** – Use the `docs/sample-requests.http` file with VS Code/JetBrains REST clients or copy the included `curl` commands from inline comments. The companion `docs/sample-responses.md` captures representative payloads for each feature.
- **Aggregation proof** – Run `npm run analytics` and capture the console tables. Explanations are in `docs/aggregation-examples.md`.
- **Screenshots** – Save the required images inside `docs/screenshots/` following the checklist in `docs/screenshots/README.md` (setup logs, CRUD success, filtered query, aggregation results).

---

### 6. Project Structure

```
├── src
│   ├── app.js                        # Express bootstrap
│   ├── config/mongoClient.js         # MongoDB client helper
│   ├── controllers/
│   │   ├── aggregationController.js
│   │   └── studentController.js
│   ├── middleware/errorMiddleware.js
│   ├── routes/
│   │   ├── aggregationRoutes.js
│   │   └── studentRoutes.js
│   └── validators/studentValidator.js
├── scripts
│   ├── setup.js                      # Create DB + schema + indexes
│   ├── seed.js                       # Bulk insert sample students
│   ├── teardown.js                   # Drop database
│   └── analyticsDemo.js              # CLI aggregation showcase
├── docs
│   ├── sample-requests.http
│   ├── aggregation-examples.md
│   └── screenshots/README.md
├── env.template
└── README.md
```

---

### 7. Next Steps / Enhancements
- Add JWT authentication and role-based authorization for bonus credit.
- Build a minimal React or server-rendered UI that consumes the same REST endpoints.
- Expand analytics (e.g., GPA computation, attendance trends) or integrate dashboards using MongoDB Charts.

---

### 8. Troubleshooting

- **Validation errors** – The API returns structured messages with `details`, making it easy to spot incorrect fields.
- **Unique constraint** – Duplicate `usn` submissions respond with HTTP `409 Conflict`.
- **Connection issues** – Confirm `MONGODB_URI` points to a running instance and that the user has privileges to create/drop databases.
- **MongoDB version** – If using < 5.2, replace `$top` with an equivalent `$push` + `$sort` combination (described in code comments).

---

Happy auditing and extending the Student Record Management System!

