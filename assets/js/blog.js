let blogs = [];

function addBlog(event) {
    event.preventDefault();

    const inputBlogTitle = document.getElementById("input-blog-title").value;
    const inputBlogContent = document.getElementById("input-blog-content").value;
    const inputBlogImage = document.getElementById("input-blog-image").files;
    const inputStartDate = new Date(document.getElementById("input-start-date").value);
    const inputEndDate = new Date(document.getElementById("input-end-date").value);

    const selectedTechnologies = [];
    if (document.getElementById("html").checked) selectedTechnologies.push("HTML");
    if (document.getElementById("css").checked) selectedTechnologies.push("CSS");
    if (document.getElementById("js").checked) selectedTechnologies.push("JavaScript");
    if (document.getElementById("TypeScript").checked) selectedTechnologies.push("TypeScript");

    const image = URL.createObjectURL(inputBlogImage[0]);
    const duration = Math.ceil((inputEndDate - inputStartDate) / (1000 * 60 * 60 * 24));

    const blog = {
        title: inputBlogTitle,
        content: inputBlogContent,
        createdAt: new Date(),
        startDate: inputStartDate,
        endDate: inputEndDate,
        duration: duration,
        image: image,
        technologies: selectedTechnologies,
    };

    blogs.unshift(blog);
    renderBlog();
}

function renderBlog() {
  let html = `<h1 class="text-center">My Project</h1>`;
  for (let index = 0; index < blogs.length; index++) {
      html += `
          <div class="blog-list-item card">
              <div class="blog-image">
                  <img src="${blogs[index].image}" alt="${blogs[index].title}" />
              </div>
              <div class="blog-content">
                  <h2>${blogs[index].title} - ${new Date(blogs[index].createdAt).toLocaleString()}</h2>
                  <p>${blogs[index].content}</p>
                  <p><strong>Project Duration:</strong> ${new Date(blogs[index].startDate).toLocaleDateString()} to ${new Date(blogs[index].endDate).toLocaleDateString()} (${blogs[index].duration} days)</p>
                  <p><strong>Technologies Used:</strong> ${blogs[index].technologies.join(', ')}</p>
                  <div class="btn-group">
                      <button class="btn-edit" onclick="editBlog(${index})">Edit</button>
                      <button class="btn-delete" onclick="deleteBlog(${index})">Delete</button>
                  </div>
              </div>
          </div>`;
  }

  document.getElementById("contents").innerHTML = html;
}

function deleteBlog(index) {
    blogs.splice(index, 1);
    renderBlog();
}