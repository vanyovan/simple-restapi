import express from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import verify from "./verifyToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const userNameExist = await User.findOne({ userName: req.body.userName });
  if (userNameExist)
    return res
      .status(400)
      .send("Username already exist. Choose other username");

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  const user = new User({
    userName: req.body.userName,
    password: hashedPassword,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(400).send("Email or password is wrong.");

  const validPass = await bcryptjs.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong.");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  //   res.send("Success");
});

router.post("/registerUserByAdmin", verify, async (req, res) => {
  const userLogin = await User.findOne({ _id: req.user._id });
  if (userLogin.role != "Admin")
    return res
      .status(400)
      .send("Cannot access this url. Only admin can access this role.");
  const userNameExist = await User.findOne({ userName: req.body.userName });
  if (userNameExist)
    return res
      .status(400)
      .send("Username already exist. Choose other username");

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  const user = new User({
    userName: req.body.userName,
    password: hashedPassword,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/delete/:userName", verify, async (req, res) => {
  const userLogin = await User.findOne({ _id: req.user._id });
  if (userLogin.role != "Admin")
    return res
      .status(400)
      .send("Cannot access this url. Only admin can access this role.");
  const user = await User.findOne({ userName: req.params.userName });
  if (!user) return res.status(400).send("Username doesn't exist.");

  try {
    const deletedUser = await user.delete();
    res.status(200).send(deletedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
