import React from 'react';
import PropTypes from 'prop-types';
import Axis from './Axis';
import * as d3Time from 'd3-time';
import * as d3TimeFormat from 'd3-time-format';

const Axes = ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions;

  return (
    <g>
      <Axis
        orient="Top"
        scale={scales.xScale}
        translate={`translate(0, ${margins.top})`}
        tickSize={height - margins.top - margins.bottom}
        tickFormat={d3TimeFormat.timeFormat('%H:%M')}
        ticks={d3Time.timeHour.every(1)}
      />
      <Axis
        orient="Left"
        scale={scales.yScale}
        translate={`translate(${margins.left}, 0)`}
        tickSize={width - margins.left - margins.right}
      />
    </g>
  );
};

Axes.propTypes = {
  scales: PropTypes.object.isRequired,
  margins: PropTypes.object.isRequired,
  svgDimensions: PropTypes.object.isRequired
};

export default Axes;
