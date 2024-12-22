import { Router } from 'express'
import { deadliestAttackTypes, highestCasualtyRegions } from '../controllers/analysis.controller'

const router = Router()

router.get('/deadliest-attack-types/:attackType', deadliestAttackTypes)

router.get('/highest-casualty-regions/:region', highestCasualtyRegions)

router.get('/highest-casualty-regions', highestCasualtyRegions)

router.get('/incident-trends/', () => {})


export default router
