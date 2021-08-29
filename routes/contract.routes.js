const router = require("express").Router();
const contractController = require("../controllers/contract.controller");
const auth = require("../middleware/auth");

router.post("/addContract", auth, contractController.addContract);
router.post("/accept", auth, contractController.addContract);

module.exports = router;
