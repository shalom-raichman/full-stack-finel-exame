import { Types } from 'mongoose'
import AttackModel, { IAttack } from '../models/attack.schema'
import AttackTypeModel, { IAttackType } from '../models/attackType.schema'
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

const sidAttackTypeCollection = async () => {
  try {
    const attackTypes: IAttackType[] = []

    const dbAttacks = await AttackModel.find({})

    dbAttacks.map((attack: IAttack) => {
      const attackType = attackTypes.find((a) => a.attackType == attack.attacktype1_txt)
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
    await AttackTypeModel.insertMany(attackTypes)
    console.log(`[database] attackType sid completed successfuly`)
  } catch (err) {
    console.error(err)
  }
}

export const sidDb = async () => {
  AttackModel.collection.drop()
  AttackTypeModel.collection.drop()
  console.log('delete db')
  if (!(await AttackModel.findOne())) {
    await sidMainCollection()
  }
  if (!(await AttackTypeModel.findOne())) {
    await sidAttackTypeCollection()
  }

  setTimeout(() => {}, 10000)
}
