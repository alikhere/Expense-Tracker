// Variable Declarations
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransaction = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransaction : [];

// Function Definitions

// Generate a random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.Id})">x</button>
    `;

    list.appendChild(item);
}

// Remove transaction
function removeTransaction(Id) {
    transactions = transactions.filter(transaction => transaction.Id !== Id);
    updateLocalStorage();
    Init();
}

// Update balance, income, and expense values
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add a new transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please Enter Text and Value");
    } else {
        const transaction = {
            Id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

// Initialize the app
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// Event Listener
form.addEventListener("submit", addTransaction);

// Initializing the app on page load
Init();
