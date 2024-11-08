const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "hbs");

app.use("/assets/css", express.static("assets/css"));
app.use("/assets/icon", express.static("assets/icon"));
app.use("/assets/img", express.static("assets/img"));
app.use("/assets/js", express.static("assets/js"));
app.use("/views", express.static("views"));
app.use(express.urlencoded({ extended: true }));

const blogs = [];

// Routing
app.get("/", home);
app.get("/blog", blog);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.post("/add-project", addProject);
app.get("/project-detail/:index", projectDetail);
app.get("/edit-project/:index", editProject);
app.post("/edit-project/:index", editProjectPost);
app.post("/delete-project/:index", deleteProject);

function home(req, res) {
    res.render("index");
}

function blog(req, res) {
    res.render("blog", { blogs });
}

function contact(req, res) {
    res.render("contact");
}

function testimonial(req, res) {
    res.render("testimonial");
}

function addProject(req, res) {
    const { title, content, startDate, endDate, technologies } = req.body;

    blogs.unshift({
        title,
        content,
        startDate,
        endDate,
        technologies: technologies ? technologies : [],
    });
    console.log("Data proyek ditambahkan:", blogs);
    res.redirect("/blog");
}

function projectDetail(req, res) {
    const { index } = req.params;
    const project = blogs[index];
    res.render("project-detail", { project });
}

function editProject(req, res) {
    const { index } = req.params;
    const project = blogs[index];
    res.render("edit-project", { project, index });
}

function editProjectPost(req, res) {
    const { index } = req.params;
    const { title, content, startDate, endDate, technologies } = req.body;

    blogs[index] = {
        title,
        content,
        startDate,
        endDate,
        technologies: technologies ? technologies : [],
    };

    res.redirect("/blog");
}

function deleteProject(req, res) {
    const { index } = req.params;
    blogs.splice(index, 1);
    res.redirect("/blog");
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
