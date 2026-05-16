const Hospital = require("../models/HospitalModel");
const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");
const { v4: uuidv4 } = require("uuid");


const bcrypt = require("bcrypt");



//add hospital

exports.addHospital = async (req, res) => {
  try {
    const { hospitalName, hospitalEmail, hospitalPhone, registrationNumber, emergencyhelpine, totalbad, icubad, operationTheaters, ambulancecount, LicenseNumber, CEO, CityId,districtId,stateId} = req.body;

    const alreadyHospital = await Hospital.findOne({ hospitalEmail });
    if (alreadyHospital) {
      return res.status(400).json({ message: "hospital already exists" })
    }
    const alreadyRegistration = await Hospital.findOne({ registrationNumber });
    if (alreadyRegistration) {
      return res.status(400).json({ message: "registration number already exists" })
    }

    const hospital = new Hospital({CityId,districtId,stateId,
      hospitalName, hospitalEmail, hospitalPhone, registrationNumber, emergencyhelpine,
      totalbad, icubad, operationTheaters, ambulancecount, LicenseNumber, CEO, status: "pending"
    });

    await hospital.save();
    res.status(201).json({ message: "hospital request submitted", hospital });
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
};



//get all hospitals
exports.getAllHospital = async (req, res) => {
  try {
     const search = req.query.search || "";
     console.log(search);
    // const hospitals = await Hospital.find()
    const hospitals = await Hospital.find({
      hospitalName: {
        $regex: search,
        $options: "i",
      },
    })
            .populate("stateId", "state")
  .populate("districtId", "district")
  .populate("CityId", "city")
  .populate("departmentId", "departmentName");

    res.status(200).json({ hospitals });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

};

 



// rejected hospital
exports.RejectedHospital = async (req, res) => {

  try {
    const { id } = req.params;
    const hospital = await Hospital.findByIdAndUpdate(id, { status: "Rejected" }, { new: true });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    return res.status(200).json({ message: "Hospital Rejected successfully", hospital, });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};















// APPROVE HOSPITAL
exports.approveHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    if (hospital.status === "approved") {
      return res.status(400).json({ message: "Already approved" });
    }

     const randomPassword = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const user = await new User({
      name: hospital.hospitalName,
      email: hospital.hospitalEmail,
      phone: hospital.hospitalPhone,
      password: hashedPassword,
      role: "hospital",
      hospitalId: hospital._id,
    });
    const hospitals = await Hospital.findByIdAndUpdate(id, { status: "approved" }, { new: true });
    // hospital.status = "approved";
    await hospitals.save();

    await sendMail(
      hospitals.hospitalEmail,
      "Hospital Approved - Login Details",
      `Email: ${hospitals.hospitalEmail}\nPassword: ${randomPassword}`
    );

    return res.status(200).json({
      message: "Hospital approved successfully",
      hospitals,
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};