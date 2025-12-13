## Sample Requests & Responses

All commands assume the server is running at `http://localhost:3000` and the database has been seeded.

### Create a student

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo Learner",
    "usn": "CSE2021888",
    "email": "demo.learner@example.edu",
    "department": "Computer Science",
    "semester": 6,
    "marks": 87,
    "subjects": [
      { "code": "CS611", "name": "AI", "marks": 90 },
      { "code": "CS612", "name": "Data Warehousing", "marks": 84 }
    ]
  }'
```

```json
{
  "_id": "64f3f8b3c3b1d4e6325d6caa",
  "name": "Demo Learner",
  "usn": "CSE2021888",
  "email": "demo.learner@example.edu",
  "department": "Computer Science",
  "semester": 6,
  "marks": 87,
  "subjects": [
    { "code": "CS611", "name": "AI", "marks": 90 },
    { "code": "CS612", "name": "Data Warehousing", "marks": 84 }
  ],
  "createdAt": "2025-11-13T10:15:00.512Z",
  "updatedAt": "2025-11-13T10:15:00.512Z"
}
```

### Range filter & sorting

```bash
curl "http://localhost:3000/api/students?minMarks=80&maxMarks=95&sort=desc"
```

```json
{
  "count": 4,
  "results": [
    { "_id": "...", "name": "Priya Singh", "marks": 94, "semester": 5, "department": "Computer Science" },
    { "_id": "...", "name": "Ananya Iyer", "marks": 91, "semester": 8, "department": "Computer Science" },
    { "_id": "...", "name": "Aditi Sharma", "marks": 88, "semester": 5, "department": "Computer Science" },
    { "_id": "...", "name": "Demo Learner", "marks": 87, "semester": 6, "department": "Computer Science" }
  ]
}
```

### Update

```bash
curl -X PUT http://localhost:3000/api/students/64f3f8b3c3b1d4e6325d6caa \
  -H "Content-Type: application/json" \
  -d '{ "marks": 92 }'
```

```json
{
  "_id": "64f3f8b3c3b1d4e6325d6caa",
  "name": "Demo Learner",
  "usn": "CSE2021888",
  "email": "demo.learner@example.edu",
  "department": "Computer Science",
  "semester": 6,
  "marks": 92,
  "subjects": [
    { "code": "CS611", "name": "AI", "marks": 90 },
    { "code": "CS612", "name": "Data Warehousing", "marks": 84 }
  ],
  "createdAt": "2025-11-13T10:15:00.512Z",
  "updatedAt": "2025-11-13T10:18:11.404Z"
}
```

### Aggregation – Average by semester

```bash
curl "http://localhost:3000/api/analytics/average-by-semester?minMarks=70"
```

```json
{
  "pipeline": [
    { "$match": { "marks": { "$gte": 70 } } },
    { "$group": { "_id": "$semester", "averageMarks": { "$avg": "$marks" }, "studentCount": { "$sum": 1 } } },
    { "$sort": { "averageMarks": -1 } }
  ],
  "results": [
    { "_id": 8, "averageMarks": 91, "studentCount": 1 },
    { "_id": 6, "averageMarks": 89.5, "studentCount": 2 },
    { "_id": 5, "averageMarks": 91, "studentCount": 2 }
  ]
}
```

### Aggregation – Top performers

```bash
curl "http://localhost:3000/api/analytics/top-performers?limit=3"
```

```json
{
  "pipeline": [
    { "$match": { "marks": { "$exists": true } } },
    { "$group": { "_id": "$department", "topStudent": { "$top": { "sortBy": { "marks": -1 }, "output": { "name": "$name", "usn": "$usn", "marks": "$marks", "semester": "$semester" } } }, "averageMarks": { "$avg": "$marks" }, "totalStudents": { "$sum": 1 } } },
    { "$sort": { "averageMarks": -1 } },
    { "$limit": 3 }
  ],
  "results": [
    {
      "_id": "Computer Science",
      "topStudent": { "name": "Priya Singh", "usn": "CSE2021012", "marks": 94, "semester": 5 },
      "averageMarks": 91,
      "totalStudents": 3
    },
    { "_id": "Mechanical", "topStudent": { "name": "Siddharth Rao", "usn": "ME2021044", "marks": 81, "semester": 7 }, "averageMarks": 81, "totalStudents": 1 }
  ]
}
```

> Replace the example `_id` values with those returned by your environment. These responses illustrate the expected structure for grading.

