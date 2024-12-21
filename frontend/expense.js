const expenseForm = document.getElementById("expenseForm");
const expenseTableBody = document.getElementById("expenseTable").querySelector("tbody");
const userId = window.localStorage.getItem("userId");

// Function to add an expense row to the table
function addExpenseRow(expense, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${expense.amount}</td>
    <td>${expense.description}</td>
    <td>${expense.category}</td>
    <td><button class="delete-btn" data-index="${expense.id}">Delete</button></td>
  `;
    expenseTableBody.appendChild(row);
}

// Load expenses from backend (or localStorage in this case)
async function loadExpenses() {
    await axios.get(`http://localhost:3000/expense/${userId}`)
        .then((res) => {
            const expenses = res.data;
            expenseTableBody.innerHTML = "";
            expenses.forEach((expense, index) => {
                addExpenseRow(expense, index);
            });
        }).catch((err) => {
            console.log(err);
        });

}

// Handle form submission for adding expenses
expenseForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    await axios.post("http://localhost:3000/expense", { amount, description, category, userId })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    loadExpenses();
    expenseForm.reset();
});

expenseTableBody.addEventListener("click", async function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");

        await axios.delete(`http://localhost:3000/expense/${index}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        loadExpenses();
    }
});

window.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    loadExpenses();
})