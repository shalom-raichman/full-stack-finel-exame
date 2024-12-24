import { Request, Response } from 'express'
import { deadliestAttackTypesService, highestCasualtyRegionsService, incidentTrendsService } from '../services/analysis.service'

export const  deadliestAttackTypes = async (req: Request, res: Response) => {
  const data = await deadliestAttackTypesService(JSON.parse(req.params.attackType))
  try {
    res.status(200).json({
      err: false,
      message: 'Here is the deadliest attack types',
      data: data,
    })
  } catch (err) {
    res.status(400).json({
      err: true,
      message: (err as Error).message,
      data: null,
    })
  }
}

export const highestCasualtyRegions = async (req: Request, res: Response) => {
  try {
    const data = await highestCasualtyRegionsService(req.params.region)
    res.status(200).json({
      err: false,
      message: 'Here is the deadliest regions',
      data: data,
    })
  } catch (err) {
    res.status(400).json({
      err: true,
      message: (err as Error).message,
      data: null,
    })
  }
}

export const incidentTrends = async (req: Request, res: Response) => {
  try {
    const query = JSON.parse((req.query.filter as string))
    const data = await incidentTrendsService(query)
    res.status(200).json({
      err: false,
      message: 'Here is the deadliest regions',
      data: data,
    })
  } catch (err) {
    res.status(400).json({
      err: true,
      message: (err as Error).message,
      data: null,
    })
  }
}
