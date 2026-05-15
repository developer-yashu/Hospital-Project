const HospitalDepartment = require("../models/Department");

exports.addDepartment = async (req, res) => {
  try {
    const {departmentName,hospitalId} = req.body;
    if(!(departmentName && hospitalId)){
        res.status(404).json({message: "all filede required",});
    }
    
      const Department = new HospitalDepartment({departmentName,hospitalId,status: "active" });
        console.log('Department',Department);
        
      await Department.save();
    res.status(201).json({ message: "Department  submitted", Department });
  } catch (error) {
    res.status(500).json({ message: error.message })
}
};


exports.getDepartment = async (req, res) => {
    try {
        const Department = await HospitalDepartment.find()
        .populate("hospitalId")
        res.status(200).json({Department});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getOneDepartment = async (req, res) => {
    try {
        const {id}=req.params
        const Department = await HospitalDepartment.findById(id)
        .populate("hospitalId")
        res.status(200).json({Department});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const { departmentName } = req.body;
        if (!departmentName) {
            return res.status(400).json({ message: "departmentName is required" });
        }
        const updateDepartmentName = await HospitalDepartment.findByIdAndUpdate(id, { departmentName }, { new: true });
        res.status(200).json({ message: "updated DepartmentName   successfully", updateDepartmentName });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delte ki api
exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await HospitalDepartment.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).json({ message: "department not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// SOFT DELETE
exports.softDeleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await HospitalDepartment.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.restoreDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await HospitalDepartment.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


  