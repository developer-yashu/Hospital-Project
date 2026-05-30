const Hospital = require("../models/HospitalModel");
const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");
const { v4: uuidv4 } = require("uuid");
const upload = require('../utils/Cloudinary')



const bcrypt = require("bcrypt");



//add hospital

exports.addHospital = async (req, res) => {
  try {
    const uploaddata = await upload.uploadImage(req.files)
    const image_url = uploaddata[0].url;
    console.log("image>>>>>>>>", image_url);
    const { hospitalName, hospitalEmail, hospitalPhone, registrationNumber, emergencyhelpine, totalbad, icubad, operationTheaters, ambulancecount, LicenseNumber, CEO, districtId, stateId, CityId } = req.body;

    const alreadyHospital = await Hospital.findOne({ hospitalEmail });
    if (alreadyHospital) {
      return res.status(400).json({ message: "hospital already exists" })
    }
    const alreadyRegistration = await Hospital.findOne({ registrationNumber });
    if (alreadyRegistration) {
      return res.status(400).json({ message: "registration number already exists" })
    }
    const newDoc = {
      // const hospital = new Hospital({
      // CityId, districtId, stateId,
      stateId, districtId, CityId, hospitalName, hospitalEmail, hospitalPhone, registrationNumber, emergencyhelpine,
      totalbad, icubad, operationTheaters, ambulancecount, LicenseNumber, CEO, status: "pending", image: image_url
    };
    //  image: image_url,
    console.log("newDoc>>>>>>>>", newDoc);
    // const hospital =
    // await Hospital.create(newDoc);

    const hospital = await Hospital.create(newDoc);
    // await hospital.save();
    res.status(201).json({ message: "hospital request submitted", hospital });
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
};



//get all hospitals
exports.getAllHospital = async (req, res) => {
  
  // const page=parseInt(req.query.page)|| 1;
    // const limit=parseInt(req.query.limit) || 4;
    // const skip = (page-1)*limit
  
  
  try {
    const { search = "" } = req.query;
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
      // .skip(skip).limit(limit)
      // .Hospital.countDocuments();



      res.status(200).json({ hospitals, });


  } catch (error) {
    res.status(500).json({ message: error.message })
  }

};



//get  one hospitals
exports.getOneHospital = async (req, res) => {
  try {
    const { id } = req.params;
    // const hospitals = await Hospital.find()
    const hospitals = await Hospital.findById(id)
      .populate("stateId", "state")
      .populate("districtId", "district")
      .populate("CityId", "city")

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
    console.log("randomPassword>>>>>>>>", randomPassword);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    await User.create({
      name: hospital.hospitalName,
      email: hospital.hospitalEmail,
      phone: hospital.hospitalPhone,
      password: hashedPassword,
      role: "hospital",
      hospitalId: hospital._id, 
    });

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    try {
      await sendMail(
        hospital.hospitalEmail,
        "Hospital Approved - Login Details",
        `Email: ${hospital.hospitalEmail}\nPassword: ${randomPassword}`
      );
    } catch (err) {
      console.log("MAIL ERROR:", err.message);
    }

    return res.status(200).json({
      message: "Hospital approved successfully",
      hospital: updatedHospital,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};