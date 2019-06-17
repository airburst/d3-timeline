import React from 'react';
import Axis from './Axis';
import * as d3 from 'd3';

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions;

  const xProps = {
    orient: 'Top',
    scale: scales.xScale,
    translate: `translate(0, ${margins.top})`,
    tickSize: height - margins.top - margins.bottom,
    tickFormat: date => d3.timeFormat('%I %p')
  };

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right
  };

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  );
};
