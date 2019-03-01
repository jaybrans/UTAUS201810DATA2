function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`

  // Use `.html("") to clear any existing metadata

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  var url = `/metadata/${sample}`;
  d3.json(url).then(function (data) {
    var section = document.getElementById("sample-metadata");
    section.innerHTML = "";
    for (var key in data) {
      console.log(key)
      console.log(data[key])
      element = document.createElement("h5");
      element.textContent = `${key}: ${data[key]}`;
      section.appendChild(element);
    }
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  })
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function (data) {

    // @TODO: Build a Bubble Chart using the sample data
    var bubbleChartData = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: 'markers',
      marker: {
        color: data.otu_ids,
        size: data.sample_values
      }
    };
    var bubbleChartLayout = {
      xaxis: {
        title: "OTU ID"
      }
    }
    Plotly.newPlot('bubble', [bubbleChartData], bubbleChartLayout);


    // @TODO: Build a Pie Chart
    //Change this ti change the top X amount, makes sense!
    //this is cool! :)
    var topCount = 10
    // Use sample_values as the values for the PIE chart
    var dataValues = data.sample_values.slice(0, topCount);
    // Use otu_ids as the labels for the pie chart
    var dataIds = data.otu_ids.slice(0, topCount);
    //Use otu_labels as the hovertext for the chart
    var dataLabels = data.otu_labels.slice(0, topCount);
    var pieChartData = [{
      values: dataValues,
      labels: dataIds,
      hovertext: dataLabels,
      type: 'pie'
    }];
    Plotly.newPlot('pie', pieChartData);

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();