import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Login from "./Component/Login";
import Superadmin from './Component/Superadmin';
// import State from "./Component/State";
import District from "./Component/District";
import City from "./Component/City";
import State from "./Component/state";
import AddHospital from "./Component/AddHospital";
import GetHospital from "./Component/GetHospital";
import ResetPassword from "./Component/ResetPassword";
import Signup from "./Component/Signup";
import Hospitaldashboard from "./Component/Hospitaldashboard";
import Department from "./Component/Department";
import SubDepartment from "./Component/SubDepartment";
import Doctor from "./Component/Doctor";
import DefaultPage from "./Component/DefaultPage";
import ViewDoctor from "./Page/ViewDoctor";
import ViewDefaultPage from './Page/ViewDefaultPage';
import ProtectedRoute from "./Component/ProtectedRoute";
import AppointmentHistory from "./Page/AppointmentHistory";
import UserMedicines from "./Page/UserMedicines";
import DoctorMedicine from "./Page/DoctorMedicine";
import GetOneHospital from "./Component/GetOneHospital";
import Lab from "./Component/Lab";
import Test from "./Page/Test";
import Doctordashboard from "./Component/Doctordashboard";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>  
              <Route path="/" element={<DefaultPage/>}/>
              <Route path="/hospital/:hospitalId" element={<ViewDefaultPage/>}/>



 
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/reset-password" element={<ResetPassword/>}/>
                {/* <Route path="/Appointment" element={<ProtectedRoute><Appointment/></ProtectedRoute>}/> */}


              <Route path="/Superadmin" element={<Superadmin/>}/>
              <Route path="/state" element={<State/>}/>
              <Route path="/District" element={<District/>}/>
              <Route path="/City" element={<City/>}/>
              <Route path="/addhospital" element={<AddHospital/>}/>
              <Route path="/gethospital" element={<GetHospital/>}/>
              <Route path="/get-one-hospital/:hospitalId" element={<GetOneHospital/>}/>

              <Route path="/hospital-dashboard" element={<Hospitaldashboard/>}/>
              <Route path="/Department" element={<Department/>}/>
              <Route path="/SubDepartment" element={<SubDepartment/>}/>
              <Route path="/doctor" element={<Doctor/>}/>
              <Route path="/Doctor-dashboard" element={<Doctordashboard/>}/>

              <Route path="/doctor/:id" element={<ViewDoctor/>} />
              <Route path="/AppointmentHistory" element={<AppointmentHistory/>} />
              <Route path="/user-medicines"element={<UserMedicines/>}/>
              <Route path="/doctor-medicines" element={<DoctorMedicine/>}/>
              <Route path="/lab" element={<Lab/>}/>
              <Route path="/test" element={<Test/>}/>













              
              
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
