const jwt = require("jsonwebtoken");
const secretKey = "nwerwgfeh";
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    const authToken = req.headers.authorization;

    console.log("authToken >>>>>>>>>>>", authToken);

    if (!authToken) {
        return res.status(400).json({ message: "signup first" });
    }

    const token = authToken.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "Not token split" });
    }
    console.log("Token >>>>>>", token);

    const verifyToken = jwt.verify(token, secretKey);

    const email = verifyToken.email;
    console.log("email", email);

    const user = await User.findOne({ email });
    console.log("user>>>>>>>>>>>", user);

    if (!user) {
        return res.status(400).json({ message: "user is not defined" });
    }
    req.user = user;
    next();
};
