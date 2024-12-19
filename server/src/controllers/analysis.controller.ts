import { Request, Response } from 'express'

export const funcName = async (req: Request, res: Response) => {
  try {
    res.json({
      err: false,
      message: 'replace with message',
      data: null,
    })
  } catch (err) {
    res.json({
      err: true,
      message: (err as Error).message,
      data: null,
    })
  }
}

export const funcName2 = async (req: Request, res: Response) => {
  try {
    res.json({
      err: false,
      message: 'replace with message',
      data: null,
    })
  } catch (err) {
    res.json({
      err: true,
      message: (err as Error).message,
      data: null,
    })
  }
}
