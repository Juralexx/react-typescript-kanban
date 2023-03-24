import express from 'express'
const activitiesRoutes = express.Router()
import { addActivity, getActivities } from '../controllers/activities.controller.js';

activitiesRoutes.get('/', getActivities)
activitiesRoutes.post('/add/', addActivity)

export default activitiesRoutes;