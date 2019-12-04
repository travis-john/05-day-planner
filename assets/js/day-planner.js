//add the current date to the #current date id in the HTML//
  var dateString = moment().format("dddd, MMMM Do YYYY, h:mm a");
  $("#currentDay").html(dateString);
