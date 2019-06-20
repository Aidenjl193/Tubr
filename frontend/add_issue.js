const selectStn = document.querySelector("#select-stn");
const issueStationName = document.querySelector("#st-auto-fill");
const selectType = document.querySelector("#select-type"); /////HERE!!!
const selectDirection = document.querySelector("#select-direction");
const selectDuration = document.querySelector("#select-duration");
const issueForm = document.querySelector("#issue-form");
const issueTypes = ["Closure", "Delay", "Congestion"];
const directions = ["Northbound", "Southbound", "Eastbound", "Westbound"];
let durations = ["Less than 30 mins", "A few hours", "For Today"];
let days = ["2 days", "3 days", "4 days", "5 days", "6 days", "A week"];
durations = [...durations, ...days];
ISSUE_URL = `http://localhost:3000/issues/`;
//NOW populate the types,directions, and dutrations

addIssueBtn.addEventListener("click", () => {
  openIssueForm(event);
  detailsDiv.hidden = !detailsDiv.hidden;
});

issueForm.addEventListener("submit", () => createNewIssue());

function createNewIssue() {
  event.preventDefault();
  let form = event.target;
  //debugger;
  let newIssue = {
    direction: form[1].value,
    issue_type: form[2].value,
    duration: form[3].value,
    station_line_id: 430 // NEED to pass through StLn at the same time!
    //second_station  (MIGRATE)
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newIssue)
  };

  return fetch(ISSUE_URL, configObj).catch(errors => console.log(errors));
}

function openIssueForm(event) {
  issueStationName.innerText = `at ${event.target.dataset.station}`;
  issueFormDiv.hidden = !issueFormDiv.hidden;
  fetchAndSaveAllStations().then(() => {
    populateStationsDropdown();
    populateIssueAttributeDropdowns();
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

function populateIssueAttributeDropdowns() {
  issueTypes.forEach(type => {
    let dropDownOption = document.createElement("option");
    dropDownOption.innerText = type;
    selectType.appendChild(dropDownOption);
  });
  directions.forEach(direction => {
    let dropDownOption = document.createElement("option");
    dropDownOption.innerText = direction;
    selectDirection.appendChild(dropDownOption);
  });
  durations.forEach(type => {
    let dropDownOption = document.createElement("option");
    dropDownOption.innerText = type;
    selectDuration.appendChild(dropDownOption);
  });
}

/////////////
