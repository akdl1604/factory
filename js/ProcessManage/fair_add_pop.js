window.onload = function () {
    //페이지 로딩시 체크 박스 해제
    if ($('input:checkbox[id="OutcheckSelect"]').is(":checked") == true) {
        $('input:checkbox[id="OutcheckSelect"]').prop("checked", false)
    }

    //대분류 종류 값 가져오기
    // LargeCategory
    //원본 공정 대분류 조회 Ajax 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/MainProcessList", null, true, function (data) {
        //id="list" 값 초기화
        $("#LargeCategory").empty();

        //Html 형식 저장 변수
        var html = '';

        //초기 선택 요청 Option 넣기
        html += '<option>';
        html += '대분류 선택';
        html += '</option>';

        $("#LargeCategory").append(html);

        html = '';

        //foreach
        $.each(data, function (i, v) {
            html += '<option value="' + v.PROCESS_MAIN_CATEGORY_ID + '">';
            html += v.PROCESS_MAIN_CATEGORY_NAME;
            html += '</option>';

            $("#LargeCategory").append(html);

            html = '';
        });

        //마지막에 직접입력 Option 넣기
        html += '<option value="nope">';
        html += '직접입력';
        html += '</option>';

        $("#LargeCategory").append(html);

        //값 초기화
        html = '';
    });
}

// 외주 CheckBox 클릭 이벤트
$('#OutcheckSelect').click(function () {
    var btn = document.getElementById('OutcheckSelect_bt');

    if ($('input:checkbox[id="OutcheckSelect"]').is(":checked") == true) {
        //외주 체크 박스 선택 시    
        btn.disabled = false;
        btn.className = "btn_blue";
    } else {
        //외주 체크 박스 미 선택 시
        btn.disabled = 'disabled';
        btn.className = "btn_grey";
    }
});

// 버튼 비활성,활성화 이벤트
$('#OutcheckSelect_bt').click(function () {
    // 공정 수정 팝업 선택 창
    // GET 방식으로 arg1 = 0 -> 공정 등록
    window.open('customer_add.html?arg1=' + 0, 'BOM 선택', 'left='+(screen.availWidth-470)/2+',top='+(screen.availHeight-450)/2+', width=470px,height=450px');
});

// 대분류 콤보 박스 선택 이벤트 
$('#LargeCategory').change(function () {
    // Option Value 값, 고유 값
    $("#LargeCategory option:selected").val();
    // Option Text 값, 텍스트 값
    $("#LargeCategory option:selected").text();

    // 직접 입력 옵션 선택 시 -> LargeCategoryInput Input Visible
    // 직접 입력 선택 안할 시 텍스트값 초기화
    if ($("#LargeCategory option:selected").text() == "직접입력") {
        $("#LargeCategoryInput").attr("disabled", false);
    } else {
        $("#LargeCategoryInput").attr("disabled", true);
        $("#LargeCategoryInput").val("");
    }

    // 명칭 컬럼 값
    $("#CategoryName").val();
    // Code 컬럼 값
    $("#CategoryCode").val();
});

// 저장 버튼 클릭 이벤트
$('#SelectBt').click(function () {
    var Category_Id = '';
    var CheckBox = '';

    // 대분류 선택 필터링 필요
    if ($("#LargeCategory option:selected").text() == "대분류 선택") {
        alert("대분류를 선택 해 주세요.");
        return;
    } else if ($("#CategoryName").val() == "") {
        alert("명칭을 입력 해 주세요.");
        return;
    } else if ($("#CategoryCode").val() == "") {
        alert("코드 값을 입력 해 주세요.");
        return;
    }

    //공정 값이 공백일 경우 0, 아닐 시 1
    if ($("#DisabledValue").val() == '') {
        CheckBox = 0;
    } else {
        CheckBox = 1;
    }

    // (int) PROCESS_MAIN_CATEGORY_ID : 공정 대분류 식별 키
    // (String) ORIGIN_PROCESS_NAME : 공정명
    // (String) ORIGIN_PROCESS_CODE : 공정코드
    // (String) ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY : 공정 자주검사 파일 디렉토리
    // (int) ORIGIN_PROCESS_OUTSOURCING_REGISTER : 공정 외주 선택
    // (String) ORIGIN_PROCESS_CUSTOMER_NAME : 공정 외주 선택 시 거래처명
    // (String) ORIGIN_PROCESS_CUSTOMER_NUMBER : 공정 외주 선택 시 사업자명
    var params = {
        PROCESS_MAIN_CATEGORY_ID: $("#LargeCategory option:selected").val(),
        ORIGIN_PROCESS_NAME: $("#CategoryName").val(),
        ORIGIN_PROCESS_CODE: $("#CategoryCode").val(),
        ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY: "",
        ORIGIN_PROCESS_OUTSOURCING_REGISTER: CheckBox,
        ORIGIN_PROCESS_CUSTOMER_NAME: $("#DisabledValue").val(),
        ORIGIN_PROCESS_CUSTOMER_NUMBER: $("#DisabledNo").val()
    }

    // 만약 대분류에서 직접입력을 눌렀을 경우 직접 입력한 대분류가 추가 된다.
    if ($("#LargeCategory option:selected").text() == "직접입력") {
        // 직접 입력한 대분류 명 입력
        params = {
            PROCESS_MAIN_CATEGORY_NAME: $("#LargeCategoryInput").val()
        }

        // 대분류 입력으로 인한_대분류 등록
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/MainCategoryRegister", params, true, function (data) {
            if (data.MainCategoryRegister == 0) {
                alert("대분류 명이 중복 됬습니다.");
            } else {
                fun_ajax("GET", "http://220.89.167.212:8085/testing05/MainProcessList", null, true, function (data) {
                    //foreach
                    $.each(data, function (i, v) {
                        if (v.PROCESS_MAIN_CATEGORY_NAME == $("#LargeCategoryInput").val()) {
                            Category_Id = v.PROCESS_MAIN_CATEGORY_ID;
                        }
                    });

                    // 직접 입력으로 입력한 대분류 ID 값을 가져오기 위함
                    var params_input = {
                        PROCESS_MAIN_CATEGORY_ID: Category_Id,
                        ORIGIN_PROCESS_NAME: $("#CategoryName").val(),
                        ORIGIN_PROCESS_CODE: $("#CategoryCode").val(),
                        ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY: "",
                        ORIGIN_PROCESS_OUTSOURCING_REGISTER: CheckBox,
                        ORIGIN_PROCESS_CUSTOMER_NAME: $("#DisabledValue").val(),
                        ORIGIN_PROCESS_CUSTOMER_NUMBER: $("#DisabledNo").val()
                    }

                    // 원본 공정 등록 Ajax 통신
                    fun_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterProcess", params_input, true, function (data) {
                        if (data.ProcessRegisterON == 0) {
                            alert("공정 명이 중복 됩니다.");
                        } else {
                            self.close();
                        }
                    });
                });
            }
        });

    } else {
        // 원본 공정 등록 Ajax 통신
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterProcess", params, true, function (data) {
            if (data.ProcessRegisterON == 0) {
                alert("공정 명이 중복 됩니다.");
            } else {
                self.close();
            }
        });
    }
});

// 팝업 종료
function ClosePopup(){
    self.close();
}