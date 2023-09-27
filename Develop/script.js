

$(document).ready(function () {
  // Display the current day at the top of the calendar
  var currentDayEl = $("#currentDay");
  currentDayEl.text(dayjs().format("dddd, MMMM D, YYYY"));

  // Generate time blocks for standard business hours
  var container = $(".container-fluid");
  var currentTime = dayjs().hour();

  for (var hour = 9; hour <= 17; hour++) {
    var timeBlockEl = $("<div>")
      .addClass("row time-block")
      .attr("id", "hour-" + hour);

    var hourEl = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(dayjs({ hour }).format("hA"));

    var descriptionEl = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3");

    var saveBtnEl = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);
    container.append(timeBlockEl);

    // Color code time blocks based on the current time
    if (hour < currentTime) {
      timeBlockEl.addClass("past");
    } else if (hour === currentTime) {
      timeBlockEl.addClass("present");
    } else {
      timeBlockEl.addClass("future");
    }
  }

  // Event listener for save buttons
  $(".saveBtn").on("click", function () {
    var eventText = $(this).siblings(".description").val();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, eventText);
  });

  // Load saved events from local storage
  for (var hour = 9; hour <= 17; hour++) {
    var savedEvent = localStorage.getItem("hour-" + hour);
    if (savedEvent) {
      $("#hour-" + hour + " .description").val(savedEvent);
    }
  }
});