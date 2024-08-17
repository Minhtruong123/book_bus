const buyTicket = () => {
    const url = `http://localhost:8080/booking/buy`;
    const ticketId = document.getElementById("id-ticket").value;
    const username = localStorage.getItem("username");
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listId: ticketId,
        username : username
      })
    })
      .then((response) => {
        if (response.status === 204) {
          alert("Mua vé thành công!");
          return;
        } else if (!response.ok) {
          if (response.status === 401) {
            throw new Error('User is not authenticated');
          } else {
            throw new Error('Something went wrong: ' + response.statusText);
          }
        }
        return response.json(); 
      })
      .then((message) => {
        if (message) {
          console.log(message);
        }
      })
      .catch((error) => {
        console.error('Error purchasing ticket:', error);
        alert(error.message);
      });
  };
  