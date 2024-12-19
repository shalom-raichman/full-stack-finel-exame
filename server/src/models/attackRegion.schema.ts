import { Document, model, Schema, Types } from 'mongoose'
import { IAttack } from './attack.schema'

export interface IAttackRegion extends Document {
  attackRegion: string
  attacks: IAttack[] | Types.ObjectId[]
}

export const attackRegionSchema = new Schema<IAttackRegion>({
  attackRegion: {
    type: String,
  },
  attacks: {
    type: [Schema.Types.ObjectId],
    ref: 'Attack',
    default: [],
  },
})

export default model<IAttackRegion>('AttackRegion', attackRegionSchema)
