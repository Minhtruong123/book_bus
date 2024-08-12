document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginRegisterModalLabel = document.getElementById(
    "loginRegisterModalLabel"
  );
  const apiLoginEndpoint = "http://localhost:8080/auth/login";
  const apiRegisterEndpoint = "http://localhost:8080/auth/register";

  // Chuyển sang form Đăng Ký
  document
    .getElementById("showRegisterForm")
    .addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      loginRegisterModalLabel.textContent = "Đăng Ký";
    });

  // Chuyển sang form Đăng Nhập
  document
    .getElementById("showLoginForm")
    .addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      loginRegisterModalLabel.textContent = "Đăng Nhập";
    });

  // Xử lý đăng nhập
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
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
    })
      .then((response) => {
        if (response.status === 204) {
          alert("Đăng nhập thành công!");
          bootstrap.Modal.getInstance(
            document.getElementById("loginRegisterModal"),
            getUserName()
          ).hide();
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
        alert("Đã xảy ra lỗi trong quá trình đăng nhập.");
      });
  });

  // Xử lý đăng ký
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
});

// test port
console.log(window.location.href);
console.log(window.location.hostname);
console.log(window.location.port);

const getUserName = () => {
  fetch("http://localhost:8080/auth/check-login-status", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.loggedIn);
      console.log(data.username);
      if (data.loggedIn) {
        updateLoginButton(data.username);
      } else {
        console.log("User is not logged in");
      }
    })
    .catch((error) => console.error("Error:", error));
};

function updateLoginButton(username) {
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
