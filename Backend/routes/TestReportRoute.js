const express = require("express");
const router = express.Router();

const TestReportController = require("../controllers/TestReportController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");

router.post("/add-test-report",auth, TestReportController.addTestReport);
router.get("/getall-test-report",auth, TestReportController.getTestReport);
// router.put("/update-reached/:id",auth, TestReportController.updateReach);


router.put("/update-rejected/:id",auth,TestReportController.updateRejected);


module.exports = router;
