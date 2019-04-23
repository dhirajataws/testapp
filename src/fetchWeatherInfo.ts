import fetch from 'node-fetch';
import config from "config";

interface IFetchWeather {
  (lat: string, lon: string): Promise<any>
}
export const getTargetUrl = (
  {
    targetUrl,
    apiKey,
    lat,
    lon
  }
    : {
      targetUrl: string,
      apiKey: string,
      lat: string,
      lon: string
    }) => {
  const unitOfMeasurment = config.get("unit");
  return `${targetUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unitOfMeasurment}`
}

export const fetchWeather: IFetchWeather = async (
  lat, lon) => {
  let targetUrl: string = config.get("weatherApiUrl")
  if (!targetUrl)
    throw new Error("WEATHER_API_URL_NOT_FOUND")
  const apiKey = process.env.WEATHER_API_KEY
  if (!apiKey)
    throw new Error("WEATHER_API_KEY_NOT_FOUND")

  targetUrl = getTargetUrl({
    targetUrl,
    apiKey,
    lat,
    lon
  })
  try {
    const response = await fetch(targetUrl, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
    const body = await response.json();
    if (response.status !== 200) {
      throw Error("WEATHER_FETCH_FAILED");
    }
    return body;
  } catch (err) {
    throw Error("WEATHER_FETCH_FAILED");
  }
}