'use strict';


import {nodes, edges} from "../data/meta_data.js";

function get_vertex_color(d){
    return d.cut == 1? "red":colorScale(d.color);
}
function get_edge_color(e, i){
    return "black";
}
let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    marge = {top:60,bottom:60,left:60,right:60};
let g = svg.append("g")
        .attr("transform","translate("+marge.top+","+marge.left+")");
// console.log(d3);

var colorScale = d3.scaleOrdinal()
            .range(d3.schemePaired);
            
var forceSimulation = d3.forceSimulation()
    		.force("link",d3.forceLink().id(function(d) { return d.id;}))
    		.force("charge",d3.forceManyBody())
            .force("center",d3.forceCenter());

forceSimulation.nodes(nodes)
            .on("tick", ticked);
forceSimulation.force("link")
    		.links(edges)
    		.distance(function(d){
    			return d.value*100;
            });
forceSimulation.force("center")
    		.x(width*0.5)
            .y(height*0.5);

var self_cycle = [];
var links = g.append("g")
    		.selectAll("line")
    		.data(edges)
    		.enter()
    		.append("line")
    		.attr("stroke",function(d,i){
    			return get_edge_color(d, i);
            })
            .attr("stroke-width",1);
edges.forEach(function(edge){
    var s = edge.source,
        t = edge.target;
    if(s != null && s == t){
        self_cycle.push([s, t]);
    }
});
var selfLinks = g.append("g")
    .selectAll("line")
    .data(self_cycle)
    .enter().append("path")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");
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
    		.attr("r",function(d){
                return d.cut == 1? 5 : 10;
            })
    		.attr("fill", function(d, i){
                return get_vertex_color(d);
            })
gs.append("text")
    		.attr("x",-10)
    		.attr("y",-20)
    		.attr("dy",10)
    		.text(function(d){
    			return d.id;
            })
function self_cycle_path(s, t){
    var x1 = s.x,
        y1 = s.y,
        x2 = t.x,
        y2 = t.y,
        dx = x2 - x1,
        dy = y2 - y1,
        dr = Math.sqrt(dx * dx + dy * dy),

        // Defaults for normal edge.
        drx = dr,
        dry = dr,
        xRotation = 0, // degrees
        largeArc = 0, // 1 or 0
        sweep = 1; // 1 or 0

        // Self edge.
        if ( x1 === x2 && y1 === y2 ) {
            // Fiddle with this angle to get loop oriented.
            xRotation = -45;

            // Needs to be 1.
            largeArc = 1;

            // Change sweep to change orientation of loop. 
            //sweep = 0;

            // Make drx and dry different to get an ellipse
            // instead of a circle.
            drx = 10;
            dry = 20;

            // For whatever reason the arc collapses to a point if the beginning
            // and ending points of the arc are the same, so kludge it.
            x2 = x2 - 1;
            y2 = y2 + 1;
        } 

    return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;

}
function ticked(){
    links
        .attr("x1",function(d){return d.source.x;})
        .attr("y1",function(d){return d.source.y;})
        .attr("x2",function(d){return d.target.x;})
        .attr("y2",function(d){return d.target.y;});
    selfLinks.attr("d", function(d){
        return self_cycle_path(d[0], d[1]);
    })
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
