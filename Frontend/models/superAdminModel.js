const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    role: {
        type: String,
        default: "superadmin",
    },
});

module.exports = mongoose.model("SuperAdmin", superAdminSchema);