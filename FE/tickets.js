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

const toggleSeatSelection = (seatDiv, seat, ticket) => {
  if (selectedSeats.includes(seat)) {
    selectedSeats = selectedSeats.filter((s) => s !== seat);
    seatDiv.classList.remove("selected");
    removeSeatFromInvoice(seat);
  } else {
    selectedSeats.push(seat);
    seatDiv.classList.add("selected");
    addSeatToInvoice(seat, ticket.price);
    document.getElementById("id-ticket").value = ticket.id;
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
