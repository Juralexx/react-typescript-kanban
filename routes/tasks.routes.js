import express from 'express'
const tasksRoutes = express.Router()
import { findTaskById, getTasks, commentTask, createTask, deleteTask, updateTask } from '../controllers/tasks.controller.js'

tasksRoutes.get('/', getTasks)
tasksRoutes.get('/:id', findTaskById)

tasksRoutes.post('/add/', createTask)
tasksRoutes.put('/:id/update/', updateTask)
tasksRoutes.put('/:id/comment/', commentTask)
tasksRoutes.delete('/:id/delete/', deleteTask)

export default tasksRoutes;