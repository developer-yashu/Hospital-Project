const jwt = require("jsonwebtoken");
const secretKey = "nwerwgfeh";
const User = require('../models/userModel');



module.exports = async (req, res, next) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "only auper admin access" });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


