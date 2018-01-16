'use strict';

//Variable declaration
var hoursOpen = 15;
var startHour = 6;

// Calculates random cookie count given (minimum customers, maximum customers, and average cookie per customer)
function cookiePerCustForcast (min, max, acpc) {
  var randomCustNum = Math.floor(Math.random() * ((max + 1) - min) + min);
  console.log(randomCustNum);
  var cookiesPurchasedGuess = randomCustNum * acpc;
  return cookiesPurchasedGuess;
}
// Builds hours array
function dayLength (startHour, hoursOpen) {
  var hoursArray = [];
  for(var i = startHour; i < hoursOpen + startHour; i++) {
    if(i <= 11) {
      hoursArray.push(i + 'am');
    }
    else {
      hoursArray.push(i + 'pm');
    }
  }
  return hoursArray;
}
// Formats the li's for display
function displayFormatter (hour, cookiesSold) {
  return hour + ': ' + cookiesSold + 'cookies sold.';
}