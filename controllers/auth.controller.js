import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { signUpErrors, signInErrors } from '../utils/error.utils.js'

/**
 * Register function
 */

export const signUp = async (req, res) => {
    const { pseudo, password } = req.body

    let avatars = []
    new Array(21).map((_, i) => { return avatars = [...avatars, `avatar-${i + 1}.png`] })

    const picture = () => { return avatars[Math.floor(Math.random() * avatars.length)] }

    await UserModel.create({
        pseudo,
        password,
        picture: picture(),
        tasks: []
    })
        .then(docs => {
            return res.send(docs)
        })
        .catch(err => {
            const errors = signUpErrors(err);
            return res.status(200).send({ errors })
        })
}

/**
 * Create unique token to validate user authenticity
 */

const maxAge = 3000 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge })
}

/**
 * Create user account
 * @param {*} pseudo User pseudo used to sign in
 * @param {*} password User password
 */

export const signIn = async (req, res) => {
    const { pseudo, password } = req.body

    try {
        const user = await UserModel.login(pseudo, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
        res.status(200).json({ user: user._id })
    } catch (err) {
        console.log(err);
        const errors = signInErrors(err)
        res.status(200).send({ errors });
    }
}

/**
 * Logout function, remove the unique jwt token and redirect to the root page
 * @param {*} req 
 * @param {*} res 
 */

export const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}