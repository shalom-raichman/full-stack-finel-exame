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
    default: 0,
  },
  nwound: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    required: true,
    minlength: [3, 'City name is to short']
  },
  iyear: {
    type: Number,
    required: true,
    minlength: [4, 'year is not valid']
  },
  imonth: {
    type: Number
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  gname: {
    type: String,
    required: true,
    minlength: [3, 'Organization is to short']
  },
  attacktype1_txt: {
    type: String,
    required: true,
    minlength: [3, 'Attack type is to short']
  }
})

export default model<IAttack>('Attack', attackSchema)