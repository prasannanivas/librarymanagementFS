document
  .getElementById("returnBookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const loanId = document.getElementById("loanId").value;
    const token = localStorage.getItem("token");

    if (!token) {
      document.getElementById("message").innerHTML =
        '<div class="alert alert-danger">You must be logged in to return a book.</div>';
      return;
    }

    fetch(`/api/loans/return/${loanId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
