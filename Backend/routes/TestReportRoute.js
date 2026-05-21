const express = require("express");
const router = express.Router();

const TestReportController = require("../controllers/TestReportController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");

router.post("/add-test-report",auth, TestReportController.addTestReport);



module.exports = router;
