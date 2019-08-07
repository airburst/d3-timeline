import { select, scaleBand, scaleLinear, axisBottom, axisLeft, max } from 'd3';
import './Axis.css';
// import { COLOUR } from '../../../../constants';

const margin = { top: 10, left: 32, bottom: 24, right: 0 };

const getHeight = (height, margin) => {
  const h = height - margin.bottom - margin.top;
  return h > 0 ? h : 0;
};

const getWidth = (width, margin) => {
  const w = width - margin.left - margin.right;
  return w > 0 ? w : 0;
};

class D3Component {
  containerEl;
  props;
  svg;

  constructor(containerEl, props) {
    this.containerEl = containerEl;
    const { width, height } = props;
    this.props = props;
    this.svg = select(containerEl)
      .append('svg')
      .style('display', 'block')
      .attr('width', width)
      .attr('height', height);
    this.updateDatapoints();
  }

  updateDatapoints = () => {
    const {
      svg,
      props: { data, width, height }
    } = this;

    const h = getHeight(height, margin);
    const w = getWidth(width, margin);

    const xscale = scaleBand()
      .domain(data.map(d => d.day))
      .range([0, w])
      .padding(0.05);

    const yscale = scaleLinear()
      .domain([0, max(data, d => d.hours)]) // Zero-base to max value given
      .range([0, h]);
    const invertedYscale = scaleLinear()
      .domain([0, max(data, d => d.hours)]) // Zero-base to max value given
      .range([h, 0]);

    const xAxis = axisBottom()
      .scale(xscale)
      .tickSize(0)
      .tickPadding([12]);

    const yAxis = axisLeft()
      .scale(invertedYscale)
      .tickSize(4)
      // .tickSize(-w) // Horizontal guide bars
      .tickPadding([8])
      .ticks(6);

    // Clear old chart
    svg.selectAll('g').remove();

    // Draw axes
    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(${margin.left},${h + margin.top})`)
      .attr('class', 'axis axis-bottom');
    svg
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('class', 'axis axis-left');

    // Draw bars
    const upd = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('rect')
      .data(data);
    upd
      .enter()
      .append('rect')
      .merge(upd)
      .attr('x', d => xscale(d.day))
      .attr('y', d => h - yscale(d.hours))
      .attr('class', 'bar')
      .attr('width', xscale.bandwidth())
      .attr('height', d => yscale(d.hours))
      .attr('fill', 'blue');
  };

  // setActiveDatapoint = (d, node) => {
  //   select(node).style('fill', 'yellow');
  //   this.props.onDatapointClick(d);
  // };

  resize = (width, height) => {
    const { svg, props } = this;
    props.width = width;
    props.height = height;

    svg.attr('width', width).attr('height', height);
    this.updateDatapoints();
  };
}

export default D3Component;
