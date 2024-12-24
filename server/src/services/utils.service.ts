import AttackRegionModel, { IAttackRegion } from '../models/attackRegion.schema'
import AttackModel, { IAttack } from '../models/attack.schema'

export const getRegionsService = async () => {
  try {
    const attacksRegions = await AttackRegionModel.find({}).limit(1000).skip(10)

    return attacksRegions.map(a => a.attackRegion)
  } catch (err) {
    throw err
  }
}

export const getAttacksPageService = async (page: number) => {
  try {
    page = (page - 1) * 100
    const attacksRegions = await AttackModel.find({}).limit(100).skip(page)
    return attacksRegions
  } catch (err) {
    throw err
  }
}
