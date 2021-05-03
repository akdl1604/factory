window.onload = function () {
    var an = $(".on #aname", opener.document); //jquery 이용
    var ap = $(".on #apassword", opener.document); //jquery 이용
    var ai = $(".on #anum", opener.document); //jquery 이용
    var ar = $(".on #aresident", opener.document); //jquery 이용
    var ad = $(".on #adepart", opener.document); //jquery 이용
    var at = $(".on #atier", opener.document);
    var apho = $(".on #aphoto", opener.document);
    

    //alert(n[0].innerHTML);
    document.getElementById("nametext").value = an[0].innerHTML;
    document.getElementById("pwtext").value = ap[0].innerHTML;
    document.getElementById("idtext").value = ai[0].innerHTML;
    document.getElementById("residenttext").value = ar[0].innerHTML;

    $("#departtext").val(ad[0].innerText);
    $("#ranktext").val(at[0].innerText);
    $('#image_container').empty();

        var img = document.createElement("img");
        img.setAttribute("src", apho[0].innerHTML);
        document.querySelector("div#image_container").appendChild(img);

    var html = '';

    //id="list" 값 초기화
    $("#list").empty();


    // 이미지 등록 버튼 클릭 이벤트
 
}

$("#save").click(function () {
    //필수 입력 값 필터링
    //성명
    var ORIGIN_ACCOUNT_MEMBERNAME_Value = $("#nametext").val();
    //사번
    var ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value = $("#idtext").val();
    //소속
    var ORIGIN_ACCOUNT_DEPARTMENT_Value = $("#departtext").val();
    //직급
    var ORIGIN_ACCOUNT_TIER_Value = $("#ranktext").val();
    //주민등록번호
    var ORIGIN_ACCOUNT_RESIDENTNUMBER_Value = $("#residenttext").val();
    //비밀번호
    var ORIGIN_ACCOUNT_PASSWORD_Value = $("#pwtext").val();
        
    if (ORIGIN_ACCOUNT_MEMBERNAME_Value == '' || ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value == '' || ORIGIN_ACCOUNT_DEPARTMENT_Value == ''
    || ORIGIN_ACCOUNT_TIER_Value == '' || ORIGIN_ACCOUNT_RESIDENTNUMBER_Value == '' || ORIGIN_ACCOUNT_PASSWORD_Value == '') {
    $("#SettingAddModal").css('display', 'block');
} else {
    $("#SettingAddModal").css('display', 'None');
        // Json 형식으로 전송 할 데이터 담기
        var params = {
            "ORIGIN_ACCOUNT_DIVISION_ID": 2,
            "ORIGIN_ACCOUNT_MEMBERNAME": ORIGIN_ACCOUNT_MEMBERNAME_Value,
            "ORIGIN_ACCOUNT_PASSWORD": ORIGIN_ACCOUNT_PASSWORD_Value,
            "ORIGIN_ACCOUNT_TYPE": "관리자",
            "ORIGIN_ACCOUNT_EMPLOYEENUMBER": ORIGIN_ACCOUNT_EMPLOYEENUMBER_Value,
            "ORIGIN_ACCOUNT_DEPARTMENT": ORIGIN_ACCOUNT_DEPARTMENT_Value,
            "ORIGIN_ACCOUNT_TIER": ORIGIN_ACCOUNT_TIER_Value,
            "ORIGIN_ACCOUNT_RESIDENTNUMBER": ORIGIN_ACCOUNT_RESIDENTNUMBER_Value,
            "ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID": 1
        }
        
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateMember", params, true, function(data) {
            // 부모 창 Relaod
            ClosePopup();
            opener.parent.location.reload();

        });
    }   
});

//사진 미리보기 등록
var acid = $(".on #aid", opener.document);
var arracid = acid[0].innerHTML;
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
    

        // FormData 객체 생성
        var formData = new FormData();

        formData.append('ORIGIN_ACCOUNT_ID', arracid);
        formData.append('img file', $("input[id=FileImg]")[0].files[0]);
        

        fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/WorkerImgUpdate", formData, function(data) {
            // 부모 창 Relaod
            //opener.parent.location.reload();


        });
}
//이미지 미리보기, 사진 삭제
function ImgDelete() {
    var params = {
        "ORIGIN_ACCOUNT_ID": arracid
    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/WorkerImgDelete", params, true, function(data) {
        $('#FileImg').val("");    
        $('#image_container').empty();
        var html = '';
        html += '<span id = "ShowImg">미리보기</span>';
        $('#image_container').append(html);
    });
}

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