const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ==========================  REGISTER USER
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User Already exists" });
    }

    // Check if password exists
    if (!req.body.password) {
      return res
        .status(400)
        .send({ success: false, message: "Password is required" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new userModel(req.body);
    await user.save();
    res
      .status(201)
      .send({
        success: true,
        data: req.body,
        message: "User Registered successfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error In Register API May You Miss Some Fields", error });
  }
};

// user login
const loginController = async (req, res) => {
  try {
    const userexist = await userModel.findOne({ email: req.body.email });
    if (!userexist) {
      return res.status(404).send({ success: false, message: "User Not Found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(req.body.password, userexist.password);
    if (!isMatch) {
      return res.status(400).send({ success: false, message: "Invalid Credentials" });
    }

    // Role validation
    if (userexist.role !== req.body.role) {
      return res.status(404).send({ success: false, message: "Role Doesn't match" });
    }

    // Generate and send token
    const token = jwt.sign({ userId: userexist.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, user: userexist, token: token,message:'User Login Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error In Login API", error });
  }
};
// get current user
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (user) {
      return res
        .status(200)
        .send({ success: true, message: "User Fetched Successfully", user });
    } else {
      return res
        .status(401)
        .send({ success: false, message: "User Not Found", user });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "unable to get current user", error });
  }
};
module.exports = { registerController, loginController, currentUserController };
