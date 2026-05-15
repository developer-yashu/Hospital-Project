const mongoose = require("mongoose");

const hospitalImageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        hospitalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
        },
        image: {
            type: String,
         },
    },{ timestamps: true,versionKey: false }
);

module.exports = mongoose.model("HospitalImage", hospitalImageSchema);