import React, { useCallback } from 'react';
import { select as d3Select } from 'd3-selection';
import { scaleTime } from 'd3-scale';

// Sizing constants for timeline chart
const axisHeaderHeight = 32;
const spacing = 2;
const height = 40;
const barWidth = 10;
const barY = (height - barWidth) / 2;

// https://github.com/flrs/visavail/blob/master/visavail/js/visavail.js
const displayTimeline = (node, margins, width, data, start, end, position) => {
  const top = axisHeaderHeight + position * height + position * spacing;

  // Remove existing data on resize
  d3Select(node)
    .selectAll('*')
    .remove();

  // Define X (time) Scale
  var xScale = scaleTime()
    .domain([start, end])
    .range([0, width]);

  // Add canvas
  const svg = d3Select(node)
    .attr('width', width)
    .attr('height', 120); // FIXME: no magic numbers

  // add timline data series
  const g = svg
    .append('g')
    .attr('transform', `translate(0,${top})`)
    .attr('id', 'timeline-data');

  // Bar background (rectangle)
  // g.append('rect')
  //   .attr('x', 0)
  //   .attr('y', 0)
  //   .attr('width', width)
  //   .attr('height', height)
  //   .attr('fill', '#f6f6f6')
  //   .attr('class', 'bar-bg')
  //   .attr('style', 'opacity: 0.8');

  // Data-driven bars
  g.selectAll('rect:not(.bar-bg)')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.on))
    .attr('y', barY)
    .attr('width', d => xScale(d.off || end) - xScale(d.on))
    .attr('height', barWidth)
    // .attr('height', height)
    .attr('fill', '#7E0958');
};

const TimeBar = ({ margins, width, data = [], start, end, position }) => {
  // Attach timeline content to node once ref is rendered
  const timelineRef = useCallback(
    node => {
      if (node !== null) {
        displayTimeline(node, margins, width, data, start, end, position);
      }
    },
    [margins, data, end, start, width, position]
  );

  return <svg ref={timelineRef} />;
};

export default TimeBar;
