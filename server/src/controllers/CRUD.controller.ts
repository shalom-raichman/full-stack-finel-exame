import { Request, Response } from 'express'
import { createUpdateAttackService } from '../services/CRUD.service'
import { getAttacksPageByCityService, getAttacksPageService } from '../services/utils.service'

export const createAttack = async (req: Request, res: Response) => {
  try {
    const data = await createUpdateAttackService(req.body, true)
    res.status(201).json({
      err: false,
      message: 'Here is the new attack',
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

export const updateAttack = async (req: Request, res: Response) => {
  try {
    const data = await createUpdateAttackService(req.body, false)
    res.status(201).json({
      err: false,
      message: 'Here is the new attack',
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

export const getAttacksPage = async (req: Request, res: Response) => {
  try {
    const data = await getAttacksPageService(Number(req.params.page))
    res.status(200).json({
      err: false,
      message: 'Here is the data',
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

export const getAttacksPageByCity = async (req: Request, res: Response) => {
  try {
    const data = await getAttacksPageByCityService(Number(req.params.page), req.params.city)
    res.status(200).json({
      err: false,
      message: 'Here is the data',
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
