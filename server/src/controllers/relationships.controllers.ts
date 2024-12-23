import { Request, Response } from 'express'
import { topGroupsService } from '../services/relationships.service'

export const topGroups = async (req: Request, res: Response) => {
  try {
    const data = await topGroupsService(req.params.region, JSON.parse(req.params.top))
    res.json({
      err: false,
      message: 'Here is the deadliest organizations in the region',
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
