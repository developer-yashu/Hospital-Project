const mongoose = require("mongoose");

const doctorImageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
        },
        image: {
            type: String,
            // required: true
        },
    },{ timestamps: true,versionKey: false }
);

module.exports = mongoose.model("DoctorImage", doctorImageSchema);