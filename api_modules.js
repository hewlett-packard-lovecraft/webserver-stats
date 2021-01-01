// load modules
const fs = require("fs");
const IPinfo = require("node-ipinfo");

// removes duplicates of an array
function removeDuplicates(array) {
  let output = new Set(array);
  return Array.from(output);
}

// takes a string and a pattern, takes first group of all matches and puts them into an array
function getArrayOfIPs(patt, logfile) {
  return removeDuplicates(Array.from(logfile.matchAll(patt), (m) => m[1]));
}

// takes a array and returns a 2d array split into chunks of specified size
function chunkify(ips, chunk) {
  let i;
  let j;
  let temparray;
  let output = [];

  for (i = 0, j = ips.size; i < j; i += chunk) {
    temparray = ips.slice(i, i + chunk);
    output.push(temparray);
  }

  return output;
}

// async function that takes a token and array of IPs and returns a promise that resolves to an array of countries
const getCountries = async (token, ips) => {
  let ipinfo = new IPinfo(token);
  let countryList = [];

  for (x in ips) {
    let response = await ipinfo.lookupIp(ips[x]);
    console.log(response.country);
    countryList.push(response.country);
  }

  return countryList;
};

// async function that takes a token and an IP and returns a promise that resolves to a country
const ip = async (token, ip) => {
  let ipinfo = new IPinfo(token);
  const response = await ipinfo.lookupIp(ip);
  return response.country;
};

// export modules
exports.removeDuplicates = removeDuplicates;
exports.getArrayOfIPs = getArrayOfIPs;
exports.chunkify = chunkify;
exports.getCountries = getCountries;
