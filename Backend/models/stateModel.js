const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({

    state: {
        type: String,
        required: true
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

}, { timestamps: true })

module.exports = mongoose.model("State", stateSchema)