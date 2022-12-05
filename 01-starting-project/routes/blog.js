const { render } = require("ejs");
const express = require("express");
const mongodb = require("mongodb");

const db = require("../data/db");
const ObjectId = mongodb.ObjectId;
const router = express.Router();
//get rEQUEST
router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db.getDb().collection("posts").find().toArray();

  res.render("posts-list", { post: posts });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();

  res.render("create-post", { authors: authors });
});

router.get("/posts/:id", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  //finding one post in db with id this params
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: postId }, { summary: 0 });

  if (!post) {
    res.status(404).render("404");
  }
  //creating human readable data
  post.humanDate = post.date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  post.date = post.date.toISOString();

  res.render("post-detail", { post: post });
});

router.get("/posts/:id/edit", async function (req, res) {
  const postId = req.params.id;
  try {
    postId = new ObjectId(postId);
  } catch (error) {
    return res.status(404).render("404");
  }
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: postId }, { title: 1, summary: 1, body: 1 });
  if (!post) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: post });
});

//post rEQUEST
router.post("/posts", async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  await db.getDb().collection("posts").insertOne(newPost);

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  const postId = new ObjectId(req.params.id);

  const deleted = await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: postId });
  if (!deleted) {
    res.status(404).render("404");
  }
  res.redirect("/posts");
});

//for editing data
router.post("/posts/:id/edit", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
          // date: new Date()
        },
      }
    );

  res.redirect("/posts");
});
module.exports = router;
