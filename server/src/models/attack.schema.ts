import { Document, model, Schema } from 'mongoose'

export interface IAttack extends Document {
  eventid: number,
  nkill: number
  nwound: number
  city: string
  iyear: number
  imonth: number
  latitude: number
  longitude: number
  gname: string
  attacktype1_txt: string
}

export const attackSchema = new Schema<IAttack>({
  eventid: Number,
  nkill: {
    type: Number,
    default: 0
  },
  nwound: {
    type: Number,
    default: 0
  },
  city: {
    type: String
  },
  iyear: {
    type: Number
  },
  imonth: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  gname: {
    type: String
  },
  attacktype1_txt: {
    type: String
  }
})

export default model<IAttack>('Attack', attackSchema)