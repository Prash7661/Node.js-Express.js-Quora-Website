const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

let posts = [
    { id: uuidv4(), usename: "Prashant", content: "I love coding" },
    { id: uuidv4(), usename: "Tejas", content: "Hard work is important to achieve success in life" },
    { id: uuidv4(), usename: "Suyash", content: "I am selected for my first internship" }
];

app.get("/posts", (req, res) => {
    res.render("index", { posts: posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    const newPost = { id: uuidv4(), usename: username, content: content };
    posts.push(newPost);
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    res.send("Request Working");
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find(post => post.id === id);
    if (!post) {
        res.render("error");
    } else {
        res.render("edit", { post });
    }
});

app.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { username, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
        posts[postIndex].usename = username;
        posts[postIndex].content = content;
        res.redirect("/posts");
    } else {
        res.render("error");
    }
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.redirect("/posts");
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
