const User = require("../models/user.model");
const userHelper = require("../helper/user.helper");
const activationEmail = require("../helper/email.helper");

const generateVerificationCode = () => {
    vCode = Math.floor(Math.random() * 1000000);
    return vCode;
};

const register = async (req, res) => {
    try {
        vcode = generateVerificationCode();
        data = req.body;
        data.vCode = vCode;
        userData = new User(data);
        await userData.save();
        // email
        activationEmail(userData._id, userData.email, userData.fristName, vCode);
        res.status(200).send(userHelper.resCreator(true, userData, "data inserted"));
        userHelper.updateActivityLog("registration", userData._id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error inserting data"));
    }
};
const sendVerificationCode = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) res.status(404).send(userHelper.resCreator(false, null, "user not found"));
        if (user.status) res.status(404).send(userHelper.resCreator(false, null, "already active"));
        vCode = generateVerificationCode();
        user.vCode = vCode;
        await user.save();
        activationEmail(req.params.id, user.email, user.fristName, vCode);
        res.status(200).send(userHelper.resCreator(true, {}, "new code sent to user"));
        userHelper.updateActivityLog("send activation code", req.params.id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, null, "cant send verification code"));
    }
};
const activate = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let vCode = user.vCode;
        if (!user) res.status(404).send(userHelper.resCreator(false, null, "user not found"));
        if (user.status) res.status(404).send(userHelper.resCreator(false, null, "already active"));
        if (req.body.vCode != vCode) {
            res.send(userHelper.resCreator(false, null, "invalid code"));
        } else {
            user.status = true;
            user.vCode = undefined;
            await user.save();
            res.send(userHelper.resCreator(true, user, "activated"));
            userHelper.updateActivityLog("activate user", req.params.id, new Date().toLocaleString());
        }
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error activating user"));
    }
};
const deactivate = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) res.status(404).send(userHelper.resCreator(false, null, "user not found"));
        if (!user.status) res.status(404).send(userHelper.resCreator(false, null, "already deactive"));
        user.status = false;
        await user.save();
        logoutAll();
        res.send(userHelper.resCreator(true, user, "deactivated"));
        userHelper.updateActivityLog("deactivate user", req.params.id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error deactivating user"));
    }
};

const login = async (req, res) => {
    try {
        const userData = await User.findByCredintials(req.body.email, req.body.password);
        if (!userData.status) throw new Error("please activate your account");
        const token = await userData.addToken();
        res.status(200).send(userHelper.resCreator(true, { userData, token }, "logged in"));
        userHelper.updateActivityLog("loged in", userData._id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error logging in"));
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(ele => {
            return ele.token != req.token;
        });
        await req.user.save();
        res.status(200).send(userHelper.resCreator(true, {}, "Logged out"));
        userHelper.updateActivityLog("loged out", req.user._id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error Logging out"));
    }
};

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send(userHelper.resCreator(true, {}, "Logged out All"));
        userHelper.updateActivityLog("loged out all", req.user._id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error logging out"));
    }
};

const myprofile = async (req, res) => {
    try {
        res.status(200).send(userHelper.resCreator(true, req.user, "data featched"));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error featching data"));
    }
};

const deleteUser = async (req, res) => {
    try {
        id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        if (!data) return res.status(400).send(userHelper.resCreator(false, null, "user not found"));
        res.status(200).send(userHelper.resCreator(true, data, "user deleted"));
        userHelper.updateActivityLog("delete account", req.params.id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error in delete"));
    }
};

const editUser = async (req, res) => {
    try {
        id = req.params.id;
        notAllowed = ["status", "tokens"];
        requested = Object.keys(req.body);
        const notValidUpdates = requested.every(r => notAllowed.includes(r));
        if (notValidUpdates) return res.status(500).send(userHelper.resCreator(false, null, "invalid updates requested"));
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).send(userHelper.resCreator(false, null, "user not found"));
        res.status(200).send(userHelper.resCreator(true, user, "user updated"));
        userHelper.updateActivityLog(`update ${requested}`, id, new Date().toLocaleString());
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error in edit"));
    }
};

const showAllUsers = async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).send(userHelper.resCreator(true, data, "loding data"));
    } catch (e) {
        res.status(500).send(userHelper.resCreator(false, e.message, "error in allusers"));
    }
};

const upImg = async (req, res) => {
    req.user.img = req.file.path;
    await req.user.save();
    res.status(200).send(userHelper.resCreator(true, user, "image saved"));
    userHelper.updateActivityLog("upload image", req.user._id, new Date().toLocaleString());
};

module.exports = {
    register,
    activate,
    deactivate,
    sendVerificationCode,
    login,
    logout,
    logoutAll,
    myprofile,
    deleteUser,
    editUser,
    showAllUsers,
    upImg,
};
