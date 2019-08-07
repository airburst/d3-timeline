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

const getTicks = width => {
  if (!width || width === 0) {
    return 1;
  }
  const timeLabelSize = 48; // 48px
  const fittable = width / timeLabelSize;
  if (fittable > 24) {
    return 1;
  }
  if (fittable > 12) {
    return 2;
  }
  if (fittable > 8) {
    return 3;
  }
  if (fittable > 6) {
    return 4;
  }
  return 6;
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
    const numberOfTimeTicks = getTicks(w);

    const xScale = scaleTime()
      .domain([start, end])
      .range([0, w]);

    // Draw axes
    const xAxis = axisTop()
      .scale(xScale)
      .tickSize(h)
      .tickFormat(d3TimeFormat.timeFormat('%H:%M'))
      .ticks(d3Time.timeHour, numberOfTimeTicks);

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
    const labelLayer = svg.append('g').attr('id', 'timeline-data');
    const dataLayer = svg
      .append('g')
      .attr('transform', `translate(${labelWidth},${headerHeight})`)
      .attr('id', 'timeline-data');

    // Add each device time series
    data.forEach((sensor, index) => {
      const top = barY(index);
      const labelGroup = labelLayer.append('g').attr('id', `timebar-${index}`);
      const sensorGroup = dataLayer.append('g').attr('id', `timebar-${index}`);

      // Bar divider (top)
      const dividerBase = headerHeight + (index + 1) * rowHeight;
      labelGroup
        .append('path')
        .attr('d', `M0 ${dividerBase} L${w + labelWidth} ${dividerBase}`)
        .attr('class', 'timeline-divider');

      labelGroup
        .append('text')
        .text(sensor.deviceId)
        .attr('x', 8)
        .attr('y', dividerBase - 12)
        .attr('class', 'timeline-label');

      // Timeline data bars
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
