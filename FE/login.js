const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginRegisterModalLabel = document.getElementById(
  "loginRegisterModalLabel"
);
const apiLoginEndpoint = "http://localhost:8080/auth/login";
const apiRegisterEndpoint = "http://localhost:8080/auth/register";

document
  .getElementById("showRegisterForm")
  .addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    loginRegisterModalLabel.textContent = "Đăng Ký";
  });

document
  .getElementById("showLoginForm")
  .addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginRegisterModalLabel.textContent = "Đăng Nhập";
  });

const loginButton = () => {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  fetch(apiLoginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 200) {
        const cookies = document.cookie.split("; ");
        const jsessionid = cookies.find((row) => row.startsWith("JSESSIONID="));
        if (jsessionid) {
          localStorage.setItem("JSESSIONID", jsessionid.split("=")[1]);
          localStorage.setItem("loggedIn", "true");
        }
        alert("Đăng nhập thành công!");
        bootstrap.Modal.getInstance(
          document.getElementById("loginRegisterModal")
        ).hide();
        return response.json();
      } else if (response.status >= 400 && response.status < 600) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((data) => {
      if (data.loggedIn) {
        updateLoginButton(data.username);
      } else {
        console.log("User is not logged in");
      }
    })
    .catch((error) => {
      alert("Sai mật khẩu");
    });
};

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const phoneNumber = document.getElementById("registerPhone").value;
  const password = document.getElementById("registerPassword").value;

  fetch(apiRegisterEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      gmail: email,
      phoneNumber: phoneNumber,
    }),
  })
    .then((response) => {
      if (response.status === 204) {
        alert("Đăng ký thành công!");
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        loginRegisterModalLabel.textContent = "Đăng Nhập";
        return null;
      } else if (response.status >= 400 && response.status < 600) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return response.json();
      }
    })
    .then((data) => {})
    .catch((error) => {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi trong quá trình đăng ký.");
    });
});

const updateLoginButton = (username) => {
  const loginBtn = document.querySelector(".login-btn");
  console.log(loginBtn);
  loginBtn.textContent = username;
  loginBtn.classList.remove("btn-primary");
  loginBtn.classList.add("dropdown-toggle");
  loginBtn.setAttribute("id", "userDropdown");
  loginBtn.setAttribute("role", "button");
  loginBtn.setAttribute("data-bs-toggle", "dropdown");
  loginBtn.setAttribute("aria-expanded", "false");

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu");
  dropdownMenu.setAttribute("aria-labelledby", "userDropdown");

  const profileItem = document.createElement("li");
  const profileLink = document.createElement("a");
  profileLink.classList.add("dropdown-item");
  profileLink.textContent = "Thông tin cá nhân";
  profileLink.href = "/profile";
  profileItem.appendChild(profileLink);
  dropdownMenu.appendChild(profileItem);

  const logoutItem = document.createElement("li");
  const logoutLink = document.createElement("a");
  logoutLink.classList.add("dropdown-item");
  logoutLink.textContent = "Đăng Xuất";
  logoutLink.href = "/logout";
  logoutItem.appendChild(logoutLink);
  dropdownMenu.appendChild(logoutItem);

  loginBtn.parentNode.appendChild(dropdownMenu);
}
