import { Router } from 'express'
import { createAttack } from '../controllers/CRUD.controller'

const router = Router()

router.post('/create', createAttack)

export default router
