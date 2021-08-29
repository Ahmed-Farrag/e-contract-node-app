const Contract = require("../models/contract.model");
const resCreator = require("../helper/user.helper");
// const auth = require('../middleware/auth')
var QRCode = require('qrcode')

const addContract = async (req, res) => {
<<<<<<< HEAD
    try {
    let newInsert = new contract(req.body)
    // qrcode
      QRCode.toString('I am a pony!', function (err, qrurl) {
          newInsert.qrCode =(qrurl)
          })
        await newInsert.save()
        res.status(200).send(resCreator(true, newInsert, "data added successfully"))
    
=======
    const newInsert = new Contract(req.body);
    try {
        await newInsert.save();
        res.status(200).send(resCreator(true, newInsert, "data added successfully"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "data Inserting error"));
>>>>>>> 6ff4d01fd83a4bf5a6c257f57a533197202b15ef
    }
};
const accept = async (req, res) => {
    try {
        let contract = await Contract.findById(req.params.id);
        if (!contract) res.status(404).send(resCreator(false, null, "contract not found"));
        if (contract.status) res.status(404).send(resCreator(false, null, "already accepted"));
        contract.status = true;
        await contract.save();
        res.send(resCreator(true, user, "accepted"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "error accepting contract"));
    }
};
const deleteContract = async (req, res) => {
    try {
        id = req.params.id;
        const con = await contract.findOneAndDelete(id);
        if (!con) return res.status(404).send(resCreator(false, null, "data not found"));
        res.status(200).send(resCreator(true, con, "deleted"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "data Inserting error"));
    }
};
module.exports = { addContract, accept, deleteContract };
