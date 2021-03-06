var width = 1000

var height = 700;

var margin = 20;

var labelArea = 110;

var tPadBottom = 20;
var tPadLeft = 40;


var svg = d3.select("#scatter").append("svg").attr("width", width).attr("height", height).attr("class", "chart");
var circleRadius = 3;

svg.append("g").attr("class", "xGroup")

var xGroup = d3.select(".xGroup")
svg.append("g").attr("class", "yGroup")

var yGroup = d3.select(".yGroup")

xGroup.append("text").attr("y", -26).attr("data-name", "User_ID").attr("data-axis", "x").attr("class", "aText active x").text("User_ID")
yGroup.append("text").attr("x", 0).attr("data-name", "Product_Category_1").attr("data-axis", "y").attr("class", "aText inactive y").text("Product_Category_1")
yGroup.append("text").attr("y", -26).attr("data-name", "Occupation").attr("data-axis", "y").attr("class", "aText inactive y").text("Occupation")
yGroup.append("text").attr("y", 26).attr("data-name", "Purchase").attr("data-axis", "y").attr("class", "aText inactive y").text("Purchase")

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;


function refresh() {
    xGroup.attr("transform", "translate(" + ((width - labelArea) / 2 + labelArea) +
        ", " + (height - margin - tPadBottom) + ")")
    yGroup.attr("transform", "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)")
}

refresh()

function display(data) {
    var currentX = "User_ID";
    var currentY = "Purchase";

    var minX, maxX, minY, maxY;
    var tip =
        d3
        .tip()
        .attr("class", "d3-tip")
        .offset([40, -60])
        .html(function (d) {
            var keyX = "";
            var currentState = "<div>Metadata </div>";
            var keyY = "<div>" + currentY + ": " + d[currentY] + " </div>";
            //if (currentX === "Purchase") {
            keyX = "<div>" + currentX + ": " + d[currentX] + "</div>";
            // } else {
            //     keyX = "<div>" + currentX + ": " + parseFloat(d[currentX]) + "</div>";
            // }
            var gender = "<div> Gender : " + d.Gender + "</div>"
            var age = "<div> Age : " + d.Age + "</div>"
            var marital = "<div> Marital Status : " + d.Marital_Status + "</div>"
            var productId = "<div> Product : " + d.Product_ID + "</div>"
            return currentState + keyX + keyY + gender + age + marital
        });

    svg.call(tip)

    function toggleMinMaxX() {
        minX = d3.min(data, function (d) {
            return parseFloat(d[currentX])
        })
        maxX = d3.max(data, function (d) {
            return parseFloat(d[currentX])
        })
    }

    function toggleMinMaxY() {
        minY = d3.min(data, function (d) {
            return parseFloat(d[currentY])
        })
        console.log(minY)
        maxY = d3.max(data, function (d) {
            return parseFloat(d[currentY])
        })
        console.log(maxY)
    }

    function labelChange(axis, clickedText) {
        d3.selectAll(".aText").filter("." + axis).filter(".active").classed("active", false).classed("inactive", true);
        clickedText.classed("inactive", false).classed("active", true);
    }
    toggleMinMaxX()
    toggleMinMaxY()

    var xScale = d3.scaleLinear().domain([minX, maxX]).range([margin + labelArea, width - margin])
    var yScale = d3.scaleLinear().domain([minY, maxY]).range([height - margin - labelArea, margin])

    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    xAxis.ticks(10)
    yAxis.ticks(10)

    svg.append("g").call(xAxis).attr("class", "xAxis").attr("transform", "translate(0," + (height - margin - labelArea) + ")");
    svg.append("g").call(yAxis).attr("class", "yAxis").attr("transform", "translate(" + (margin + labelArea) + ", 0)");

    var theCircles = svg.selectAll("g theCircles").data(data).enter()
    console.log(theCircles)

    theCircles.append("circle")
        .attr("cx", function (d) {
            return xScale([d[currentX]])
        })
        .attr("cy", function (d) {
            return xScale([d[currentY]])
        })
        .attr("r", circleRadius)
        .attr("class", function (d) {
            return "stateCircle " + d.abbr
        })
        .on("mouseover", function (d) {
            tip.show(d, this)
            //d3.select(this).style("stroke", "#323232")
        })
        .on("mouseout", function (d) {
            tip.hide(d)
            //d3.select(this).style("stroke", "#e3e3e3")
        })
        .on("click", function (d) {
            console.log(d)
            var data2 = theCircles.selectAll('circle')
            console.log(theCircles)
            console.log(data2)
            data2.style("stroke ", "#e3e3e3")
            console.log(circles)

        })

    theCircles.append("text").text(function (d) {
            return d.abbr
        })
        .attr("dx", function (d) {
            return xScale(d[currentX])
        })
        .attr("dy", function (d) {
            return yScale(d[currentY]) + circleRadius / 2.5
        })
        .attr("font-size", 12)
        .attr("class", "stateText")
        .on("mouseover", function (d) {
            tip.show(d, this)
            d3.select("." + d.abbr).style("stroke", "#e3e3e3");
        })
        .on("mouseout", function (d) {
            tip.hide(d)
            d3.select("." + d.abbr).style("stroke ", "#e3e3e3");
        })

    d3.selectAll(".aText").on("click", function () {
        var ourText = d3.select(this);
        if (ourText.classed("inactive")) {
            var axis = ourText.attr("data-axis");
            var name = ourText.attr("data-name");
            if (axis === "x") {
                currentX = name;
                toggleMinMaxX();
                xScale.domain([minX, maxX]);
                svg.select(".xAxis").transition().duration(200).call(xAxis);
                d3.selectAll("circle").each(function () {
                    d3.select(this).transition().attr("cx", function (d) {
                        return xScale(d[currentX]);
                    }).duration(200);
                });
                d3.selectAll(".stateText").each(function () {
                    d3.select(this).transition().attr("dx", function (d) {
                        return xScale(d[currentX]);
                    }).duration(200);
                });
                labelChange(axis, ourText);
            } else {
                currentY = name;
                toggleMinMaxY()
                yScale.domain([minY, maxY]);
                svg.select(".yAxis").transition().duration(200).call(yAxis);
                d3.selectAll("circle").each(function () {
                    d3.select(this).transition().attr("cy", function (d) {
                        return yScale(d[currentY]);
                    }).duration(200);
                });
                d3.selectAll(".stateText").each(function () {
                    d3.select(this).transition().attr("dy", function (d) {
                        return yScale(d[currentY]) + circleRadius / 3;
                    }).duration(200);
                });
                labelChange(axis, ourText);
            }
        }
    });
}

//Import our data!
d3.json("http://localhost:5000/blackfridaypurchases/").then(function (data) {
    console.log(data)
    display(data);
})