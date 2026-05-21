const Test = require("../models/testModel");


//add test 
exports.addTest = async (req, res) => {
  try {
    const {testName,charge,precautions} = req.body;

    if (!(testName && charge && precautions)) {
      return res
        .status(400).json({ message: "all fields required" });
    }

    const newTest = new Test({testName,charge,precautions,status:"active"});
        await newTest.save();

    res.status(201).json({message: "Test added successfully",test: newTest});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// get all test
exports.getTest = async (req, res) => {
  try {
    const tests = await Test.find()
      .populate("hospitalId")
      .populate("labId")
    //   .populate("departmentId");

    res.status(200).json({tests});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};



// get One test
exports.getOneTest = async (req, res) => {
  try {
    const  {id}  = req.params;
    const tests = await Test.findById(id)
      .populate("hospitalId")
      .populate("labId")
      .populate("departmentId");

    res.status(200).json({tests});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};



// delte ki api
exports.deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findByIdAndDelete(id);
        if (!test) {
            return res.status(404).json({ message: "test not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// rejected labs// SOFT DELETE
exports.softDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await Test.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// RESTORE
exports.restore = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await Test.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


