const router = require("express").Router()
const userController = require("../controllers/user.controller")
const auth = require("../middleware/auth")
const upload = require('../middleware/uploud-file')


router.post("/register", userController.register)
router.patch("/activate/:id", userController.activate)
router.patch("/deactivate/:id", userController.deactivate)
router.patch("/sendVerificationCode/:id", userController.sendVerificationCode)
router.post("/login", userController.login)
router.post("/logout", auth, userController.logout)
router.post("/logoutAll", auth, userController.logoutAll)
router.get("/myprofile", auth, userController.myprofile)
router.delete("/delete/:id", auth, userController.deleteUser)
router.patch("/edit/:id", auth, userController.editUser)
router.get("/showAllUsers", auth, userController.showAllUsers)
router.post("/upImg", auth, upload.single('profile'), userController.upImg)

module.exports = router
