const express = require("express");
const router = express.Router();

const SubDepartmentControlle = require("../controllers/SubDepartmentControlle");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");




router.post("/add-subdepartment", SubDepartmentControlle.addsubdepartment);
router.get("/get-all-subdepartment",SubDepartmentControlle.getsubdepartment);

router.get("/get-One-subdepartment/:id",SubDepartmentControlle.getOnesubdepartment);
router.put("/update-subdepartment/:id", SubDepartmentControlle.updatesubdepartment);

router.put("/soft-delete-subdepartment/:id",SubDepartmentControlle.softDeletesubdepartment);
router.put("/restore-subdepartment/:id", SubDepartmentControlle.restoresubdepartment);

router.delete("/delete-subdepartment/:id", SubDepartmentControlle.deletesubdepartment);

module.exports = router;

