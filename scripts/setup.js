import dotenv from 'dotenv'
import { closeClient, getDb } from '../src/config/mongoClient.js'

dotenv.config()

const COLLECTION_NAME = 'students'

const studentSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'usn', 'department', 'semester', 'marks'],
    additionalProperties: false,
    properties: {
      _id: {},
      name: {
        bsonType: 'string',
        description: 'Student full name'
      },
      usn: {
        bsonType: 'string',
        description: 'Unique student number'
      },
      email: {
        bsonType: ['string', 'null']
      },
      department: {
        bsonType: 'string'
      },
      semester: {
        bsonType: ['int', 'double'],
        minimum: 1,
        maximum: 8
      },
      marks: {
        bsonType: ['int', 'double', 'decimal'],
        minimum: 0,
        maximum: 100
      },
      subjects: {
        bsonType: 'array',
        items: {
          bsonType: 'object',
          required: ['code', 'name', 'marks'],
          additionalProperties: false,
          properties: {
            code: { bsonType: 'string' },
            name: { bsonType: 'string' },
            marks: { bsonType: ['int', 'double', 'decimal'], minimum: 0, maximum: 100 }
          }
        }
      },
      createdAt: { bsonType: 'date' },
      updatedAt: { bsonType: 'date' }
    }
  }
}

const run = async () => {
  try {
    const db = await getDb()
    const collections = await db.listCollections({ name: COLLECTION_NAME }).toArray()
    if (collections.length) {
      await db.collection(COLLECTION_NAME).drop()
    }
    await db.createCollection(COLLECTION_NAME, { validator: studentSchema })
    await db.collection(COLLECTION_NAME).createIndex({ usn: 1 }, { unique: true })

    // eslint-disable-next-line no-console
    console.log(`Database ${db.databaseName} is ready with collection ${COLLECTION_NAME}`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Setup failed:', error)
    process.exitCode = 1
  } finally {
    await closeClient()
  }
}

run()

