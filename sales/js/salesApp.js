'use strict';

//Variable declaration
var hoursOpen = 15;
var startHour = 6;
// Create the daily totals array
var dailyTotalArray = [];
var storeTable = document.getElementById('salesTable');
var newStoreForm = document.getElementById('newStoreForm');

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
  // Populate the actual column names
  for(var i = 0; i < dayLengthArray.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = dayLengthArray[i];
    trEl.appendChild(thEl);
  }
  // Name the totals column
  thEl = document.createElement('th');
  thEl.textContent = 'Sales Totals';
  trEl.appendChild(thEl);
  // Append the row to the table
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
  // Add the daily totals row
  tdEL = document.createElement('td');
  tdEL.textContent = allStoresDailyTotal();
  trEl.appendChild(tdEL);
  // Add it to the table
  storeTable.appendChild(trEl);
}

function StoreObject (name, minCust, maxCust, acpc) {
  // Assign properties
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.acpc = acpc;
  this.salesArray = [];
  this.dailyTotal = 0;
  // Create the sales array
  this.salesArraySetup();
  // Store the object in the storesArray
  StoreObject.storeArray.push(this);
}
// Create the object array
StoreObject.storeArray = [];
// Create the array of hours the store is open
StoreObject.hours = dayLength(startHour, hoursOpen);
// Function that populates the salesArray with data based on object properties
StoreObject.prototype.salesArraySetup = function () {
  // Create sales array
  for(var i = 0; i < StoreObject.hours.length; i++) {
    // Find the hours sales
    var hourlySales = this.cookiePerCustForcast();
    // Push the number to the sales array
    this.salesArray.push(hourlySales);
    // Store the hours sales in the total for the stores daily sale
    this.dailyTotal += hourlySales;
    // Push the daily total to a single array
    dailyTotalArray.push(this.dailyTotal);
  }
};
// Function that cerates random data to populate the array with
StoreObject.prototype.cookiePerCustForcast = function () {
  var randomCustNum = Math.floor(Math.random() * ((this.maxCust + 1) - this.minCust) + this.minCust);
  return Math.floor(randomCustNum * this.acpc);
};
// Function that renders the object data to the table
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
  // Add the daily totals cell
  tdEL = document.createElement('td');
  tdEL.textContent = this.dailyTotal;
  trEl.appendChild(tdEL);
  // Add the row to the table
  storeTable.appendChild(trEl);
};

function allStoresDailyTotal () {
  //Sum up all the daily totals
  for (var i = 0; i < dailyTotalArray.length; i++) {
    var total = 0;
    total += dailyTotalArray[i];
  }
  return total;
}

// Call setup functions
StoreObject.hours = dayLength(startHour, hoursOpen);
// Create objects
var firstAndPike = new StoreObject('First and Pike', 23, 65, 6.3); //eslint-disable-line
var seaTac = new StoreObject('SeaTac Airport', 3, 24, 1.2); //eslint-disable-line
var seattleCenter = new StoreObject('Seattle Center', 11, 38, 3.7); //eslint-disable-line
var capHill = new StoreObject('Capital hill', 20, 38, 2.3); //eslint-disable-line
var alkiBeach = new StoreObject('Alki Beach', 2, 16, 4.6); //eslint-disable-line

// Add new Store
function addNewStore(event) {
  event.preventDefault();
  // Pull data from the form and assign to variables
  var newStoreName = event.target.newStoreName.value;
  var newMinCust = parseInt(event.target.newMinCust.value);
  var newMaxCust = parseInt(event.target.newMaxCust.value);
  var newACPC = parseFloat(event.target.newACPC.value);
  // Create new object
  new StoreObject(newStoreName, newMinCust, newMaxCust, newACPC);
  // Redraw the table
  drawTable();
}

// Populate the table
function drawTable () {
  // Clear exixting table
  storeTable.innerHTML = '';
  // Fill table
  tableHeader(StoreObject.hours);
  for(var i = 0; i < StoreObject.storeArray.length; i++) {
    StoreObject.storeArray[i].render();
  }
  tableFooter(StoreObject.storeArray, StoreObject.hours);
}

// Event listiner
newStoreForm.addEventListener('submit', addNewStore);

// Make initail call
drawTable();