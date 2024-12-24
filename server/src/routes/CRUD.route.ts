import { Router } from 'express'
import { createAttack, updateAttack } from '../controllers/CRUD.controller'

const router = Router()

router.post('/create', createAttack)

router.post('/update', updateAttack)

export default router
