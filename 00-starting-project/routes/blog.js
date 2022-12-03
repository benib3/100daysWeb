const express = require("express");
const router = express.Router();
const db = require("../data/db");

//GET REQS

router.get("/", function (req, res) {
  res.render("/posts-list");
});

router.get("/posts", async function (req, res) {
  const query = `
  SELECT posts.*,authors.name AS author_name FROM 
  posts INNER JOIN authors on posts.author_id=authors.id
  `;
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
});
router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM authors");
  res.render("create-post", { authors: authors });
});

router.get("/posts/:postId", async function (req, res) {
  const query = `
    SELECT posts.*,authors.name AS author_name, authors.email AS authors_email FROM posts 
    INNER JOIN authors on posts.author_id=authors.id
    WHERE posts.id = ?
    `;
  const [posts] = await db.query(query, [req.params.postId]);

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanDate: posts[0].date.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
    SELECT  * FROM posts WHERE id= ?
    `;
  const [posts] = await db.query(query, [req.params.id]);
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: posts[0] });
});

//POST REQS
router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  await db.query(
    "INSERT INTO blog.posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );
  res.redirect("/posts");
});
router.post("/posts/update-post", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  await db.query(
    "INSERT INTO blog.posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );
  res.redirect("/posts");
});

router.post("/posts/:id/edit", async function (req, res) {
  const query = `
      UPDATE posts SET title = ?, summary = ?, body = ?
      WHERE id = ?
    `;

  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);

  res.redirect("/posts");
});
router.post("/posts/:id/delete", async function (req, res) {
  await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
  res.redirect("/posts");
});

module.exports = router;
