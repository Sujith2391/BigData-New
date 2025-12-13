import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import dotenv from 'dotenv'

import studentRoutes from './routes/studentRoutes.js'
import aggregationRoutes from './routes/aggregationRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/students', studentRoutes)
app.use('/api/analytics', aggregationRoutes)

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')))

// Handle React routing, return all requests to React app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    const { getClient } = await import('./config/mongoClient.js')
    await getClient()
    console.log('Connected to MongoDB')

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Student Record Management System listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  }
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer()
} else {
  // For Vercel, we need to export the app but also ensure DB connects.
  // Vercel handles the server listening.
  // We can trigger DB connection asynchronously.
  const { getClient } = await import('./config/mongoClient.js')
  getClient().then(() => {
    console.log('Connected to MongoDB (Vercel)')
  }).catch(err => {
    console.error('Failed to connect to MongoDB (Vercel)', err)
  })
}

export default app

