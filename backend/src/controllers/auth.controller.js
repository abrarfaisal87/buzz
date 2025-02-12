import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(404).json({ error: "Please fill in the fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Confirm your password" });
    }

    console.log("Looking for user with username:", username);
    const user = await prisma.user.findUnique({
      where: { username },
    });
    console.log("Found user:", user);

    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProPic : girlProPic,
      },
    });

    if (newUser) {
      //token generation
      generateToken(newUser.id, res);
      res.status(200).json({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(500).json({ error: "User creation failed" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "invalid credentials" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "invalid credentials" });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error is login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ error: "logged out successfully" });
  } catch (error) {
    console.log("error is logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: "error not found" });
    }
    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error is getMe controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
