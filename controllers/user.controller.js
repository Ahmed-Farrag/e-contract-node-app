const User = require('../models/user.model')
const resCreator = require('../helper/user.helper')
const activationEmail = require('../helper/email.helper')
const auth = require('../middleware/auth')



const register = async (req, res) => {
    try {
        const userData = new User(req.body)
        await userData.save()
        // email
        activationEmail(userData.email, `activation link http://localhost:3000/activate/${userData._id}`)
        res.status(200).send(resCreator(true, userData, "data inserted"))
    }
    catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"))
    }
}

const activate = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) res.status(404).send(resCreator(false, null, "user not found"))
        if (user.status) res.status(404).send(resCreator(false, null, "already active"))
        user.status = true
        await user.save()
        res.send(resCreator(true, user, "activated"))
    }
    catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"))
    }
}

const login = async (req, res) => {
    try {
        const userData = await User.findByCredintials(req.body.email, req.body.password)
        const token = await userData.addToken()
        res.status(200).send(resCreator(true, { userData, token }, "logged in"))
    }
    catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"))
    }


}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(ele => {
            return ele.token != req.token
        })
        await req.user.save()
        res.status(200).send(resCreator(true, {}, "Logged out"))
    }
    catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"))
    }
}

const myprofile = async (req, res) => {
    res.status(200).send(resCreator(true, req.user, "data featched"))
}

module.exports = { register, activate, login, logout, myprofile }