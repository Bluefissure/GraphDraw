'use strict';


import {nodes, edges} from "../data/data.js";

let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    marge = {top:60,bottom:60,left:60,right:60};
let g = svg.append("g")
        .attr("transform","translate("+marge.top+","+marge.left+")");
// console.log(d3);


var colorScale = d3.scaleOrdinal()
    		.domain(d3.range(nodes.length))
            .range(d3.schemeCategory10);
            
var forceSimulation = d3.forceSimulation()
    		.force("link",d3.forceLink().id(function(d) { return d.id;}))
    		.force("charge",d3.forceManyBody())
            .force("center",d3.forceCenter());

forceSimulation.nodes(nodes)
            .on("tick",ticked);
forceSimulation.force("link")
    		.links(edges)
    		.distance(function(d){
    			return d.value*100;
            });
forceSimulation.force("center")
    		.x(width*0.5)
            .y(height*0.5);
var links = g.append("g")
    		.selectAll("line")
    		.data(edges)
    		.enter()
    		.append("line")
    		.attr("stroke",function(d,i){
    			return "black";
    		})
            .attr("stroke-width",1);
var linksText = g.append("g")
    		.selectAll("text")
    		.data(edges)
    		.enter()
    		.append("text")
    		.text(function(d){
    			return d.relation;
            });
var gs = g.selectAll(".circleText")
    		.data(nodes)
    		.enter()
    		.append("g")
    		.attr("transform",function(d,i){
    			var cirX = d.x;
    			var cirY = d.y;
    			return "translate("+cirX+","+cirY+")";
            })
    		.call(d3.drag()
    			.on("start",started)
    			.on("drag",dragged)
    			.on("end",ended)
            );
gs.append("circle")
    		.attr("r",5)
    		.attr("fill", 0)
gs.append("text")
    		.attr("x",-10)
    		.attr("y",-20)
    		.attr("dy",10)
    		.text(function(d){
    			return d.id;
            })
function ticked(){
    links
        .attr("x1",function(d){return d.source.x;})
        .attr("y1",function(d){return d.source.y;})
        .attr("x2",function(d){return d.target.x;})
        .attr("y2",function(d){return d.target.y;});
        
    linksText
        .attr("x",function(d){
        return (d.source.x+d.target.x)/2;
    })
    .attr("y",function(d){
        return (d.source.y+d.target.y)/2;
    });
        
    gs.attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}
function started(d){
    if(!d3.event.active){
        forceSimulation.alphaTarget(0.8).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(d){
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
function ended(d){
    if(!d3.event.active){
        forceSimulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
}