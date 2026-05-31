const TestReport = require("../models/testReportMode");
const medicine = require("../models/medicineModel");

const upload = require("../utils/Cloudinary");



exports.addTestReport = async (req, res) => {
    try {
        const { testId, description } = req.body;
        console.log("testId>>>>>>>>", req.body);

        const userId = req.user._id;
        console.log("userId>>>>>>>>", userId);
        if (!(testId && description && userId)) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const uploaddata = await upload.uploadImage(req.files)
        const image_url = uploaddata[0].url;
        console.log("image>>>>>>>>", image_url);

        const newReport = new TestReport({ testId, userId, reportImage: image_url, description, isReached: false });
        await newReport.save();
        return res.status(201).json({ message: "Test report added successfully", report: newReport });


    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

exports.updateRejected = async (req, res) => {
    try {

        const { id } = req.params;
        const updatedMedicine = await medicine.findByIdAndUpdate(id, { isRejected: true }, { new: true });
        if (!updatedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        return res.status(200).json({ message: "Patient reached successfully", updatedMedicine });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getTestReport = async () => {
    try {
        const data = await TestReport.find();
        return res.status(202).json({message:"TestReport data",data})
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}