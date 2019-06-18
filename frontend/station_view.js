const detailsDiv = document.querySelector("#station-detail");
const addIssueBtn = document.querySelector("#view-issue-form");
const issueFormDiv = document.querySelector("#create-issue");
let stationCircles = document.querySelectorAll("circle"); // grab all station circles
//debugger;

document.addEventListener("DOMContentLoaded", () => {
  //debugger;
});

// circles.addEventListener("load", () => {
//   console.log("SVG loaded.");
// });

//addListenersToCircles(circles);
// TO REMOVE
// document.addEventListener("click", () => {
//   openStationDetails();
// });

addIssueBtn.addEventListener("click", () => {
  openIssueForm();
  detailsDiv.hidden = !detailsDiv.hidden;
});

function openIssueForm() {
  issueFormDiv.hidden = !issueFormDiv.hidden;
}

function openStationDetails() {
  //debugger;
  detailsDiv.hidden = !detailsDiv.hidden;
}
