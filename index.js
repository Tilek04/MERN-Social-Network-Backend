import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";

const app = express();
mongoose
  .connect("mongodb+srv://admin:admin123@cluster0.kuhcpv7.mongodb.net/test")
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });
app.use(express.json());

app.get("/", (req, res) => {});
app.post("/auth/register", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  console.log('Server Branch')
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    avatar: req.body.avatar,
    fullName: req.body.fullName,
    passwordHash,
  });
  const user = await doc.save();
  res.json(user);
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
