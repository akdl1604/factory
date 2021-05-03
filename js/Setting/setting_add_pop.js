//setting_add.html JS 영역======================================================================
var reader = '';

// 이미지 등록 버튼 클릭 이벤트
function setThumbnail(event) {
    $('#image_container').css('display', '');
    $('#image_container').empty();
    reader = new FileReader();
    reader.onload = function (event) {

        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);
        document.querySelector("div#image_container").appendChild(img);
    };
    reader.readAsDataURL(event.target.files[0]);
}

//이미지 삭제버튼 
function ImgDelete() {
    $('#image_container').empty();
    $('#FileImg').val(""); 
    var html = '';
    html += '<span id = "ShowImg">미리보기</span>';
    $('#image_container').append(html);
}


// 관리자 정보 추가 저장 버튼 클릭 이벤트
$("#save").click(function () {
    //필수 입력 값 필터링
    //성명
    var ORIGIN_ACCOUNT_MEMBERNAME_Value = $("#ORIGIN_ACCOUNT_MEMBERNAME").val();
    //사번
    var ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value = $("#ORIGIN_ACCOUNT_EMPLOYEENUMBER").val();
    //소속
    var ORIGIN_ACCOUNT_DEPARTMENT_Value = $("#ORIGIN_ACCOUNT_DEPARTMENT").val();
    //직급
    var ORIGIN_ACCOUNT_TIER_Value = $("#ORIGIN_ACCOUNT_TIER").val();
    //주민등록번호
    var ORIGIN_ACCOUNT_RESIDENTNUMBER_Value = $("#ORIGIN_ACCOUNT_RESIDENTNUMBER").val();
    //비밀번호
    var ORIGIN_ACCOUNT_PASSWORD_Value = $("#ORIGIN_ACCOUNT_PASSWORD").val();
    var ORIGIN_ACCOUNT_DIVISION_ID_Value = $("#ORIGIN_ACCOUNT_DIVISION_ID").val();
    if ($("input:checkbox[id='ORIGIN_ACCOUNT_DIVISION_ID']").is(":checked") == true) {
        ORIGIN_ACCOUNT_DIVISION_ID_Value = 3;
    }
    else {
        ORIGIN_ACCOUNT_DIVISION_ID_Value = 1;
    }

    //필수 항목 값들 필터링
    if (ORIGIN_ACCOUNT_MEMBERNAME_Value == '' || ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value == '' || ORIGIN_ACCOUNT_DEPARTMENT_Value == ''
        || ORIGIN_ACCOUNT_TIER_Value == '' || ORIGIN_ACCOUNT_RESIDENTNUMBER_Value == '' || ORIGIN_ACCOUNT_PASSWORD_Value == '' || reader == '') {
        $("#SettingAddModal").css('display', 'block');
    } else {
        // FormData 객체 생성
        var formData = new FormData();

        formData.append('ORIGIN_ACCOUNT_DIVISION_ID', ORIGIN_ACCOUNT_DIVISION_ID_Value);
        formData.append('ORIGIN_ACCOUNT_MEMBERNAME', ORIGIN_ACCOUNT_MEMBERNAME_Value);
        formData.append('ORIGIN_ACCOUNT_PASSWORD', ORIGIN_ACCOUNT_PASSWORD_Value);
        formData.append('ORIGIN_ACCOUNT_TYPE', "관리자");
        formData.append('ORIGIN_ACCOUNT_EMPLOYEENUMBER', ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value);
        formData.append('ORIGIN_ACCOUNT_DEPARTMENT', ORIGIN_ACCOUNT_DEPARTMENT_Value);
        formData.append('ORIGIN_ACCOUNT_TIER', ORIGIN_ACCOUNT_TIER_Value);
        formData.append('ORIGIN_ACCOUNT_RESIDENTNUMBER', ORIGIN_ACCOUNT_RESIDENTNUMBER_Value);
        formData.append('ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID', "1");
        formData.append('img file', $("input[id=FileImg]")[0].files[0]);

        // Ajax 사용자 가입
        fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterMember", formData, function(data) {
            // 부모 창 Relaod
            opener.parent.location.reload();

            // 창 종료
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