const router = require("express").Router();
const contractController = require("../controllers/contract.controller");
const auth = require("../middleware/auth");

router.post("/addContract", auth, contractController.addContract)
router.delete("/deleteContract/:id", auth, contractController.deleteContract)
router.post("/accept/:id", auth, contractController.accept)

module.exports = router;
