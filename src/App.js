import React from 'react';
import TimeChart from './components/TimeChartWithAxesTest';
// import BarChart from './components/BarChart';
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

function App() {
  return <TimeChart data={timeData} />;
}

export default App;
