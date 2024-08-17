document.addEventListener("DOMContentLoaded", () => {
  const addUserFormContainer = document.getElementById("addUserFormContainer");
  const userList = document.getElementById("userList");
  const searchUser = document.getElementById("searchUser");
  const editUserFormContainer = document.getElementById("edit-user-form");
  const editUserForm = document.getElementById("editUserForm");

  showAddUserForm.addEventListener("click", () => {
    addUserFormContainer.classList.remove("d-none");
    userList.classList.add("d-none");
    searchUser.style.display = "none";
  });

  cancelAddUser.addEventListener("click", () => {
    addUserFormContainer.classList.add("d-none");
    userList.classList.remove("d-none");
    searchUser.style.display = "block";
  });
  fetchUsers();

  document.getElementById("cancelEditUser").addEventListener("click", () => {
    editUserFormContainer.classList.add("d-none");
    userList.classList.remove("d-none");
    searchUser.style.display = "block";
    fetchUsers();
  });
});

const fetchUsers = () => {
  username = document.getElementById("searchUser").value;
  const url = `http://localhost:8080/admin/get-users?username=${encodeURIComponent(
    username
  )}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      displayUsers(users);
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
};

function displayUsers(users) {
  const userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <th scope="row">${user.id}</th>
            <td>${user.username}</td>
            <td>${user.gmail}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewUser(${user.id})">Xem</button>
                <button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Sửa</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Xóa</button>
            </td>
        `;
    userTableBody.appendChild(row);
  });
}

const editUser = (id) => {
  const url = `http://localhost:8080/admin/get-user/${id}`;
  const editUserFormContainer = document.getElementById("edit-user-form");
  const userList = document.getElementById("userList");
  const searchUser = document.getElementById("searchUser");
  editUserFormContainer.classList.remove("d-none");
  userList.classList.add("d-none");
  searchUser.style.display = "none";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((user) => {
      document.getElementById("editUsername").value = user.username;
      document.getElementById("editEmail").value = user.gmail;
      document.getElementById("editPhoneNumber").value = user.phoneNumber;
      document.getElementById("editRole").value = user.role;

      document.getElementById("edit-user-form").classList.remove("d-none");
      document.getElementById("userList").classList.add("d-none");
      document.getElementById("searchUser").style.display = "none";

      document.getElementById("editUserForm").dataset.userId = id;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
};

function viewUser(id) {
  alert(`Xem chi tiết người dùng có ID: ${id}`);
}

function updateUser() {
  const id = document.getElementById("editUserForm").dataset.userId;
  const updatedUser = {
    username: document.getElementById("editUsername").value,
    gmail: document.getElementById("editEmail").value,
    phoneNumber: document.getElementById("editPhoneNumber").value,
    role: document.getElementById("editRole").value,
  };
  console.log(updateUser);

  fetch(`http://localhost:8080/admin/update-user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => {
      if (response.status === 204) {
        return null;
      } else if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.text();
    })
    .then((user) => {
      console.log(user);
      alert("Cập nhật thành công");
      document.getElementById("edit-user-form").classList.add("d-none");
      document.getElementById("userList").classList.remove("d-none");
      document.getElementById("searchUser").style.display = "block";
      fetchUsers();
    })
    .catch((error) => {
      alert("Đã xảy ra lỗi khi cập nhật người dùng: " + error.message);
    });
}

function deleteUser(id) {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
    fetch(`http://localhost:8080/admin/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          return null;
        } else if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text();
      })
      .then((result) => {
        alert("Đã xóa thành công");
        document.getElementById(`user-row-${userId}`).remove();
        fetchUsers();
      })
      .catch((error) => {
        alert("Đã xảy ra lỗi khi xóa người dùng: " + error.message);
      });
  }
}
