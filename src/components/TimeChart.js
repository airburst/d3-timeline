import React from 'react';
import * as d3 from 'd3';
import TimeBar from './TimeBar';

const startDate = new Date(2019, 6, 16, 0, 0, 0).getTime();
const endDate = new Date(2019, 6, 16, 23, 59, 59).getTime();

const displayGrid = (node, width, data, start, end) => {
  const containerPadding = 64;
  const height = 40;

  // Remove existing data on resize
  d3.select(node)
    .selectAll('*')
    .remove();

  // define scales
  var xScale = d3
    .scaleLinear()
    .domain([start, end])
    .range([0, width]);
  // .clamp(1);

  // Add canvas
  const svg = d3
    .select(node)
    .attr('width', width - containerPadding)
    .attr('height', height)
    .style('background-color', '#f6f6f6');

  // add timline data series
  svg
    .append('g')
    .attr('id', 'timeline-data')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.on))
    .attr('y', 0)
    .attr('width', d => xScale(d.off || end) - xScale(d.on))
    .attr('height', height)
    .attr('fill', '#0086B1');
};

// TODO: Add chart axes and device line labels
const TimeChart = ({ data }) => {
  return (
    <div>
      {data.map(td => (
        <TimeBar
          key={td.deviceId}
          data={td.data}
          start={startDate}
          end={endDate}
        />
      ))}
    </div>
  );
};

export default TimeChart;
