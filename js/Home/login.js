function callFunction() {
    var modals = document.getElementsByClassName("modal");
    var spanes = document.getElementsByClassName("close");
    var btns = document.getElementsByClassName("btn_bs");

    // Json 형식으로 전송 할 데이터 담기
    var params = {
        "ORIGIN_ACCOUNT_EMPLOYEENUMBER": $('#ORIGIN_ACCOUNT_EMPLOYEENUMBER').val(),
        "ORIGIN_ACCOUNT_PASSWORD": $('#ORIGIN_ACCOUNT_PASSWORD').val()
    }
    
    //alert(params.ORIGIN_ACCOUNT_EMPLOYEENUMBER + "///" + params.ORIGIN_ACCOUNT_PASSWORD)

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/LoginReturn", params, true, function(data) {

        //alert(data.ORIGIN_ACCOUNT_ID+"//"+data.ORIGIN_ACCOUNT_MEMBERNAME);
        // alert(data[0].ORIGIN_ACCOUNT_DIVISION_ID);
        // alert(data[0].ORIGIN_ACCOUNT_MEMBERNAME);
        // alert(data[0].WORKER_PROPERTY_ID);
        // alert(data[0].ORIGIN_EQUIPMENT_ID);
        // alert(data[0].ORIGIN_PROCESS_ID);
        // alert(data[0].ORIGIN_ACCOUNT_PASSWORD);
        // alert(data[0].ORIGIN_ACCOUNT_TYPE);
        // alert(data[0].ORIGIN_ACCOUNT_EMPLOYEENUMBER);
        // alert(data[0].ORIGIN_ACCOUNT_DEPARTMENT);
        // alert(data[0].ORIGIN_ACCOUNT_TIER);
        // alert(data[0].ORIGIN_ACCOUNT_RESIDENTNUMBER);
        // alert(data[0].ORIGIN_ACCOUNT_CREATEDATE);
        // alert(data[0].ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID);
        if(data.login_fail==1){
            //세션 스토리지 -- 세션과는 차이가 있음 참고(https://tristan91.tistory.com/521)
            sessionStorage.setItem("ORIGIN_ACCOUNT_ID",data.ORIGIN_ACCOUNT_ID);
            sessionStorage.setItem("ORIGIN_ACCOUNT_DIVISION_ID",data.ORIGIN_ACCOUNT_DIVISION_ID);
            sessionStorage.setItem("ORIGIN_ACCOUNT_MEMBERNAME",data.ORIGIN_ACCOUNT_MEMBERNAME);
            sessionStorage.setItem("WORKER_PROPERTY_ID",data.WORKER_PROPERTY_ID);
            sessionStorage.setItem("ORIGIN_EQUIPMENT_ID",data.ORIGIN_EQUIPMENT_ID);
            sessionStorage.setItem("ORIGIN_PROCESS_ID",data.ORIGIN_PROCESS_ID);
            sessionStorage.setItem("ORIGIN_ACCOUNT_PASSWORD",data.ORIGIN_ACCOUNT_PASSWORD);
            sessionStorage.setItem("ORIGIN_ACCOUNT_TYPE",data.ORIGIN_ACCOUNT_TYPE);
            sessionStorage.setItem("ORIGIN_ACCOUNT_EMPLOYEENUMBER",data.ORIGIN_ACCOUNT_EMPLOYEENUMBER);
            sessionStorage.setItem("ORIGIN_ACCOUNT_DEPARTMENT",data.ORIGIN_ACCOUNT_DEPARTMENT);
            sessionStorage.setItem("ORIGIN_ACCOUNT_TIER",data.ORIGIN_ACCOUNT_TIER);
            sessionStorage.setItem("ORIGIN_ACCOUNT_RESIDENTNUMBER",data.ORIGIN_ACCOUNT_RESIDENTNUMBER);
            sessionStorage.setItem("ORIGIN_ACCOUNT_CREATEDATE",data.ORIGIN_ACCOUNT_CREATEDATE);
            sessionStorage.setItem("ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID",data.ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID);
            //세션 스토리지 값 사용 예제
            //var n = sessionStorage.getItem("ORIGIN_ACCOUNT_ID");
            //==========================================================================

            location.href = "home.html";
        }else{
            modals[0].style.display = "block";
        }
    });

    // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
    spanes[0].onclick = function () {
        modals[0].style.display = "none";
    }

    // 확인 버튼을 클릭하면 Modal이 닫습니다.
    btns[0].onclick = function () {
        modals[0].style.display = "none";
    }
}

function net_setting() {
    window.open('pop/login_set.html', '', 'left=' + (screen.availWidth - 360) / 2 + ',top=' + (screen.availHeight - 200) / 2 + ', width=360px,height=200px');
}

function find_pw() {
    window.open('pop/login_pw.html', '', 'left=' + (screen.availWidth - 360) / 2 + ',top=' + (screen.availHeight - 310) / 2 + ', width=360px,height=310px');
}