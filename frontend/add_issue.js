let selectStn = document.querySelector("#select-stn");
const issueStationName = document.querySelector;

addIssueBtn.addEventListener("click", () => {
  openIssueForm(event);
  detailsDiv.hidden = !detailsDiv.hidden;
});
////
function openIssueForm(event) {
  issueStationName.innerText = `at ${event.target.dataset.station}`;
  issueFormDiv.hidden = !issueFormDiv.hidden;
  fetchAndSaveAllStations().then(() => {
    populateStationsDropdown();
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
/////////////
