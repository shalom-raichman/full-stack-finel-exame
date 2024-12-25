import { connect } from 'mongoose'
import { sidDbes } from './sid'

export const connentToMongo = async () => {
  try {
    await connect(process.env.DB_URI as string)
    // await sidDbes()
    console.log('[database] mongo successfully connected')
  } catch (err) {
    console.error(err)
  }
}
