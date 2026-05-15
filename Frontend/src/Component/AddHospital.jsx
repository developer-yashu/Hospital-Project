import axios from "axios";
import React, { useEffect, useState } from "react";

const AddHospital = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [emergencyhelpine, setEmergencyhelpine] = useState("");
  const [totalbad, setTotalbad] = useState("");
  const [icubad, setIcubad] = useState("");
  const [operationTheaters, setOperationTheaters] = useState("");
  const [ambulancecount, setAmbulancecount] = useState("");
  const [LicenseNumber, setLicenseNumber] = useState("");
  const [CEO, setCEO] = useState("");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [CityId, setCityId] = useState("");

  const fetchCities = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/location/get-city");
      setCities(res.data.cities);
    } catch (error) {
      console.log(error);
    }
  };

  ///get-state
  const fetchStates = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:1010/location/get-state");
      setStates(res.data.states);
    } catch (error) {
      console.log(error);
    }
  };

  // getDistrict
  const fetchDistricts = async (stateId) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:1010/location/getDistrictByState/${stateId}`,
      );
      setDistricts(res.data.districts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchDistricts();
    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        CityId,
        districtId,
        stateId,
        hospitalName,
        hospitalEmail,
        hospitalPhone,
        registrationNumber,
        emergencyhelpine,
        totalbad,
        icubad,
        operationTheaters,
        ambulancecount,
        LicenseNumber,
        CEO,
      };

      const res = await axios.post(
        "http://127.0.0.1:1010/Hospital/add-hospital",
        data,
      );
      alert(res.data.message);

      // empty form
      setHospitalName("");
      setHospitalEmail("");
      setHospitalPhone("");
      setRegistrationNumber("");
      setEmergencyhelpine("");
      setTotalbad("");
      setIcubad("");
      setOperationTheaters("");
      setAmbulancecount("");
      setLicenseNumber("");
      setCEO("");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3">
      <div className="max-w-3xl mx-auto bg-white p-5 rounded-2xl shadow-lg">
        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Hospital Registration
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* HOSPITAL NAME */}
          <input
            type="text"
            placeholder="Hospital Name"
            className="border p-2 rounded-lg text-sm"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Hospital Email"
            className="border p-2 rounded-lg text-sm"
            value={hospitalEmail}
            onChange={(e) => setHospitalEmail(e.target.value)}
          />

          {/* PHONE */}
          <input
            type="number"
            placeholder="Hospital Phone"
            className="border p-2 rounded-lg text-sm"
            value={hospitalPhone}
            onChange={(e) => setHospitalPhone(e.target.value)}
          />

          {/* REGISTRATION NUMBER */}
          <input
            type="text"
            placeholder="Registration Number"
            className="border p-2 rounded-lg text-sm"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />

          {/* EMERGENCY HELPLINE */}
          <input
            type="number"
            placeholder="Emergency Helpline"
            className="border p-2 rounded-lg text-sm"
            value={emergencyhelpine}
            onChange={(e) => setEmergencyhelpine(e.target.value)}
          />

          {/* TOTAL BED */}
          <input
            type="number"
            placeholder="Total Beds"
            className="border p-2 rounded-lg text-sm"
            value={totalbad}
            onChange={(e) => setTotalbad(e.target.value)}
          />

          {/* ICU BED */}
          <input
            type="number"
            placeholder="ICU Beds"
            className="border p-2 rounded-lg text-sm"
            value={icubad}
            onChange={(e) => setIcubad(e.target.value)}
          />

          {/* OPERATION THEATERS */}
          <input
            type="text"
            placeholder="Operation Theaters"
            className="border p-2 rounded-lg text-sm"
            value={operationTheaters}
            onChange={(e) => setOperationTheaters(e.target.value)}
          />

          {/* AMBULANCE COUNT */}
          <input
            type="number"
            placeholder="Ambulance Count"
            className="border p-2 rounded-lg text-sm"
            value={ambulancecount}
            onChange={(e) => setAmbulancecount(e.target.value)}
          />

          {/* LICENSE NUMBER */}
          <input
            type="text"
            placeholder="License Number"
            className="border p-2 rounded-lg text-sm"
            value={LicenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />

          {/* CEO */}
          <input
            type="text"
            placeholder="CEO Name"
            className="border p-2 rounded-lg text-sm"
            value={CEO}
            onChange={(e) => setCEO(e.target.value)}
          />

          <select   className="border p-2 rounded-lg text-sm"
            value={stateId}
            onChange={(e) => {
              setStateId(e.target.value);
              fetchDistricts(e.target.value);
            }}
          >
            <option>Select State</option>
            {states.map((s) => (
              <option key={s._id} value={s._id}>
                {s.state}
              </option>
            ))}
          </select>

          <select   className="border p-2 rounded-lg text-sm"
            value={districtId}
            onChange={(e) => {
              setDistrictId(e.target.value);
              fetchCities(e.target.value);
            }}
          >
            <option>Select District</option>
            {districts.map((d) => (
              <option key={d._id} value={d._id}>
                {d.district}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-lg text-sm"
            value={CityId}
            onChange={(e) => {
              setDistrictId(e.target.value);
              setCityId(e.target.value);
            }}
          >
            <option value="">Select City</option>

            {cities.filter((item) => item.districtId?._id === districtId).map((item) => (
              <option key={item._id} value={item._id}>
                {item.city}
              </option>
            ))}
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
          >
            Register Hospital
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
