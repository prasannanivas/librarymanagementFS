document
  .getElementById("addBookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const publishedYear = document.getElementById("publishedYear").value;

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      document.getElementById("message").innerHTML =
        '<div class="alert alert-danger">You must be logged in to add a book.</div>';
      return;
    }

    fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify({ title, author, genre, publishedYear }),
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
      .then((data) => {
        const messageDiv = document.getElementById("message");
        if (data.message) {
          messageDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
        } else if (data.error) {
          messageDiv.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const messageDiv = document.getElementById("message");
        messageDiv.innerHTML = `<div class="alert alert-danger">An error occurred: ${error.message}</div>`;
      });
  });
