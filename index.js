import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from "./controllers/userController.js";
import * as postController from "./controllers/PostController.js";

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

app.post("/auth/register", registerValidation, userController.register);

app.post("/auth/login", loginValidation, userController.login);

app.get("/auth/me", checkAuth, userController.getMe);

// СRUD постов
app.post("/posts", checkAuth, postCreateValidation, postController.create);
app.get("/posts", postController.getAll);
app.get('/posts/:id', postController.getOne);
app.delete('/posts/:id', checkAuth, postController.remove);
app.patch('/posts/:id', checkAuth, postController.update)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
