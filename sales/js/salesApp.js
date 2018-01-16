'use strict';

//Variable declaration
var hoursOpen = 15;
var startHour = 6;

// Calculates random cookie count given (minimum customers, maximum customers, and average cookie per customer)
function cookiePerCustForcast (min, max, acpc) {
  var randomCustNum = Math.floor(Math.random() * ((max + 1) - min) + min);
  console.log('min: ' + min + ' max: ' + max + ' acpc: ' + acpc + ' rand: ' + randomCustNum);
  var cookiesPurchasedGuess = randomCustNum * acpc;
  return cookiesPurchasedGuess;
}
// Builds hours array
function dayLength (startHour, hoursOpen) {
  var hoursArray = [];
  for(var i = startHour; i < (hoursOpen + startHour); i++) {
    if(i <= 11) {
      hoursArray.push(i + 'am');
    }
    else {
      if(i === 12) {
        hoursArray.push(i + 'pm');
      } else {
        hoursArray.push((i - 12) + 'pm');
      }
    }
    console.log(hoursArray[i - startHour]);
    console.log(hoursArray);
  }
  return hoursArray;
}
// Formats the li's for display
function displayFormatter (hour, cookiesSold) {
  return hour + ': ' + Math.round(cookiesSold) + ' cookies sold.';
}
var firstAndPike = {
  render: function() {
    // Setup known store data
    var storeMinCust = 23;
    var storeMaxCust = 65;
    var storeACPC = 6.3;
    var storeDayLength = dayLength(startHour, hoursOpen);
    // Access the ul from sales.html
    var ulEl = document.getElementById('firstAndPikeUl');
    for(var i = 0; i < storeDayLength.length; i++) {
      // Create list item
      var liEl = document.createElement('li');
      // Give it content
      liEl.textContent = displayFormatter(storeDayLength[i], cookiePerCustForcast(storeMinCust, storeMaxCust, storeACPC));
      // Appened to the ul
      ulEl.appendChild(liEl);
    }
  }
};
var seaTac = {
  render: function() {
    // Setup known store data
    var storeMinCust = 3;
    var storeMaxCust = 24;
    var storeACPC = 1.2;
    var storeDayLength = dayLength(startHour, hoursOpen);
    // Access the ul from sales.html
    var ulEl = document.getElementById('seaTacUl');
    for(var i = 0; i < storeDayLength.length; i++) {
      // Create list item
      var liEl = document.createElement('li');
      // Give it content
      liEl.textContent = displayFormatter(storeDayLength[i], cookiePerCustForcast(storeMinCust, storeMaxCust, storeACPC));
      // Appened to the ul
      ulEl.appendChild(liEl);
    }
  }
};
var seattleCenter = {
  render: function() {
    // Setup known store data
    var storeMinCust = 11;
    var storeMaxCust = 38;
    var storeACPC = 3.7;
    var storeDayLength = dayLength(startHour, hoursOpen);
    // Access the ul from sales.html
    var ulEl = document.getElementById('seattleCenterUl');
    for(var i = 0; i < storeDayLength.length; i++) {
      // Create list item
      var liEl = document.createElement('li');
      // Give it content
      liEl.textContent = displayFormatter(storeDayLength[i], cookiePerCustForcast(storeMinCust, storeMaxCust, storeACPC));
      // Appened to the ul
      ulEl.appendChild(liEl);
    }
  }
};
var capHill = {
  render: function() {
    // Setup known store data
    var storeMinCust = 20;
    var storeMaxCust = 38;
    var storeACPC = 2.3;
    var storeDayLength = dayLength(startHour, hoursOpen);
    // Access the ul from sales.html
    var ulEl = document.getElementById('capHillUl');
    for(var i = 0; i < storeDayLength.length; i++) {
      // Create list item
      var liEl = document.createElement('li');
      // Give it content
      liEl.textContent = displayFormatter(storeDayLength[i], cookiePerCustForcast(storeMinCust, storeMaxCust, storeACPC));
      // Appened to the ul
      ulEl.appendChild(liEl);
    }
  }
};
var alkiBeach = {
  render: function() {
    // Setup known store data
    var storeMinCust = 2;
    var storeMaxCust = 16;
    var storeACPC = 4.6;
    var storeDayLength = dayLength(startHour, hoursOpen);
    // Access the ul from sales.html
    var ulEl = document.getElementById('alkiUl');
    for(var i = 0; i < storeDayLength.length; i++) {
      // Create list item
      var liEl = document.createElement('li');
      // Give it content
      console.log(i);
      liEl.textContent = displayFormatter(storeDayLength[i], cookiePerCustForcast(storeMinCust, storeMaxCust, storeACPC));
      // Appened to the ul
      ulEl.appendChild(liEl);
    }
  }
};

//Call objects
firstAndPike.render();
seaTac.render();
seattleCenter.render();
capHill.render();
alkiBeach.render();