import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import D3Timeline from './D3Timeline';
import useResizeObserver from '../useResizeObserver';

// TODO: Move to constants
const DEFAULT_MARGINS = { top: 10, left: 32, bottom: 24, right: 0 };
// Sizing constants for timeline chart
const headerHeight = 32;
// const labelWidth = 200;
// const barHeight = 10;
const rowHeight = 40;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

let vis;

const TimelineChart = ({ data, margins = DEFAULT_MARGINS, start, end }) => {
  const [chartRef, width, height] = useResizeObserver();
  const chartHeight =
    data && data.length ? data.length * rowHeight + headerHeight : height;

  const initVis = () => {
    if (data && data.length) {
      // Calculate the height needed by chart
      const d3Props = {
        data,
        width,
        height: chartHeight,
        margins,
        start,
        end
      };
      vis = new D3Timeline(chartRef.current, d3Props);
    }
  };

  const updateVisOnResize = () => {
    vis && vis.resize(width, chartHeight, margins, start, end);
  };

  useEffect(initVis, [data]);
  useEffect(updateVisOnResize, [width, chartHeight, margins, start, end]);

  return <ChartContainer ref={chartRef} />;
};

export default memo(TimelineChart);
