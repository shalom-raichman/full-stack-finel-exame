import analysisRouter from './routes/analysis.route'
import relationshipsRouter from './routes/relationships.route'
import express from 'express'
import { connentToMongo } from './config/db'
import cors from 'cors'
import 'dotenv/config'

const PORT = process.env.PORT || 3000

const app = express()

connentToMongo()

app.use(cors())
app.use(express.json())

app.use('/api/analysis', analysisRouter)
app.use('/api/relationships', relationshipsRouter)

app.listen(PORT, () => {
  console.log(`[server] is up and runing on port ${PORT}`)
})
