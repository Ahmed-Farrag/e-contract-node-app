const router = require("express").Router();
const contractController = require("../controllers/contract.controller");
const auth = require("../middleware/auth");

router.get("/checkContract/:id", contractController.singleContract);
router.get("/singleContract/:id", auth, contractController.singleContract);
router.get("/allContracts", auth, contractController.allContracts);
router.get("/contractRequests", auth, contractController.contractRequests);
router.post("/addContract", auth, contractController.addContract);
router.post("/addContractTerms/:id", auth, contractController.addContractTerms);
router.patch("/editContract/:id", auth, contractController.editContract);
router.post("/requestContractUpdates/:id", auth, contractController.requestContractUpdates);
router.post("/acceptContractUpdates/:id", auth, contractController.acceptContractUpdates);
router.delete("/deleteContract/:id", auth, contractController.deleteContract);
router.post("/acceptContract/:id", auth, contractController.acceptContract);

module.exports = router;
