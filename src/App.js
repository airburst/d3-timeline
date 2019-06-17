import React from 'react';
import TimeChart from './components/TimeChartWithAxesTest';
import WindowDimensionsProvider from './components/WindowDimensionsProvider';
import styled from 'styled-components';

const Container = styled.div`
  padding: 32px;
`;

function App() {
  return (
    <WindowDimensionsProvider>
      <Container>
        <div className="App">
          <TimeChart />
        </div>
      </Container>
    </WindowDimensionsProvider>
  );
}

export default App;
