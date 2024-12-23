import { Router } from 'express'
import { topGroups } from '../controllers/relationships.controllers'

const router = Router()

router.get('/top-groups/:region/:top', topGroups)

router.get('/groups-by-year/', () => {})



export default router
