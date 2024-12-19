import { IAttack } from '../models/attack.schema'
import AttackOrganizationModel from '../models/attackOrganization.schema'
import AttackRegionModel, { IAttackRegion } from '../models/attackRegion.schema'

const getGroupsByRgion = async (region: string) => {
  try {
    const attacksRegions = (await AttackRegionModel.findOne({
      attackRegion: region,
    }).populate('attacks')) as IAttackRegion

    const organizations: { organization: string; attacksNumber: number }[] = []
    ;(attacksRegions.attacks as IAttack[]).map((attack: IAttack) => {
      const currentAttack = organizations.find((a) => a.organization == attack.gname)
      if (currentAttack) {
        currentAttack.attacksNumber += 1
      } else {
        organizations.push({ organization: attack.gname, attacksNumber: 1 })
      }
    })
    return organizations
  } catch (err) {
    throw err
  }
}

export const TopGroupsService = async (region: string, top: boolean) => {
  try {
    if (top) {
      console.log((await getGroupsByRgion(region))
      .sort((a, b) => b.attacksNumber - a.attacksNumber)
      .slice(0, 5))
      return (await getGroupsByRgion(region))
        .sort((a, b) => b.attacksNumber - a.attacksNumber)
        .slice(0, 5)
    } else {
      console.log(await getGroupsByRgion(region))
      return await getGroupsByRgion(region)
    }
  } catch (err) {
    throw err
  }
}
