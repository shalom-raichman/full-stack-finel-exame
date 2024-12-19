import { IAttack } from '../models/attack.schema'
import AttackTypeModel, { IAttackType } from '../models/attackType.schema'

export const deadliestAttackTypesService = async (attackType?: string) => {
  try {
    const attacksTypes = await AttackTypeModel.find({}).populate('attacks') as IAttackType[]
    const reduceAttackTypes = attacksTypes.map((a: IAttackType) => {
      return {
        attackType: a.attackType,
        //@ts-ignore
        casualties: a.attacks.reduce((sum, a ) => sum + a.nkill + a.nwound, 0)
      }
    }).sort((a, b) => b.casualties - a.casualties)
    console.log(reduceAttackTypes)
  } catch (err) {
    throw err
  }
}
