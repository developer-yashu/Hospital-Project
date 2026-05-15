const Doctor = require("../models/Doctor.Model");

const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const upload = require('../utils/Cloudinary')

exports.addDoctor = async (req, res) => {
    try {
        // console.log(">>>>>>>>>>",req.body);
        // console.log(">>>>>>>>>>files",req.files);
        const uploaddata = await upload.uploadImage(req.files)
        // console.log("uploaddata>>>>>>>>",uploaddata);
        const image = uploaddata[0].url;
        // console.log("image>>>>>>>>",image);


        const { name, email, phone, experience, gender, age, qualification, address, role, departmentId, subDepartmentId } = req.body;
        if (!(name && email && phone && experience && gender && age && qualification && address && departmentId && subDepartmentId)) {
          return res.status(400).json({ message: "all filede required", });
        }
        const existingEmail = await Doctor.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "email already exists" });
        }

        const doctor = await new Doctor({
            name, email, phone, experience, gender, age,
            qualification, address, role, departmentId, subDepartmentId, image, status: "pending"
        });
        console.log('doctor>>>>>', doctor);

        await doctor.save();
         console.log("SAVE SUCCESS");
        res.status(201).json({ message: "doctor  submitted", doctor });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};


exports.getdoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate("departmentId")
            .populate("subDepartmentId");
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getOnedoctors = async (req, res) => {
    try {
        const { id } = req.params;
        const doctors = await Doctor.findById(id)
            .populate("departmentId")
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







// rejected doctors
exports.RejectedDoctors = async (req, res) => {

    try {
        const { id } = req.params;
        const doctors = await Doctor.findByIdAndUpdate(id, { status: "Rejected" }, { new: true });
        if (!doctors) {
            return res.status(404).json({ message: "doctors not found" });
        }

        return res.status(200).json({ message: "Doctors Rejected successfully", doctors, });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





// APPROVE doctors
exports.approveDoctors = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "doctor not found" });
        }

        if (doctor.status === "approved") {
            return res.status(400).json({ message: "Already approved" });
        }

        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        let user = await User.findOne({ email: doctor.email });
        if (!user) {

            const user = await User.create({
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                password: hashedPassword,
                role: "doctor",
                doctorId: doctor._id,
            });
        } else {
            user.password = hashedPassword;
            await user.save();
        }

        const doctors = await Doctor.findByIdAndUpdate(id, { status: "approved" }, { new: true });
        // hospital.status = "approved";
        await doctors.save();

        await sendMail(
            doctor.email,
            "Doctor Approved - Login Details",
            `Email: ${doctor.email}
            Password: ${randomPassword}`
        );

        return res.status(200).json({ message: "Doctors approved successfully", doctors, user, });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

