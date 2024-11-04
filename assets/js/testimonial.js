class Testimonial {
  constructor(image, content, author, star) {
      this.image = image;
      this.content = content;
      this.author = author;
      this.star = star;
  }

  toHTML() {
      return `
          <div class="testimonial">
              <img src="${this.image}" class="profile-testimonial" />
              <p class="quote">"${this.content}"</p>
              <p class="author">- ${this.author}</p>
              <p class="author"><i class="fas fa-star"></i> Rating: ${this.star}</p>
          </div>
      `;
  }
}

class TestimonialList {
  constructor(testimonials) {
      this.testimonials = testimonials.map(
          ({ image, content, author, star }) =>
              new Testimonial(image, content, author, star)
      );
  }

  render(filterFn, renderCallback) {
      const filteredTestimonials = this.testimonials.filter(filterFn);
      const testimonialHTML = filteredTestimonials.map((testimonial) =>
          testimonial.toHTML()
      ).join("");
      renderCallback(testimonialHTML);
  }
}

async function fetchTestimonials() {
  try {
      const response = await fetch('https://api.npoint.io/8d7dc77ec097d063f481'); //URL JSON dari npoint.io
      if (!response.ok) throw new Error('Gagal mengambil data testimonials');
      
      const data = await response.json();
      return data.map(item => ({
          image: item.image,
          content: item.content,
          author: item.author,
          star: item.star
      }));
  } catch (error) {
      console.error(error);
  }
}

function displayTestimonials(html) {
  document.getElementById("testimonials").innerHTML = html;
}

function filterByRating(rating) {
  return (testimonial) => rating === "all" || testimonial.star === Number(rating);
}

async function initTestimonials() {
  const testimonialsData = await fetchTestimonials();
  const testimonialList = new TestimonialList(testimonialsData || []);

  testimonialList.render(filterByRating("all"), displayTestimonials);

  const ratingButtons = document.querySelectorAll(".rating-btn");
  ratingButtons.forEach((button) => {
      button.addEventListener("click", () => {
          ratingButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          const rating = button.getAttribute("data-rating");
          testimonialList.render(filterByRating(rating), displayTestimonials);
      });
  });
}

initTestimonials();
