import AttackModel, { IAttack } from '../models/attack.schema'
import AttackTypeModel, { IAttackType } from '../models/attackType.schema'
import AttackRegionModel, { IAttackRegion } from '../models/attackRegion.schema'
import AttackYearModel, { IAttackYear } from '../models/attackYear.schema'
import AttackOrganizationModel, {
  IAttackOrganization,
} from '../models/attackOrganization.schema'

// 
// teets requer !!!!
//

// --- create / update attack ---

const createAttackType = async (attack: IAttack, createNew: boolean) => {
  try {
    const dbAttack = await AttackTypeModel.findOne({ attackType: attack.attacktype1_txt })
    if (dbAttack) {
      dbAttack.attacks.push(attack._id as any)
      await dbAttack.save()
    } else if (createNew) {
      const newAttackType = new AttackTypeModel({
        attackType: attack.attacktype1_txt,
        attacks: [attack._id],
      })
      await newAttackType.save()
    } else {
      throw new Error('Attack to update not found')
    }
  } catch (err) {
    throw err
  }
}

const createAttackRegion = async (attack: IAttack, createNew: boolean) => {
  try {
    const dbAttack = await AttackRegionModel.findOne({ attackRegion: attack.city })
    if (dbAttack) {
      dbAttack.attacks.push(attack._id as any)
      await dbAttack.save()
    } else if (createNew) {
      const newAttackRegion = new AttackRegionModel({
        attackRegion: attack.city,
        attacks: [attack._id],
        latitude: attack.latitude,
        longitude: attack.longitude,
      })
      await newAttackRegion.save()
    } else {
      throw new Error('Attack to update not found')
    }
  } catch (err) {
    throw err
  }
}

const createAttackYear = async (attack: IAttack, createNew: boolean) => {
  try {
    const dbAttack = await AttackYearModel.findOne({ attackYear: attack.iyear })
    if (dbAttack) {
      dbAttack.attacks.push(attack._id as any)
      await dbAttack.save()
    } else if (createNew) {
      const newAttackYear = new AttackYearModel({
        attackYear: attack.iyear,
        attacks: [attack._id],
      })
      await newAttackYear.save()
    } else {
      throw new Error('Attack to update not found')
    }
  } catch (err) {
    throw err
  }
}

const createAttackOrganization = async (attack: IAttack, createNew: boolean) => {
  try {
    const dbAttack = await AttackOrganizationModel.findOne({
      attackOrganization: attack.gname,
    })
    if (dbAttack) {
      dbAttack.attacks.push(attack._id as any)
      await dbAttack.save()
    } else if (createNew) {
      const newAttackOrganization = new AttackOrganizationModel({
        attackOrganization: attack.gname,
        attacks: [attack._id],
      })
      await newAttackOrganization.save()
    } else {
      throw new Error('Attack to update not found')
    }
  } catch (err) {
    throw err
  }
}

export const createUpdateAttackService = async (attack: IAttack, createNew: boolean) => {
  try {
    if (!attack) throw new Error('attack must be provided')

    if (!createNew) {
      const dbAttack = await AttackModel.findById(attack._id)
      if (!dbAttack) throw new Error('Attack to update not found')
      await dbAttack.set({ ...dbAttack, ...attack }).save()
      await createAttackType(attack, createNew)
      await createAttackOrganization(attack, createNew)
      await createAttackRegion(attack, createNew)
      await createAttackYear(attack, createNew)
      return dbAttack
    } else {
      const newAttack = new AttackModel(attack)
      await createAttackType(newAttack, createNew)
      await createAttackOrganization(newAttack, createNew)
      await createAttackRegion(newAttack, createNew)
      await createAttackYear(newAttack, createNew)
      await newAttack.save()
      return newAttack
    }
  } catch (err) {
    throw err
  }
}
