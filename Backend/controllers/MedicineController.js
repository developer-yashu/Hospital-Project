const medicine = require("../models/medicineModel");
const Appointment = require("../models/Appointment");

exports.addMedicine = async (req, res) => {
    try {

        const { medicineName, medicineType, price, description, DiseaseName, Food_Restrictions, AppointmentId, nextAppointmentDate } = req.body;
        if (!(medicineName && medicineType && price && description && DiseaseName && Food_Restrictions && AppointmentId)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const appointment = await Appointment.findById(AppointmentId);
        console.log("appointment >>>>", appointment);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        const { testId } = req.body;
        const newMedicine = new medicine({
            medicineName, medicineType, price, description, DiseaseName, Food_Restrictions, AppointmentId, nextAppointmentDate,
            doctorId: appointment.doctorId,
            userId: appointment.userID,
            testId: testId
        });
        await newMedicine.save();
        res.status(201).json({ message: "Medicine added successfully", medicine: newMedicine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};










exports.getMedicines = async (req, res) => {
    try {
        const medicines = await medicine.find({ userId: req.user._id })
            .populate("doctorId")
            .populate("AppointmentId")
            .populate("testId");

        return res.status(200).json({ medicines });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





exports.getDoctorMedicines = async (req, res) => {
    try {
        // const medicines = await medicine.find({ doctorId: req.user.doctorId })
        console.log("req.user >>>", req.user);
        const medicines = await medicine .find({ doctorId: req.user._id})
        
            .populate("userId")
            .populate("doctorId")
            .populate("AppointmentId")
            .populate("testId");

        return res.status(200).json({ medicines });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
