const getTicketsByTripId = (tripId) => {
  const url = `http://localhost:8080/ticket/get-ticket/${tripId}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      seatMapRow.style.display = "flex";

      const seatContainer = document.querySelector(".seat-container");
      seatContainer.innerHTML = "";
      invoiceList.innerHTML = "";
      selectedSeats = [];

      const seatLayout = [
        ["A1", "A2", "A3", "A4", "A5"],
        ["B1", "B2", "B3", "B4", "B5"],
        ["C1", "C2", "C3", "C4", "C5"],
        ["D1", "D2", "D3", "D4", "D5"],
        ["E1", "E2", "E3", "E4", "E5"],
      ];

      seatLayout.forEach((row) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("d-flex", "justify-content-center", "mb-2");

        row.forEach((seat) => {
          const seatDiv = document.createElement("div");
          seatDiv.classList.add("seat", "p-2", "border", "rounded", "mx-1");
          seatDiv.textContent = seat;
          seatDiv.style.cursor = "pointer";

          const ticket = data.find((ticket) => ticket.seatNumber === seat);

          if (ticket && ticket.booked) {
            seatDiv.classList.add("disabled");
            seatDiv.style.backgroundColor = "#ccc";
            seatDiv.style.cursor = "not-allowed";
          } else {
            seatDiv.addEventListener("click", function () {
              toggleSeatSelection(seatDiv, seat, ticket);
            });
          }

          rowDiv.appendChild(seatDiv);
        });

        seatContainer.appendChild(rowDiv);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

let selectedTicketIds = [];

const toggleSeatSelection = (seatDiv, seat, ticket) => {
  if (selectedSeats.includes(seat)) {
    selectedSeats = selectedSeats.filter((s) => s !== seat);
    seatDiv.classList.remove("selected");
    removeSeatFromInvoice(seat);
  } else {
    selectedSeats.push(seat);
    seatDiv.classList.add("selected");
    addSeatToInvoice(seat, ticket.price);
    selectedTicketIds = selectedTicketIds.concat(ticket.id);
    document.getElementById("id-ticket").value = selectedTicketIds;
  }
};

const addSeatToInvoice = (seat, price) => {
  const seatItem = document.createElement("li");
  seatItem.textContent = `Ghế: ${seat} - Giá: ${price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  })}`;
  seatItem.setAttribute("data-seat", seat);
  invoiceList.appendChild(seatItem);
};

const removeSeatFromInvoice = (seat) => {
  const seatItems = document.querySelectorAll("#invoiceList li");
  seatItems.forEach((item) => {
    if (item.getAttribute("data-seat") === seat) {
      item.remove();
    }
  });
};

function fetchTickets() {
  let userId = localStorage.getItem("userId");

  const url = `http://localhost:8080/ticket/user/${userId}`;
  fetch(url)
    .then((response) => response.json())
    .then((tickets) => {
      const ticketList = document.getElementById("ticketList");
      ticketList.innerHTML = "";

      if (tickets.length === 0) {
        ticketList.innerHTML = '<p class="text-center">Bạn chưa có vé nào.</p>';
        return;
      }

      tickets.forEach((ticket) => {
        const ticketItem = document.createElement("div");
        ticketItem.classList.add("list-group-item", "list-group-item-action");
        let formattedArr = ticket.arrivalLocation.replace(/([A-Z])/g, " $1");
        let formattedDepart = ticket.departureLocation.replace(/([A-Z])/g, " $1");
        ticketItem.innerHTML = `
          <h5 class="mb-1">Ghế: ${ticket.seatNumber}</h5>
          <p class="mb-1">Giá: ${ticket.price} VND</p>
          <p class="mb-1">Chuyến đi: ${formattedArr} đến ${formattedDepart} </p>
          <small>Trạng thái: ${ticket.booked ? "Đã đặt" : "Chưa đặt"}</small>
        `;
        ticketItem.onclick = () => showTicketDetails(ticket.id);
        ticketList.appendChild(ticketItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching tickets:", error);
    });
}

function showMyTickets() {
  document.getElementById("search-trip").style.display = "none";
  document.getElementById("my-tickets").style.display = "block";

  fetchTickets();
}

function showTicketDetails(ticketId) {
  console.log(ticketId);
  
  document.getElementById('my-tickets').style.display = 'none';
  document.getElementById('ticket-details').style.display = 'block';

  fetch(`http://localhost:8080/ticket/user-ticket-detail/${ticketId}`) 
    .then(response => response.json())
    .then(ticket => {
      console.log(ticket);
      
      const ticketDetailsContent = document.getElementById('ticketDetailsContent');
      let formattedArr = ticket.arrivalLocation.replace(/([A-Z])/g, " $1");
      let formattedDepart = ticket.departureLocation.replace(/([A-Z])/g, " $1");
      ticketDetailsContent.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Ghế: ${ticket.seatNumber}</h5>
            <p class="card-text">Giá: ${ticket.price} VND</p>
            <p class="card-text">Chuyến đi: ${formattedArr} đến ${formattedDepart}</p>
            <p class="card-text">Trạng thái: ${ticket.booked ? 'Đã đặt' : 'Chưa đặt'}</p>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error fetching ticket details:', error);
    });
}

const goBackToMyTickets = () => {
  document.getElementById('ticket-details').style.display = 'none';
  document.getElementById('my-tickets').style.display = 'block';
}

const shownBookTicket = () => {
  document.getElementById("search-trip").style.display = "block";
  document.getElementById("my-tickets").style.display = "none";
}