import { Router } from 'express'
import { createAttack, getAttacksPage, getAttacksPageByCity, updateAttack } from '../controllers/CRUD.controller'

const router = Router()

router.post('/create', createAttack)

router.post('/update', updateAttack)

router.get('/:page/:city', getAttacksPageByCity)

router.get('/:page', getAttacksPage)


export default router
