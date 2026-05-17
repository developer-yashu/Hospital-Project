const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({

   hospitalName: {
      type: String,
      required: true
   },
   hospitalEmail: {
      type: String,
      required: true,
   },
   hospitalPhone: {
      type: Number,
      required: true
   },
   registrationNumber: {
      type: String,
      required: true
   },
   emergencyhelpine: {
      type: Number,
      required: true
   },
   totalbad: {
      type: Number,
      required: true
   },
   icubad: {
      type: Number,
      required: true
   },
   operationTheaters: {
      type: String,
      required: true
   },
   ambulancecount: {
      type: Number,
      required: true
   },
   LicenseNumber: {
      type: String,
      required: true
   },
   CEO: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: "hospital"
   },
   status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
   },
   CityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
   },

   districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
   },
   // image: {
   //    type: String,
   //    // required: true
   // },

   stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
   }


}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Hospital", hospitalSchema);


