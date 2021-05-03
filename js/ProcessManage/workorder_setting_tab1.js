// 원본 공정 테이블 tr의 하이라이트를 관리하는 배열
var process_register_table_array = new Array();

// 작업내용 및 특이사항 조회 Params
var paramsT = '';
// 설비 조회 Params
var parmas_facilities = '';
// 설비 클릭 시 삭제를 위한 var
var Facilities_EQUIPMENT_ID = '';
// 공정 세부 설정 클릭 값(0->클릭 안함, 1->클릭 함)
var Process_bar = 0;
// 설비 리스트 클릭 값
var TaskContents_EQUIPMENT_ID = '';
// 자주 검사 저장 변수
var SelfInspectionHtml = [];
// 공정 업데이트를 위한 변수
var Updateparams = new Array();
// 테스트
var HtmlCode = '';

// 자주 검사(값)
// 입력 배열값 저장
var tdArr_ = '';

window.onload = function () {
    // 공정 리스트 가져오기
    SelectProcess();
}

// 공정 리스트 가져오기
function SelectProcess() {
    // 공정 종류 가져오기
    // 공정 전체 조회 Ajax 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/AllselectProcess", null, true, function (data) {
        //대분류 종류 값 가져오기
        //원본 공정 대분류 조회 Ajax 통신
        fun_ajax("GET", "http://220.89.167.212:8085/testing05/MainProcessList", null, true, function (data_Category) {
            //id="list" 값 초기화
            $("#process_register_tbody").empty();

            //Html 형식 저장 변수
            var html = '';

            //foreach
            $.each(data, function (i, v) {
                $.each(data_Category, function (j, d) {
                    if (v.PROCESS_MAIN_CATEGORY_ID == d.PROCESS_MAIN_CATEGORY_ID) {
                        html += '<tr>'
                        html += '<td>' + d.PROCESS_MAIN_CATEGORY_NAME + '</td>';
                        html += '<td>' + v.ORIGIN_PROCESS_NAME + '</td>';
                        html += '<td>' + v.ORIGIN_PROCESS_CODE + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_OUTSOURCING_REGISTER + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_CUSTOMER_NAME + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_CUSTOMER_NUMBER + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_ID + '</td>';
                        html += '<td style="display: none;">' + v.PROCESS_MAIN_CATEGORY_ID + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER + '</td>';
                        // 자주 검사 항목 key, value 값으로 저장
                        var obj = new Object();
                        obj[v.ORIGIN_PROCESS_ID] = v.ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY;
                        SelfInspectionHtml.push(obj);
                        html += '</tr>';

                        $("#process_register_tbody").append(html);

                        html = '';
                    }
                });
            });
        });
    });
}

// 테이블의 Row 클릭시 값 가져오기
$("#process_register_table").on('click', 'tr', function () {
    var tdArr = new Array();	// 배열 선언

    // 현재 클릭된 Row(<tr>)
    var tr = $(this);
    var td = tr.children();

    var i;
    var tabNum = tr.parent().children().length; //부모의 자식수. 즉, tbody의 tr의 갯수를 리턴합니다.
    for (i = 0; i < tabNum; i++) {
        tr.parent().children()[i].className = '';
    }
    // 선택 한 행 Class 변경
    tr.attr('class', 'on');

    // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
    td.each(function (i) {
        tdArr.push(td.eq(i).text());
    });

    // td.eq(index)를 통해 값을 가져올 수도 있다.
    // 외주명
    var ORIGIN_PROCESS_CUSTOMER_NAME_Value = td.eq(4).text().trim();
    // 외주 여부
    var ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value = td.eq(3).text().trim();

    if (ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value == 0) {
        $("#DisabledValue").val("");
    } else {
        $("#DisabledValue").val(ORIGIN_PROCESS_CUSTOMER_NAME_Value);
    }

    // 공정 세부 설정 수정 Params
    for (var i = 0; i < 9; i++) {
        Updateparams[i] = td.eq(i).text();
    }

    // 작업내용 및 특이사항 Params
    paramsT = {
        ORIGIN_PROCESS_ID: td.eq(6).text().trim()
    }

    // 작업내용 및 특이사항 가져오기
    SearchUniquess();

    // 설비 테이블 params
    parmas_facilities = {
        PROCESS_MAIN_CATEGORY_ID: td.eq(7).text().trim()
    }

    // 설비 리스트 가져오기
    SearchFacilities();

    // 공정 세부 설정 클릭 시 값 입력
    Process_bar = 1;

    // TODO: 자주 검사 출력 인터페이스 추가 필요
    // 자주 검사 출력
    $("#SelfInspectionList").empty();

    SelfInspectionHtml.forEach(function (value) {
        // Object Key 값 구하기
        var obj_key = Object.keys(value);
        // Object value 값 구하기
        if (obj_key == td.eq(6).text().trim()) {
            $("#SelfInspectionList").append(value[obj_key]);
            HtmlCode = value[obj_key];
        }
    })

    // 자주검사 항목 체크 해제
    $("input:checkbox[name=check]").prop("checked", false);
});

// 공정명 검색 버튼
$("#search_process_name").click(function () {
    var params = {
        ORIGIN_PROCESS_NAME: $("#process_name").val(),
    }

    // Ajax
    // 공정명 검색
    // (String) ORIGIN_PROCESS_NAME : 공정명
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SearchProcess", params, true, function (data) {
        //대분류 종류 값 가져오기
        //원본 공정 대분류 조회 Ajax 통신
        fun_ajax("GET", "http://220.89.167.212:8085/testing05/MainProcessList", null, true, function (data_Category) {
            //id="list" 값 초기화
            $("#process_register_tbody").empty();

            //Html 형식 저장 변수
            var html = '';

            //foreach
            $.each(data, function (i, v) {
                $.each(data_Category, function (j, d) {
                    if (v.PROCESS_MAIN_CATEGORY_ID == d.PROCESS_MAIN_CATEGORY_ID) {
                        html += '<tr>'
                        html += '<td>' + d.PROCESS_MAIN_CATEGORY_NAME + '</td>';
                        html += '<td>' + v.ORIGIN_PROCESS_NAME + '</td>';
                        html += '<td>' + v.ORIGIN_PROCESS_CODE + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_OUTSOURCING_REGISTER + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_CUSTOMER_NAME + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_CUSTOMER_NUMBER + '</td>';
                        html += '<td style="display: none;">' + v.ORIGIN_PROCESS_ID + '</td>';
                        html += '<td style="display: none;">' + v.PROCESS_MAIN_CATEGORY_ID + '</td>';
                        html += '</tr>'

                        $("#process_register_tbody").append(html);

                        html = '';
                    }
                });
            });
        });
    });
});

//작업내용 및 특이사항 + 버튼 클릭 이벤트
$("#TaskContentsInsert").on('click', function () {
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.")
    } else {
        var html = '';

        html += '<tr>';
        html += '<td class="pd"><input type="text" name="contents" width="100%"></td>';
        html += '</tr>';

        $('#TaskContentsTable').append(html);
    }
});

// 작업내용 및 특이사항 테이블 클릭 할 경우
$("#TaskContentsTable").on('click', 'tr', function () {
    var tdArr = new Array();	// 배열 선언

    // 현재 클릭된 Row(<tr>)
    var tr = $(this);
    var td = tr.children();

    var i;
    var tabNum = tr.parent().children().length; //부모의 자식수. 즉, tbody의 tr의 갯수를 리턴합니다.
    for (i = 0; i < tabNum; i++) {
        tr.parent().children()[i].className = '';
    }
    // 선택 한 행 Class 변경
    tr.attr('class', 'on');

    // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
    td.each(function (i) {
        tdArr.push(td.eq(i).text());
    });

    // td.eq(index)를 통해 값을 가져올 수도 있다.
    TaskContents_EQUIPMENT_ID = td.eq(0).text().trim();
});


// 작업내용 및 특이사항 수정 팝업
function TaskContentsUpdate(arg1, arg2, arg3) {
    //ORIGIN_UNIQUESS_ID - arg1
    //ORIGIN_PROCESS_ID - arg2
    //ORIGIN_UNIQUESS_CONTEXT -arg3
    var url = 'pop/taskcontent_pop.html?arg1=' + arg1 + '&arg2=' + arg2 + '&arg3=' + arg3;

    window.open(url, '작업내용 및 특이사항 수정', 'left=' + (screen.availWidth - 950) / 2 + ',top=' + (screen.availHeight - 277) / 2 + ', width=950px,height=277px');
}

// 설비 수정 팝업
function FacilitiesContentsUpdate(arg1, arg2, arg3, arg4) {
    // "ORIGIN_EQUIPMENT_ID" : arg1
    // "ORIGIN_EQUIPMENT_NAME" : arg2
    // "ORIGIN_EQUIPMENT_MODELNAME" : arg3
    // "ORIGIN_EQUIPMENT_CONTEXT" : arg4
    var url = 'pop/facilitiescontent_pop.html?arg1=' + arg1 + '&arg2=' + arg2 + '&arg3=' + arg3 + '&arg4=' + arg4;

    window.open(url, '설비', 'left=' + (screen.availWidth - 950) / 2 + ',top=' + (screen.availHeight - 300) / 2 + ', width=950px,height=300px');
}

//작업 내용 및 특이사항 가져오기
function SearchUniquess() {
    // 작업내용 및 특이사항 가져오기
    // (Table Tbody) TaskContentsTable
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SearchUniquess", paramsT, true, function (data) {
        //id="list" 값 초기화
        $("#TaskContentsTable").empty();

        //Html 형식 저장 변수
        var html = '';

        $.each(data, function (i, v) {
            html += '<tr>'
            html += '<td style="display: none;">' + v.ORIGIN_UNIQUESS_ID + '</td>';
            html += '<td style="display: none;">' + v.ORIGIN_PROCESS_ID + '</td>';
            html += '<td><a onclick="TaskContentsUpdate(' + v.ORIGIN_UNIQUESS_ID + ', ' + v.ORIGIN_PROCESS_ID + ', \'' + v.ORIGIN_UNIQUESS_CONTEXT + '\');" style="cursor:pointer;">' + v.ORIGIN_UNIQUESS_CONTEXT + '</a></td>';
            html += '</tr>'

            $("#TaskContentsTable").append(html);

            html = '';
        });
    });
}

//설비 부분 + 추가 클릭시 input 추가 부분
$('#equipment_insert').click(function () {
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
    } else {
        var html = '';

        html += '<tr>';
        html += '<td class=""><input name="contents" type="text" width="100%"></td>';
        html += '<td class=""><input name="model" type="text" ></td>';
        html += '<td class=""><input name="company" type="text" ></td>';
        html += '</tr>';

        $('#table_facilities_table').append(html);
    }
});

//설비 부분 - 삭제 클릭시
$('#equipment_delete').click(function () {
    if (Facilities_EQUIPMENT_ID == '') {
        alert("삭제 할 리스트를 클릭 해 주세요.");
    } else {
        var params = {
            ORIGIN_EQUIPMENT_ID: Facilities_EQUIPMENT_ID
        }

        // Facilities_EQUIPMENT_ID -> ORIGIN_EQUIPMENT_ID 값
        // 설비 테이블 삭제
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/DeleteEquip", params, true, function (data) {
            if (data.DeleteEquip == 1) {
                // 설비 가져오기
                SearchFacilities();
            } else {
                console.log("설비 삭제 실패");
            }
        });
    }
});

// 설비 테이블 클릭 할 경우
$("#FacilitiesTable").on('click', 'tr', function () {
    var tdArr = new Array();	// 배열 선언

    // 현재 클릭된 Row(<tr>)
    var tr = $(this);
    var td = tr.children();

    var i;
    var tabNum = tr.parent().children().length; //부모의 자식수. 즉, tbody의 tr의 갯수를 리턴합니다.
    for (i = 0; i < tabNum; i++) {
        tr.parent().children()[i].className = '';
    }
    // 선택 한 행 Class 변경
    tr.attr('class', 'on');

    // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
    td.each(function (i) {
        tdArr.push(td.eq(i).text());
    });

    // td.eq(index)를 통해 값을 가져올 수도 있다.
    Facilities_EQUIPMENT_ID = td.eq(0).text().trim();
});

// 설비 가져오기
function SearchFacilities() {
    // 설비 테이블 가져오기
    // (Table Tbody) FacilitiesTable
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectProcessEquip", parmas_facilities, true, function (data) {
        //id="FacilitiesTable" 값 초기화
        $("#FacilitiesTable").empty();

        //Html 형식 저장 변수
        var html = '';

        // "ORIGIN_EQUIPMENT_ID" : 4,
        // "ORIGIN_EQUIPMENT_NAME" : "조립1호기_수정",
        // "ORIGIN_EQUIPMENT_MODELNAME" : "대영건설_수정",
        // "ORIGIN_EQUIPMENT_CONTEXT" : "내용"
        $.each(data, function (i, v) {
            html += '<tr>'
            html += '<td style="display: none;">' + v.ORIGIN_EQUIPMENT_ID + '</td>';
            html += '<td style="display: none;">' + v.ORIGIN_PROCESS_ID + '</td>';
            html += '<td style="display: none;">' + v.PROCESS_MAIN_CATEGORY_ID + '</td>';
            html += '<td><a onclick="FacilitiesContentsUpdate(' + v.ORIGIN_EQUIPMENT_ID + ', \'' + v.ORIGIN_EQUIPMENT_NAME + '\', \'' + v.ORIGIN_EQUIPMENT_MODELNAME + '\', \'' + v.ORIGIN_EQUIPMENT_CONTEXT + '\');" style="cursor:pointer;">' + v.ORIGIN_EQUIPMENT_CONTEXT + '</a></td>';
            html += '<td><a onclick="FacilitiesContentsUpdate(' + v.ORIGIN_EQUIPMENT_ID + ', \'' + v.ORIGIN_EQUIPMENT_NAME + '\', \'' + v.ORIGIN_EQUIPMENT_MODELNAME + '\', \'' + v.ORIGIN_EQUIPMENT_CONTEXT + '\');" style="cursor:pointer;">' + v.ORIGIN_EQUIPMENT_MODELNAME + '</a></td>';
            html += '<td><a onclick="FacilitiesContentsUpdate(' + v.ORIGIN_EQUIPMENT_ID + ', \'' + v.ORIGIN_EQUIPMENT_NAME + '\', \'' + v.ORIGIN_EQUIPMENT_MODELNAME + '\', \'' + v.ORIGIN_EQUIPMENT_CONTEXT + '\');" style="cursor:pointer;">' + v.ORIGIN_EQUIPMENT_NAME + '</a></td>';
            html += '</tr>'

            $("#FacilitiesTable").append(html);

            html = '';
        });
    });
}

// 자주 검사 추가 항목 값 테스트
function SelfInspectionFunction() {
    tdArr_ = $("#value").val();
    tdArr_ = tdArr_.split(",");

    // Append 변수 초기화
    var html = '<tr>';
    var html_2 = '';
    var html_3 = ''; var html_4 = '</td></tr>';

    // 구분-> 측정값
    // 옵션-> 단일
    // 위에 설정일 경우 자주 검사 추가 항목
    if ($("#PSelectComboBox").val() == "측정값" && $("#PMeasurementsSelect").val() == "단일") {
        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">1</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        // 공정 설정 페이지 Show Code
        for (var i = 0; i < tdArr_.length; i += 2) {
            html_3 += '<span name="First">' + tdArr_[i] + '</span>';
            html_3 += '<input type="text" style="width:60px;" disabled>';
            html_3 += '<span name="Second">' + tdArr_[i + 1] + '</span> &nbsp&nbsp';
        }

        // 공정 수정 페이지 Show Code
        html_3 += '<div name="MeasurementsLi" style="display: none;">';

        for (var j = 0; j < tdArr_.length; j += 2) {
            html_3 += '<li>';
            html_3 += '<input name="value" type="text" value="' + tdArr_[j] + '">';
            html_3 += '<input type="text" disabled>';
            html_3 += '<input name="value" type="text" value="' + tdArr_[j + 1] + '">';
            html_3 += '</li>';
        }

        html_3 += '</div>';

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
    // 구분-> 측정값
    // 옵션-> 범위
    else if ($("#PSelectComboBox").val() == "측정값" && $("#PMeasurementsSelect").val() == "범위") {
        // TODO: 테스트를 위한 초기화 값 설정 추후 삭제
        html = '<tr>';
        html_2 = '';
        html_3 = '';
        html_4 = '</td></tr>';
        //=============================================

        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">2</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        for (var i = 0; i < tdArr_.length; i += 2) {
            // 공정 설정 페이지 Show Code
            html_3 += '<span name="First">' + tdArr_[i] + '</span>&nbsp;';
            html_3 += '<input type="text" style="width:60px;" disabled>';
            html_3 += '<label>&nbsp;&nbsp;~</label>';
            html_3 += '<input type="text" style="width:60px;" disabled>&nbsp;';
            html_3 += '<span name="Second">' + tdArr_[i + 1] + '</span>';
        }

        // 공정 수정 페이지 Show Code
        html_3 += '<div name="MeasurementsLi" style="display: none;">';

        for (var j = 0; j < tdArr_.length; j += 2) {
            html_3 += '<input name="value" type="text" value="' + tdArr_[j] + '">';
            html_3 += '<input type="text" disabled>';
            html_3 += '<label>~</label>';
            html_3 += '<input type="text" disabled>';
            html_3 += '<input name="value" type="text" value="' + tdArr_[j + 1] + '">';
            html_3 += '</div>';
        }

        html_3 += '</div>';

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
    // 구분-> 합/불 체크
    else if ($("#PSelectComboBox").val() == "합/불 체크") {
        // TODO: 테스트를 위한 초기화 값 설정 추후 삭제
        html = '<tr>';
        html_2 = '';
        html_3 = '';
        html_4 = '</td></tr>';
        //=============================================

        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">3</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        // 공정 설정 페이지 Show Code
        for (var i = 0; i < tdArr_.length; i += 2) {
            html_3 += '<label><input type="checkbox" ' + (tdArr_[i] == "true" ? 'checked' : '') + ' disabled><span>합격</span></label>';
            html_3 += '<label><input type="checkbox" ' + (tdArr_[i + 1] == "true" ? 'checked' : '') + ' disabled><span>불합격</span></label>';
        }

        // 공정 수정 페이지 Show Code
        html_3 += '<div name="MeasurementsLi" style="display: none;">';

        for (var j = 0; j < tdArr_.length; j += 2) {
            html_3 += '<li>';
            html_3 += '    <input name="value" type="checkbox" ' + (tdArr_[j] == "true" ? 'checked' : '') + '>';
            html_3 += '    <label>합</label>';
            html_3 += '    <label> / </label>';
            html_3 += '    <input name="value" type="checkbox" ' + (tdArr_[j + 1] == "true" ? 'checked' : '') + '>';
            html_3 += '    <label>불</label>';
            html_3 += '</li>';
        }

        html_3 += '</div>';

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
    // 구분 -> 유/무 체크
    else if ($("#PSelectComboBox").val() == "유/무 체크") {
        // TODO: 테스트를 위한 초기화 값 설정 추후 삭제
        html = '<tr>';
        html_2 = '';
        html_3 = '';
        html_4 = '</td></tr>';
        //=============================================

        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">4</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        // 공정 설정 페이지 Show Code
        for (var i = 0; i < tdArr_.length; i += 2) {
            html_3 += '<label><input type="checkbox" ' + (tdArr_[i] == "true" ? 'checked' : '') + ' disabled><span>유</span></label>';
            html_3 += '<label><input type="checkbox" ' + (tdArr_[i + 1] == "true" ? 'checked' : '') + ' disabled><span>무</span></label>';
        }

        // 공정 수정 페이지 Show Code
        html_3 += '<div name="MeasurementsLi" style="display: none;">';

        for (var j = 0; j < tdArr_.length; j += 2) {
            html_3 += '<li>';
            html_3 += '    <input name="value" type="checkbox" ' + (tdArr_[j] == "true" ? 'checked' : '') + '>';
            html_3 += '    <label>유</label>';
            html_3 += '    <label> / </label>';
            html_3 += '    <input name="value" type="checkbox" ' + (tdArr_[j + 1] == "true" ? 'checked' : '') + '>';
            html_3 += '    <label>무</label>';
            html_3 += '</li>';
        }

        html_3 += '</div>';

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
    // 구분 -> 항목 체크
    else if ($("#PSelectComboBox").val() == "항목 체크") {
        // TODO: 테스트를 위한 초기화 값 설정 추후 삭제
        html = '<tr>';
        html_2 = '';
        html_3 = '';
        html_4 = '</td></tr>';
        //=============================================

        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">5</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        // 공정 설정 페이지 Show Code
        for (var i = 0; i < tdArr_.length; i += 2) {
            html_3 += '<label><input type="checkbox" ' + (tdArr_[i] == "true" ? 'checked' : '') + ' disabled><span>' + tdArr_[i + 1] + '</span></label>';
        }

        // 공정 수정 페이지 Show Code
        html_3 += '<div name="MeasurementsLi" style="display: none;">';
        
        for (var j = 0; j < tdArr_.length; j += 2) {
            html_3 += '<input name="value" type="checkbox" ' + (tdArr_[j] == "true" ? 'checked' : '') + '>&nbsp';
            html_3 += '<input name="inputvalue" type="text" style="width:60px;" value="' + tdArr_[j + 1] + '" ">&nbsp&nbsp';
        }

        html_3 += '</div>';

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
    // 구분 -> 누설 검사
    else if ($("#PSelectComboBox").val() == "누설 검사") {
        // TODO: 테스트를 위한 초기화 값 설정 추후 삭제
        html = '<tr>';
        html_2 = '';
        html_3 = '';
        html_4 = '</td></tr>';
        //=============================================

        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 자식 페이지에서 HTML 코드 전달
        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">6</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        // 공정 설정 페이지 Show Code
        html_3 += tdArr_[0];

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
    // 구분 -> 문장 -> 확인
    else if ($("#PSelectComboBox").val() == "문장" && $("#PselectItem").val() == "확인") {
        // TODO: 테스트를 위한 초기화 값 설정 추후 삭제
        html = '<tr>';
        html_2 = '';
        html_3 = '';
        html_4 = '</td></tr>';
        //=============================================

        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">7</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        // 공정 설정 페이지 Show Code
        html_3 += '<input name="value" type="checkbox" ' + (tdArr_[0] == "true" ? 'checked' : '') + ' disabled>&nbsp;';
        html_3 += '<label>' + tdArr_[1] + '</label>';

        // 공정 수정 페이지 Show Code
        html_3 += '<div name="MeasurementsLi" style="display: none;">';
        html_3 += '<input name="value" type="checkbox" ' + (tdArr_[0] == "true" ? 'checked' : '') + '>&nbsp;'
        html_3 += '<input name="inputvalue" type="text" value="' + tdArr_[1] + '">'
        html_3 += '</div>';

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
    // 구분 -> 문장 -> 입력
    else if ($("#PSelectComboBox").val() == "문장" && $("#PselectItem").val() == "입력") {
        // TODO: 테스트를 위한 초기화 값 설정 추후 삭제
        html = '<tr>';
        html_2 = '';
        html_3 = '';
        html_4 = '</td></tr>';
        //=============================================

        html_2 += '<td>';
        html_2 += '<label><input name="SelectCheck" type="checkbox"><span name="PTitleName">' + $("#PTitleName").val() + '</span></label>';
        html_2 += '</td>';
        html_2 += '<td name="Rcontents">';

        // 구분, 옵션
        html_3 += '<label name="choice" style="display: none;">8</label>';
        // 옵션 2(개수)
        html_3 += '<label name="optioncount1" style="display: none;">' + $("#OptionCount1").val() + '</label>';
        // 옵션 2(항목 체크 개수)
        html_3 += '<label name="optioncount2" style="display: none;">' + $("#OptionCount2").val() + '</label>';

        // 자식 페이지에서 HTML 코드 전달
        html_3 += '<label>' + tdArr_[0] + '</label>';
        html_3 += '<input type="text" style="width:50px;" disabled>';
        
        // 공정 수정 페이지 Show Code
        html_3 += '<div name="MeasurementsLi" style="display: none;">';
        html_3 += '<input name="value" type="text" value="' + tdArr_[0] + '">';
        html_3 += '<input type="text" disabled></input>';
        html_3 += '</div>';

        // 현존 디자인에 맞춰서 html에 추가
        html += html_2 += html_3 += html_4;

        // 자주 검사 List에 Append
        $("#SelfInspectionList").append(html);
    }
}

// 자주 검사 추가 버튼 클릭 이벤트
$('#SelfInspectionAdd').click(function () {
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
    } else {
        window.open('pop/fair_pop.html', 'BOM 선택', 'left=' + (screen.availWidth - 865) / 2 + ',top=' + (screen.availHeight - 277) / 2 + ', width=950px,height=277px');
    }
});

// 작업 내용 및 특이사항 - 삭제 버튼 클릭 이벤트
$("#TaskContentsDelete").click(function () {
    if (TaskContents_EQUIPMENT_ID == '') {
        alert("설비 리스트를 클릭 해 주세요.");
    } else {
        var params = {
            ORIGIN_UNIQUESS_ID: TaskContents_EQUIPMENT_ID
        }

        // TaskContents_EQUIPMENT_ID -> ORIGIN_UNIQUESS_ID 값
        // 작업 내용 및 특이사항 테이블 삭제
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/DeleteUniquess", params, true, function (data) {
            if (data.DeleteUniquess == 1) {
                // 작업 내용 및 특이사항 가져오기
                SearchUniquess();
            } else {
                alert("프리셋 등록이 되어 삭제가 안됩니다.");
            }
        });
    }
});

// 공정 리스트 클릭 삭제
$("#DeleteProcess").on('click', function () {
    // 공정 리스트 클릭 예외 처리
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
    } else {
        // 선택 한 공정 삭제
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/DeleteProcess", paramsT, true, function (data) {
            // 공정 리스트 새로고침
            SelectProcess();
        });
    }
});

// 공정 리스트 클릭 수정
$("#UpdateProcess").click(function () {
    // 공정 리스트 클릭 예외 처리
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
    } else {
        // 수정 창 띄우기
        window.open('pop/fair_add_rewrite.html?arg1=' + Updateparams, 'BOM 선택', 'left=' + (screen.availWidth - 485) / 2 + ',top=' + (screen.availHeight - 380) / 2 + ', width=485px,height=380px');
    }
});

// 공정 추가 선택
$("#OutcheckSelect_bt").on('click', function () {
    window.open('pop/fair_add.html', 'BOM 선택', 'left=' + (screen.availWidth - 485) / 2 + ',top=' + (screen.availHeight - 380) / 2 + ', width=485px,height=380px');
});

// 자주검사 항목 체크 모달 삭제 버튼 클릭
$("#CheckDelete").on('click', function () {
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.")
    } else {
        // 자주 검사 항목 리스트 공백으로 수정
        $("#SelfInspectionList").empty();

        // 모달 창 Display 숨기기
        $(".modal").css("display", "none");
    }
});

// 자주검사 항목 체크 모달 취소 버튼 클릭
$("#CheckCancle").click(function () {
    // 모달 창 Display 숨기기
    $(".modal").css("display", "none");

    // 자주검사 항목 체크 해제
    $("input:checkbox[name=check]").prop("checked", false);
});

// 자주검사 항목 체크 Change
$("#SelfInspectionCheck").change(function () {
    // 자주검사 공정 선택 후 항목 체크
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
        // 자주검사 항목 체크 해제
        $("input:checkbox[name=check]").prop("checked", false);
    } else {
        // 항목 체크가 되어   있을 경우 모달 창 Show
        if ($("input:checkbox[name=check]").is(":checked") == true) {
            $(".modal").css("display", "block");
        } else {
            // 항목 체크가 안되어 있을 경우 모달 창 Hide
            // 모달 창 Display 숨기기
            $(".modal").css("display", "none");
        }

    }
});

// 공정 설정 저장 버튼 클릭
// 1. 작업 내용 및 특이사항 Insert 
// 2. 설비 내용 Insert
// 3. 자주검사 코드 Update
$("#process_save").click(function () {
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
    } else {
        // 작업내용 및 특이사항 중 새롭게 Insert한 ROW 값 확인
        var allListElements = $("input[name=contents]");
        var size = $("#TaskContentsTable").find(allListElements).length;

        // 작업내용 및 특이사항 새롭게 추가된 Input 값들 넣기
        for (var i = 0; i < size; i++) {
            var params = {
                ORIGIN_PROCESS_ID: Updateparams[6],
                ORIGIN_UNIQUESS_CONTEXT: $("#TaskContentsTable").find(allListElements).eq(i).val()
            }

            // 1. 작업내용 및 특이사항 Insert Ajax 통신
            fun_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterUniquess", params, true, function (data) {
                if (data.RegisterUniquess == 0) {
                    alert("입력 실패");
                }
            });
        }

        // 설비 중 새롭게 Insert한 ROW 값 확인
        // name="contents" : 내용
        // name="model"    : 모델
        // name="company"  : 제조사
        var allListElementscontents = $("input[name=contents]");
        var allListElementsmodel = $("input[name=model]");
        var allListElementscompany = $("input[name=company]");

        // 설비는 추가 컬럼 크기는 내용 컬럼 size 기준으로 정한다.
        var sizecontents = $("#FacilitiesTable").find(allListElementscontents).length;

        // 작업내용 및 특이사항 새롭게 추가된 Input 값들 넣기
        for (var i = 0; i < sizecontents; i++) {
            var params = {
                PROCESS_MAIN_CATEGORY_ID: Updateparams[7],
                ORIGIN_EQUIPMENT_NAME: $("#FacilitiesTable").find(allListElementscompany).eq(i).val(),
                ORIGIN_EQUIPMENT_MODELNAME: $("#FacilitiesTable").find(allListElementsmodel).eq(i).val(),
                ORIGIN_EQUIPMENT_CONTEXT: $("#FacilitiesTable").find(allListElementscontents).eq(i).val()
            }

            // 1. 작업내용 및 특이사항 Insert Ajax 통신
            fun_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterEquip", params, true, function (data) {
                if (data.RegisterEquip == 0) {
                    alert("입력 실패");
                }
            });
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
        // FormData 객체 생성
        var params = new FormData();

        params.append('ORIGIN_PROCESS_ID', Updateparams[6]);
        params.append('PROCESS_MAIN_CATEGORY_ID', Updateparams[7]);
        params.append('ORIGIN_PROCESS_NAME', Updateparams[1]);
        params.append('ORIGIN_PROCESS_CODE', Updateparams[2]);
        params.append('ORIGIN_PROCESS_OUTSOURCING_REGISTER', Updateparams[3]);
        params.append('ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER', Updateparams[8]);
        params.append('ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY', $("#SelfInspectionList").html());
        params.append('ORIGIN_PROCESS_CUSTOMER_NAME', Updateparams[4]);
        params.append('ORIGIN_PROCESS_CUSTOMER_NUMBER', Updateparams[5]);

        // 3. 원본 공정 수정 Ajax 통신
        fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateProcess", params, function (data) {
            if (data.ProcessUpdateOn == 0) {
                alert("수정 실패");
            } else {
                // 새로고침
                location.reload();
            }
        });
    }
});

// 설비 검색 버튼 클릭 이벤트
$("#search_equipment_name").on('click', function () {
    var searchTerm = $("#equipment_name").val();
    var listItem = $("#FacilitiesTable").children('tr');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

    $.extend($.expr[':'], {
        'containsi': function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    $("#FacilitiesTable tr").not(":containsi('" + searchSplit + "')").each(function (e) {
        // $(this).attr('visible', 'false');
        $(this).css("display", "none");
    });

    $("#FacilitiesTable tr:containsi('" + searchSplit + "')").each(function (e) {
        // $(this).attr('visible', 'true');
        $(this).css("display", "");
    });
});

// 자주검사 삭제 버튼 클릭 이벤트
$("#SelfInspectionDelete").on('click', function () {
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
    } else {
        // 항목 체크
        var allListElements = $('input:checkbox[name="SelectCheck"]');
        var size = $("#SelfInspectionList").find(allListElements).length;

        // Check 박스 값들
        // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
        for (var i = 0; i < size; i++) {
            // 자주 검사 좌측 클릭 된 체크 박스 항목 true
            if ($("#SelfInspectionList").find(allListElements).eq(i).is(":checked") == true) {
                // 체크 박스 선택 ROW 값 삭제
                // tr > td > label > input:checkbox[name="SelectCheck"]
                $("#SelfInspectionList").find(allListElements).parent().parent().parent().eq(i).empty();
            }
        }
    }

});

// 자주 검사 수정 버튼 클릭 이벤트
$('#SelfInspectionUpdate').click(function () {
    if (Process_bar == 0) {
        alert("공정 리스트를 클릭 해 주세요.");
    } else {
        // HTML 코드 전달 위한 배열
        var trArr = new Array();
        // 선택한 값의 구분,옵션 배열
        var choiceArr = new Array();
        // 선택한 값의 검사항목 Title
        var nameArr = new Array();
        // 옵션 2 측정값 단일
        var countArr1 = 0;
        // 옵션 2 항목체크
        var countArr2 = 0;
        // 체크 박스 Count
        var checkCount = 0;

        // 항목 체크
        var allListElements = $('input:checkbox[name="SelectCheck"]');
        // 공정 수정 Name
        var allListElementsRight = $('div[name="MeasurementsLi"]');
        var allListElementsOption1 = $('label[name=optioncount1]');
        var allListElementsOption2 = $('label[name=optioncount2]');
        var allListElementsType = $("label[name=choice]");
        var allListElementsName = $("span[name=PTitleName]");
        var size = $("#SelfInspectionList").find(allListElements).length;

        // Check 박스 값들
        // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
        for (var i = 0; i < size; i++) {
            // 자주 검사 좌측 클릭 된 체크 박스 항목 true
            if ($("#SelfInspectionList").find(allListElements).eq(i).is(":checked") == true) {
                // 자주 검사 클릭 된 우측 값 가져오기
                trArr.push($("#SelfInspectionList").find(allListElementsRight).eq(i).html());
                choiceArr.push($("#SelfInspectionList").find(allListElementsType).eq(i).text());
                nameArr.push($("#SelfInspectionList").find(allListElementsName).eq(i).text());
                countArr1 = $("#SelfInspectionList").find(allListElementsOption1).eq(i).text();
                countArr2 = $("#SelfInspectionList").find(allListElementsOption2).eq(i).text();

                window.open('pop/fair_pop_revise.html?arg1=' + trArr + '&arg2=' + choiceArr + '&arg3=' + nameArr + '&arg4=' + countArr1 + '&arg5=' + countArr2,
                    "_blank",
                    'left=' + (screen.availWidth - 865) / 2 + ',top=' + (screen.availHeight - 360) / 2 + ', width=950px,height=360px');

                // 체크 박스 선택 카운트
                checkCount++;

                // 초기화
                // HTML 코드 전달 위한 배열
                trArr = new Array();
                // 선택한 값의 구분,옵션 배열
                choiceArr = new Array();
                // 선택한 값의 검사항목 Title
                nameArr = new Array();
                // 옵션 2 측정값 단일
                countArr = 0;
                // 옵션 2 항목체크
                countArr2 = 0;
            }
        }
        if(checkCount == 0){
            alert("수정 시 자주검사 옆 체크박스를 선택해 주세요.");
        }
    }
});

// 자주검사 수정 페이지에서 수정 후 호출
function FinalUpdate() {
    // 항목 체크
    var allListElements = $('input:checkbox[name="SelectCheck"]');
    var size = $("#SelfInspectionList").find(allListElements).length;

    // Check 박스 값들
    // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
    for (var i = 0; i < size; i++) {
        // 자주 검사 좌측 클릭 된 체크 박스 항목 true
        if ($("#SelfInspectionList").find(allListElements).eq(i).is(":checked") == true) {
            // 체크 박스 선택 ROW 값 삭제
            // tr > td > label > input:checkbox[name="SelectCheck"]
            $("#SelfInspectionList").find(allListElements).parent().parent().parent().eq(i).empty();
        }
    }
}