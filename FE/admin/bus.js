function fetchBuses(licensePlate) {
  fetch(
    `http://localhost:8080/admin/get-buses?licensePlate=${encodeURIComponent(
      licensePlate
    )}`
  )
    .then((response) => response.json())
    .then((buses) => {
      const busTableBody = document.getElementById("busTableBody");
      busTableBody.innerHTML = "";

      buses.forEach((bus) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = bus.id;

        const licensePlateCell = document.createElement("td");
        licensePlateCell.textContent = bus.licensePlate;

        const typeCell = document.createElement("td");
        typeCell.textContent = bus.type;

        const capacityCell = document.createElement("td");
        capacityCell.textContent = bus.capacity;

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-warning", "btn-sm", "mr-2");
        editButton.textContent = "Chỉnh sửa";
        editButton.onclick = () => showEditBusForm(bus.id);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteButton.textContent = "Xóa";
        deleteButton.onclick = () => deleteBus(bus.id);

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(licensePlateCell);
        row.appendChild(typeCell);
        row.appendChild(capacityCell);
        row.appendChild(actionsCell);

        busTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching buses:", error);
    });
}

const showAddBusForm = () => {
  document.getElementById("formTitle").textContent = "Thêm xe khách mới";
  document.getElementById("save-change").textContent = "Lưu xe";
  document.getElementById("editBusForm").reset();
  document.getElementById("edit-bus-form").classList.remove("d-none");
  document.getElementById("manage-buses").classList.add("d-none");
};

const saveBus = () => {
  const licensePlate = document.getElementById("editLicensePlate").value;
  const type = document.getElementById("editType").value;
  const capacity = document.getElementById("editCapacity").value;
  console.log(licensePlate);

  const busData = {
    licensePlate: licensePlate,
    type: type,
    capacity: parseInt(capacity),
  };

  fetch("http://localhost:8080/admin/add-bus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(busData),
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
    .then((data) => {
      alert("Bus added successfully");
      fetchBuses();
      document.getElementById("editBusForm").reset();
      document.getElementById("edit-bus-form").classList.add("d-none");
      document.getElementById("manage-buses").classList.remove("d-none");
    })
    .catch((error) => {
      console.error("Error adding bus:", error);
    });
};

const showEditBusForm = (busId) => {
  document.getElementById("formTitle").textContent = "Chỉnh sửa xe buýt";
  document.getElementById("edit-bus-form").classList.remove("d-none");
};

const cancelEditBus = () => {
  document.getElementById("edit-bus-form").classList.add("d-none");
  document.getElementById("manage-buses").classList.remove("d-none");
};
