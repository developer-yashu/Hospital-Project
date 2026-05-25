const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        testName: {
            type: String,
            required: true,
        },

        charge: {
            type: Number,
            required: true,
        },
        precautions: {
            type: String,
            required: true
        },


        hospitalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
        },

        labId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lab",
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Test", testSchema);