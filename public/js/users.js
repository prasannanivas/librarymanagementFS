document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    document.getElementById("content").innerHTML =
      '<div class="alert alert-danger">You must be logged in to view users.</div>';
    return;
  }

  fetch("/api/users", {
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
    .then((users) => {
      const content = document.getElementById("content");
      users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "card mb-3";
        userDiv.innerHTML = `
              <div class="card-body">
                  <h5 class="card-title">${user.username}</h5>
                  <p class="card-text">Email: ${user.email}</p>
                  <p class="card-text">Role: ${user.role}</p>
              </div>
          `;
        content.appendChild(userDiv);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      const content = document.getElementById("content");
      content.innerHTML = `<div class="alert alert-danger">An error occurred: ${error.message}</div>`;
    });
});
