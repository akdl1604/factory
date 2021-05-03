// 수정 파라미터 저장 값
var array = '';

$.urlParam = function (key) {
    var _parammap = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        _parammap[decode(arguments[1])] = decode(arguments[2]);
    });

    return _parammap[key];
}

$(document).ready(function () {
    //페이지 로딩시 체크 박스 해제
    if ($('input:checkbox[id="OutcheckSelect"]').is(":checked") == true) {
        $('input:checkbox[id="OutcheckSelect"]').prop("checked", false)
    }

    //대분류 종류 값 가져오기
    // LargeCategory
    //원본 공정 대분류 조회 Ajax 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/MainProcessList", null, false, function (data) {
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

    // 이전 페이지에서 값 가져오기
    array = $.urlParam('arg1').split(",");

    // [0] = PROCESS_MAIN_CATEGORY_NAME
    // [1] = ORIGIN_PROCESS_NAME
    // [2] = ORIGIN_PROCESS_CODE
    // [3] = ORIGIN_PROCESS_OUTSOURCING_REGISTER
    // [4] = ORIGIN_PROCESS_CUSTOMER_NAME
    // [5] = ORIGIN_PROCESS_CUSTOMER_NUMBER
    // [6] = ORIGIN_PROCESS_ID
    // [7] = PROCESS_MAIN_CATEGORY_ID

    // LargeCategory 대분류 -> PROCESS_MAIN_CATEGORY_NAME
    // Ajax false 일 경우 동기 요청으로 처리 해야 Select 값이 변경 된다.
    // if true 일 경우 콤보 박스 값이 설정 되지 않는다.
    $("#LargeCategory").val(array[7]);

    // CategoryName 명칭 -> ORIGIN_PROCESS_NAME
    $("#CategoryName").val(array[1]);
    // CategoryCode 코드 -> ORIGIN_PROCESS_CODE
    $("#CategoryCode").val(array[2]);
    // ORIGIN_PROCESS_OUTSOURCING_REGISTER 값이 1일 경우에만 외주 명 값이 나온다
    // DisabledValue 외주 명 -> ORIGIN_PROCESS_CUSTOMER_NAME
    if (array[3] == 1) {
        $("#DisabledValue").val(array[4]);
    }

    // 외주 선택 이후 페이지
    // 외주 선택 이전에는 실행 되지 않는다.
    if ($.urlParam('arg2') != undefined) {
        $("#DisabledValue").val($.urlParam('arg2'));
        $("#DisabledNo").val($.urlParam('arg3'));
    }
});

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

// 외주 체크 박스 선택 이후 외주 선택 버튼 클릭 이벤트
$('#OutcheckSelect_bt').click(function () {
    // 공정 수정 팝업 선택 창
    // GET 방식으로 arg1 = 0 -> 공정 등록
    // GET 방식으로 arg1 = 1 -> 공정 수정
    window.open('customer_add.html?arg1=' + 1 + '&arg2=' + $.urlParam('arg1'), 'BOM 선택', 'left=' + (screen.availWidth - 470) / 2 + ',top=' + (screen.availHeight - 450) / 2 + ', width=470px,height=450px');
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

    // 가지고 있는 값========================================
    // [0] = PROCESS_MAIN_CATEGORY_NAME
    // [1] = ORIGIN_PROCESS_NAME
    // [2] = ORIGIN_PROCESS_CODE
    // [3] = ORIGIN_PROCESS_OUTSOURCING_REGISTER
    // [4] = ORIGIN_PROCESS_CUSTOMER_NAME
    // [5] = ORIGIN_PROCESS_CUSTOMER_NUMBER
    // [6] = ORIGIN_PROCESS_ID
    // [7] = PROCESS_MAIN_CATEGORY_ID
    // [8] = ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER
    // 넣아야 하는 파라미터 값========================================
    // ORIGIN_PROCESS_ID
    // PROCESS_MAIN_CATEGORY_ID
    // ORIGIN_PROCESS_NAME
    // ORIGIN_PROCESS_CODE
    // ORIGIN_PROCESS_OUTSOURCING_REGISTER
    // ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER : 0 -> 자주 검사 사용, 1 -> 사용 안함
    // ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY
    // ORIGIN_PROCESS_CUSTOMER_NAME
    // ORIGIN_PROCESS_CUSTOMER_NUMBER
    // FormData 객체 생성
    var params = new FormData();

    params.append('ORIGIN_PROCESS_ID', array[6]);
    params.append('PROCESS_MAIN_CATEGORY_ID', $("#LargeCategory option:selected").val());
    params.append('ORIGIN_PROCESS_NAME', $("#CategoryName").val());
    params.append('ORIGIN_PROCESS_CODE', $("#CategoryCode").val());
    params.append('ORIGIN_PROCESS_OUTSOURCING_REGISTER', CheckBox);
    params.append('ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER', array[8]);
    params.append('ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY', $("#SelfInspectionList", opener.document).html());
    params.append('ORIGIN_PROCESS_CUSTOMER_NAME', $("#DisabledValue").val());
    params.append('ORIGIN_PROCESS_CUSTOMER_NUMBER', $("#DisabledNo").val());

    // 만약 대분류에서 직접입력을 눌렀을 경우 직접 입력한 대분류가 추가 된다.
    if ($("#LargeCategory option:selected").text() == "직접입력") {
        // 직접 입력한 대분류 명 입력
        var Inputparams = {
            PROCESS_MAIN_CATEGORY_NAME: $("#LargeCategoryInput").val()
        }

        // 대분류 입력으로 인한_대분류 등록
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/MainCategoryRegister", Inputparams, true, function (data) {
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
                    var params_input = new FormData();

                    params_input.append('ORIGIN_PROCESS_ID', array[6]);
                    params_input.append('PROCESS_MAIN_CATEGORY_ID', Category_Id);
                    params_input.append('ORIGIN_PROCESS_NAME', $("#CategoryName").val());
                    params_input.append('ORIGIN_PROCESS_CODE', $("#CategoryCode").val());
                    params_input.append('ORIGIN_PROCESS_OUTSOURCING_REGISTER', CheckBox);
                    params_input.append('ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER', array[8]);
                    params_input.append('ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY', $("#SelfInspectionList", opener.document).html());
                    params_input.append('ORIGIN_PROCESS_CUSTOMER_NAME', $("#DisabledValue").val());
                    params_input.append('ORIGIN_PROCESS_CUSTOMER_NUMBER', $("#DisabledNo").val());

                    // 원본 공정 수정 Ajax 통신
                    fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateProcess", params_input, function (data) {
                        if (data.ProcessUpdateOn == 0) {
                            alert("수정 실패.");
                        } else {
                            self.close();
                        }
                    });
                });
            }
        });

    } else {
        // 원본 공정 수정 Ajax 통신
        fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateProcess", params, function (data) {
            if (data.ProcessUpdateOn == 0) {
                alert("수정 실패.");
            } else {
                self.close();
            }
        });
    }
});

// 팝업 종료
function ClosePopup() {
    self.close();
}