import { select, selectAll, scaleTime, axisTop } from 'd3';
import * as d3Time from 'd3-time';
import * as d3TimeFormat from 'd3-time-format';
import './Axis.css';
// import { COLOUR } from '../../../../constants';

// TODO: Move to constants
// Sizing constants for timeline chart
const headerHeight = 32;
const labelWidth = 200;
const barHeight = 10;
const rowHeight = 40;
// Compute top position of thin bars
const barY = index => index * rowHeight + (rowHeight - barHeight) / 2;

const getHeight = (height, margins) => {
  const h = height - margins.bottom - margins.top - headerHeight;
  return h > 0 ? h : 0;
};

const getWidth = (width, margins) => {
  const w = width - margins.left - margins.right - labelWidth;
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
      props: { data, width, height, margins, start, end }
    } = this;

    const h = getHeight(height, margins);
    const w = getWidth(width, margins);

    const xScale = scaleTime()
      .domain([start, end])
      .range([0, w]);

    // Draw axes
    const xAxis = axisTop()
      .scale(xScale)
      .tickSize(h)
      .tickFormat(d3TimeFormat.timeFormat('%H:%M'))
      .ticks(d3Time.timeHour); //.every(1)

    // Clear old chart
    svg.selectAll('g').remove();

    // Draw time axis
    svg
      .append('g')
      .call(xAxis)
      .attr(
        'transform',
        `translate(${margins.left + labelWidth},${h +
          headerHeight +
          margins.top})`
      )
      .attr('class', 'axis axis-top time');

    // Remove first time label and lift others by 6px
    select('.time > g.tick > text').remove();
    selectAll('.time > g.tick > text').attr('transform', `translate(0,-6)`);

    // add timline data series
    const g = svg
      .append('g')
      .attr('transform', `translate(${labelWidth},${headerHeight})`)
      .attr('id', 'timeline-data');

    // Add each device time series
    data.forEach((sensor, index) => {
      const top = barY(index);
      const dividerTop = index * rowHeight;
      const sensorGroup = g
        .append('g')
        // .attr('transform', `translate(${labelWidth},0)`)
        .attr('id', `timebar-${index}`);

      // TODO: Add label

      // Bar background (rectangle)
      sensorGroup
        .append('path')
        .attr('d', `M0 ${dividerTop} L${w} ${dividerTop}`)
        .attr('class', 'timeline-divider');

      sensorGroup
        .selectAll(`rect:not(.bar-bg)`)
        .data(sensor.data)
        .enter()
        .append('rect')
        .attr('x', d =>
          xScale(d.on) > xScale(start) ? xScale(d.on) : xScale(start)
        )
        .attr('y', top)
        .attr('width', d => xScale(d.off || this.props.end) - xScale(d.on))
        .attr('height', barHeight)
        .attr('class', `timebar sensor-${index}`)
        .attr('fill', '#7E0958');
    });
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
