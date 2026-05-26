const express = require("express");
const router = express.Router();

const  MedicineController = require("../controllers/MedicineController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");


router.post("/add-medicine",auth,MedicineController.addMedicine);
router.get("/get-medicines",auth,MedicineController.getMedicines);

router.get("/doctor-medicines",auth,MedicineController.getDoctorMedicines);
router.get("/lab-tests",auth,MedicineController.getLabTests);



module.exports = router;
