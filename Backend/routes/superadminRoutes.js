const express = require("express");
const router = express.Router();

const superadmincontrollers=require("../controllers/superadmincontrollers");

const auth=require('../middleware/auth')
const superadmin=require('../middleware/adminMiddleware')

 
router.post("/create-superadmin",superadmincontrollers.createSuperAdmin);
router.post("/superadmin-login",superadmincontrollers.login);
router.post("/reset-Password",superadmincontrollers.resetPassword);
router.post("/signup",superadmincontrollers.signup);


router.get("/get-profile",auth,superadmincontrollers.getProfile);

router.get("/get-all-appointments",auth,superadmincontrollers.getAppointments);
router.post("/add-appointment",auth,superadmincontrollers.addAppointment);




module.exports = router;