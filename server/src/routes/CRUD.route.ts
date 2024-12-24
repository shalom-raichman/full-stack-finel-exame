import { Router } from 'express'
import { createAttack, getAttacksPage, updateAttack } from '../controllers/CRUD.controller'

const router = Router()

router.get('/:page', getAttacksPage)

router.post('/create', createAttack)

router.post('/update', updateAttack)

export default router
