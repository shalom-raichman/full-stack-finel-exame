import { connect } from 'mongoose'

export const connentToMongo = async () => {
  try {
    await connect(process.env.DB_URI as string)
    console.log('[database] mongo successfully connected')
  } catch (err) {
    console.error(err)
  }
}
