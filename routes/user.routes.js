const router = require("express").Router();
const userController = require("../controllers/user.controller");
<<<<<<< HEAD
const auth = require("../middleware/auth")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
=======
const contractController = require("../controllers/contract.controller");
const auth = require("../middleware/auth");
>>>>>>> 6ff4d01fd83a4bf5a6c257f57a533197202b15ef

router.post("/register", userController.register)
router.get("/activate/:id", userController.activate)
router.post("/login", userController.login)
router.post("/logout", auth, userController.logout)
router.get("/myprofile", auth, userController.myprofile)
router.delete("/delete/:id", auth, userController.deleteUser)
router.patch("/edit/:id", auth, userController.editUser)
router.post("/upImg",upload.single('img'), userController.upImg)

router.post("/accept/:id", auth, contractController.accept);

module.exports = router;
