const detailsDiv = document.querySelector("#station_detail");

document.addEventListener("click", () => {
  openIssueForm();
});

function openIssueForm() {
  //debugger;
  detailsDiv.hidden = !detailsDiv.hidden;
}
