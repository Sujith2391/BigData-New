import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const { MONGODB_URI, MONGODB_DB_NAME } = process.env

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set. Check your environment configuration.')
}

if (!MONGODB_DB_NAME) {
  throw new Error('MONGODB_DB_NAME is not set. Check your environment configuration.')
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

