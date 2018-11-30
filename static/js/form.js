var d = new Date();
var year = d.getFullYear(); //연도
var month = d.getMonth() + 1; //월
var date = d.getDate(); //날짜

//월 영어 이름
function getMonthInEnglish()
{
  var monthList = new Array('January', 'February', 'March', 'April',  'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  return monthList[month-1];
}

//랜덤 명언
function getSaying()
{
  var random = Math.floor(Math.random()*5);
  var saying = new Array(
    '나의 오늘은 어제 죽은 사람들이 <br> 그토록 원하던 내일이다', 
    '바람이 불지 않을 때 <br> 바람개비를 돌리는 방법은 <br> 앞으로 달려나가는 것이다',
    '지나간 슬픔에 <br> 새로운 눈물을 낭비하지 말라',
    '미친 짓이란 매번 똑같은 행동을 반복하면서 <br> 다른 결과를 기대하는 것이다',
    '삶이란 불충분에서 <br> 충분을 끌어내는 기술이다'
  );
  var person = new Array(
    '리처드 바크',
    '데일 카네기',
    '에우리피데스',
    '아인슈타인',
    'S.버틀러'
  )
  
  //명언 추가
  $('#say').html(saying[random]);
  $('#person').html("- " + person[random] + " -");
}

$(window).ready(function(event){
    //header 날짜 표시
    $('header h1').html(date);
    $('header h2').html(getMonthInEnglish());
    $('header h3').html(year);

    // 글쓰기페이지에 날짜 추가
    $('#id_title').val(year + "-" + month + "-" + date);

    //명언 표시
    getSaying();
});