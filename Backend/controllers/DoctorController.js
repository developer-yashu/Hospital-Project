const Doctor = require("../models/Doctor.Model");

const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const upload = require('../utils/Cloudinary')
const { v4: uuidv4 } = require("uuid");

exports.addDoctor = async (req, res) => {
    try {
        // console.log(">>>>>>>>>>",req.body);
        // console.log(">>>>>>>>>>files",req.files);
        // const uploaddata = await upload.uploadImage(req.files)
        // console.log("uploaddata>>>>>>>>",uploaddata);
        // const image_url = uploaddata[0].url;
        // console.log("image>>>>>>>>", image_url);


        const { name, email, phone, experience, gender, age, qualification, address, departmentId, hospitalId, subDepartmentId } = req.body;
        if (!(name && email && phone && experience && gender && age && qualification && address && departmentId && subDepartmentId && hospitalId)) {
            return res.status(400).json({ message: "all filede required", });
        }

        const existingEmail = await Doctor.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "email already exists" });
        }
        const newDoc = {
            name, email, phone, experience, gender, age,
            qualification, address, departmentId, subDepartmentId, hospitalId, status: "active"
        }
        console.log("o", newDoc)
        const doctor = await Doctor.create(newDoc);


        console.log('doctor>>>>>', doctor);
        // await doctor.save();

        const randomPassword = uuidv4().slice(0, 8);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const user = await new User({
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            password: hashedPassword,
            role: "doctor",
            doctorId: doctor._id,
        });
        await user.save();

        await sendMail(
            doctor.email,
            "Doctor Registration - Login Details",
            `Email: ${doctor.email}
    Password: ${randomPassword}`
        );

        res.status(201).json({ message: "doctor  submitted", doctor });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};


exports.getdoctors = async (req, res) => {
    try {
        const { search = "" } = req.query;
        const doctors = await Doctor.find({
            name: {
                $regex: search,
                $options: "i",}})
                
            .populate("departmentId")
            .populate("hospitalId")
            .populate("subDepartmentId");
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getOnedoctors = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id)
            .populate("departmentId")
            .populate("hospitalId")
            .populate("subDepartmentId");
        res.status(200).json({ doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params
        // const { doctor } = req.body;
        // if (!doctor) {
        //     return res.status(400).json({ message: "doctor is required" });
        // }
        const updatedoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "updated Doctor   successfully", updatedoctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delte ki api
exports.deletedoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).json({ message: "doctor not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







// rejected doctors// SOFT DELETE
exports.softDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await Doctor.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// RESTORE
exports.restore = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await Doctor.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getDoctorByHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const doctors = await Doctor.find({ hospitalId })
            .populate("departmentId")
            .populate("hospitalId")
            .populate("subDepartmentId");
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}