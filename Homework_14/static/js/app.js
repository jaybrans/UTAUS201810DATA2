// from data.js
var tableData = data

var tbody = document.getElementById("databody")
var submit = d3.select("#filter-btn")
var dateInput = d3.select("#datetimetest")
var actualDate = ""

submit.on("click", handleSearch)

// dateInput.on("change", function () {
//     console.log("here")
//     var newText = d3.event.target.value;
//     console.log(newText);
//     dateInput.setAttribute("value", newText)
// });



function showData() {
    tbody.innerHTML = ""
    for (var i = 0; i < tableData.length; i++) {
        var sighting = tableData[i]
        var fields = Object.keys(sighting)
        var row = tbody.insertRow(i)
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j]
            var cell = row.insertCell(j)
            cell.innerText = sighting[field]
        }
    }
}

function handleSearch() {
    d3.event.preventDefault();
    dateInput = d3.select("#datetimetest")
    dateInputValue = dateInput.property("value")
    console.log(dateInputValue)
    console.log(dateInputValue.length)


    if (dateInputValue.length > 0) {
        tableData = data.filter(function (sighting) {
            return sighting.datetime === dateInputValue
        })
        showData()
    }
    console.log(tableData.length)


}

showData()





// YOUR CODE HERE!