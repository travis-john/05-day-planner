//global variables
var scheduledHours = [];
var availableHours = {};

// adding clock to currentDay id
  function clock() {
    var dateString = moment().format("MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").html(dateString);
  }

  setInterval(clock, 1000);

//generating textareas for scheduling
  for (var hour = 9; hour < 18; hour++) {
      scheduledHours.push(moment({
          hour
      }).format('h  a'));
      $('.container').append(`<div class="row time-block" data-time="${hour}">
         <!--hour column-->
             <div class="col-sm col-md-2 hour">
               <p class=dayHour>${moment({hour}).format('h  a')}</p>
             </div>

         <!--user input text area-->
             <div class="col-sm col-md-8 d-flex description">
               <textarea class=textArea></textarea>
             </div>

         <!--save button-->
             <div class="col-sm col-md-2 saveBtn">
             <i class="far fa-save fa-2x save-icon"></i>
             </div>`);
  }

  //Check the hour of the current day to the hour represented in the HTML data-element to decide it's background color.
  var m = moment();
  $.each($(".time-block"), function (index, value) {
      let dateHour = $(value).attr("data-time");
      if (Number(dateHour) === m.hour()) {
          $(this).find("textarea").addClass('present');
      } else if (Number(dateHour) < m.hour()) {
          $(this).find("textarea").addClass('past');
      } else {
          $(this).find("textarea").addClass('future');
      }
  });

//Check for local storage to set value to the object
if (localStorage.getItem('availableHours')) {
    availableHours = JSON.parse(localStorage.getItem('availableHours'));
}else{
  availableHours = {
    '9': { time: "9", value: ""},
    '10':{ time: "10", value: ""},
    '11':{ time: "11", value: ""},
    '12':{ time: "12", value: ""},
    '13':{ time: "13", value: ""},
    '14':{ time: "14", value: ""},
    '15':{ time: "15", value: ""},
    '16':{ time: "16", value: ""},
    '17':{ time: "17", value: ""}
  };
}
