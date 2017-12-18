// this converts from hue 256 degrees to a normal 360 degree scale,
export function convertHueToDegree(hue) {
    return hue * (360 / 256);
}

// converts the degree result back to a hue
export function convertDegreeToHue(degree) {
    return degree * (256 / 360);
}

// stolen from https://stackoverflow.com/a/9705160
export function convertRadiansToDegrees(angle) {
  return angle * (180 / Math.PI);
}

// stolen from https://stackoverflow.com/a/9705160
export function convertDegreesToRadians(angle) {
  return angle * (Math.PI / 180);
}
