const router = require("express").Router();
const userController = require("../controllers/user.controller");
const contractController = require("../controllers/contract.controller");
const auth = require("../middleware/auth");

router.post("/register", userController.register);
router.get("/activate/:id", userController.activate);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.get("/myprofile", auth, userController.myprofile);
router.delete("/delete/:id", auth, userController.deleteUser);
router.patch("/edit/:id", auth, userController.editUser);
router.patch("/accept/:id", auth, contractController.accept);

module.exports = router;
