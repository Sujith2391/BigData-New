## Aggregation Walkthrough

### 1. Average Marks by Semester

Pipeline:

```json
[
  { "$match": { "marks": { "$gte": 70 } } },
  { "$group": { "_id": "$semester", "averageMarks": { "$avg": "$marks" }, "studentCount": { "$sum": 1 } } },
  { "$sort": { "averageMarks": -1 } }
]
```

**Interpretation**

- `$match` narrows documents to students scoring at least 70.
- `$group` clusters documents by `semester`, calculating both the arithmetic mean of `marks` and the total number of students in each semester bucket.
- `$sort` orders the buckets so the highest-performing semesters appear first.

**Sample output**

```
[
  { "_id": 8, "averageMarks": 91, "studentCount": 1 },
  { "_id": 5, "averageMarks": 91, "studentCount": 2 },
  { "_id": 7, "averageMarks": 81, "studentCount": 1 },
  { "_id": 3, "averageMarks": 76, "studentCount": 1 }
]
```

This shows Semesters 8 and 5 leading the cohort, making them good candidates for knowledge-sharing sessions.

### 2. Department Performance Snapshot

Pipeline:

```json
[
  { "$match": { "marks": { "$exists": true } } },
  {
    "$group": {
      "_id": "$department",
      "minMarks": { "$min": "$marks" },
      "maxMarks": { "$max": "$marks" },
      "averageMarks": { "$avg": "$marks" },
      "topStudent": {
        "$top": {
          "sortBy": { "marks": -1 },
          "output": { "name": "$name", "usn": "$usn", "marks": "$marks", "semester": "$semester" }
        }
      }
    }
  },
  { "$sort": { "averageMarks": -1 } }
]
```

**Interpretation**

- `$match` filters out incomplete records.
- `$group` computes the min, max, and average marks for each department while `$top` surfaces the highest scoring student profile per department.
- `$sort` lists departments in order of their average performance.

**Sample output**

```
[
  {
    "_id": "Computer Science",
    "minMarks": 88,
    "maxMarks": 94,
    "averageMarks": 91,
    "topStudent": { "name": "Priya Singh", "usn": "CSE2021012", "marks": 94, "semester": 5 }
  },
  {
    "_id": "Mechanical",
    "minMarks": 81,
    "maxMarks": 81,
    "averageMarks": 81,
    "topStudent": { "name": "Siddharth Rao", "usn": "ME2021044", "marks": 81, "semester": 7 }
  }
]
```

This snapshot makes it easy to compare the spread of marks across departments and immediately identify standout performers.

