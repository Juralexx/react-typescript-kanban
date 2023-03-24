import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })
import './config/db.js'
import { checkUser, requireAuth } from './middleware/auth.middleware.js'

import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import usersRoutes from './routes/users.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import activitiesRoutes from './routes/activities.routes.js'

const app = express();

const FRONT_URL = process.env.NODE_ENV !== 'production' ? process.env.DEV_FRONT_URL : process.env.FRONT_URL
const SERVER_URL = process.env.NODE_ENV !== 'production' ? process.env.DEV_SERVER_URL : process.env.SERVER_URL

app.use(cors({
    'credentials': true,
    'origin': FRONT_URL,
    'allowedHeaders': ['Content-Length', 'Content-Type', 'application', 'Authorization'],
    'methods': 'GET, POST, PUT',
    'preflightContinue': false,
}))

app.use(helmet({
    crossOriginEmbedderPolicy: false,
    // crossOriginResourcePolicy: false,
    crossOriginResourcePolicy: {
        policy: 'cross-origin'
    },
    originAgentCluster: true,
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data:"],
            "default-src": ["*"]
        }
    }
}))

app.use(express.json({ limit: '150kb' }))
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '150kb'
}))

app.use(bodyParser.json({ limit: '150kb' }))
app.use(cookieParser())

app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    return res.status(200).send(res.locals.user._id)
})

app.use('/api/user', usersRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/activities', activitiesRoutes)

const router = express.Router()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, `./build/`)))

    router.get('/', (_, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
    });
}

app.use('/', router)

if (process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', err => {
        console.error(err.stack || err)
        setTimeout(() => process.exit(1), 100)
    })
}

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
})

/**
 * WEBSOCKET
 */

import { Server } from "socket.io";

const io = new Server(server, {
    cors: {
        origins: process.env.FRONT_URL
    }
});

let users = new Array()

const addUser = (userId, socketId) => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId })
    }
}

io.on("connection", (socket) => {
    socket.on("addUser", ({ userId }) => {
        addUser(userId, socket.id)

        console.log(users);
        return io.emit("getUsers", users)
    })

    socket.on("logout", ({ receiverId, userId }) => {
        users = users.filter(user => user.userId !== userId)
        const user = users.find(member => member.userId === receiverId)
        return io.to(user.socketId).emit('logout', {
            userId
        })
    })

    /**
     * TASKS
     */

    socket.on('createTask', ({ receiverId, task, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('createTask', {
                task,
                activity
            })
        }
    })

    socket.on('updateTask', ({ receiverId, task, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('updateTask', {
                task,
                activity
            })
        }
    })

    socket.on('deleteTask', ({ receiverId, taskId, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('deleteTask', {
                taskId,
                activity
            })
        }
    })

    socket.on('commentTask', ({ receiverId, taskId, comment }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('commentTask', {
                taskId,
                comment
            })
        }
    })
})