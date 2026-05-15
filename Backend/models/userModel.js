const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        enum: ["superadmin","hospital","user","doctor"],
        default: "user",
    },

    superAdminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SuperAdmin",
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);