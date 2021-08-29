const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post("/register", userController.register)
router.get("/activate/:id", userController.activate)
router.post("/login", userController.login)
router.post("/logout", auth, userController.logout)
router.get("/myprofile", auth, userController.myprofile)
router.delete("/delete/:id", auth, userController.deleteUser)
router.patch("/edit/:id", auth, userController.editUser)
router.post("/upImg",upload.single('img'), userController.upImg)

module.exports = router;
