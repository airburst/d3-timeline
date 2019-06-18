import React from 'react';
import TimeBar from './TimeBar';
import Axes from './Axes';
import timeData from './timeData'; // Example data
import { scaleBand, scaleTime } from 'd3-scale';

const startDate = new Date(2019, 6, 16, 0, 0, 0);
const endDate = new Date(2019, 6, 16, 23, 59, 59);

// TODO: Add chart axes and device line labels
const TimeChart = () => {
  const margins = { top: 50, right: 20, bottom: 100, left: 60 };
  const svgDimensions = { width: 1200, height: 500 };

  const xScale = scaleTime()
    .domain([startDate, endDate])
    .range([margins.left, svgDimensions.width - margins.right]);

  console.log(xScale(new Date(2019, 6, 16, 12, 0, 0))); // 500

  const yScale = scaleBand()
    .padding(0.5)
    // .domain(timeData.map(d => d.deviceId)) // Hides horizontal ticks
    .range([svgDimensions.height - margins.bottom, margins.top]);

  return (
    <div>
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
      </svg>
      {timeData.map(td => (
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
