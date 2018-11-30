var d = new Date();
var year = d.getFullYear(); //연도
var month = d.getMonth() + 1; //월
var today = d.getDate(); //날짜

//월 영어 이름
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
function getLastDate()
{
  switch(month)
  {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
    case 4: case 6: case 9: case 11: return 30;
    case 2: if(isLeapYear()) return 29; else return 28;
  }
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

//5주 계산
function set5weeks(firstDate, lastDate)
{
  var date;

  //5주 설정
  for(var i = 0; i < 5; i++)
    $('.calendar table').append("<tr class='week" + (i + 1) +"'></tr>")

  //날짜 계산
  for(var i = 0; i < 35; i++)
  {
    if(i == 0 && i == firstDate)
    {
      noBlankDate();
      break;
    }

    if(i < firstDate)
    {
      $('.calendar tr.week1').append("<td class='blank'></td>");
      date = 0;
    }
    else if(i < 7)
      $('.calendar tr.week1').append("<td>" + date + "</td>");
    else if(i < 14)
      $('.calendar tr.week2').append("<td>" + date + "</td>");
    else if(i < 21)
      $('.calendar tr.week3').append("<td>" + date + "</td>");
    else if(i < 28)
      $('.calendar tr.week4').append("<td>" + date + "</td>");
    else if(i < firstDate + lastDate)
      $('.calendar tr.week5').append("<td>" + date + "</td>");
    else
      $('.calendar tr.week5').append("<td class='blank'></td>");
    date++;
  }
}

//6주 계산
function set6weeks(firstDate, lastDate)
{
  var date;

  //6주 설정
  for(var i = 0; i < 6; i++)
    $('.calendar table').append("<tr class='week" + (i + 1) +"'></tr>")

  //날짜 계산
  for(var i = 0; i < 42; i++)
  {
    if(i == 0 && i == firstDate)
    {
      noBlankDate();
      break;
    }

    if(i < firstDate)
    {
      $('.calendar tr.week1').append("<td class='blank'></td>");
      date = 0;
    }
    else if(i < 7)
      $('.calendar tr.week1').append("<td>" + date + "</td>");
    else if(i < 14)
      $('.calendar tr.week2').append("<td>" + date + "</td>");
    else if(i < 21)
      $('.calendar tr.week3').append("<td>" + date + "</td>");
    else if(i < 28)
      $('.calendar tr.week4').append("<td>" + date + "</td>");
    else if(i < 35)
      $('.calendar tr.week5').append("<td>" + date + "</td>");
    else if(i < firstDate + lastDate)
      $('.calendar tr.week6').append("<td>" + date + "</td>");
    else
      $('.calendar tr.week6').append("<td class='blank'></td>");
    date++;
  }
}

//firstDate가 0일 때
function noBlankDate()
{
  var date = 1;
  
  for(var i = 0; i < 35; i ++)
  {
    if(i < 7)
      $('.calendar tr.week1').append("<td>" + date + "</td>");
    else if(i < 14)
      $('.calendar tr.week2').append("<td>" + date + "</td>");
    else if(i < 21)
      $('.calendar tr.week3').append("<td>" + date + "</td>");
    else if(i < 28)
      $('.calendar tr.week4').append("<td>" + date + "</td>");
    else if(i < getLastDate())
      $('.calendar tr.week5').append("<td>" + date + "</td>");
    else
      $('.calendar tr.week5').append("<td class='blank'></td>");
    date++;
  }
}

//달력 설정
function setCal()
{
  var firstDate = getFirstDay();
  var lastDate = getLastDate();

  //몇 주인지 계산
  if((firstDate + lastDate) < 35)
    set5weeks(firstDate, lastDate);
  else
    set6weeks(firstDate, lastDate);

  //header 월 표시
  $('header h2').html(getMonthInEnglish());
  $('header h3').html(year);
}

//달력 초기화
function refreshCal()
{
  var weekNum = $('.calendar tr').length;
  for(var i = 0; i < weekNum; i++)
  {
    var weekClass = '.calendar tr.week' + (i + 1);
    $(weekClass).remove();
  }
}

//다음 달
function nextMonth()
{
  month++;
  if(month > 12)
    {
      year++;
      month = 1;
    }
}

//저번 달
function beforeMonth()
{
  month--;
  if(month < 1)
  {
    year--;
    month = 12;
  }
}

function getWritten()
{
  //일기 쓴 날짜 배열
  var writtenDiv = $('#written').children();
  var writtenDateArr = new Array();
  var writtenMonthArr = new Array();
  var writtenYearArr = new Array();
  writtenDiv.each(function(i){
    string = writtenDiv.eq(i).text().split("-");
    writtenYearArr.push(string[0]);
    writtenMonthArr.push(string[1]);
    writtenDateArr.push(string[2]);
  });

  var user = $('#currentUser p').text();
  var userDiv = $('#user').children();
  var userArr = new Array();
  userDiv.each(function(i){
    userArr.push(userDiv.eq(i).text());
  });

  //td 배열
  var td = $('tr').children();
  var tdArr = new Array();
  td.each(function(i){
    tdArr.push(td.eq(i));
  });

  //요일 제거
  for(var i = 0; i < 7; i++)
    tdArr.shift();

  for(var i = 0; i < writtenDateArr.length; i++)
  {
    if(userArr[i] == user && writtenMonthArr[i] == month && writtenYearArr[i] == year)
      addWrittenClass(tdArr, writtenDateArr)
  }

  //일기 쓴 날짜 배열에 오늘 포함시 일기쓰기 버튼 숨김
  for(var i = 0; i < writtenDateArr.length; i++)
  {
    if(userArr[i] == user && writtenMonthArr[i] == month && writtenYearArr[i] == year && writtenDateArr[i] == today)
      $('.btn.right').hide();
  }
}

//일기 쓴 날짜에 written 클래스 추가
function addWrittenClass(tdArr, writtenDateArr)
{
  for(i = 1; i < tdArr.length; i++)
  {
    if(writtenDateArr.includes(tdArr[i].text()))
      $(tdArr[i]).addClass("written");
  }
}

function getPK(date)
{
  var index;

  //일기 쓴 날짜 배열
  var writtenDiv = $('#written').children();
  var writtenArr = new Array();
  writtenDiv.each(function(i){
    writtenArr.push(writtenDiv.eq(i).text().split("-")[2]);
  });

  for(var i = 0; i < writtenArr.length; i++)
  {
    if(writtenArr[i] == date)
      index = i;
  }

  //pk 배열
  var pkDiv = $('#pk').children();
  var pkArr = new Array();
  pkDiv.each(function(i){
    pkArr.push(pkDiv.eq(i).text());
  });

  //클릭된 날짜의 pk 반환
  return pkDiv[index].innerHTML;
}

$(window).ready(function(event){
  //header 날짜 표시
  $('header h1').html(today);

  //달력 표시
  setCal();
  getWritten();

  //저번 달
  $('header img.left').on("click", function(event){
    beforeMonth();
    refreshCal();
    setCal();
    getWritten();
  });
  //다음 달
  $('header img.right').on("click", function(event){
    nextMonth();
    refreshCal();
    setCal();
    getWritten();
  });

  $('.written').on("click", function(event){
    window.location.href = "/post/" + getPK($(this).text());
  });
});
