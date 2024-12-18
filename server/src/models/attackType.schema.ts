import { Document, model, Schema, Types } from 'mongoose'
import attackSchema, { IAttack } from './attack.schema'

export interface IAttackType extends Document {
  attackType: string
  attacks: IAttack[] | Types.ObjectId[]
}

export const attackTypeSchema = new Schema<IAttackType>({
  attackType: {
    type: String,
  },
  attacks: {
    type: [Schema.Types.ObjectId],
    ref: 'Attack',
    default: [],
  },
})

export default model<IAttackType>('AttackType', attackTypeSchema)
