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
        console.log("doctorId >>>", appointment.doctorId);
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
        const medicines = await medicine.find()
            .populate("userId")
            .populate("doctorId")
            .populate("testId");


        // only login doctor medicines
        const doctorMedicines = medicines.filter((item) => {
            return (item.doctorId && item.doctorId.email === req.user.email);
        });
        res.status(200).json({ medicines: doctorMedicines });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};





exports.getLabTests = async (req, res) => {
  try {

    const tests = await medicine.find({
      testId: { $exists: true, $ne: null }
    })
    .populate("userId")
    .populate("doctorId")
    .populate("testId")
    // .populate("AppointmentId");
    return res.status(200).json({tests});
  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }
};

 