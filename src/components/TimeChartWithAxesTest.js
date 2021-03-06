import React, { memo } from 'react';
import styled from 'styled-components';
import Axes from './Axes';
import { scaleBand, scaleTime } from 'd3-scale';
import useResizeObserver from 'use-resize-observer';
import TimeBar from './TimeBar';

const Container = styled.div`
  border-top: 1px solid #e2e2e2;
  width: 1440px;
  height: 400px;
  margin: 100px auto;
`;

const startDate = new Date(2019, 6, 16, 0, 0, 0);
const endDate = new Date(2019, 6, 16, 23, 59, 59);

const TimeChart = ({ data }) => {
  const [chartRef, width, height] = useResizeObserver();
  const margins = { top: 32, right: 1, bottom: 1, left: 200 };

  const xScale = scaleTime()
    .domain([startDate, endDate])
    .range([margins.left, width - margins.right]);

  const yScale = scaleBand()
    .padding(0.5)
    .range([height - margins.bottom, margins.top]);

  // console.log(timeData.map(t => ({ [t.deviceId]: t.data.length })));

  return (
    <Container ref={chartRef}>
      <svg width={width} height={height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={{ width, height }}
        />
        {data.map((td, i) => (
          <TimeBar
            key={td.deviceId}
            data={td.data}
            width={width}
            start={startDate}
            end={endDate}
            position={i}
            margins={margins}
            xScale={xScale}
            yScale={yScale}
          />
        ))}
      </svg>
    </Container>
  );
};

export default memo(TimeChart);
