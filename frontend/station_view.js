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
("#st-auto-fill");
const STATIONS_URL = "http://localhost:3000/stations/";

// TO BE REPLACED BY Aiden
//let stations = [];
let stnNames = [];

closeDetailsBtn.addEventListener("click", () => (detailsDiv.hidden = true));

// function call for this at bottom of index.js
function openStationDetails(event) {
  if (issueFormDiv.hidden == false) {
    issueFormDiv.hidden = true;
  }
  detailsDiv.hidden = false;

  let stationName = event.target.parentElement.__data__.name;
  let stationAddress = event.target.parentElement.__data__.address;
  let stationAccess = event.target.parentElement.__data__.accessible;
  let stationTimes = event.target.parentElement.__data__.open_time;
  let stationId = event.target.parentElement.__data__.id;
  // fetch and display the issues for this station if they exist (CONTROLLER!)

  fetchStationDetails(stationId);
  StNameLi.innerText = `${stationName}`;
  StAddressLi.innerText = `Address: ${stationAddress}`;
  StTimesLi.innerText = `Hours:${stationTimes}`;
  StAccessLi.innerText = `Accessible: ${stationAccess}`;

  addIssueBtn.dataset.station = stationName;
  addIssueBtn.dataset.station_id = stationId;
}

//fetches all stations, sorts alpha, and saves to globally available variable
// function fetchAndSaveAllStations() {
//   return fetch(STATIONS_URL)
//     .then(resp => resp.json())
//     .then(statns => {
//       stations = [...statns]; // to "shallow" copy
//       // I want to filter this so only the relevent line's stations appear
//       // stations = stations.filter(station => {
//       //   return fetchStationDetails(station.id)
//       // });
//       // console.log(stations);
//       stations.sort((a, b) => (a.name > b.name ? 1 : -1));

//       //const result = words.filter(word => word.length > 6);
//       //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
//     });
// }

// fetches an individual station so it's issues can be displayed
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
    let issueLi = document.createElement("li");
    let issueAttList = document.createElement("ul");
    let secondStation = issue.second_station_line_id;
    let issueAttributes = [
      `Type: ${issue.issue_type}`,
      `Duration: ${issue.duration}`,
      `Direction: ${issue.direction}`,
      `Ending Station: ${secondStation ? secondStation : "Single Station!"}`
    ];

    issueAttributes.forEach(att => {
      let attLi = document.createElement("li");
      attLi.innerText = att;
      issueAttList.appendChild(attLi);
    });

    issueLi.appendChild(issueAttList);
    issueList.appendChild(issueLi);
  });
  issueListDiv.appendChild(issueList);
}
