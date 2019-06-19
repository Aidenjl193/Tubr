const detailsDiv = document.querySelector("#station-detail");
const addIssueBtn = document.querySelector("#view-issue-form");
const closeDetailsBtn = document.querySelector("#close-details");
const issueFormDiv = document.querySelector("#create-issue");
const issueListDiv = document.querySelector("#issues-div");
const issueList = document.createElement("ol");
const StNameLi = document.querySelector("#st-name");
const StAddressLi = document.querySelector("#st-address");
const StAccessLi = document.querySelector("#st-access");
const StTimesLi = document.querySelector("#st-times");
//temp measure...replace with dropdown menus
const issueStationName = document.querySelector("#st-auto-fill");
const STATIONS_URL = "http://localhost:3000/stations/";

// TO BE REPLACED BY Aiden
let stations = [];
let stnNames = [];
let selectStn = document.querySelector("#select-stn");

document.addEventListener("DOMContentLoaded", () => {});

closeDetailsBtn.addEventListener("click", () => (detailsDiv.hidden = true));

addIssueBtn.addEventListener("click", () => {
  openIssueForm(event);
  detailsDiv.hidden = !detailsDiv.hidden;
});

function fetchAndSaveAllStations() {
  return fetch(STATIONS_URL)
    .then(resp => resp.json())
    .then(statns => {
      console.log(statns);
      stations = [...statns]; // to "shallow" copy
      stations.sort((a, b) => (a.name > b.name ? 1 : -1));

      //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    });
}

function populateStationsDropdown() {
  stations.forEach(station => {
    //stnNames.push(station.name);
    let stationOption = document.createElement("option");
    stationOption.innerText = station.name;
    selectStn.appendChild(stationOption);
  });
}

function openIssueForm(event) {
  issueStationName.innerText = `at ${event.target.dataset.station}`;
  issueFormDiv.hidden = !issueFormDiv.hidden;
  fetchAndSaveAllStations().then(() => {
    populateStationsDropdown();
  });
}

function openStationDetails(event) {
  if (issueFormDiv.hidden == false) {
    issueFormDiv.hidden = true;
  }
  detailsDiv.hidden = false;
  //debugger;
  let stationName = event.target.parentElement.__data__.name;
  let stationAddress = event.target.parentElement.__data__.address;
  let stationAccess = event.target.parentElement.__data__.accessible;
  let stationTimes = event.target.parentElement.__data__.open_time;
  let stationId = event.target.parentElement.__data__.id;
  // fetch and display the issues for this station if they exist (CONTROLLER!)

  fetchStationDetails(stationId);
  StNameLi.innerText = stationName;
  StAddressLi.innerText = stationAddress;
  StTimesLi.innerText = stationTimes;
  StAccessLi.innerText = stationAccess;

  addIssueBtn.dataset.station = stationName;
}

function fetchStationDetails(stationId) {
  return fetch(STATIONS_URL + stationId)
    .then(resp => resp.json())
    .then(statn => {
      console.log(statn);
      addStationIssuesToDetails(statn);
    });
}

function addStationIssuesToDetails(statn) {
  issueList.innerHTML = "";

  issueListDiv.innerHTML = "";
  statn.issues.length > 0
    ? (issueListDiv.innerHTML += `<h4>Issues:</h4>`)
    : (issueListDiv.innerHTML += `<h3>No Current Issues</h3>`);

  statn.issues.forEach(issue => {
    console.log("one time");
    let issueLi = document.createElement("li");
    let issueAttList = document.createElement("ul");
    let issueAttributes = [
      `Type: ${issue.issue_type}`,
      `Duration: ${issue.duration}`,
      `Direction: ${issue.direction}`
    ];
    issueAttributes.forEach(att => {
      console.log(att);
      let attLi = document.createElement("li");
      attLi.innerText = att;
      issueAttList.appendChild(attLi);
    });
    issueLi.appendChild(issueAttList);
    issueList.appendChild(issueLi);
  });

  issueListDiv.appendChild(issueList);
}
