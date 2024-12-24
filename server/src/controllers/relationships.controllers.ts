import { Request, Response } from 'express'
import { topGroupsService } from '../services/relationships.service'
import { getRegionsService } from '../services/utils.service'

export const topGroups = async (req: Request, res: Response) => {
  try {
    const data = await topGroupsService(req.params.region, JSON.parse(req.params.top))
    res.status(200).json({
      err: false,
      message: 'Here is the deadliest organizations in the region',
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

export const getRegions = async (req: Request, res: Response) => {
  try {
    const data = await getRegionsService()
    res.status(200).json({
      err: false,
      message: 'Here is the deadliest organizations in the region',
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
