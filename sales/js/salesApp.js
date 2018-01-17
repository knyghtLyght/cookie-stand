'use strict';

//Variable declaration
var hoursOpen = 15;
var startHour = 6;
var dayLengthArray = [];
var storeArray = [];
var storeTable = document.getElementById('salesTable');

// Calculates random cookie count given (minimum customers, maximum customers, and average cookie per customer)
function cookiePerCustForcast (min, max, acpc) {
  var randomCustNum = Math.floor(Math.random() * ((max + 1) - min) + min);
  return Math.floor(randomCustNum * acpc);
}
// Builds hours array based on store hours.
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
  }
  return hoursArray;
}

//Table header function
function tableHeader (dayLengthArray) {
  var trEl = document.createElement('tr');
  // Align header
  var thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);
  for(var i = 0; i < dayLengthArray.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = dayLengthArray[i];
    trEl.appendChild(thEl);
  }
  storeTable.appendChild(trEl);
}
//Table footer/totals row
function tableFooter (storeArray, dayLengthArray) {
  var hourTotal = 0;
  var salesTotalArray = [];
  var trEl = document.createElement('tr');
  var tdEL = document.createElement('td');
  tdEL.textContent = 'Totals: ';
  trEl.appendChild(tdEL);
  // Build the salesTotalArray
  for(var i = 0; i < dayLengthArray.length; i++) {
    for(var j = 0; j < storeArray.length; j++) {
      hourTotal += storeArray[j].salesArray[i];
    }
    salesTotalArray.push(hourTotal);
    hourTotal = 0;
  }
  // Fill in the row
  for(var k = 0; k < salesTotalArray.length; k++) {
    tdEL = document.createElement('td');
    tdEL.textContent = salesTotalArray[k];
    trEl.appendChild(tdEL);
  }
  // Add it to the table
  storeTable.appendChild(trEl);
}

function StoreObject (name, minCust, maxCust, acpc, dayLengthArray) {
  // Assign properties
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.acpc = acpc;
  this.dayLengthArray = dayLengthArray;
  this.salesArray = [];
  // Create sales array
  for(var i = 0; i < dayLengthArray.length; i++) {
    this.salesArray.push(cookiePerCustForcast(this.minCust, this.maxCust, this.acpc));
  }
  // Store the object in the storesArray
  storeArray.push(this);
}

StoreObject.prototype.render = function () {
  // Create tr
  var trEl = document.createElement('tr');
  // Create td
  var tdEL = document.createElement('td');
  // Give it content
  tdEL.textContent = this.name;
  // Append it to the row
  trEl.appendChild(tdEL);
  // Repeat for sales array values
  for(var i = 0; i < this.salesArray.length; i++) {
    tdEL = document.createElement('td');
    tdEL.textContent = this.salesArray[i];
    trEl.appendChild(tdEL);
  }
  storeTable.appendChild(trEl);
};


// Call setup functions
dayLengthArray = dayLength(startHour, hoursOpen);
// Create objects
var FirstAndPike = new StoreObject('First and Pike', 23, 65, 6.3, dayLengthArray);
var SeaTac = new StoreObject('SeaTac Airport', 3, 24, 1.2, dayLengthArray);
var SeattleCenter = new StoreObject('Seattle Center', 11, 38, 3.7, dayLengthArray);
var CapHill = new StoreObject('Capital hill', 20, 38, 2.3, dayLengthArray);
var AlkiBeach = new StoreObject('Alki Beach', 2, 16, 4.6, dayLengthArray);

// Populate the table
tableHeader(dayLengthArray);
FirstAndPike.render();
SeaTac.render();
SeattleCenter.render();
CapHill.render();
AlkiBeach.render();
tableFooter(storeArray, dayLengthArray);