import { Router } from 'express'
import { getRegions, topGroups } from '../controllers/relationships.controllers'

const router = Router()

router.get('/top-groups/:region/:top', topGroups)

router.get('/regions/', getRegions)

router.get('/groups-by-year/', () => {})



export default router
