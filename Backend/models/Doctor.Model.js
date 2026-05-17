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
            required:true
        },
        experience: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other']
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
        hospitalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
        },

        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },
        role: {
            type: String,
            default: "Doctor"
        },
        // image:{
        //     type: String,
        //     // required: true
        // },
        status: {
            type: String,
            enum: [ "active", "inactive"],
            default: "active"
        },
    },
    { timestamps: true,versionKey: false }
);

module.exports = mongoose.model("Doctor", doctorSchema);