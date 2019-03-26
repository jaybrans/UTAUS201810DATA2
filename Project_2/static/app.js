// define data

//Ages 0-16 vs number of purchases
function displayblackfridaybyage(dataDictionary) {

    var dataset = [];
    var labels = [];
    for (var key in dataDictionary) {
        labels.push(dataDictionary[key]._id)
        dataset.push({
            label: dataDictionary[key]._id,
            count: dataDictionary[key].count
        })
    }

    // chart dimensions
    var width = 1200;
    var height = 800;

    // a circle chart needs a radius
    var radius = Math.min(width, height) / 2;

    // legend dimensions
    var legendRectSize = 25;
    var legendSpacing = 6;
    console.log(dataDictionary)

    var color = d3.scale.ordinal()
        .domain(labels)
        .range(["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"])



    var svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function (d) {
            return d.count;
        })
        .sort(null);

    // define tooltip
    var tooltip = d3.select('#chart')
        .append('div')
        .attr('class', 'tooltip');

    tooltip.append('div')
        .attr('class', 'label');

    tooltip.append('div')
        .attr('class', 'count');

    tooltip.append('div')
        .attr('class', 'percent');

    dataset.forEach(function (d) {
        console.log(d)
        d.count = +d.count;
        d.enabled = true;
    });

    // creating the chart
    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d) {
            return color(d.data.label);
        })
        .each(function (d) {
            this._current - d;
        });
    var svg2 = d3.select('#popup')



    console.log(svg2.text())

    path.on('mouseover', function (d) {
        tooltip.style('display', 'block');
        var total = d3.sum(dataset.map(function (d) {
            return (d.enabled) ? d.count : 0;
        }));
        var percent = Math.round(1000 * d.data.count / total) / 10;
        svg2.text("Age: " + d.data.label + " Count: " + d.data.count + " Percentage: " + percent + "%")
        svg2.style('display', 'block');
        tooltip.select('.label').html(d.data.label);
        tooltip.select('.count').html(d.data.count);
        tooltip.select('.percent').html(percent + '%');
        tooltip.style('display', 'block');
    });

    path.on('mouseout', function () {
        svg2.style('display', 'none');
    });

    path.on('mousemove', function (e, d) {
        svg2.style('top', (d3.event.layerY + 10) + 'px')
            .style('left', (d3.event.layerX + 10) + 'px');
    });

    // define legend
    var legend = svg.selectAll('.legend') // selecting elements with class 'legend'
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * 10;
            var horz = 18 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    // adding colored squares to legend
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color)
        .on('click', function (label) {
            var rect = d3.select(this);
            var enabled = true;
            var totalEnabled = d3.sum(dataset.map(function (d) {
                return (d.enabled) ? 1 : 0;
            }));

            if (rect.attr('class') === 'disabled') {
                rect.attr('class', '');
            } else {
                if (totalEnabled < 2) return;
                rect.attr('class', 'disabled');
                enabled = false;
            }

            pie.value(function (d) {
                if (d.label === label) d.enabled = enabled;
                return (d.enabled) ? d.count : 0;
            });

            path = path.data(pie(dataset));

            path.transition()
                .duration(750) // 
                .attrTween('d', function (d) {
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        return arc(interpolate(t));
                    };
                });
        });

    // adding text to legend
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
            return d;
        }); // return label
    //----------

}

function displayblackfridaybygender(dataDictionary) {

    var dataset = [];
    var labels = [];
    for (var key in dataDictionary) {
        labels.push(dataDictionary[key]._id)
        dataset.push({
            label: dataDictionary[key]._id,
            count: dataDictionary[key].count
        })
    }

    // chart dimensions
    var width = 1200;
    var height = 800;

    // a circle chart needs a radius
    var radius = Math.min(width, height) / 2;

    // legend dimensions
    var legendRectSize = 25;
    var legendSpacing = 6;
    console.log(dataDictionary)

    var color = d3.scale.ordinal()
        .domain(labels)
        .range(["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"])
    var svg = d3.select('#chartGender')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function (d) {
            return d.count;
        })
        .sort(null);

    // define tooltip
    var tooltip = d3.select('#chartGender')
        .append('div')
        .attr('class', 'tooltip');

    tooltip.append('div')
        .attr('class', 'label');

    tooltip.append('div')
        .attr('class', 'count');

    tooltip.append('div')
        .attr('class', 'percent');


    dataset.forEach(function (d) {
        console.log(d)
        d.count = +d.count;
        d.enabled = true;
    });

    // creating the chart
    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d) {
            return color(d.data.label);
        })
        .each(function (d) {
            this._current - d;
        });
    var svg2 = d3.select('#popupGender')


    console.log(svg2.text())

    path.on('mouseover', function (d) {
        tooltip.style('display', 'block');
        var total = d3.sum(dataset.map(function (d) {
            return (d.enabled) ? d.count : 0;
        }));
        var percent = Math.round(1000 * d.data.count / total) / 10;
        svg2.text("Gender: " + d.data.label + " Count: " + d.data.count + " Percentage: " + percent + "%")
        svg2.style('display', 'block');
        tooltip.select('.label').html(d.data.label);
        tooltip.select('.count').html(d.data.count);
        tooltip.select('.percent').html(percent + '%');
        tooltip.style('display', 'block');
    });

    path.on('mouseout', function () {
        svg2.style('display', 'none');
    });

    path.on('mousemove', function (e, d) {
        svg2.style('top', (d3.event.layerY + 10) + 'px')
            .style('left', (d3.event.layerX + 10) + 'px');
    });

    // define legend
    var legend = svg.selectAll('.legend') // selecting elements with class 'legend'
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * 10;
            var horz = 18 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    // adding colored squares to legend
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color)
        .on('click', function (label) {
            var rect = d3.select(this);
            var enabled = true;
            var totalEnabled = d3.sum(dataset.map(function (d) {
                return (d.enabled) ? 1 : 0;
            }));

            if (rect.attr('class') === 'disabled') {
                rect.attr('class', '');
            } else {
                if (totalEnabled < 2) return;
                rect.attr('class', 'disabled');
                enabled = false;
            }

            pie.value(function (d) {
                if (d.label === label) d.enabled = enabled;
                return (d.enabled) ? d.count : 0;
            });

            path = path.data(pie(dataset));

            path.transition()
                .duration(750)
                .attrTween('d', function (d) {
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        return arc(interpolate(t));
                    };
                });
        });

    // adding text to legend
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
            return d;
        }); // return label
    //----------

}

function displaycategoriesvspurchase(data) {
    var dataLabels = [];
    var values = []
    for (var key in data) {
        dataLabels.push(data[key]._id)
        values.push(data[key].count)

    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataLabels,
            datasets: [{
                label: '# of Purchases',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(123, 152, 255, 0.2)',
                    'rgba(255, 159, 254, 0.2)',
                    'rgba(252, 99, 132, 0.2)',
                    'rgba(154, 162, 235, 0.2)',
                    'rgba(55, 206, 86, 0.2)',
                    'rgba(175, 92, 192, 0.2)',
                    'rgba(53, 02, 255, 0.2)',
                    'rgba(55, 59, 64, 0.2)',
                    'rgba(23, 52, 255, 0.2)',
                    'rgba(55, 59, 254, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(123, 152, 255, 1)',
                    'rgba(255, 159, 254, 1)',
                    'rgba(252, 99, 132, 1)',
                    'rgba(154, 162, 235, 1)',
                    'rgba(55, 206, 86, 1)',
                    'rgba(175, 92, 192, 1)',
                    'rgba(53, 02, 255, 1)',
                    'rgba(55, 59, 64, 1)',
                    'rgba(23, 52, 255, 1)',
                    'rgba(55, 59, 254, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
var count = 0
$(document).ready(function () {

    $(window).scroll(function () {

        var position = $(window).scrollTop();
        var bottom = $(document).height() - $(window).height();
        console.log(position)
        console.log(bottom)
        if (count == 0) {
            d3.json("/blackfridaypurchases/groupby?choice=Age").then(function (data) {
                displayblackfridaybyage(data);
            })
            count++
        }

        if (position >= bottom * .9) {

            if (count == 0) {

            } else if (count == 1) {
                d3.json("/blackfridaypurchases/groupby?choice=Gender").then(function (data) {
                    displayblackfridaybygender(data);
                })
            } else if (count == 2) {
                d3.json("/blackfridaypurchases/groupby?choice=Product_Category_1").then(function (data) {
                    displaycategoriesvspurchase(data);
                })
            } else {

            }
            count++
        }

    });

});