const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.use("/assets/css", express.static("assets/css"));
app.use("/assets/icon", express.static("assets/icon"));
app.use("/assets/img", express.static("assets/img"));
app.use("/assets/js", express.static("assets/js"));
app.use("/views", express.static("views"));
app.use(express.urlencoded({ extended: true }));

// Routing
app.get("/", home);
app.get("/blog", blog);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.post("/add-project", addProject);

function home(req, res) {
    res.render("index");
}

function blog(req, res) {
    res.render("blog");
}

function contact(req, res) {
    res.render("contact");
}

function testimonial(req, res) {
    res.render("testimonial");
}


function addProject(req, res) {
    const { title, content, startDate, endDate, technologies } = req.body;

    console.log("Project Title:", title);
    console.log("Description:", content);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Technologies Used:", technologies);

    res.send("Project Berhasil ditambahkan di-terminal");
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});