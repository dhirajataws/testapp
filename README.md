# testapp

# Design:
The design kind of MVC pattarn where a controller drives all the flow.
Controller component which is main.js will be invoked from outside using command parameters. Controller will call other services in sequence for one request which is one line of data in .log file.
1. fileRead 
2. parse each line
3. invoke fetchCoordinates


Components proposed:
1. fileRead : Read .log file , parse it and get list of ips
2. fetchCoordinates : Fetch coordinates of the ips provided
3. fetchForcast : Fetch whether conditions
4. create output file

Limitation:
node version 10+
Weather api is not very efficient. Unnecessary processing required over 96 set of data. Better api can be used.
common component can be created for fetch url. 

Technical debt:
1. weather api is not efficient.
2. TODO's
Configuration Required:
export IP_GEOLOCATION_API_KEY=*****
export WEATHER_API_KEY=******

# Test Scenario:
1. line in a file is not formatted correctly
2. no. of records exceeds daily limit for api like 1500
3. required env variable is not configured
4. IPV4 and IPV6 ip address