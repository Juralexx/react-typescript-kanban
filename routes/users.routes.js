import express from 'express'
const usersRoutes = express.Router()
import { signIn, signUp, logout } from '../controllers/auth.controller.js'
import { deleteUser, getAllUsers, getUserByID, updateUser } from '../controllers/users.controller.js'

usersRoutes.post('/register', signUp)
usersRoutes.post('/login', signIn)
usersRoutes.get('/logout', logout)

usersRoutes.get('/', getAllUsers)
usersRoutes.get('/:id', getUserByID)
usersRoutes.put('/:id/update', updateUser)
usersRoutes.delete('/:id/delete', deleteUser)

export default usersRoutes