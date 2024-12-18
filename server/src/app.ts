import express, { Request, Response } from 'express'
import cors from 'cors'
import { connentToMongo } from './config/db'
import { sidDb } from './config/sid'
import 'dotenv/config'

const PORT = process.env.PORT || 3000

const app = express()

connentToMongo()
sidDb()

app.use(cors())
app.use(express.json())

// app.use('/api/')
// app.use('/api/')


app.listen(PORT, () => {
  console.log(`[server] is up and runing on port ${PORT}`)
})
