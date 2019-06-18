const detailsDiv = document.querySelector("#station-detail");
const addIssueBtn = document.querySelector("#view-issue-form");
const closeDetailsBtn = document.querySelector("#close-details");
const issueFormDiv = document.querySelector("#create-issue");
const StNameLi = document.querySelector("#st-name");
const StAddressLi = document.querySelector("#st-address");
const StAccessLi = document.querySelector("#st-access");
const StTimesLi = document.querySelector("#st-times");
//temp measure...replace with dropdown menus
const issueStationName = document.querySelector("#st-auto-fill");

document.addEventListener("DOMContentLoaded", () => {
  //debugger;
});

closeDetailsBtn.addEventListener("click", () => (detailsDiv.hidden = true));

addIssueBtn.addEventListener("click", () => {
  openIssueForm(event);
  detailsDiv.hidden = !detailsDiv.hidden;
});

function openIssueForm(event) {
  //debugger;
  issueStationName.placeholder = event.target.dataset.station;
  issueFormDiv.hidden = !issueFormDiv.hidden;
}

function openStationDetails(event) {
  if (issueFormDiv.hidden == false) {
    issueFormDiv.hidden = true;
  }
  detailsDiv.hidden = false;

  let stationName = event.target.__data__.name;
  let stationAddress = event.target.__data__.address;
  let stationAccess = event.target.__data__.accessible;
  let stationTimes = event.target.__data__.open_time;
  StNameLi.innerText = stationName;
  StAddressLi.innerText = stationAddress;
  StTimesLi.innerText = stationTimes;
  StAccessLi.innerText = stationAccess;

  addIssueBtn.dataset.station = stationName;
}
