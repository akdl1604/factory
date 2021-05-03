window.onload = function () {
  //세션 스토리지 -- 세션과는 차이가 있음 참고(https://tristan91.tistory.com/521)
  // var n = sessionStorage.getItem("test");
  // alert(n);
  //======================================

  //페이지가 온로드 될때 ajax 통신을 통해 각 요소에 접근하여 값을 세팅해야함.

  // table 동적 생성
  var html = '';

  for (var i = 0; i < 2; i++) {
    html += '<tr>';
    html += '<td>' + 'test' + '</td>';
    html += '<td>' + '3/6' + '</td>';
    html += '<td>' + 'test' + '</td>';
    html += '<td>' + 'test' + '</td>';
    html += '<td>' + 'test' + '</td>';
    html += '</tr>';
  }

  $("#home_tbody").append(html);
  var ctx = document.getElementById("myChart");

  //작업 완료 태그 값 접근
  var com = document.getElementsByClassName("com")[0];
  com = com.getElementsByTagName('b')[1].textContent;

  //작업 중인 태그 값 접근
  var ing = document.getElementsByClassName("ing")[0];
  ing = ing.getElementsByTagName('b')[1].textContent;

  //작업 중인 태그 값 접근
  var bad = document.getElementsByClassName("bad")[0];
  bad = bad.getElementsByTagName('b')[1].textContent;


  //작업 중인 태그 값 접근
  var out = document.getElementsByClassName("out")[0];
  out = out.getElementsByTagName('b')[1].textContent;

  //작업지시서 총 갯수 태그 값 접근
  var total = document.getElementsByClassName("main")[0];
  total = total.getElementsByClassName('home_box1')[0];
  total = total.getElementsByClassName('main_top')[0];
  total = total.getElementsByTagName('h9')[0].textContent;

  //작업지시서 총 갯수 태그 값 접근
  var now = document.getElementsByClassName("main2")[0];
  now = now.getElementsByClassName('home_box1')[0];
  now = now.getElementsByClassName('main_top')[0];
  now.getElementsByTagName('p')[0].textContent;
  now.getElementsByTagName('h9')[0].textContent;



  //차트 생성
  com *= 1;
  ing *= 1;
  var result = com / (total) * 100;

  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      /* labels: ['완료', '진행중'], */
      datasets: [{
        label: '# of Tomatoes',
        data: [com, ing],
        backgroundColor: [
          'rgba(64, 96, 179, 1)',
          'rgba(0, 178, 216, 1)'
        ],
        borderColor: [
          'rgba(64, 96, 179, 1)',
          'rgba(0, 178, 216, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      /* width:'100%', */
      /* percentageInnerCutout: 40, */
      cutoutPercentage: 70,
      responsive: true,
      maintainAspectRatio: false,

    }
  });

  Chart.pluginService.register({
    beforeDraw: function (chart) {
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      ctx.restore();
      var fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";

      var text = result.toFixed(1) + "%",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  });

  // 실시간 시간 변경 및 날짜 변경

  var clockTarget = document.getElementById("time");
  var dayTarget = document.getElementById("date");


  function clock() {
    var date = new Date();
    // date Object를 받아오고 

    var month = date.getMonth() + 1;
    // 달을 받아옵니다 

    var clockDate = date.getDate();
    // 몇일인지 받아옵니다 

    var hours = date.getHours();

    var minutes = date.getMinutes();


    if (hours > 12) {
      hours = hours - 12;
      clockTarget.innerText = "오후 " + hour(hours) + ":" + minute(minutes);
    }

    else {
      clockTarget.innerText = "오전 " + hour(hours) + ":" + minute(minutes);
    }

    dayTarget.innerText = month + "월" + clockDate + "일";

    // 월은 0부터 1월이기때문에 +1일을 해주고 

    // 시간 분 초는 한자리수이면 시계가 어색해보일까봐 10보다 작으면 앞에0을 붙혀주는 작업을 3항연산으로 했습니다. 
  }


  function init() {

    clock();

    // 최초에 함수를 한번 실행시켜주고 
    setInterval(clock, 1000);

    // setInterval이라는 함수로 매초마다 실행을 해줍니다.

    // setInterval은 첫번째 파라메터는 함수이고 두번째는 시간인데 밀리초단위로 받습니다. 1000 = 1초 

  }

  function hour(hours) {
    return hours < 10 ? "0" + hours : hours
  }

  function minute(minutes) {
    return minutes < 10 ? "0" + minutes : minutes
  }
  init();
}