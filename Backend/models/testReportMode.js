const mongoose = require("mongoose");

const testReportSchema = new mongoose.Schema(
    {
        testId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        reportImage: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

     
    },
    { timestamps: true }
);

module.exports = mongoose.model("TestReport", testReportSchema);
