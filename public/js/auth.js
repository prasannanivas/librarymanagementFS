document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (token) {
    document.getElementById("login-nav").style.display = "none";
    document.getElementById("logout-nav").style.display = "block";
  } else {
    document.getElementById("login-nav").style.display = "block";
    document.getElementById("logout-nav").style.display = "none";
  }
});

// Login Form Submission
document
  .getElementById("loginForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          document.getElementById("message").innerHTML =
            '<div class="alert alert-danger">Invalid credentials</div>';
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("message").innerHTML =
          '<div class="alert alert-danger">An error occurred while logging in.</div>';
      });
  });

// Registration Form Submission
document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          document.getElementById("message").innerHTML =
            '<div class="alert alert-success">' + data.message + "</div>";
          window.location.href = "login.html";
        } else if (data.error) {
          document.getElementById("message").innerHTML =
            '<div class="alert alert-danger">' + data.error + "</div>";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("message").innerHTML =
          '<div class="alert alert-danger">An error occurred while registering.</div>';
      });
  });

// Logout Function
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
