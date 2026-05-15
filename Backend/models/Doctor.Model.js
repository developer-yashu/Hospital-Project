const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "other"]
        },
        age: {
            type: Number,
            required: true
        },
        qualification: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        subDepartmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubDepartment",
        },

        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },
        role: {
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);