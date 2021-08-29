const contract = require('../models/contract.model')
const resCreator = require('../helper/user.helper')
// const auth = require('../middleware/auth')

const addContract = async (req, res) => {
    const newInsert = new contract(req.body)
    try {
        await newInsert.save()
        res.status(200).send(resCreator(true, newInsert, "data added successfully"))
    }
    catch (e) {

        res.status(500).send(resCreator(false, e.message, "data Inserting error"))
    }
}

module.exports = { addContract }