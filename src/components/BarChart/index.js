import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import D3BarChart from './D3BarChart';
import useResizeObserver from '../useResizeObserver';

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

let vis;

const BarChart = ({ data }) => {
  const [chartRef, width, height] = useResizeObserver();

  const initVis = () => {
    if (data && data.length) {
      const d3Props = {
        data,
        width,
        height
      };
      vis = new D3BarChart(chartRef.current, d3Props);
    }
  };

  const updateVisOnResize = () => {
    vis && vis.resize(width, height);
  };

  useEffect(initVis, [data]);
  useEffect(updateVisOnResize, [width, height]);

  return <ChartContainer ref={chartRef} />;
};

export default memo(BarChart);
