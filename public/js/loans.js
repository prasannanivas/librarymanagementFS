document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/loans")
    .then((response) => response.json())
    .then((loans) => {
      const content = document.getElementById("content");
      loans.forEach((loan) => {
        const loanDiv = document.createElement("div");
        loanDiv.className = "card mb-3";
        loanDiv.innerHTML = `
                  <div class="card-body">
                      <h5 class="card-title">Loan ID: ${loan._id}</h5>
                      <p class="card-text">Book ID: ${loan.bookId}</p>
                      <p class="card-text">User ID: ${loan.userId}</p>
                      <p class="card-text">Due Date: ${new Date(
                        loan.dueDate
                      ).toLocaleDateString()}</p>
                      <p class="card-text">Returned At: ${
                        loan.returnedAt
                          ? new Date(loan.returnedAt).toLocaleDateString()
                          : "Not Returned"
                      }</p>
                  </div>
              `;
        content.appendChild(loanDiv);
      });
    });
});
