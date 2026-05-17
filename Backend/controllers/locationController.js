const State = require("../models/stateModel");
const District = require("../models/districtModel");
const City = require("../models/cityModel");


// add state
exports.addState = async (req, res) => {
    try {
        const { state } = req.body;
        if (!state) {
            return res.status(400).json({ message: "state is required" })
        }
        const already = await State.findOne({ state });
        if (already) {
            return res.status(400).json({ message: "State already exists" })
        }
        const newState = new State({ state });
        await newState.save();
        res.status(201).json({ message: "new state add", newState });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//GET ALL STATE 
exports.getAllState = async (req, res) => {
    try {
        const { search = "" } = req.query;

        const states = await State.find({
            state: {
                $regex: search,
                $options: "i",
            },
        });
        console.log(states);

        res.status(200).json({ states });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get state one
exports.getOneState = async (req, res) => {
    try {
        const { id } = req.params
        const states = await State.findById(id)
        console.log(states);
        res.status(200).json({ states });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delte ki api
exports.deleteState = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findByIdAndDelete(id);
        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateState = async (req, res) => {
    try {
        const { id } = req.params
        const { state } = req.body;
        if (!state) {
            return res.status(400).json({ message: "state is required" });
        }
        const updateState = await State.findByIdAndUpdate(id, { state }, { new: true });
        res.status(200).json({ message: "state updated successfully", updateState });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// SOFT DELETE
exports.softDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await State.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// RESTORE
exports.restore = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await State.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





//add district 

exports.addDistrict = async (req, res) => {
    try {
        const { district, stateId } = req.body;
        if (!(district && stateId)) {
            return res.status(400).json({ message: "all fields required" })
        }
        const already = await District.findOne({ district });
        if (already) {
            return res.status(400).json({ message: "district already exists" })
        }
        const newDistrict = new District({ district, stateId });
        await newDistrict.save();

        res.status(201).json({ message: "district created", newDistrict });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// //GET DISTRICT BY STATE
exports.getDistrictByState = async (req, res) => {
    try {
        const {stateId} = req.params;
        const districts = await District.find({ stateId })
        res.status(200).json({ districts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getDistrictall = async (req, res) => {
    try {
        const { search = "" } = req.query;
        const districts = await District.find({
            district: {
                $regex: search,
                $options: "i",
            },
        })
            .populate("stateId");
        res.status(200).json({ districts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// get one
exports.getOneDistrict = async (req, res) => {
    try {
        const { id } = req.params;
        const district = await District.findById(id)
            .populate("stateId");
        if (!district) {
            return res.status(404).json({ message: "District not found" });
        }
        res.status(200).json({ district });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delte ki api
exports.deleteDistrict = async (req, res) => {
    try {
        const { id } = req.params;

        const district = await District.findByIdAndDelete(id);
        if (!district) {
            return res.status(404).json({ message: "District not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// SOFT DELETE
exports.softDeletedistrict = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await State.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// RESTORE
exports.restoredistrict = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await State.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





//addCity

exports.addCity = async (req, res) => {
    try {
        const { city, stateId, districtId } = req.body;
        if (!(city && stateId && districtId)) {
            return res.status(400).json({ message: "all fields required" })
        }
        const already = await City.findOne({ city, districtId });
        if (already) {
            return res.status(400).json({ message: "city already exists" })
        }

        const newCity = new City({ city, stateId, districtId });
        await newCity.save()
        res.status(201).json({ message: "city created", newCity });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// GET CITY BY DISTRICT 
exports.getCityByDistrict = async (req, res) => {
    try {
        const { districtId } = req.params;
        const cities = await City.find({ districtId });
        res.status(200).json({ cities });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





exports.getCityall = async (req, res) => {
    try {
        const { search = "" } = req.query;
        const cities = await City.find({
            city: {
                $regex: search,
                $options: "i",}})
        res.status(200).json({ cities });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// get one
exports.getOneCity = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findById(id)
            .populate("stateId", "state")
            .populate("districtId", "district");

        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json({ city });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delte ki api
exports.deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const cityone = await City.findByIdAndDelete(id);
        if (!cityone) {
            return res.status(404).json({ message: "City not found" });
        }
        res.status(200).json({ message: "Deleted City successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// updateCity
exports.updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { city } = req.body;
        if (!city) {
            return res.status(400).json({message: "city is required"});
        }
        const updateCity = await City.findByIdAndUpdate(id,{ city }, { new: true });
        if (!updateCity) {
            return res.status(404).json({message: "City not found"});
        }
        res.status(200).json({message: "City updated successfully",updateCity});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// SOFT DELETE
exports.softDeleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await City.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// RESTORE
exports.restoreCity = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await City.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};