exports.windowDimensions = function() {
  let height = window.orientation === 0 ? window.screen.height :
    window.screen.width;
  let width = window.orientation === 0 ? window.screen.width:
    window.screen.height;

  if (navigator.userAgent.indexOf('Android') !== -1 &&
    window.devicePixelRatio) {
    width = width / window.devicePixelRatio;
    height = height / window.devicePixelRatio;
  }

  return [height, width];
}
