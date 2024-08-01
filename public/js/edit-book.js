document
  .getElementById("editBookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const bookId = document.getElementById("bookId").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const publishedYear = document.getElementById("publishedYear").value;

    const token = localStorage.getItem("token");

    if (!token) {
      document.getElementById("message").innerHTML =
        '<div class="alert alert-danger">You must be logged in to edit a book.</div>';
      return;
    }

    fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, author, genre, publishedYear }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          document.getElementById(
            "message"
          ).innerHTML = `<div class="alert alert-success">${data.message}</div>`;
        } else if (data.error) {
          document.getElementById(
            "message"
          ).innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById(
          "message"
        ).innerHTML = `<div class="alert alert-danger">An error occurred: ${error.message}</div>`;
      });
  });
