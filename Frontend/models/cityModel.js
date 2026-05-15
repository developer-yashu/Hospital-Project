const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({

    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India",
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true
    },

    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
        required: true
    },
     status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

}, { timestamps: true })

module.exports = mongoose.model("City",citySchema)