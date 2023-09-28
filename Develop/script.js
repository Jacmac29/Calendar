// Get the current date and format it as desired (e.g., "MMMM D, YYYY")
const currentDate = dayjs().format("MMMM D, YYYY");

// Update the text content of the currentDay element
document.getElementById("currentDay").textContent = currentDate;
// Get the current hour (in 24-hour format)
const currentHour = dayjs().hour();

// Loop through each time block
document.querySelectorAll(".time-block").forEach((timeBlock) => {
  const blockHour = parseInt(timeBlock.id.split("-")[1]);

  if (blockHour < currentHour) {
    timeBlock.classList.add("past");
  } else if (blockHour == currentHour) {
    timeBlock.classList.add("present");
  } else {
    timeBlock.classList.add("future");
  }
});
// Add event listeners to the save buttons
document.querySelectorAll(".saveBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const timeBlockId = this.closest(".time-block").id;
    const eventText = this.parentElement.querySelector(".description").value;

    // Save the event to local storage using the time block's id as the key
    localStorage.setItem(timeBlockId, eventText);
  });
});
// Load saved events from local storage and populate the textareas
for (let i = 9; i <= 17; i++) {
  const timeBlockId = `hour-${i}`;
  const eventText = localStorage.getItem(timeBlockId);

  if (eventText) {
    document.getElementById(timeBlockId).querySelector(".description").value = eventText;
  }
}