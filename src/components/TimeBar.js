import React, { useCallback } from 'react';
import * as d3 from 'd3';
import { useWindowDimensions } from './WindowDimensionsProvider';

// https://github.com/flrs/visavail/blob/master/visavail/js/visavail.js
const displayTimeline = (node, width, data, start, end) => {
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

const TimeBar = ({ data = [], start, end }) => {
  const { width } = useWindowDimensions();

  // Attach timeline content to node once ref is rendered
  const timelineRef = useCallback(
    node => {
      if (node !== null) {
        displayTimeline(node, width, data, start, end);
      }
    },
    [data, end, start, width]
  );

  return (
    <div id="timeline">
      <svg ref={timelineRef} />
    </div>
  );
};

export default TimeBar;
