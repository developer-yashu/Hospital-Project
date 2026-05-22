const express = require("express");
const router = express.Router();

const DepartmentController = require("../controllers/DepartmentController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");

// const CountController = require("../controllers/CountController");
// router.post("/add-Count", CountController.addCount);





router.post("/add-Department",auth, DepartmentController.addDepartment);
router.get("/get-all-Department",auth,DepartmentController.getDepartment);
router.get("/get-One-Department/:id",DepartmentController.getOneDepartment);
router.put("/update-Department/:id", DepartmentController.updateDepartment);


router.put("/soft-delete-Department/:id",DepartmentController.softDeleteDepartment);
router.put("/restore-Department/:id",auth, DepartmentController.restoreDepartment);
router.delete("/delete-Department/:id",auth, DepartmentController.deleteDepartment);


module.exports = router;

