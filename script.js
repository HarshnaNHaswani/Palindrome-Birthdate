const inputDate = document.querySelector("#input-date");
const btnCheckPalindrome = document.querySelector("#check-palindrome");
let resultDiv = document.querySelector('#result');
function reverseStr(str){
  return str.split('').reverse().join('');
}
function isPalindrome(str){
  let reversedStr = reverseStr(str);
  if(str === reversedStr){
    return true;
  }
  return false;
}

function convertDateToString(date){
  var dateStr = {day: "", month: "",  year: ""};
  
  if(date.day < 10) dateStr.day = '0' + date.day;
  else dateStr.day = date.day.toString();

  if(date.month < 10) dateStr.month = '0' + date.month;
  else dateStr.month = date.month.toString();

  dateStr.year = date.year.toString();

  return dateStr;
}

function dateVariations(date){
  let dateStr = convertDateToString(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
  var listOfPalindromes = dateVariations(date);

  var flag = ["false", "false", "false", "false", "false", "false",];

  for(var i=0; i < listOfPalindromes.length; i++){
    if(isPalindrome(listOfPalindromes[i])){
      flag[i] = true;
      break;
    }
  }
  
  return flag;
}

function isLeapYear(year) {

  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}


function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNextPalindromeDate(date) {

  var nextDate = getNextDate(date);
  var counter = 0;

  while (1) {
    counter++;
    var dateStr = convertDateToString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    }
    else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      }
      else {
        day = 28;
      }
    }
    else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getPreviousPalindromeDate(date) {

  var previousDate = getPreviousDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = convertDateToString(previousDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}



btnCheckPalindrome.addEventListener("click", btnClick)

function btnClick(){
  let tempDate2 = inputDate.value;
    if (tempDate2 !== '') {
      let tempDate = tempDate2.split('-');
      let date = {
        day: tempDate[0],
        month: tempDate[1],
        year: tempDate[2],
      };
      let list = checkPalindromeForAllDateFormats(date);
        var palindrome = false;
        console.log(list);
        for(let i = 0; i< list.length; i++){
          if(list[i] === "true"){
            palindrome = true;
            break;
          }
        }

        if (!palindrome) {
          const [ctr1, nextDate] = getNextPalindromeDate(date);
          const [ctr2, prevDate] = getPreviousPalindromeDate(date);

          if (ctr1 > ctr2) {
            resultDiv.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
          } else {
            resultDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
          }

        } else if(palindrome){
          resultDiv.innerText = 'Yay! Your birthday is palindrome!';
        }
    }
    else{
      resultDiv.innerText = 'Please select date';
    }
  }

