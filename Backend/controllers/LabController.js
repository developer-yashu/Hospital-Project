const Lab = require("../models/labModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../utils/sendMail");



// add lab
exports.addLab = async (req, res) => {
    try {
        const { labName, email, phone, status,  departmentId,experience } = req.body;

        if (!(labName && email && phone && departmentId && experience)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingLab = await Lab.findOne({ email });
        if (existingLab) {
            return res.status(400).json({ message: "Lab already exists" });
        }
        const randomPassword = uuidv4().slice(0, 8);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newLab = new Lab({ labName,  email, phone, status,departmentId,experience });
        
        console.log("newLab>>>>>>>>", newLab);
        await newLab.save();
        const newUser = new User({name: labName,email,phone,password: hashedPassword,role: "lab"});

        await sendMail(
            email,
            "Lab Login Details",
            `Your Lab Account Created Successfully
            Email: ${email}
            Password: ${randomPassword}
            `);
            console.log("randomPassword>>>>>>>>",randomPassword);
            
            await newUser.save();

      return  res.status(201).json({ message: "Lab added successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};



// get all labs
exports.getLabs = async (req, res) => {
    try {
        const labs = await Lab.find()
            // .populate("hospitalId")
            .populate("departmentId");
            // .populate("subDepartmentId");

     return   res.status(200).json({ labs });
    } catch (error) {
      return res.status(500).json({ message: error.message });

    }
};



exports.getOneLabs = async (req, res) => {
    try {
        const {id}=req.params;
        const labs = await Lab.findById(id)
            // .populate("hospitalId")
            .populate("departmentId")
            // .populate("subDepartmentId");

      return  res.status(200).json({ labs });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};



exports.updateLab = async (req, res) => {
    try {
        const { id } = req.params
        // const { lab } = req.body;
        // if (!lab) {
        //     return res.status(400).json({ message: "lab is required" });
        // }
        const updatedLab = await Lab.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "updated Lab   successfully", updatedLab });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// delte ki api
exports.deleteLab = async (req, res) => {
    try {
        const { id } = req.params;
        const lab = await Lab.findByIdAndDelete(id);
        if (!lab) {
            return res.status(404).json({ message: "lab not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// rejected labs// SOFT DELETE
exports.softDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await Lab.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// RESTORE
exports.restore = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await Lab.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





