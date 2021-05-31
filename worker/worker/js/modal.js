  // Modal을 가져옵니다.
var modals = document.getElementsByClassName("modal");
// Modal을 띄우는 클래스 이름을 가져옵니다.
var btns = document.getElementsByClassName("btn");
// Modal을 닫는 close 클래스를 가져옵니다.
var spanes = document.getElementsByClassName("close");
var funcs = [];
 
// Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
function Modal(num) {
  return function() {
    // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
    btns[num].onclick =  function() {
      if($("#btn_stop").attr('value') == "작업 재개")
      {
        $("#btn_stop").val("일시 정지");
        $('#btn_stop').css('background-color', '#6179a3');
      }
      else if(num == 1)
      {
        modals[num].style.display = "none";
        btn_end_work();
      }
      else{
        modals[num].style.display = "block";
        console.log(num);
      }
    };
 
    // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
    spanes[num].onclick = function() {
        modals[num].style.display = "none";
    };
  };
}
 
// 원하는 Modal 수만큼 Modal 함수를 호출해서 funcs 함수에 정의합니다.
for(var i = 0; i < btns.length; i++) {
  funcs[i] = Modal(i);
}
 
// 원하는 Modal 수만큼 funcs 함수를 호출합니다.
for(var j = 0; j < btns.length; j++) {
  funcs[j]();
}
 
// Modal 영역 밖을 클릭하면 Modal을 닫습니다.
window.onclick = function(event) {
  if (event.target.className == "modal") {
      event.target.style.display = "none";
  }
};

//일시정지 모달
var origin_account_id = 1;

var stop_param = {
  "ORIGIN_ACCOUNT_ID" : origin_account_id,
  "JOBORDER_ID" : 184,
  "JOBORDER_PROCESS_ID" : null,
  "JOBORDER_PROCESS_RESULT_ID" : 1,
  "JOBORDER_EQUIPMENT_ID" : 1,
  "PROCESS_RESULT_TEMPLATE_QUANTITY" : 3,
  "PROCESS_RESULT_TEMPLATE_BADCODE" : 2,
  "PROCESS_RESULT_TEMPLATE_BADQUANTITY" : 4,
  "PROCESS_RESULT_TEMPLATE_GOODQUANTITY" : 2,
  "JOBORDER_CODEFILE" : null,
  "JOBORDER_PROCESS_STOPRESULT_STOP_CONTEXT" : $("#stop_reason").val()
}

//모달 확인 클릭 이벤트
function modal_delete_ok(type){
  if(type==0){
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/StopJbWork", stop_param, true, function (data){
        var stopjbwork = data.StopJbWork;
        if(stopjbwork == 0)
        {
          $("#stop_reason").val("");
          modals[type].style.display = "none";
        }
        else if(stopjbwork ==1)
        {
          $('#btn_stop').val("작업 재개");
          $('#btn_stop').css('background-color', '#6f7f94');
          modals[type].style.display = "none";
        }
    });
      
  }
  else if(type==2){
    //취소 처리
    location.reload();
    modals[type].style.display = "none";
  }
}

//모달 취소 클릭 이벤트
function modal_delete_cancle(type){
  if(type==0 || type==2){
      modals[type].style.display = "none";
  }
}