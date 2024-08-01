document
  .getElementById("editUserForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    const token = localStorage.getItem("token");

    if (!token) {
      document.getElementById("message").innerHTML =
        '<div class="alert alert-danger">You must be logged in to edit user details.</div>';
      return;
    }

    fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, email, role }),
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
