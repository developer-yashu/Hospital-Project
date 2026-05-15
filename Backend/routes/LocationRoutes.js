const express = require("express");
const router = express.Router();

const Location = require("../controllers/locationController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");

// addstate
router.post("/addState", Location.addState);
router.get("/get-state", Location.getAllState);
router.get("/get-state-one/:id", Location.getOneState);
router.delete("/delete-state-One/:id", Location.deleteState);
router.put("/update-State/:id", Location.updateState);
router.put("/soft-delete/:id", Location.softDelete);
router.put("/restore/:id", Location.restore);







// District
router.post("/addDistrict", Location.addDistrict);
router.get("/getDistrictByState", Location.getDistrictall);
router.get("/getDistrictByState/:stateId", Location.getDistrictByState);
router.get("/get-one-District/:id", Location.getOneDistrict);
router.delete("/delete-District-One/:id", Location.deleteDistrict);








// addCity
router.post("/addCity", Location.addCity);
router.get("/get-city", Location.getCityByDistrict);
router.delete("/delete-city-one/:id", Location.deleteCity);

router.get("/get-one-city/:id", Location.getOneCity);
router.put("/update-city/:id", Location.updateCity);
router.put("/soft-delete-city/:id", Location.softDeleteCity);
router.put("/restore-city/:id", Location.restoreCity);






module.exports = router;