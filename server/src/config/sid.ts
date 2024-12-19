import AttackModel, { IAttack } from '../models/attack.schema'
import AttackTypeModel, { IAttackType } from '../models/attackType.schema'
import AttackYearModel, { IAttackYear } from '../models/attackYear.schema'
import AttackOrganizationModel, {
  IAttackOrganization,
} from '../models/attackOrganization.schema'
import AttackRgionModel, { IAttackRegion } from '../models/attackRegion.schema'
import fs from 'fs/promises'

const getDataFromJson = async () => {
  try {
    const data = JSON.parse((await fs.readFile('../server/attacksData.json')).toString())
    if (!data) throw new Error("can't reade json file")
    return data
  } catch (err) {
    console.error(`Got an error trying to read the file: ${(err as Error).message}`)
  }
}

const sidMainCollection = async () => {
  try {
    const data = await getDataFromJson()
    const filteredData = data.filter(
      (a: IAttack) => a.attacktype1_txt && a.latitude && a.longitude && a.gname && a.iyear
    )
    await AttackModel.insertMany(filteredData)
    console.log('[database] main sid completed succefuly')
  } catch (err) {
    console.error(err)
  }
}

const sidAttackTypeCollection = async (dbAttacks: IAttack[]) => {
  try {
    // empty array for the attacks types
    const attackTypes: IAttackType[] = []
    dbAttacks.map((attack) => {
      // check if the attack type found
      const attackType = attackTypes.find((a) => a.attackType == attack.attacktype1_txt)
      // check if the attack type allredy exists
      if (!attackType) {
        const newAttackType = new AttackTypeModel({
          attackType: attack.attacktype1_txt,
          attacks: [attack._id],
        })
        attackTypes.push(newAttackType)
      } else {
        attackType.attacks.push(attack._id as any)
      }
    })
    // insert the attack types array to the data base
    await AttackTypeModel.insertMany(attackTypes)
  } catch (err) {
    console.error(err)
  }
}
const sidAttackYearCollection = async (dbAttacks: IAttack[]) => {
  try {
    // empty array for the attacks types
    const attackYears: IAttackYear[] = []

    dbAttacks.map((attack) => {
      // check if the attack type allredy exists
      const attackYear = attackYears.find((a) => a.attackYear == attack.iyear)

      // check if the attack type found
      if (!attackYear) {
        const newAttackYear = new AttackYearModel({
          attackYear: attack.iyear,
          attacks: [attack._id],
        })
        attackYears.push(newAttackYear)
      } else {
        attackYear.attacks.push(attack._id as any)
      }
    })
    // insert the attack types array to the data base
    await AttackYearModel.insertMany(attackYears)
  } catch (err) {
    console.error(err)
  }
}
const sidAttackOrganizationCollection = async (dbAttacks: IAttack[]) => {
  try {
    console.log('start organization')
    // empty array for the attacks types
    const attackOrganizations: IAttackOrganization[] = []

    dbAttacks.map((attack) => {
      // check if the attack type allredy exists
      const attackOrganization = attackOrganizations.find(
        (a) => a.attackOrganization == attack.gname
      )

      // check if the attack type found
      if (!attackOrganization) {
        const newAttackOrganization = new AttackOrganizationModel({
          attackOrganization: attack.gname,
          attacks: [attack._id],
        })
        attackOrganizations.push(newAttackOrganization)
      } else {
        attackOrganization.attacks.push(attack._id as any)
      }
    })
    // insert the attack types array to the data base
    await AttackOrganizationModel.insertMany(attackOrganizations)
  } catch (err) {
    console.error(err)
  }
}
const sidAttackRegionCollection = async (dbAttacks: IAttack[]) => {
  try {
    // empty array for the attacks types
    const attackRegions: IAttackRegion[] = []

    dbAttacks.map(attack => {
    // check if the attack type allredy exists
    const attackRegion = attackRegions.find((a) => a.attackRegion == attack.city)

    // check if the attack type found
    if (!attackRegion) {
      const newAttackRegion = new AttackRgionModel({
        attackRegion: attack.city,
        attacks: [attack._id],
      })
      attackRegions.push(newAttackRegion)
    } else {
      attackRegion.attacks.push(attack._id as any)
    }
  })
    // insert the attack types array to the data base
    await AttackRgionModel.insertMany(attackRegions)
  } catch (err) {
    console.error(err)
  }
}

const sidCollections = async () => {
  try {
    const dbAttacks = await AttackModel.find({})
    await sidAttackTypeCollection(dbAttacks)
    console.log(`[database] attackType sid completed successfuly`)
    await sidAttackOrganizationCollection(dbAttacks)
    console.log(`[database] AttackOrganizationModel sid completed successfuly`)
    await sidAttackRegionCollection(dbAttacks)
    console.log(`[database] AttackRgionModel sid completed successfuly`)
    await sidAttackYearCollection(dbAttacks)
    console.log(`[database] AttackYearModel sid completed successfuly`)
  } catch (err) {
    console.error(err)
  }
}

export const sidDbes = async () => {

  if (!(await AttackModel.findOne())) {
    await sidMainCollection()
  }
  if (!(await AttackTypeModel.findOne())) {
    await sidCollections()
  }
}
