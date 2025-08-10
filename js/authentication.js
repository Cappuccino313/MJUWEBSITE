document.addEventListener("DOMContentLoaded", () => {
  const modalTitle = document.getElementById("exampleModalLabel");
  const modalBody = document.querySelector("#exampleModal .modal-body");

  // Initial Login Form HTML
  const loginHTML = `
    <form id="loginForm">
      <div class="mb-3">
        <label for="loginEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="loginEmail" required>
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="loginPassword" required>
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <div class="text-center mt-3">
      <small>Don’t have an account? 
        <a href="#" id="showRegister">Register here</a>
      </small>
    </div>
  `;

  // Register Form HTML
  const registerHTML = `
    <form id="registerForm">
      <div class="mb-3">
        <label for="registerName" class="form-label">Name</label>
        <input type="text" class="form-control" id="registerName" required>
      </div>
      <div class="mb-3">
        <label for="registerEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="registerEmail" required>
      </div>
      <div class="mb-3">
        <label for="registerPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="registerPassword" required>
      </div>
      <button type="submit" class="btn btn-success w-100">Register</button>
    </form>
    <div class="text-center mt-3">
      <small>Already have an account? 
        <a href="#" id="showLogin">Login here</a>
      </small>
    </div>
  `;

  // Load Login Form by default
  modalBody.innerHTML = loginHTML;
  modalTitle.textContent = "Login";

  // Event Delegation
  document.addEventListener("click", (e) => {
    if (e.target.id === "showRegister") {
      modalBody.innerHTML = registerHTML;
      modalTitle.textContent = "Register";
    }
    if (e.target.id === "showLogin") {
      modalBody.innerHTML = loginHTML;
      modalTitle.textContent = "Login";
    }
  });

  // Handle Form Submissions
  document.addEventListener("submit", (e) => {
    e.preventDefault();

    // LOGIN
    if (e.target.id === "loginForm") {
      let email = document.getElementById("loginEmail").value;
      let password = document.getElementById("loginPassword").value;
      let storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Login successful!");
        bootstrap.Modal.getInstance(document.getElementById("exampleModal")).hide();
        document.querySelector('header p').textContent = `Hello, ${storedUser.name}`;
      } else {
        alert("Invalid credentials!");
      }
    }

    // REGISTER
    if (e.target.id === "registerForm") {
      let name = document.getElementById("registerName").value;
      let email = document.getElementById("registerEmail").value;
      let password = document.getElementById("registerPassword").value;

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("Registration successful! Please log in.");
      modalBody.innerHTML = loginHTML;
      modalTitle.textContent = "Login";
    }
  });
});
