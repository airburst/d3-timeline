import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import './Axis.css';

const renderAxis = (node, orient, scale, tickSize, ticks, tickFormat) => {
  const axisType = `axis${orient}`;
  const axis = d3Axis[axisType]()
    .scale(scale)
    .tickSize(-tickSize)
    .tickPadding([12])
    .tickFormat(tickFormat)
    .ticks(ticks);

  d3Select(node).call(axis);

  // Remove first tick
  d3Select('.Axis-Top > g:nth-child(2) > text').remove();
  // Remove top line
  d3Select('.Axis-Top .domain').remove();
};

const Axis = ({ orient, translate, scale, tickSize, ticks, tickFormat }) => {
  // Attach timeline content to node once ref is rendered
  const axisRef = useCallback(
    node => {
      if (node !== null) {
        renderAxis(node, orient, scale, tickSize, ticks, tickFormat);
      }
    },
    [orient, scale, tickFormat, tickSize, ticks]
  );

  return (
    <g className={`Axis Axis-${orient}`} ref={axisRef} transform={translate} />
  );
};

Axis.propTypes = {
  orient: PropTypes.string.isRequired,
  translate: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  tickSize: PropTypes.number.isRequired,
  ticks: PropTypes.func,
  tickFormat: PropTypes.func
};

export default Axis;
