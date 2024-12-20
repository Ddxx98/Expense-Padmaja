const loginForm = document.getElementById("loginForm");

// Helper function to show error
function showError(input, message) {
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector(".error-message");
    errorMessage.textContent = message;
    errorMessage.classList.add("visible");
    input.classList.add("error-border");
}

// Helper function to clear error
function clearError(input) {
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector(".error-message");
    errorMessage.textContent = "";
    errorMessage.classList.remove("visible");
    input.classList.remove("error-border");
}

// Form validation function
async function validateLoginForm(e) {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    // Email validation
    if (email.value.trim() === "") {
        showError(email, "Email is required.");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, "Enter a valid email address.");
        isValid = false;
    } else {
        clearError(email);
    }

    // Password validation
    if (password.value.trim() === "") {
        showError(password, "Password is required.");
        isValid = false;
    } else {
        clearError(password);
    }

    const obj = {
        email: email.value,
        password: password.value
    };
    if (isValid) {
        await axios.post("http://localhost:3000/login", obj)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    showError(email, "User not found.");
                } else if (err.response.status === 401) {
                    showError(password, "Invalid password.");
                } else {
                    console.log(err);
                }
            });
    }
}

// Attach event listener to the form
loginForm.addEventListener("submit", validateLoginForm);