document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    document.getElementById("content").innerHTML =
      '<div class="alert alert-danger">You must be logged in to view books.</div>';
    return;
  }

  fetch("/api/books", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  })
    .then((response) => {
      if (!response.ok) {
        // If the response is not ok, return the error text
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then((books) => {
      const content = document.getElementById("content");
      books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "card mb-3";
        bookDiv.innerHTML = `
              <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">Author: ${book.author}</p>
                  <p class="card-text">Genre: ${book.genre}</p>
                  <p class="card-text">Published Year: ${book.publishedYear}</p>
              </div>
          `;
        content.appendChild(bookDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      const content = document.getElementById("content");
      content.innerHTML = `<div class="alert alert-danger">An error occurred: ${error.message}</div>`;
    });
});
