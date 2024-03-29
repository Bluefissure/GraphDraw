'use strict';

import {nodes, edges} from "../data/data.js";



var svg = d3.select("svg"),
    margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
	.rangeRound([0, width])
	.padding(0.1);

var y = d3.scaleLinear()
	.rangeRound([height, 0]);

d3.tsv("data/degree.tsv").then(function (data) {
	x.domain(data.map(function (d) {
			return d.Degree;
		}));
	y.domain([0, d3.max(data, function (d) {
				return Number(d.Frequency);
			})]);

	g.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x))

	g.append("g")
	.call(d3.axisLeft(y))
	.append("text")
	.attr("fill", "#000")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
    .text("Frequency");
    
	g.selectAll(".bar")
	.data(data)
	.enter().append("rect")
	.attr("class", "bar")
	.attr("x", function (d) {
		return x(d.Degree);
	})
	.attr("y", function (d) {
		return y(Number(d.Frequency));
	})
	.attr("width", x.bandwidth())
	.attr("height", function (d) {
        console.log(height);
        console.log(d.Frequency);
		return height - y(Number(d.Frequency));
	});
});