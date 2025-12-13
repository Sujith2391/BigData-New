import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI // Support both naming conventions
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'test' // Fallback to 'test' if not provided

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set. Please set MONGO_URI in your environment variables.')
}

const mongoClient = new MongoClient(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})

let connectionPromise = null

export const getClient = async () => {
  if (!connectionPromise) {
    connectionPromise = mongoClient.connect()
  }
  await connectionPromise
  return mongoClient
}

export const getDb = async () => {
  const client = await getClient()
  return client.db(MONGODB_DB_NAME)
}

export const closeClient = async () => {
  if (mongoClient) {
    await mongoClient.close()
    connectionPromise = null
  }
}

