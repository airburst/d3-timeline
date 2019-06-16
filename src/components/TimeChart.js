import React from 'react';
import TimeBar from './TimeBar';

const timeData = [
  {
    deviceId: 'Kitchen',
    data: [
      {
        on: new Date(2019, 6, 16, 7, 5, 0).getTime(),
        off: new Date(2019, 6, 16, 7, 30, 30).getTime()
      },
      {
        on: new Date(2019, 6, 16, 10, 20, 0).getTime(),
        off: new Date(2019, 6, 16, 10, 30, 0).getTime()
      },
      {
        on: new Date(2019, 6, 16, 12, 0, 0).getTime(),
        off: new Date(2019, 6, 16, 13, 0, 0).getTime()
      },
      {
        on: new Date(2019, 6, 16, 18, 0, 0).getTime(),
        off: new Date(2019, 6, 16, 18, 30, 0).getTime()
      }
    ]
  },
  {
    deviceId: 'Bedroom1',
    data: [
      {
        on: new Date(2019, 6, 15, 22, 0, 0).getTime(),
        off: new Date(2019, 6, 16, 7, 0, 30).getTime()
      },
      {
        on: new Date(2019, 6, 16, 21, 20, 0).getTime()
        // No off time yet
      }
    ]
  }
];

const startDate = new Date(2019, 6, 16, 0, 0, 0).getTime();
const endDate = new Date(2019, 6, 16, 23, 59, 59).getTime();

// TODO: Add chart axes and device line labels
const TimeChart = () => {
  return (
    <div>
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
