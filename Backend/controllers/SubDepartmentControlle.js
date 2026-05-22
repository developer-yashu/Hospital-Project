const SubDepartment = require("../models/SubDepartment");
const Department = require("../models/Department");

// const 

exports.addsubdepartment = async (req, res) => {
    try {
        const { SubdepartmentName, departmentId } = req.body;
        if (!(SubdepartmentName && departmentId)) {
            res.status(404).json({ message: "all filede required", });
        }



        const subdepartment = new SubDepartment({ SubdepartmentName, departmentId, status: "active" });
        console.log('Department', subdepartment);

        await subdepartment.save();
        res.status(201).json({ message: "subdepartment  submitted", subdepartment });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};


// exports.getsubdepartment = async (req, res) => {
//     try {
//         const { search = "" } = req.query;
//         // const   {hospitalId}= req.user;
      

//         const subdepartment = await SubDepartment.find({

//             SubdepartmentName: {
//                 $regex: search, $options: "i"

//             }
//         })
//             .populate("departmentId");
//         res.status(200).json({ subdepartment });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



exports.getsubdepartment = async (req, res) => {

    try {

        const { search = "" } = req.query;

        let filter = {
            SubdepartmentName: {
                $regex: search,
                $options: "i"
            }
        };

        // hospital login
        if (req.user.role === "hospital") {
             const {hospitalId}= req.user;
             const departments = await Department.find({hospitalId});

            // sirf ids nikalo
            const departmentIds = departments.map(item => item._id);

            // subdepartment filter
            filter.departmentId = {
                $in: departmentIds
            };

        }

        // superadmin => all data

        const subdepartment = await SubDepartment.find(filter)
            .populate("departmentId");

        res.status(200).json({
            subdepartment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getOnesubdepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const subdepartment = await SubDepartment.findById(id)
            .populate("departmentId");
        res.status(200).json({ subdepartment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updatesubdepartment = async (req, res) => {
    try {
        const { id } = req.params
        const { SubdepartmentName } = req.body;
        if (!SubdepartmentName) {
            return res.status(400).json({ message: "SubdepartmentName is required" });
        }
        const updateDepartmentName = await SubDepartment.findByIdAndUpdate(id, { SubdepartmentName }, { new: true });
        res.status(200).json({ message: "Update Subdepartment Successfully", updateDepartmentName });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delte ki api
exports.deletesubdepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const subdepartment = await SubDepartment.findByIdAndDelete(id);
        if (!subdepartment) {
            return res.status(404).json({ message: "subdepartment not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// SOFT DELETE
exports.softDeletesubdepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const Softdelete = await SubDepartment.findByIdAndUpdate(id, { status: "inactive" }, { new: true });
        res.status(200).json({ message: " SoftDeleted", Softdelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.restoresubdepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const Restore = await SubDepartment.findByIdAndUpdate(id, { status: "active" }, { new: true });
        res.status(200).json({ message: "Restore", Restore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


