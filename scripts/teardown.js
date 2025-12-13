import dotenv from 'dotenv'
import { closeClient, getDb } from '../src/config/mongoClient.js'

dotenv.config()

const run = async () => {
  try {
    const db = await getDb()
    await db.dropDatabase()
    // eslint-disable-next-line no-console
    console.log(`Database ${db.databaseName} dropped successfully`)
  } catch (error) {
    if (error.message?.includes('ns not found')) {
      // eslint-disable-next-line no-console
      console.warn('Database already removed; nothing to drop.')
      return
    }
    // eslint-disable-next-line no-console
    console.error('Teardown failed:', error)
    process.exitCode = 1
  } finally {
    await closeClient()
  }
}

run()

