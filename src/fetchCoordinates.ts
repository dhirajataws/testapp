import fetch from 'node-fetch';
import config from "config";

type IFetchCoordinates = (ipAddress: string) => void

export const getTargetUrl = (
  {
    targetUrl,
    apiKey,
    ipAddress
  }
    : {
      targetUrl: string,
      apiKey: string,
      ipAddress: string
    }) => `${targetUrl}?apiKey=${apiKey}&ip=${ipAddress}&fields=latitude,longitude`

export const fetchCoordinates: IFetchCoordinates = async (
  ipAddress: string) => {
  let targetUrl: string = config.get("ipGeoLocationApiUrl")
  if (!targetUrl)
    throw new Error("GEO_LOCATION_API_NOT_DEFINED")
  const apiKey = process.env.IP_GEOLOCATION_API_KEY
  if (!apiKey)
    throw new Error("GEO_LOCATION_API_KEY_NOT_DEFINED")

  targetUrl = getTargetUrl({
    targetUrl,
    apiKey,
    ipAddress
  })
  try {
    const response = await fetch(targetUrl, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
    const body = await response.json();
    if (response.status !== 200) {
      throw Error("GEO_LOCATION_FETCH_FAILED");
    }
    return body;
  } catch (err) {
    throw Error("GEO_LOCATION_FETCH_FAILED");
  }
}