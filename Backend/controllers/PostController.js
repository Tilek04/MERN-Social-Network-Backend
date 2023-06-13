import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи!",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    );

    if (!doc) {
      res.status(404).json({
        message: "Статья не найдена!",
      });
    }
    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось вернуть статью!",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена!",
      });
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось удалить",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Не удалось обновить статью",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};
