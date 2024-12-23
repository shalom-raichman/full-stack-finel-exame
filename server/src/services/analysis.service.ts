import AttackTypeModel, { IAttackType } from '../models/attackType.schema'
import AttackRegionModel, { IAttackRegion } from '../models/attackRegion.schema'
import AttackYearModel, { IAttackYear } from '../models/attackYear.schema'

// --- Attacks Types Services ---

const getAttackTypesByType = async (attackTypes: string[]) => {
  try {
    const attacksTypes = (await AttackTypeModel.find({
      attackType: { $in: attackTypes },
    }).populate('attacks')) as IAttackType[]
    return attacksTypes
  } catch (err) {
    throw err
  }
}

const getAttackTypes = async () => {
  try {
    const attacksTypes = (await AttackTypeModel.find({}).populate(
      'attacks'
    )) as IAttackType[]
    return attacksTypes
  } catch (err) {
    throw err
  }
}

export const deadliestAttackTypesService = async (attackTypes: string[]) => {
  try {
    const attacksTypes =
      attackTypes[0] == 'any-type'
        ? await getAttackTypes()
        : await getAttackTypesByType(attackTypes)

    const reduceAttackTypes = attacksTypes.map((a: IAttackType) => {
      return {
        attackType: a.attackType,
        //@ts-ignore
        casualties: a.attacks.reduce((sum, a) => sum + a.nkill + a.nwound, 0),
      }
    })
    return reduceAttackTypes.sort((a, b) => b.casualties - a.casualties)
  } catch (err) {
    throw err
  }
}

// --- Attackes Region Services ---

const getAllCasualtyRegions = async () => {
  try {
    const attacksRegions = (await AttackRegionModel.find({}).populate(
      'attacks'
    )) as IAttackRegion[]
    return attacksRegions
  } catch (err) {
    throw err
  }
}

const getCasualtyRegionsByRegion = async (region: string) => {
  try {
    const attacksRegions = (await AttackRegionModel.find({
      attackRegion: region,
    }).populate('attacks')) as IAttackRegion[]
    return attacksRegions
  } catch (err) {
    throw err
  }
}

export const highestCasualtyRegionsService = async (region: string) => {
  try {
    const attacksRegions =
      region == 'any-type'
        ? await getAllCasualtyRegions()
        : await getCasualtyRegionsByRegion(region)

    const reduceAttackRegions = attacksRegions.map((a: IAttackRegion) => {
      return {
        attackRegion: a.attackRegion,
        //@ts-ignore
        casualties: a.attacks.reduce((sum, a) => sum + a.nkill + a.nwound, 0),
        longitude: a.longitude,
        latitude: a.latitude,
      }
    })
    return reduceAttackRegions.sort((a, b) => b.casualties - a.casualties).slice(0, 15)
  } catch (err) {
    throw err
  }
}

// --- Attack Year Services ---
const incidentTrendsBySingelYear = async (year: number) => {
  try {
    const attackYear = await AttackYearModel.findOne({ attackYear: year })
    return [attackYear]
  } catch (err) {
    throw err
  }
}

const incidentTrendsInLastYears = async (yearsNum: number) => {
  try {
    const currentYear = new Date().getFullYear()

    const attackYears = (await AttackYearModel.find({
      attackYear: { $gt: currentYear - yearsNum },
    })) as IAttackYear[]

    return attackYears
  } catch (err) {
    throw err
  }
}

const incidentTrendsByYears = async (from: number, to: number) => {
  try {
    const attackYears = (await AttackYearModel.find({
      attackYear: { $gt: from, $lt: to },
    })) as IAttackYear[]
    return attackYears
  } catch (err) {
    throw err
  }
}

const reduceYears = (attaksYears: IAttackYear[]) => {
  return attaksYears.map((a) => {
    return {
      attackYear: a.attackYear,
      attacksNum: a.attacks.length,
    }
  })
}

export const incidentTrendsService = async (filters: {
  year?: number
  fromYear?: number
  toYear?: number
  Nyears?: number
}) => {
  try {
    if (filters.year) {
      console.log(
        reduceYears((await incidentTrendsBySingelYear(filters.year)) as IAttackYear[])
      )
      return reduceYears(
        (await incidentTrendsBySingelYear(filters.year)) as IAttackYear[]
      )
    } else if (filters.fromYear && filters.toYear) {
      console.log(
        reduceYears(await incidentTrendsByYears(filters.fromYear, filters.toYear))
      )
      return reduceYears(await incidentTrendsByYears(filters.fromYear, filters.toYear))
    } else if (filters.Nyears) {
      console.log(reduceYears(await incidentTrendsInLastYears(filters.Nyears)))
      return reduceYears(await incidentTrendsInLastYears(filters.Nyears))
    }
  } catch (err) {
    throw err
  }
}
