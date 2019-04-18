import config from "config";

export const validator = () => {
  if (!process.argv[2] || !process.argv[3] || !process.argv[4])
    throw new Error("MISSING_PARAMETERS")
  if (!config.get("ipGeoLocationApiUrl"))
    throw new Error("GEO_LOCATION_API_URL_NOT_FOUND")
  if (!process.env.IP_GEOLOCATION_API_KEY)
    throw new Error("GEO_LOCATION_API_KEY_NOT_FOUND")
  if (!config.get("ipGeoLocationApiUrl"))
    throw new Error("GEO_LOCATION_API_URL_NOT_FOUND")
  if (!process.env.IP_GEOLOCATION_API_KEY)
    throw new Error("GEO_LOCATION_API_KEY_NOT_FOUND")
  if (!config.get("weatherApiUrl"))
    throw new Error("WEATHER_API_URL_NOT_FOUND")
  if (!process.env.WEATHER_API_KEY)
    throw new Error("WEATHER_API_KEY_NOT_FOUND")
}