const User = require('../models/user.model')
const resCreator = require('../helper/user.helper')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWTSECURITY)
        const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token })
        if (!user) throw new Error('please authintcate')
        req.user = user
        req.token = token
        next()
    }
    catch (e) {
        res.status(500).send(resCreator(false, e.message, "not authorized"))
    }
}

module.exports = auth