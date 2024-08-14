const buyTicket = () => {
    const url = `http://localhost:8080/booking/buy`;
    const ticketId = document.getElementById("id-ticket").value;
    const jsessionid = sessionStorage.getItem("JSESSIONID");
    console.log(jsessionid);
    console.log(ticketId);
    console.log(sessionStorage.getItem('loggedIn'));
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `JSESSIONID=${jsessionid}`
      },
      body: JSON.stringify({
        id: ticketId
      }),
      credentials:'include'
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('User is not authenticated');
          }  else {
            throw new Error('Something went wrong: ' + response.statusText);
          }
        }
        return response.json();
      })
      .then((message) => {
        console.log(message);
        alert("Mua vé thành công!");
      })
      .catch((error) => {
        console.error('Error purchasing ticket:', error);
        alert(error.message);
      });
  };
  