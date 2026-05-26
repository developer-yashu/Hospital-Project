const User = require("../models/userModel");
const SuperAdmin = require("../models/superAdminModel");
const Doctor = require("../models/Doctor.Model");
const Hospital = require("../models/HospitalModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10
const secretKey = "nwerwgfeh";
const Appointment = require("../models/Appointment");
const sendMail = require("../utils/sendMail");



exports.createSuperAdmin = async (req, res) => {
  try {
    const { name, age, email, password, gender, phone } = req.body;

    const already = await SuperAdmin.findOne({ role: "superadmin" });

    if (already) {
      return res.status(400).json({ message: "super admin already exists" });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const savesuperAdmin = new SuperAdmin({ name, age, email, password: hashPassword, gender, phone, });
    await savesuperAdmin.save();

    const usermodelsave = new User({ name, email, password: hashPassword, phone, role: "superadmin", superAdminId: superAdmin._id, });
    await usermodelsave.save();


    res.status(201).json({ message: "Super Admin Created", superAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!(name && email && password && phone)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: hashedPassword, phone, role: "user", });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ email, role: user.role }, secretKey, { expiresIn: "21d" });
      res.status(200).json({ message: "Login successful", token, role: user.role });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



exports.resetPassword = async (req, res) => {
  try {
    const { email, oldpassword, newpassword } = req.body;

    if (!email || !oldpassword || !newpassword) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Signup first" });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, saltRounds);
    user.password = hashedPassword;
    console.log(email);
    console.log(user);
    console.log(oldpassword);
    console.log(user.password);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



exports.Forget = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "signup first" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("hashedPassword",hashedPassword);
  
  const updatedUser  = await User.findByIdAndUpdate(user._id,{password: hashedPassword })
    console.log(updatedUser );
   res.status(200).json({ message: "Password updated successfully"});
    
}


exports.getProfile = async (req, res) => {

  try {

    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



exports.addAppointment = async (req, res) => {
  try {
    const { doctorId, hospitalId, appointmentDate, appointmentTime } = req.body;
    if (!(doctorId && hospitalId && appointmentDate && appointmentTime)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userID = req.user.id;
    console.log("userID>>>>>>>>", userID);
    const doctor = await Doctor.findById(doctorId);
    console.log("doctor>>>>>>>>", doctor);
    const hospital = await Hospital.findById(hospitalId);
    console.log("hospital>>>>>>>>", hospital);

    const newappointment = await new Appointment({ doctorId, userID, hospitalId, appointmentDate, appointmentTime, status: "peasant" });
    await newappointment.save();
    return  res.status(201).json({ message: "Appointment created successfully", newappointment });
    // return



    // sen user mail
   
await sendMail(
  req.user.email,
  "Appointment Booked",
      `Your appointment is confirmed
      Doctor: ${doctor.name}
      Hospital: ${hospital.hospitalName}
      Date: ${appointmentDate}
      Time: ${appointmentTime}
        `
    );



   await sendMail(
  doctor.email,
      "New Appointment",
  `You have a new appointment
      Patient: ${req.user.name}
      Date: ${appointmentDate}
      Time: ${appointmentTime}`
    );


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAppointments = async (req, res) => {
  try {
    let filter = {};

    // user  login
    if (req.user.role === "user") {
      filter.userID = req.user.id;
    }

    // doctor login 
    if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ email: req.user.email });
      filter.doctorId = doctor._id;
    }

    // hospital login
    if (req.user.role === "hospital") {
      const hospital = await Hospital.findOne({ hospitalEmail: req.user.email });
      filter.hospitalId = hospital._id;
    }

    const appointments = await Appointment.find(filter).populate("doctorId").populate("userID").populate("hospitalId");
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










exports.updateReach = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, { isReached: true }, { new: true });
    res.status(200).json({ message: "Patient reached successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




