const findTicket = () => {
  const tripList = document.getElementById("tripList");
  const seatMapRow = document.getElementById("seatMapRow");
  tripList.innerHTML = "";
  seatMapRow.style.display = "none";

  const arrivalLocation = document.getElementById("arrivalLocation").value;
  const departureLocation =
    document.getElementById("departureLocation").value;
  const date = document.getElementById("date").value;

  fetchTrips(arrivalLocation, departureLocation, date);
};

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

const fetchTrips = (arrivalLocation, departureLocation, date) => {
  const encodedArrivalLocation = encodeURIComponent(arrivalLocation);
  const encodedDepartureLocation = encodeURIComponent(departureLocation);
  const url = `http://localhost:8080/trip/get-trips?arrivalLocation=${encodedArrivalLocation}&departureLocation=${encodedDepartureLocation}&date=${date}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const filteredTrips = data.filter((trip) => {
        const tripDate = new Date(trip.departureTime)
          .toISOString()
          .split("T")[0];
        return tripDate === date;
      });
      if (filteredTrips.length > 0) {
        filteredTrips.forEach((trip) => {
          const tripDate = new Date(trip.departureTime).toLocaleDateString(
            "vi-VN",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );
          let formattedArr = arrivalLocation.replace(/([A-Z])/g, " $1");
          let formattedDepart = departureLocation.replace(/([A-Z])/g, " $1");
          const tripItem = document.createElement("a");
          tripItem.href = "#";
          tripItem.classList.add("list-group-item", "list-group-item-action");
          tripItem.textContent = `${tripDate} - ${formattedArr} đến ${formattedDepart}`;
          tripItem.addEventListener("click", function () {
            displaySeatMap(trip);
          });
          tripList.appendChild(tripItem);
        });
      } else {
        const noTripsMessage = document.createElement("div");
        noTripsMessage.classList.add("alert", "alert-warning");
        noTripsMessage.textContent = tripList.appendChild(noTripsMessage);
      }

      searchResults.style.display = "block";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      return [];
    });
};

const displaySeatMap = (trip) => {
  getTicketsByTripId(trip.id);
};
