const Users = require("../models/userModel.js");
const {
  comparePassword,
  hashPassword,
} = require("../middlewares/hash.js");
const { createToken } = require("../middlewares/jwt.js");



const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    const exist = await Users.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await Users.create({
      fullname,
      email,
      role,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const {  email, password } = req.body;

    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found'})
    }

    const match = await comparePassword(password, user.password)
    if (!match) { 
      return res.status(400).json({message: "Incorrect password"})
    }
    const token = createToken(user)
    res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 3600000

    })
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
    console.log(error);
  }
};

const getUser = (req, res) => {
  try {
    const user = req.user; 
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req, res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message: "User logged out successfully"})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error)
    }
}


module.exports = {
  registerUser,
  loginUser,
  getUser,
  logout,
};
