//global variables
var scheduledHours = [];
var availableHours = {};
var m = moment();
var newDay = moment().hour(0);
var workDayStart = moment().hour(9);
var currentTime = m.hour();

// adding clock to currentDay id
function clock() {
  var dateString = moment().format('MMMM Do YYYY, h:mm:ss a');
  $('#currentDay').html(dateString);
}

setInterval(clock, 1000);

//generating textareas for scheduling
for (var hour = 9; hour < 18; hour++) {
  scheduledHours.push(moment({hour}).format('h  a'));
  $('.container').append(`<div class='row time-block' data-time='${hour}'>
       <!--hour column-->
           <div class='col-sm col-md-2 hour'>
             <p>${moment({hour}).format('h  a')}</p>
           </div>

        <!--scheduling column-->
           <div class='col-sm col-md-10 d-flex description'>
              <div class='input-group'>
                <textarea class="form-control text-area"></textarea>
                <div class='input-group-append'>
                  <button class='save-button d-flex justify-center align-center'>
                    <i class='far fa-save fa-2x save-icon'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`);
}

//Checking time to determine present, past, or future
$.each($('.time-block'), function(index, value) {
  let dateHour = $(value).attr('data-time');
   if (Number(dateHour) === m.hour()) {
      $(this).find('textarea').addClass('present');
    } else if (Number(dateHour) < m.hour()) {
      $(this).find('textarea').addClass('past').attr('disabled', 'disabled');
      $(this).find('.save-button').addClass('disabled').attr('disabled', true);
    } else {
      $(this).find('textarea').addClass('future');
    }
});
function checkTime() {
  $.each($('.time-block'), function(index, value) {
  let dateHour = $(value).attr('data-time');
   if (Number(dateHour) === m.hour()) {
      $(this).find('textarea').addClass('present');
    } else if (Number(dateHour) < m.hour()) {
      $(this).find('textarea').addClass('past').attr('disabled', 'disabled');
      $(this).find('.save-button').addClass('disabled').attr('disabled', true);
    } else {
      $(this).find('textarea').addClass('future');
    }
  });
}

setInterval(checkTime, 60*60*1000);

console.log(workDayStart);
console.log(currentTime);

// if (currentTime < workDayStart){
//   localStorage.clear();
// }

//Check for local storage to set value to the object and clearing if currentTime is between 12am and 9am
if (localStorage.getItem('availableHours')) {
  availableHours = JSON.parse(localStorage.getItem('availableHours'));
} else {
  availableHours = {
    '9': {
      time: '9',
      value: ''
    },
    '10': {
      time: '10',
      value: ''
    },
    '11': {
      time: '11',
      value: ''
    },
    '12': {
      time: '12',
      value: ''
    },
    '13': {
      time: '13',
      value: ''
    },
    '14': {
      time: '14',
      value: ''
    },
    '15': {
      time: '15',
      value: ''
    },
    '16': {
      time: '16',
      value: ''
    },
    '17': {
      time: '17',
      value: ''
    }
  };
}

//set value of availableHours to equal the user input for each row
$('.time-block').each(function() {
  $(this).find('.text-area').val(availableHours[$(this).attr('data-time')].value);
});

//save value to local storage on click
$('.save-button').on('click', function(event){
  event.preventDefault();

  //set availableHours time attribute
  var timeValue = $(this).closest('.time-block').attr('data-time');

  //set availableHours value attribute
    var textValue = $(this).closest('.time-block').find('.text-area').val();
    availableHours[timeValue].value = textValue;

  //save user input in each object to local storage
    localStorage.setItem('availableHours', JSON.stringify(availableHours));
});
