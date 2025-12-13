import dotenv from 'dotenv'
import { closeClient, getDb } from '../src/config/mongoClient.js'

dotenv.config()

const averageBySemesterPipeline = [
  { $match: { marks: { $gte: 0 } } },
  { $group: { _id: '$semester', averageMarks: { $avg: '$marks' }, studentCount: { $sum: 1 } } },
  { $sort: { averageMarks: -1 } }
]

const departmentSpreadPipeline = [
  { $match: { marks: { $exists: true } } },
  {
    $group: {
      _id: '$department',
      minMarks: { $min: '$marks' },
      maxMarks: { $max: '$marks' },
      averageMarks: { $avg: '$marks' },
      topStudent: {
        $top: {
          sortBy: { marks: -1 },
          output: { name: '$name', marks: '$marks', usn: '$usn' }
        }
      }
    }
  },
  { $sort: { averageMarks: -1 } }
]

const run = async () => {
  try {
    const db = await getDb()
    const averageBySemester = await db.collection('students').aggregate(averageBySemesterPipeline).toArray()
    const departmentSpread = await db.collection('students').aggregate(departmentSpreadPipeline).toArray()

    // eslint-disable-next-line no-console
    console.log('Average marks by semester:')
    // eslint-disable-next-line no-console
    console.table(averageBySemester)
    // eslint-disable-next-line no-console
    console.log('Department performance summary:')
    // eslint-disable-next-line no-console
    console.table(departmentSpread)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Aggregation demo failed:', error)
    process.exitCode = 1
  } finally {
    await closeClient()
  }
}

run()

