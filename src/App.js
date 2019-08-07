import React from 'react';
import styled from 'styled-components';
// import TimeChart from './components/TimeChartWithAxesTest';
import TimelineChart from './components/TimelineChart';
import timeData from './timeData'; // Example data
// import Test from './components/Test';

// const barData = [
//   { day: 'Mon', hours: 6.4 },
//   { day: 'Tue', hours: 7.3 },
//   { day: 'Wed', hours: 5.5 },
//   { day: 'Thu', hours: 8.1 },
//   { day: 'Fri', hours: 5.6 },
//   { day: 'Sat', hours: 7 },
//   { day: 'Sun', hours: 7.6 }
// ];

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: #f6f6f6;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  height: 400px;
  width: 100%;
  background-color: white;
`;

const margins = { top: 0, left: 0, bottom: 0, right: 0 };
const startDate = new Date(2019, 6, 16, 0, 0, 0);
const endDate = new Date(2019, 6, 16, 23, 59, 59);

function App() {
  return (
    <Container>
      <InnerContainer>
        <TimelineChart
          data={timeData}
          margins={margins}
          start={startDate}
          end={endDate}
        />
      </InnerContainer>
    </Container>
  );
}

export default App;
