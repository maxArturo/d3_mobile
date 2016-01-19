import d3 from 'd3';
import utils from './utils';
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  const degreesUpdater = renderDegrees(0);
  const geoLocationOptions = {
     timeout: 10000,
     enableHighAccuracy: true,
     maximumAge: 1000
  }
  navigator.geolocation.watchPosition(degreesUpdater,
    onError, geoLocationOptions);
}

function onError(err) {
  console.log('error!');
  alert(`code: ${err.code}
        message: ${err.message}`);
}

function renderDegrees(degrees) {
  const element = 'geolocation';
  const [ height, width ] = utils.windowDimensions();
  const radius = Math.min(width, height) / 2;

  const arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

  const pie = d3.layout.pie()
    .sort(null)
    .value(d => d);

  const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);


  const color = ['#98abc5', '#FFFFFF'];
  const g = svg.selectAll('.arc')
    .data(pie([degrees, 360 - degrees]))
    .enter().append('g')
    .attr('class', 'arc')
    .append('path');

  g.transition()
    .duration(750)
    .style("fill", (d, i) => {return color[i];})
    .attr("d", arc)
    .each(function(d) { this._current = d; });

  svg.append('text')
    .text(`${degrees}°`)
    .attr('dy', `-${width / 6}`);

  function update(position) {
    degrees = position.coords.heading;
    console.debug(position);
    g.data(pie([degrees, 360 - degrees]))
    .style("fill", (d, i) => {return color[i];})
    .transition()
    .duration(750)
    .attrTween("d", arcTween);

    svg.selectAll('text')
      .text(`${degrees}°`)
      .style('font-size', 30);
  }

  function arcTween(a) {
    let i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
  }

  return update;
}
