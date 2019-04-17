import { fetchCoordinates, getTargetUrl } from "../src/fetchCoordinates";
import fetch from 'node-fetch';
import config from "config";
import fetchMock, { MockResponse } from "fetch-mock";

describe("fetchCoordinates", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("should expose a fetchCoordinates function", () => {
    expect(fetchCoordinates).toBeDefined();
    expect(fetch).toBeDefined();
    expect(config).toBeDefined();
    expect(config.get("ipGeoLocationApiUrl")).toBeDefined();
    expect(process.env.IP_GEOLOCATION_API_KEY).toBeDefined();
    const targetUrl = getTargetUrl({
      targetUrl: config.get("ipGeoLocationApiUrl") || '', // if url is not defined it will fail first
      apiKey: process.env.ipGeoLocationApiUrl || '',
      ipAddress: "0.0.0.0"
    })
    const targetIp = "test";
    const mockResponse: MockResponse = {
      body: {
        ip: targetIp,
        latitude: "testlatitude",
        longitude: "testlongitude"
      },
      status: 200,
    };
    fetchMock.mock(targetUrl, mockResponse);
    try {
      fetchCoordinates(targetIp)
      expect(fetchMock.called());
    } catch (err) {
      expect(err.message).toEqual("GEO_LOCATION_FETCH_FAILED")
    }
  })
})