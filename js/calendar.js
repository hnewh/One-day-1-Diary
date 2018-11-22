var d = new Date();
var year = d.getFullYear(); //연도
var month = d.getMonth() + 1; //달
var today = d.getDate();

//달 영어 이름
function getMonthInEnglish()
{
  var monthList = new Array('January', 'February', 'March', 'April',  'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  return monthList[month-1];
}

//첫날 요일 구하기
function getFirstDay()
{
  var firstDate = new String(year + "-" + month + "-1");
  return new Date(firstDate).getDay();
}

//마지막 날짜 구하기
function getLastDate(month)
{
  var lastDate = 0;
  switch(month)
  {
    case 1, 3, 5, 7, 8, 10, 12: lastDate = 31; break;
    case 4, 6, 9, 11: lastDate = 30; break;
    case 2: isLeapYear() ? lastDate = 29 : lastDate = 30; break;
  }
  return lastDate;
}

//윤년인지 확인
function isLeapYear()
{
  if(year%4 == 0)
  {
    if(year%100 == 0)
    {
      if(year%400 == 0)
        return true;
      return false;
    }
    return true;
  }
}

//header 표시
$(window).ready(function(event){
  $('header h1').html(today);
  $('header h2').html(getMonthInEnglish());
});

$(window).ready(function(event){
  //날짜 계산
  var date;
  for(var i = 0; i < 35; i++)
  {
    if(i < getFirstDay())
    {
      $('.calendar tr.week1').append("<td class='blank'></td>");
      date = 0;
    }
    else if(i < 7) //1~3
      $('.calendar tr.week1').append("<td>" + date + "</td>");
    else if(i < 14) //4~10
      $('.calendar tr.week2').append("<td>" + date + "</td>");
    else if(i < 21) //11~17
      $('.calendar tr.week3').append("<td>" + date + "</td>");
    else if(i < 28) //18~26
      $('.calendar tr.week4').append("<td>" + date + "</td>");
    else if(i < getLastDate(month) + getFirstDay()) 
      $('.calendar tr.week5').append("<td>" + date + "</td>");
    else //32 35
      $('.calendar tr.week5').append("<td class='blank'></td>");
    date++;
  }

  //오늘 날짜 표시
  var trToday = ".calendar tr td:contains('" + today + "')"
  $(trToday).addClass('today');
});