# testapp

# Design:
The design is based on hub and pattarn where a controller drives all the flow.
Controller component which is main.js will be invoked through start.js from outside using command parameters. Controller will call other services in sequence for one request which is one line of data in .log file.
1. fileRead 
2. parse each line
3. invoke fetchCoordinates
4. invoke get weather conditions
5. process max temps recorded
6. write to file
7. write to console about failures summary

# Configuration Required:
export IP_GEOLOCATION_API_KEY=*****
export WEATHER_API_KEY=******
config for Geolocation api url and weather api url

# Limitation:
1. tested node version 11.14.0
2. Weather api is not very efficient. Unnecessary processing required over 96 set of data. Better api can be used.
3. common component can be created for fetch url. 

# Technical debt:
1. weather api is not efficient.
2. TODO's
3. Increase test coverage
4. IP address regex is not complete. it cannot discard number above 256 which it should do.
5. no use of any

# Test Scenario:
1. line in a file is not formatted correctly
2. required env variable is not configured

# Test Scenario not covered:
1. no. of records exceeds daily limit for api like 1500
2. IPV4 and IPV6 ip address

# Test
sample test command:
 npm run build && npm start "******/testapp/sample/iot.log" "*****/testapp/sample/output.txt" "5"

 sample input and output file in sample folder

 # sample error failure summary
Summary of Failed Lines :
  {"GEO_LOCATION_FETCH_FAILED":5,"IPADDRESS_NOT_FOUND":1} 
Failed line: **.250 - - [03-12-2014:04:59:59 -1000] "POST /api/v2.1/register HTTP/1.0" 200 0.6489
    Failure reason : GEO_LOCATION_FETCH_FAILED 
Failed line: ***.19 - - [03-12-2014:04:59:59 -1000] "POST /api/v2.1/register HTTP/1.0" 200 0.61983468
    Failure reason : GEO_LOCATION_FETCH_FAILED 
Failed line: ***.19 - - [03-12-2014:04:59:59 -1000] "POST /api/v2.1/register HTTP/1.0" 200 0.77024304
    Failure reason : GEO_LOCATION_FETCH_FAILED 
Failed line: **.90 - - [03-12-2014:04:59:59 -1000] "POST /api/v2.1/register HTTP/1.0" 200 0.605
    Failure reason : GEO_LOCATION_FETCH_FAILED 
Failed line: **.104 - - [03-12-2014:04:59:59 -1000] "POST /api/v2.1/register HTTP/1.0" 200 0.2725
    Failure reason : GEO_LOCATION_FETCH_FAILED 
Failed line: 71.232.84 - - [03-12-2014:05:00:00 -1000] "POST /api/v2.1/register HTTP/1.0" 200 0.918
    Failure reason : IPADDRESS_NOT_FOUND  