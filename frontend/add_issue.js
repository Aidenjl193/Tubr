const selectStn = document.querySelector("#select-stn");
const issueStationName = document.querySelector("#st-auto-fill");
const selectType = document.querySelector("#select-type"); /////HERE!!!
const selectDirection = document.querySelector("#select-direction");
const selectDuration = document.querySelector("#select-duration");
const selectLine = document.querySelector("#select-line");
const issueForm = document.querySelector("#issue-form");
const issueTypes = ["Closure", "Delay", "Congestion"];
const directions = ["Northbound", "Southbound", "Eastbound", "Westbound"];
let durations = ["Less than 30 mins", "A few hours", "For Today"];
let days = ["2 days", "3 days", "4 days", "5 days", "6 days", "A week"];
durations = [...durations, ...days];
ISSUE_URL = `http://localhost:3000/issues/`;
//NOW populate the types,directions, and dutrations

let filteredStations = [];

addIssueBtn.addEventListener("click", () => {
  openIssueForm(event);
  detailsDiv.hidden = !detailsDiv.hidden;
});

issueForm.addEventListener("submit", () => {
  issueFormDiv.hidden = true;
  createNewIssue();
});

function createNewIssue() {
  //event.target.__data__.has_issues = true;
  //add the line id and the station id to the params and calculate the Line
  // station on the backend
  event.preventDefault();
  let form = event.target;
  let lineId = form[0].dataset.line_id;
  let stationId = form[6].dataset.station_id;

  let newIssue = {
    second_station_line_id: form[1].value,
    direction: form[2].value,
    issue_type: form[3].value,
    duration: form[4].value,
    line_id: lineId,
    station_id: stationId // NEED to pass through StLn at the same time!
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newIssue)
  };

  return fetch(ISSUE_URL, configObj).then(() =>
    currentCircle.setAttribute("stroke", "red")
  );
}

function openIssueForm(event) {
  issueStationName.innerText = `at ${event.target.dataset.station}`;
  issueFormDiv.hidden = !issueFormDiv.hidden;
  //add a hidden input element to the form and give it a dataset
  // with the station id from event.target
  let hiddenInput = document.createElement("input");
  hiddenInput.hidden = true;
  hiddenInput.dataset.station_id = event.target.dataset.station_id;

  issueForm.appendChild(hiddenInput);
  //fetchAndSaveAllStations().then(() => {
  populateStationsDropdown();
  populateIssueAttributeDropdowns();
  populateLinesDropdown();
  // );
}

function populateLinesDropdown() {
  allLines.forEach(line => {
    let lineOption = document.createElement("option");
    lineOption.innerText = line.name;
    lineOption.style = `color:${line.color}`;
    lineOption.dataset.line_id = line.id;
    //debugger;
    selectLine.appendChild(lineOption);
    // selectLine.style = `color:${line.color}`;
    selectLine.addEventListener("change", () => {
      if (selectLine.value == "default") {
        selectLine.style = `background-color: white`;
      } else {
        selectLine.style = `background-color:${line.color}`;
        selectLine.dataset.line_id = line.id;
        filteredStations = [...allStations];
        // filterStationsByLine(filteredStations, selectLine);
      }
    });
  });
}

// not in use. Work in progress!
function filterStationsByLine(filteredStations, selectLine) {
  filteredStations = filteredStations.filter(station => {
    return station.name.length > 10;
  });
}

function populateStationsDropdown() {
  allStations.sort((a, b) => (a.name > b.name ? 1 : -1));
  allStations.forEach(station => {
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
