import { Router } from 'express'

import {
  averageMarksBySemester,
  topPerformersByDepartment
} from '../controllers/aggregationController.js'

const router = Router()

router.get('/average-by-semester', averageMarksBySemester)
router.get('/top-performers', topPerformersByDepartment)

export default router

