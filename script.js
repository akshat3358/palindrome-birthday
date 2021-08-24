var dateInputRef = document.querySelector("#bday-input");

var showBtnRef = document.querySelector("#show-btn");

var resultRef = document.querySelector("#result");

const gifs = document.querySelector("#giphy");

function reverseStr(str) {
    var listOfChars = str.split('');// -> ['h', 'e', 'l', 'l', 'o']
    var reverseListOfChars = listOfChars.reverse();// -> ['o', 'l', 'l', 'e', 'h']
    var reversedStr = reverseListOfChars.join('');// -> 'olleh'
    return reversedStr;
    //return str.split.reverse().join('');
}

function isStrPalindrome(str){
    var reverse = reverseStr(str);
    return ( str === reverse );  
}

function convertDateToStr(date){
    var dateStr = {day:'',month:'',year:''};
    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;

    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);

    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var flag  = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isStrPalindrome(listOfPalindromes[i])){
        flag = true;
        break;
      }
    }
    
    return flag;
}

function isLeapYear(year){
    if( year % 400 === 0 ){
        return true;
    }
    if( year % 100 === 0){
        return false;
    }
    if( year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){ 
    var day = date.day + 1;//increment the day
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    //check for february
    if(month === 2){//check for leap year
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day>28){
                day = 1;
                month++;
            }
        }
    }
    else{
        //check if the day exceeds the max days in month
        if(day > daysInMonth[month - 1] ){
            day = 1;
            month++;
        }
    }

    if (month > 12){
        month = 1;
        year++;
    }
    return {
        day : day,
        month : month,
        year : year
    };
}


function getNextPalindromeDate(date){
    var cntr = 0;
    var nextDate =   getNextDate(date);
    
    while(1){
        cntr++;
        var issPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(issPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [cntr,nextDate];
}

function clickHandler(e){
    var bdayStr = dateInputRef.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            resultRef.innerText = 'Yay! Your Birthday is a Palindrome!!🥳🥳';
            resultRef.style.backgroundColor = "black";

            gifs.innerHTML = "<img src='https://media.giphy.com/media/vmon3eAOp1WfK/giphy.gif' style='display:block;margin:1.5rem auto 1rem;max-width:700px;max-height:400px;width:100%;border-radius:15px;'>";
        }
        else{
            var [cntr,nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${cntr} days! 😔`;
            resultRef.style.backgroundColor = "black";
            gifs.innerHTML = "<img src='https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif' style='display:block;margin:1.5rem auto 1rem;max-width:700px;max-height:400px;width:100%;border-radius:15px;'>";
        }
    }
}


showBtnRef.addEventListener('click',clickHandler);


