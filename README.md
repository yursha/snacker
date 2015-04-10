# Snacker - a data visualizer

Allows you to drop multiple CSV files and receive analytics in a nicely styled table format. You can then filter and sort (by clicking column name) the shown data. Analytics includes percentage of empty cells, number of unique values and a data type for each column.

Below is a screenshot of a Snacker's scatter plot running for a while. Red circles represent uploaded files with circle size corresponding to the time spent on file processing. Blue circles represent medians of server app memory usage during each minute. To compute a memory usage median browser app send request to the server every 10 second to collect samples. 

![Screenshot](https://github.com/AlexYursha/snacker/blob/master/test/Screenshot.PNG)

## This is a minimal viable product.
- There is no input file type and well-formedness validation
- There is no error handling logic
- There is no e2e tests

## How to launch
After you perform the following commands the Snacker server will be started on `localhost:3000`. Open you browser and start playing.
```
> git clone https://github.com/AlexYursha/snacker
> cd snacker
> npm install
> npm start

```
