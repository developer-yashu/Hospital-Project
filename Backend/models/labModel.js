// models/Lab.js
const mongoose = require("mongoose");

const labSchema = new mongoose.Schema(
    {
        labName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phone: {
            type: String,
            required: true,
        },

       status: {
            type: String,
            enum: [ "active", "inactive"],
            default: "active"
        },

        // AppointmentId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Appointment",
        // },
        
        experience: {
             type: Number,
             required: true
        },

        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lab", labSchema);