const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        require: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
   },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
    }

}, { timestamps: true });

module.exports = mongoose.model("Department", departmentSchema);
