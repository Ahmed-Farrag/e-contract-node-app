const User = require('../models/user.model')
const resCreator = require('../helper/user.helper')
const activationEmail = require('../helper/email.helper')
const auth = require('../middleware/auth')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const register = async (req, res) => {
    try {
        const userData = new User(req.body);
        await userData.save();
        // email
        activationEmail(userData.email, `activation link http://localhost:3000/activate/${userData._id}`);
        res.status(200).send(resCreator(true, userData, "data inserted"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"));
    }
};

const activate = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) res.status(404).send(resCreator(false, null, "user not found"));
        if (user.status) res.status(404).send(resCreator(false, null, "already active"));
        user.status = true;
        await user.save();
        res.send(resCreator(true, user, "activated"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"));
    }
};

const login = async (req, res) => {
    try {
        const userData = await User.findByCredintials(req.body.email, req.body.password);
        const token = await userData.addToken();
        res.status(200).send(resCreator(true, { userData, token }, "logged in"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"));
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(ele => {
            return ele.token != req.token;
        });
        await req.user.save();
        res.status(200).send(resCreator(true, {}, "Logged out"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "error inserting data"));
    }
};

const myprofile = async (req, res) => {
    res.status(200).send(resCreator(true, req.user, "data featched"));
};

const deleteUser = async (req, res) => {
    try {
        id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        if (!data) return res.status(400).send(resCreator(false, null, "user not found"));
        res.status(200).send(resCreator(true, data, "user deleted"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "error in delete"));
    }
};

const editUser = async (req, res) => {
    try {
        id = req.params.id;
        notAllowed = ["status", "tokens"];
        requested = Object.keys(req.body);
        const notValidUpdates = requested.every(r => notAllowed.includes(r));
        if (notValidUpdates) return res.status(500).send(resCreator(false, null, "invalid updates requested"));
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).send(resCreator(false, null, "user not found"));
        res.status(200).send(resCreator(true, user, "user updated"));
    } catch (e) {
        res.status(500).send(resCreator(false, e.message, "error in edit"));
    }
};



// const upImg = async (req, res) => {
 
// req.user.image = req.file.path
//     await req.user.save()
//     res.send('done')
//     //  catch (e) {
//     //     res.status(500).send(resCreator(false, e.message, "error in uloude"));
//     // }
// };

module.exports = { register, activate, login, logout, myprofile, deleteUser, editUser };
