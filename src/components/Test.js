import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import D3Component from './D3Component';
import useResizeObserver from './useResizeObserver';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Picked = styled.div`
  height: 48px;
  background-color: #f6f6f6;
`;

const Canvas = styled.div`
  flex: 1;
`;

let vis;

export default function ReactComponent() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState(null);
  const [chartRef, width, height] = useResizeObserver();

  const fetchData = () => {
    Promise.resolve().then(() => setData(['a', 'b', 'c']));
  };

  const initVis = () => {
    if (data && data.length) {
      const d3Props = {
        data,
        width,
        height,
        onDatapointClick: setActive
      };
      vis = new D3Component(chartRef.current, d3Props);
    }
  };

  const updateVisOnResize = () => {
    vis && vis.resize(width, height);
  };

  useEffect(fetchData, []);
  useEffect(initVis, [data]);
  useEffect(updateVisOnResize, [width, height]);

  return (
    <Container>
      <Picked>{active}</Picked>
      <Canvas ref={chartRef} />
    </Container>
  );
}
