const express = require("express");
const router = express.Router();

const LabController = require("../controllers/LabController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");

router.post("/add-lab",auth, LabController.addLab);

router.get("/get-labs",auth, LabController.getLabs);
router.get("/get-lab/:id",auth, LabController.getOneLabs);
router.put("/update-lab/:id",auth, LabController.updateLab);
router.put("/soft-delete-lab/:id",auth, LabController.softDelete);
router.put("/restore-lab/:id",auth, LabController.restore);
router.delete("/delete-lab/:id",auth, LabController.deleteLab);








module.exports = router;