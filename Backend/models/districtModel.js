const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({

   district: {
      type: String,
      required: true
   },

   stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      // required: true
   },
   country: {
      type: String,
      default: "India",
   },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
   }

}, { timestamps: true ,versionKey: false });

module.exports = mongoose.model("District", districtSchema)