const contract = require('../models/contract.model')
const resCreator = require('../helper/user.helper')
// const auth = require('../middleware/auth')
var QRCode = require('qrcode')

const addContract = async (req, res) => {
    try {
    let newInsert = new contract(req.body)
    // qrcode
      QRCode.toString('I am a pony!', function (err, qrurl) {
          newInsert.qrCode =(qrurl)
          })
        await newInsert.save()
        res.status(200).send(resCreator(true, newInsert, "data added successfully"))
    
    }
    catch (e) {
        res.status(500).send(resCreator(false, e.message, "data Inserting error"))
    }
}
const deleteContract = async (req, res) => {
    try {
        id = req.params.id
        const con = await contract.findOneAndDelete(id)
        if (!con) return res.status(404).send(resCreator(false, null, "data not found"))
        res.status(200).send(resCreator(true, con, "deleted"))
    }
    catch (e) {
        res.status(500).send(resCreator(false, e.message, "data Inserting error"))
    }
}

module.exports = { addContract, deleteContract }