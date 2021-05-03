//페이지 로드시 테이블에 있는 값 텍스트박스에 매칭
window.onload = function () {
    var wn = $(".on #wname", opener.document); //jquery 이용
    var wp = $(".on #wpassword", opener.document); //jquery 이용
    var wi = $(".on #wnum", opener.document); //jquery 이용
    var wr = $(".on #wresident", opener.document); //jquery 이용
    var wd = $(".on #wdepart", opener.document); //jquery 이용
    var wt = $(".on #wtier", opener.document);
    var wper = $(".on #wper", opener.document);
    var wpho = $(".on #wphoto", opener.document);

    $("#departtext").val(wd[0].innerText);
    $("#ranktext").val(wt[0].innerText);

    // 할당 변경 권한 체크박스 표시
    if (wper[0].innerHTML == 3) {
        $('#permissiontext')[0].checked = true;
    }
    else {
        $('#permissiontext')[0].checked = false;
    }

    document.getElementById("nametext").value = wn[0].innerHTML;
    document.getElementById("pwtext").value = wp[0].innerHTML;
    document.getElementById("numtext").value = wi[0].innerHTML;
    document.getElementById("residenttext").value = wr[0].innerText;
    //썸네일 사진 불러오기
    $('#image_container').empty();

        var img = document.createElement("img");
        img.setAttribute("src", wpho[0].innerText);
        document.querySelector("div#image_container").appendChild(img);

    //id="list" 값 초기화
    $("#list").empty();
}
var wacid = $(".on #wid", opener.document);
var arrwacid = wacid[0].innerHTML;
//사진 수정, 썸네일
function setThumbnail(event) {
    $('#image_container').empty();
    $('#image_container').css('display', '');
    

    reader = new FileReader();
    reader.onload = function (event) {
        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);
 
        document.querySelector("div#image_container").appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);

        // FormData 객체 생성
        var formData = new FormData();

        formData.append('ORIGIN_ACCOUNT_ID', arrwacid);
        formData.append('img file', $("input[id=FileImg]")[0].files[0]);
        

        fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/WorkerImgUpdate", formData, function(data) {            

        });
}

//이미지 미리보기, 사진 삭제
function ImgDelete() {
    var params = {
        "ORIGIN_ACCOUNT_ID": arrwacid
    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/WorkerImgDelete", params, true, function(data) {
        $('#FileImg').val("");    
        $('#image_container').empty();
        var html = '';
        html += '<span id = "ShowImg">미리보기</span>';
        $('#image_container').append(html);
    });
}


$("#save").click(function () {
    //필수 입력 값 필터링
    //성명
    var ORIGIN_ACCOUNT_MEMBERNAME_Value = $("#nametext").val();
    //사번
    var ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value = $("#numtext").val();
    //소속
    var ORIGIN_ACCOUNT_DEPARTMENT_Value = $("#departtext").val();
    //직급
    var ORIGIN_ACCOUNT_TIER_Value = $("#ranktext").val();
    //주민등록번호
    var ORIGIN_ACCOUNT_RESIDENTNUMBER_Value = $("#residenttext").val();
    //비밀번호
    var ORIGIN_ACCOUNT_PASSWORD_Value = $("#pwtext").val();
    //권한 할당
    var ORIGIN_ACCOUNT_DIVISION_ID_Value = $("#permissiontext").val();
    if ($("input:checkbox[id='permissiontext']").is(":checked") == true) {
        ORIGIN_ACCOUNT_DIVISION_ID_Value = 3;
    }
    else {
        ORIGIN_ACCOUNT_DIVISION_ID_Value = 1;
    }
    
    if (ORIGIN_ACCOUNT_MEMBERNAME_Value == '' || ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value == '' || ORIGIN_ACCOUNT_DEPARTMENT_Value == ''
    || ORIGIN_ACCOUNT_TIER_Value == '' || ORIGIN_ACCOUNT_RESIDENTNUMBER_Value == '' || ORIGIN_ACCOUNT_PASSWORD_Value == '') {
    $("#SettingAddModal").css('display', 'block');
} else {
    $("#SettingAddModal").css('display', 'None');
    // Json 형식으로 전송 할 데이터 담기
    var params = {
        "ORIGIN_ACCOUNT_DIVISION_ID": ORIGIN_ACCOUNT_DIVISION_ID_Value,
        "ORIGIN_ACCOUNT_MEMBERNAME": ORIGIN_ACCOUNT_MEMBERNAME_Value,
        "ORIGIN_ACCOUNT_PASSWORD": ORIGIN_ACCOUNT_PASSWORD_Value,
        "ORIGIN_ACCOUNT_TYPE": "작업자",
        "ORIGIN_ACCOUNT_EMPLOYEENUMBER": ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value,
        "ORIGIN_ACCOUNT_DEPARTMENT": ORIGIN_ACCOUNT_DEPARTMENT_Value,
        "ORIGIN_ACCOUNT_TIER": ORIGIN_ACCOUNT_TIER_Value,
        "ORIGIN_ACCOUNT_RESIDENTNUMBER": ORIGIN_ACCOUNT_RESIDENTNUMBER_Value,
        "ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID": 1,
    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateMember", params, true, function (data) {
        // 부모 창 Relaod
        opener.parent.location.reload();

        ClosePopup();
    });
}
});

// 작업자 정보 모두 입력 요청 Modal X 버튼 이벤트
$("#CloseBt").click(function () {
    $("#SettingAddModal").css('display', 'none');
});

// 작업자 정보 모두 입력 요청 Modal 확인 버튼 이벤트
$("#CheckBt").click(function () {
    $("#SettingAddModal").css('display', 'none');
});

// 팝업 종료 버튼(X) 클릭 이벤트
function ClosePopup() {
    self.close();   //자기 자신창을 닫습니다.
}