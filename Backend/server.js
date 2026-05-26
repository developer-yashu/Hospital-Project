const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');

const app = express();
const cors = require("cors");
const Port=1010;

 mongoose.connect("mongodb://127.0.0.1:27017/hospital")
.then(()=>console.log(`mongodb in connected`))
.catch((err)=>console.log('MongoDB error:', err))
 

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));


const route=require('./routes/superadminRoutes')
app.use("/superadmin", route);
 

const LocationRoute=require('./routes/LocationRoutes')
app.use("/location", LocationRoute);


const HospitalRoutes=require('./routes/HospitalRoutes')
app.use("/Hospital", HospitalRoutes);


const DepartmentRoute=require('./routes/DepartmentRoute')
app.use("/Department", DepartmentRoute);


const SubDepartment=require('./routes/SubDepartment')
app.use("/SubDepartment", SubDepartment);

const DoctorRoute=require('./routes/DoctorRoute')
app.use("/Doctor", DoctorRoute);


const medicineRoute=require('./routes/medicineRoute')
app.use("/Medicine", medicineRoute);


const AddLab=require('./routes/AddLab')
app.use("/AddLab", AddLab);


const TestRoute=require('./routes/TestRoute')
app.use("/Test", TestRoute);

const TestReportRoute=require('./routes/TestReportRoute')
app.use("/TestReport", TestReportRoute);

app.listen(Port, () => {
  console.log(`Hospital  Server running on ${Port}`);
});




















// superadmin
// {
//   "name":"Yashu",
//   "age":22,
//   "email":"yashu@gmail.com",
//   "password":"12345",
//   "gender":"male",
//   "phone":"9876543210"
// }