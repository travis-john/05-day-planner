//global variables
var scheduledHours = [];

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
