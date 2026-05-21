const express = require("express");
const router = express.Router();

const TestController = require("../controllers/TestController");
const auth=require('../middleware/auth')
const superadmin=require('../middleware/adminMiddleware')



router.post("/add-test",auth,TestController.addTest);
router.get("/get-tests",TestController.getTest);
router.get("/get-test/:id",auth,TestController.getOneTest);
// router.put("/update-test/:id",auth,TestController.updateTest);
router.put("/soft-delete-test/:id",auth,TestController.softDelete);
router.put("/restore-test/:id",auth,TestController.restore);
router.delete("/delete-test/:id",auth,TestController.deleteTest);


module.exports = router;