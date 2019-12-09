//global variables
var scheduledHours = [];
var availableHours = {};
var m = moment();
var currentTime = moment().format('h:mm:ss a');

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
             <p class=dayHour>${moment({hour}).format('h  a')}</p>
           </div>

       <!--user input text area-->
           <div class='col-sm col-md-8 d-flex description'>
             <textarea class=text-area></textarea>
           </div>

       <!--save button-->
           <div class='col-sm col-md-2 save-button'>
            <i class='far fa-save fa-2x save-icon'></i>
           </div>`);
}

//Checking time to determine present, past, or future
$.each($('.time-block'), function(index, value) {
  let dateHour = $(value).attr('data-time');
  if (Number(dateHour) === m.hour()) {
    $(this).find('textarea').addClass('present');
  } else if (Number(dateHour) < m.hour()) {
    $(this).find('textarea').addClass('past');
  } else {
    $(this).find('textarea').addClass('future');
  }
});

//Check for local storage to set value to the object and clearing if currentTime is between 12am and 9am
if (currentTime >= '12:00:00 am' && currentTime <= '8:59:59 am'){
  localStorage.clear();
}else if (localStorage.getItem('availableHours')) {
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
    availableHours[timeValue].val = textValue;

  //save user input in each object to local storage
    localStorage.setItem('availableHours', JSON.stringify(availableHours));
});
