import { Document, model, Schema, Types } from 'mongoose'
import { IAttack } from './attack.schema'

export interface IAttackOrganization extends Document {
  attackOrganization: string
  attacks: IAttack[] | Types.ObjectId[]
}

export const attackOrganizationSchema = new Schema<IAttackOrganization>({
  attackOrganization: {
    type: String,
  },
  attacks: {
    type: [Schema.Types.ObjectId],
    ref: 'Attack',
    default: [],
  },
})

export default model<IAttackOrganization>('AttackOrganization', attackOrganizationSchema)
