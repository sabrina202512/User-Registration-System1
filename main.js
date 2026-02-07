// ======================
// ===== DOM ELEMENTS =====
const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupSuccess = document.getElementById("signupSuccess");

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginSuccess = document.getElementById("loginSuccess");

// ======================
// ===== VALIDATION FUNCTIONS =====
function isValidName(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  // Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

// ======================
// ===== SIGNUP =====
if (signupForm) {
  // Hide success message initially
  if (signupSuccess) signupSuccess.style.display = "none";

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // VALIDATION
    if (!isValidName(name)) return alert("Name cannot contain numbers!");
    if (!isValidEmail(email)) return alert("Please enter a valid email!");
    if (!isValidPassword(password)) return alert("Password must be at least 8 characters, include uppercase, lowercase, and a number.");

    // SAVE USER
    const user = { name, email, password };
    localStorage.setItem("userData", JSON.stringify(user));

    // SHOW SUCCESS MESSAGE
    if (signupSuccess) signupSuccess.style.display = "block";

    // RESET FORM
    signupForm.reset();
  });
}

// ======================
// ===== LOGIN =====
if (loginForm) {
  // Hide success message initially
  if (loginSuccess) loginSuccess.style.display = "none";

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user) {
      return alert("❌ No account found! Please sign up first.");
    }

    if (email === user.email && password === user.password) {
      // SHOW SUCCESS MESSAGE
      if (loginSuccess) loginSuccess.style.display = "block";

      // REDIRECT TO DASHBOARD AFTER 1.5s
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      alert("❌ Wrong email or password!");
    }
  });
}




// ===== DOM ELEMENTS =====
const welcomeUser = document.getElementById("welcomeUser");
const dashboardMsg = document.getElementById("dashboardMsg");
const logoutBtn = document.getElementById("logoutBtn");

// ===== GET USER FROM LOCALSTORAGE =====
const user = JSON.parse(localStorage.getItem("userData"));

if (user) {
  welcomeUser.textContent = `Welcome, ${user.name}!`;
  dashboardMsg.textContent = "🎉 Waan ku guuleysatay registration-ka, laakiin hadda waxaad tahay out of system.";
} else {
  // Haddii user-ka uusan login sameynin
  alert("Please login first!");
  window.location.href = "login.html";
}

// ===== LOGOUT =====
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userData"); // Remove user data
    window.location.href = "login.html"; // redirect to login
  });
}