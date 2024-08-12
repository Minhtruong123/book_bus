document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchResults = document.getElementById("searchResults");
  const tripList = document.getElementById("tripList");
  const seatMapRow = document.getElementById("seatMapRow");
  const invoiceList = document.getElementById("invoiceList");
  let selectedSeats = [];

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Xóa kết quả tìm kiếm cũ
    tripList.innerHTML = "";
    seatMapRow.style.display = "none"; // Ẩn sơ đồ ghế và hóa đơn ban đầu

    const trips = [
      { time: "08:00", from: "Hà Nội", to: "Sài Gòn" },
      { time: "12:00", from: "Hà Nội", to: "Sài Gòn" },
      { time: "18:00", from: "Hà Nội", to: "Sài Gòn" },
    ];

    // Hiển thị kết quả tìm kiếm
    trips.forEach((trip) => {
      const tripItem = document.createElement("a");
      tripItem.href = "#";
      tripItem.classList.add("list-group-item", "list-group-item-action");
      tripItem.textContent = `${trip.time} - ${trip.from} đến ${trip.to}`;
      tripItem.addEventListener("click", function () {
        displaySeatMap(trip);
      });
      tripList.appendChild(tripItem);
    });

    searchResults.style.display = "block";
  });

  const displaySeatMap = (trip) => {
    seatMapRow.style.display = "flex";

    const seatContainer = document.querySelector(".seat-container");
    seatContainer.innerHTML = ""; // Xóa sơ đồ ghế cũ
    invoiceList.innerHTML = ""; // Xóa hóa đơn cũ
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
        seatDiv.addEventListener("click", function () {
          toggleSeatSelection(seatDiv, seat);
        });
        rowDiv.appendChild(seatDiv);
      });
      seatContainer.appendChild(rowDiv);
    });
  };

  const toggleSeatSelection = (seatDiv, seat) => {
    if (selectedSeats.includes(seat)) {
      selectedSeats = selectedSeats.filter((s) => s !== seat);
      seatDiv.classList.remove("selected");
      removeSeatFromInvoice(seat);
    } else {
      selectedSeats.push(seat);
      seatDiv.classList.add("selected");
      addSeatToInvoice(seat);
    }
  };

  const addSeatToInvoice = (seat) => {
    const seatItem = document.createElement("li");
    seatItem.textContent = `Ghế: ${seat} - 200,000 VND`;
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
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today; 
});
