const mongoose = require("mongoose");

const SubdepartmentSchema = new mongoose.Schema({
    SubdepartmentName: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },

}, { timestamps: true ,versionKey: false });

module.exports = mongoose.model("SubDepartment", SubdepartmentSchema);
