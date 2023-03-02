const getHeatIndex = (tempair_in_fahrenheit, humidity) => {
  const hifinal =
    0.5 *
    (tempair_in_fahrenheit +
      61 +
      (tempair_in_fahrenheit - 68) * 1.2 +
      humidity * 0.094)
  if (hifinal < 79) {
    return hifinal
  }

  const heatIndex =
    -42.379 +
    2.04901523 * tempair_in_fahrenheit +
    10.14333127 * humidity -
    0.22475541 * tempair_in_fahrenheit * humidity -
    6.83783 * Math.pow(10, -3) * Math.pow(tempair_in_fahrenheit, 2) -
    5.481717 * Math.pow(10, -2) * Math.pow(humidity, 2) +
    1.22874 * Math.pow(10, -3) * Math.pow(tempair_in_fahrenheit, 2) * humidity +
    8.5282 * Math.pow(10, -4) * tempair_in_fahrenheit * Math.pow(humidity, 2) -
    1.99 *
      Math.pow(10, -6) *
      Math.pow(tempair_in_fahrenheit, 2) *
      Math.pow(humidity, 2)

  if (
    humidity <= 13 &&
    tempair_in_fahrenheit >= 80.0 &&
    tempair_in_fahrenheit <= 112.0
  ) {
    const adj1 = (13.0 - humidity) / 4.0
    const adj2 = Math.sqrt(
      (17.0 - Math.abs(tempair_in_fahrenheit - 95.0)) / 17.0
    )
    const adj = adj1 * adj2
    return heatIndex - adj
  }

  if (
    humidity > 85.0 &&
    tempair_in_fahrenheit >= 80.0 &&
    tempair_in_fahrenheit <= 87.0
  ) {
    var adj1 = (humidity - 85.0) / 10.0
    var adj2 = (87.0 - tempair_in_fahrenheit) / 5.0
    var adj = adj1 * adj2
    return heatIndex + adj
  }
}

export default (temp, humidity) => {
  if (humidity > 100) {
    throw new Error("Relative humidity cannot exceed 100%.")
  }
  if (humidity < 0) {
    throw new Error("Relative humidity cannot be less than 0%.")
  }

  if (temp <= 4.44) {
    return temp
  }

  const tempair_in_fahrenheit = 1.8 * temp + 32

  const indexInF = getHeatIndex(tempair_in_fahrenheit, humidity)

  return (((indexInF - 32) * 5) / 9).toFixed(2)
}
