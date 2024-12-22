import { Request, Response } from 'express'
import { deadliestAttackTypesService, highestCasualtyRegionsService } from '../services/analysis.service'

export const  deadliestAttackTypes = async (req: Request, res: Response) => {
  const data = await deadliestAttackTypesService(JSON.parse(req.params.attackType))
  try {
    res.json({
      err: false,
      message: 'Here is the deadliest attack types',
      data: data,
    })
  } catch (err) {
    res.json({
      err: true,
      message: (err as Error).message,
      data: null,
    })
  }
}

export const highestCasualtyRegions = async (req: Request, res: Response) => {
  try {
    const data = await highestCasualtyRegionsService(req.params.region)
    res.json({
      err: false,
      message: 'Here is the deadliest regions',
      data: data,
    })
  } catch (err) {
    res.json({
      err: true,
      message: (err as Error).message,
      data: null,
    })
  }
}
