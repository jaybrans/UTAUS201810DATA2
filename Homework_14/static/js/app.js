// from data.js
var tableData = data

var tbody = document.getElementById("databody")
var search = document.getElementById("filter-btn")
var dateinput = document.getElementById("datetime")
console.log(tableData.length)


function showData() {
    for (var i = 0; i < tableData.length; i++) {
        var sighting = tableData[i]
        var fields = Object.keys(sighting)
        var row = tbody.insertRow(i)
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j]
            var cell = row.insertCell(j)
            cell.innerText = sighting[field]
            console.log(sighting[field])
        }
    }
}

function handleSearch() {

    var dateToFilterBy = dateinput.value.trim()
    if (dateToFilterBy.length > 0) {
        tableData = data.filter(function (sighting) {
            return sighting.datetime == dateToFilterBy
        })
        showData()
    }



}


search.onclick = handleSearch()


showData()


// YOUR CODE HERE!