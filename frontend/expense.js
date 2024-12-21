const expenseForm = document.getElementById("expenseForm");
const expenseTableBody = document.getElementById("expenseTable").querySelector("tbody");
const token = window.localStorage.getItem("token");

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

async function loadExpenses() {
    await axios.get(`http://localhost:3000/expense`, { headers: { Authorization: token } })
        .then((res) => {
            const expenses = res.data;
            expenseTableBody.innerHTML = "";
            if(expenses.length === 0){
                const row = document.createElement("tr");
                row.innerHTML = `
                <td colspan="4">No expenses found</td>
              `;
                expenseTableBody.appendChild(row);
                return;
            }else{
                expenses.forEach((expense, index) => {
                    addExpenseRow(expense, index);
                });
            }
        }).catch((err) => {
            console.log(err);
        });

}

expenseForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    await axios.post("http://localhost:3000/expense", { amount, description, category }, { headers: { Authorization: token } })
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

        await axios.delete(`http://localhost:3000/expense/${index}`, { headers: { Authorization: token } })
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