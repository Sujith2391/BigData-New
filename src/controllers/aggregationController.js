import { getDb } from '../config/mongoClient.js'

export const averageMarksBySemester = async (req, res, next) => {
  try {
    const minMarks = req.query.minMarks !== undefined ? Number(req.query.minMarks) : 0
    if (Number.isNaN(minMarks)) {
      const error = new Error('minMarks must be a number')
      error.statusCode = 400
      throw error
    }
    const db = await getDb()

    const pipeline = [
      {
        $match: {
          marks: { $gte: minMarks }
        }
      },
      {
        $group: {
          _id: '$semester',
          averageMarks: { $avg: '$marks' },
          studentCount: { $sum: 1 }
        }
      },
      {
        $sort: { averageMarks: -1 }
      }
    ]

    const results = await db.collection('students').aggregate(pipeline).toArray()
    res.json({ pipeline, results })
  } catch (err) {
    next(err)
  }
}

export const topPerformersByDepartment = async (req, res, next) => {
  try {
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 5
    if (Number.isNaN(limit)) {
      const error = new Error('limit must be a number')
      error.statusCode = 400
      throw error
    }
    const db = await getDb()

    const pipeline = [
      {
        $match: {
          marks: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$department',
          topStudent: {
            $top: {
              sortBy: { marks: -1 },
              output: { name: '$name', usn: '$usn', marks: '$marks', semester: '$semester' }
            }
          },
          averageMarks: { $avg: '$marks' },
          totalStudents: { $sum: 1 }
        }
      },
      { $sort: { 'topStudent.marks': -1 } },
      { $limit: limit }
    ]

    const results = await db.collection('students').aggregate(pipeline).toArray()
    res.json({ pipeline, results })
  } catch (err) {
    next(err)
  }
}

