const Contract = require('../models/contract.model');
const TermsOfContract = require('../models/termsOfContract.model');
const userHelper = require('../helper/user.helper');
var QRCode = require('qrcode');

const addContract = async (req, res) => {
    try {
        let newInsert = new Contract(req.body);
        newInsert.fristPartyId = req.user._id;
        await newInsert.save();
        res.status(200).send(userHelper.resCreator(true, newInsert, 'data added successfully'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'data Inserting error'));
    }
};
const addContractTerms = async (req, res) => {
    try {
        let newInsert = new TermsOfContract(req.body);
        newInsert.contractId = req.params._id;
        await newInsert.save();
        res.status(200).send(userHelper.resCreator(true, newInsert, 'data added successfully'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'data Inserting error'));
    }
};
const acceptContract = async (req, res) => {
    try {
        let contract = await Contract.findById(req.params.id);
        if (!contract) res.status(404).send(userHelper.resCreator(false, null, 'contract not found'));
        if (contract.status) res.status(404).send(userHelper.resCreator(false, null, 'already accepted'));
        contract.status = true;
        // qrcode
        QRCode.toString(`http://localhost:3000/checkContract/${req.params.id}`, function (err, qrurl) {
            contract.qrCode = qrurl;
        });
        await contract.save();
        res.status(200).send(userHelper.resCreator(true, user, 'accepted'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'error accepting contract'));
    }
};
const deleteContract = async (req, res) => {
    try {
        id = req.params.id;
        const con = await Contract.findByIdAndDelete(id);
        if (!con) return res.status(404).send(userHelper.resCreator(false, null, 'data not found'));
        res.status(200).send(userHelper.resCreator(true, con, 'deleted'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'cant delete contract'));
    }
};
const allContracts = async (req, res) => {
    try {
        userId = req.user._id;
        const data = await Contract.find({ fristPartyId: userId, status: true });
        res.status(200).send(userHelper.resCreator(true, data, 'data loaded successfully'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'error featching data'));
    }
};
const contractRequests = async (req, res) => {
    try {
        userId = req.user._id;
        const data = await Contract.find({ fristPartyId: userId, status: false });
        res.status(200).send(userHelper.resCreator(true, data, 'data loaded successfully'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'error featching data'));
    }
};
const editContract = async (req, res) => {
    try {
        id = req.params.id;
        let contract = await Contract.findById(id);
        if (!contract) return res.status(404).send(userHelper.resCreator(false, null, 'contract not found'));
        if (contract.status) return res.status(500).send(userHelper.resCreator(false, null, 'you cant edit an active contract'));
        allowed = ['secondPartyId'];
        requested = Object.keys(req.body);
        const validUpdates = requested.every(r => allowed.includes(r));
        if (!validUpdates) return res.status(500).send(userHelper.resCreator(false, null, 'invalid updates requested'));
        contract = await TermsOfContract.findByIdAndUpdate(id, req.body);
        res.status(200).send(userHelper.resCreator(true, user, 'contract updated'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'error in edit'));
    }
};
const singleContract = async (req, res) => {
    try {
        let contract = await Contract.findById(req.params.id);
        if (!contract) res.status(404).send(userHelper.resCreator(false, null, 'contract not found'));
        res.status(200).send(userHelper.resCreator(true, contract, 'data featched'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'error featching data'));
    }
};
const requestContractUpdates = async (req, res) => {
    try {
        let contract = await TermsOfContract.find({ contractId: req.params.id });
        if (!contract) return res.status(404).send(userHelper.resCreator(false, null, 'contract not found'));
        contract.requestedUpdates = req.body;
        await contract.save();
        res.status(200).send(userHelper.resCreator(true, contract, 'updates requested successfully'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'updates requesting error'));
    }
};
const acceptContractUpdates = async (req, res) => {
    try {
        let contract = await TermsOfContract.find({ contractId: req.params.id });
        if (!contract) return res.status(404).send(userHelper.resCreator(false, null, 'contract not found'));
        contract.term = contract.requestedUpdates.term;
        contract.termContent = contract.requestedUpdates.termContent;
        await contract.save();
        res.status(200).send(userHelper.resCreator(true, contract, 'updates requested successfully'));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, 'updates requesting error'));
    }
};

module.exports = {
    singleContract,
    allContracts,
    editContract,
    requestContractUpdates,
    acceptContractUpdates,
    deleteContract,
    addContract,
    acceptContract,
    contractRequests,
    addContractTerms,
};
