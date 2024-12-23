import AttackRegionModel, { IAttackRegion } from '../models/attackRegion.schema'

export const getRegionsService = async () => {
  try {
    const attacksRegions = await AttackRegionModel.find({}).limit(1000).skip(10)

    return attacksRegions.map(a => a.attackRegion)
  } catch (err) {
    throw err
  }
}
