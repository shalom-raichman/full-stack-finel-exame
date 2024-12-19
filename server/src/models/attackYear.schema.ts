import { Document, model, Schema, Types } from 'mongoose'
import { IAttack } from './attack.schema'

export interface IAttackYear extends Document {
  attackYear: number
  attacks: IAttack[] | Types.ObjectId[]
}

export const attackYearSchema = new Schema<IAttackYear>({
  attackYear: {
    type: Number,
  },
  attacks: {
    type: [Schema.Types.ObjectId],
    ref: 'Attack',
    default: [],
  },
})

export default model<IAttackYear>('AttackYear', attackYearSchema)
