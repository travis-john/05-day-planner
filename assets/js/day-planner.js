// adding clock to currentDay id
  function clock() {
    var dateString = moment().format("MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").html(dateString);
  }

  setInterval(clock, 1000);
