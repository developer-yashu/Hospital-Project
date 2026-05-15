const express = require("express");
const router = express.Router();

const DepartmentController = require("../controllers/DepartmentController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");




router.post("/add-Department", DepartmentController.addDepartment);
router.get("/get-all-Department",DepartmentController.getDepartment);
router.get("/get-One-Department/:id",DepartmentController.getOneDepartment);
router.put("/update-Department/:id", DepartmentController.updateDepartment);


router.put("/soft-delete-Department/:id",DepartmentController.softDeleteDepartment);
router.put("/restore-Department/:id", DepartmentController.restoreDepartment);
router.delete("/delete-Department/:id", DepartmentController.deleteDepartment);


module.exports = router;

