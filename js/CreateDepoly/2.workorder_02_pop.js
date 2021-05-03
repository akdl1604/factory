 
/*  $(document).ready(function(){

    $("select option[value='2.workorder_02.html']").attr("selected", true);
}); */

 
 // 팝업 종료 버튼(X) 클릭 이벤트
 function ClosePopup(flag) {
    modals[flag].style.display="none";
}

function check_save(){

 if(temp_check)
 {
    location.href="3.registration.html";
    pop_workorder_btn_click('workorder_next');
 }
 else
 {
     modals[2].style.display="block";
 }

}

function workorder_02_save_btn()
{
    //작업지시서 양식 맞는지 확인후 true false값 리턴
    temp_check = true;
}


/* $('input:checkbox[name="checkbox"]').each(function() {

    this.checked = true; //checked 처리

    if(this.checked){//checked 처리된 항목의 값

          alert(this.value); 

    }

}); */


var temp_check = false;

var modals = document.getElementsByClassName("modal");
