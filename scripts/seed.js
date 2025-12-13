import dotenv from 'dotenv'
import { closeClient, getDb } from '../src/config/mongoClient.js'

dotenv.config()

const students = [
  {
    name: 'Aditi Sharma',
    usn: 'CSE2021001',
    email: 'aditi.sharma@example.edu',
    department: 'Computer Science',
    semester: 5,
    marks: 88,
    subjects: [
      { code: 'CS501', name: 'Databases', marks: 90 },
      { code: 'CS502', name: 'Algorithms', marks: 85 }
    ]
  },
  {
    name: 'Rahul Mehta',
    usn: 'ECE2021004',
    email: 'rahul.mehta@example.edu',
    department: 'Electronics',
    semester: 3,
    marks: 76,
    subjects: [
      { code: 'EC301', name: 'Signals', marks: 78 },
      { code: 'EC302', name: 'Digital Logic', marks: 74 }
    ]
  },
  {
    name: 'Priya Singh',
    usn: 'CSE2021012',
    email: 'priya.singh@example.edu',
    department: 'Computer Science',
    semester: 5,
    marks: 94,
    subjects: [
      { code: 'CS503', name: 'Machine Learning', marks: 96 },
      { code: 'CS504', name: 'Big Data', marks: 92 }
    ]
  },
  {
    name: 'Siddharth Rao',
    usn: 'ME2021044',
    email: 'sidd.rao@example.edu',
    department: 'Mechanical',
    semester: 7,
    marks: 81,
    subjects: [
      { code: 'ME701', name: 'Thermodynamics', marks: 83 },
      { code: 'ME702', name: 'Fluid Mechanics', marks: 79 }
    ]
  },
  {
    name: 'Fatima Khan',
    usn: 'CIV2021020',
    email: 'fatima.khan@example.edu',
    department: 'Civil',
    semester: 2,
    marks: 72,
    subjects: [
      { code: 'CV201', name: 'Engineering Mechanics', marks: 70 },
      { code: 'CV202', name: 'Surveying', marks: 74 }
    ]
  },
  {
    name: 'Ananya Iyer',
    usn: 'CSE2021025',
    email: 'ananya.iyer@example.edu',
    department: 'Computer Science',
    semester: 8,
    marks: 91,
    subjects: [
      { code: 'CS801', name: 'Cloud Computing', marks: 93 },
      { code: 'CS802', name: 'Cyber Security', marks: 89 }
    ]
  }
]

const run = async () => {
  try {
    const db = await getDb()
    const now = new Date()
    const payload = students.map(student => ({
      ...student,
      createdAt: now,
      updatedAt: now
    }))
    const result = await db.collection('students').insertMany(payload)
    // eslint-disable-next-line no-console
    console.log(`Inserted ${result.insertedCount} student records.`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Seeding failed:', error)
    process.exitCode = 1
  } finally {
    await closeClient()
  }
}

run()

