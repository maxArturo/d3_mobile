import d3 from 'd3';
import utils from './utils'
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log('started app');
  const geoLocationOptions = {
     timeout: 10000,
     enableHighAccuracy: true,
     maximumAge: 3000
  }
  navigator.geolocation.watchPosition(renderPosition,
    onError, geoLocationOptions);
}

function renderPosition(position) {
  console.log('started rendering position');
  const element = 'geolocation';
  const coordinates = position.coords;
  const [ height, width ] = utils.windowDimensions();
  d3.select(`#${element}`).selectAll()
  .transition()
    .duration(750)
    .attr('y', 0)
    .remove();

  const svg = d3.select(`#${element}`)
    .append('svg')
    .attr('height', height)
    .attr('width', width);

  const statistics = Object.keys(coordinates)
    .map(key => `${key}: ${coordinates[key]}`);
  statistics.push(`Last update: ${position.timestamp}`);

  console.log(statistics);

  const text = svg.selectAll('text')
    .data(statistics)
    .enter()
    .append('text')
    .attr('x', 15)
    .attr('y', -60)
    .text(d => d)
  .transition()
    .duration(750)
    .attr('y', (d, i) => { return i * 20; })
}

function onError(err) {
  console.log('error!');
  alert(`code: ${err.code}
        message: ${err.message}`);
}
