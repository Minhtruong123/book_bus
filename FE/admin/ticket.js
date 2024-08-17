const fetchTickets = () => {
  fetch(`http://localhost:8080/admin/get-tickets`)
    .then((response) => response.json())
    .then((tickets) => {
      const tableBody = document.getElementById("ticketTableBody");
      tableBody.innerHTML = ""; 

      tickets.forEach((ticket) => {
        let formattedArr = ticket.arrivalLocation.replace(/([A-Z])/g, " $1");
        let formattedDepart = ticket.departureLocation.replace(/([A-Z])/g, " $1");
        const row = document.createElement("tr");

        row.insertCell(0).textContent = ticket.id;
        row.insertCell(1).textContent = ticket.seatNumber;
        row.insertCell(2).textContent = ticket.price;
        row.insertCell(3).textContent = formattedArr;
        row.insertCell(4).textContent = formattedDepart;

        const actionCell = row.insertCell(5);
        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm mr-2";
        editButton.textContent = "Chỉnh sửa";
        editButton.onclick = () => showEditTicketForm(ticket.id);

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Xóa";
        deleteButton.onclick = () => deleteTicket(ticket.id);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching tickets:", error));
}

// Show the form to add a new ticket
function showAddTicketForm() {
  // Display your form for adding a ticket
  console.log("Show add ticket form");
  // Implement form display logic here
}

// Show the form to edit an existing ticket
function showEditTicketForm(ticketId) {
  // Display your form for editing the ticket
  console.log("Show edit form for ticket ID:", ticketId);
}

function deleteTicket(ticketId) {
  if (confirm("Bạn có chắc chắn muốn xóa vé này?")) {
    fetch("/api/tickets/" + ticketId, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          console.log("Ticket deleted:", ticketId);
          fetchTickets(); 
        } else {
          console.error("Failed to delete ticket:", ticketId);
        }
      })
      .catch((error) => console.error("Error deleting ticket:", error));
  }
}
