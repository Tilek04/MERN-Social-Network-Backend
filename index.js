import express from "express";
import multer from "multer";
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

// Хранилище для сохранения картинок

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect("mongodb+srv://admin:admin123@cluster0.kuhcpv7.mongodb.net/test")
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post("/auth/register", registerValidation, userController.register);

app.post("/auth/login", loginValidation, userController.login);

app.get("/auth/me", checkAuth, userController.getMe);

// Роут на загрузку картинки
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// СRUD постов
app.post("/posts", checkAuth, postCreateValidation, postController.create);
app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch("/posts/:id", checkAuth, postController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
