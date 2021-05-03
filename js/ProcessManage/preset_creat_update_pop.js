var process_arr = new Array();
var process_del_arr = new Array();
var process_self_inspectionlist = new Object();
var last_position = 0;
var is_suc = true;
var preset_id = 0;

var ct_file_type = 0;

// 모달 종료 버튼(X) 클릭 이벤트
function modal_delete_cancle() {
    var modals = document.getElementsByClassName("modal");

    modals[0].style.display = "none";
}

function error_modal_delete_cancle() {
    var modals = document.getElementsByClassName("error_modal");

    modals[0].style.display = "none";
}

//페이지 로드시
window.onload = function () {
    //관리자 이름 가져오기
    var Membername = sessionStorage.getItem("ORIGIN_ACCOUNT_MEMBERNAME");
    document.getElementById('ORIGIN_ACCOUNT_MEMBERNAME').value = Membername;

    //생성일 가져오기
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = ("0" + (today.getMonth() + 1)).slice(-2);  // 월
    let date = ("0" + today.getDate()).slice(-2);  // 날짜
    var cur_day = year + "-" + month + "-" + date;
    document.getElementById('today').value = cur_day;

    //구분 리스트 
    //서버와 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/DetailPresetUseView", null, false, function(data) {
        var html = '';
        $.each(data,function(i,v){
            html += '<option value="'+v.USE_DIVISION_ID+'">'+v.USE_DIVISION_NAME+'</option>';
        });
        $('#USE_DIVISION_ID').append(html);
    });
    

    //공정 전체 검색
    SearchAll();
}

// 공정 전체 검색
function SearchAll() {
    // 공정 종류 가져오기
    // 공정 전체 조회 Ajax 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/AllselectProcess", null, false, function (data) {
        //대분류 종류 값 가져오기
        //원본 공정 대분류 조회 Ajax 통신
        fun_ajax("GET", "http://220.89.167.212:8085/testing05/MainProcessList", null, false, function (data_Category) {
            //id="list" 값 초기화
            $("#preset_create_process_tbody tr").remove();
            process_self_inspectionlist = new Object();
            //foreach
            $.each(data, function (i, v) {
                $.each(data_Category, function (j, d) {
                    if (v.PROCESS_MAIN_CATEGORY_ID == d.PROCESS_MAIN_CATEGORY_ID) {
                        var ORIGIN_PROCESS_OUTSOURCING_REGISTER = Check_undefined(v.ORIGIN_PROCESS_OUTSOURCING_REGISTER);
                        var ORIGIN_PROCESS_CUSTOMER_NAME = Check_undefined(v.ORIGIN_PROCESS_CUSTOMER_NAME);
                        var ORIGIN_PROCESS_CUSTOMER_NUMBER = Check_undefined(v.ORIGIN_PROCESS_CUSTOMER_NUMBER);
                        var ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER = Check_undefined(v.ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER);

                        var html = '';

                        html += '<tr>';
                        html += '    <input type="hidden" id= "SETTING_PRESET_PROCESS_ID" value="' + v.ORIGIN_PROCESS_ID + '">' //공정 식별 키
                        html += '    <td>' + d.PROCESS_MAIN_CATEGORY_NAME + '</td>';
                        html += '    <td>' + v.ORIGIN_PROCESS_NAME + '</td>';
                        html += '    <td>' + v.ORIGIN_PROCESS_CODE + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_OUTSOURCING_REGISTER + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_CUSTOMER_NAME + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_CUSTOMER_NUMBER + '</td>';
                        html += '    <td style="display: none;">' + v.PROCESS_MAIN_CATEGORY_ID + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER + '</td>';
                        html += '</tr>';

                        process_self_inspectionlist[v.ORIGIN_PROCESS_ID] = v.ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY;
                        $('#preset_create_process_tbody').append(html);
                    }
                });
            });
        });
    });

    $('#work_time_input').val("");
    $("#preset_create_work_specialnote_table tr").remove();
    $("#SelfInspectionList").empty();
}

//문자열 undefined 체크
function Check_undefined(str){
    var return_str = "";
    if(str != undefined){
        return_str = str;
    }
    return return_str;
}

//프리셋 공정 선택 및 추가 이벤트
$(function () {
    //공정 선택(클릭)
    $(document).on('click', '.box',
    function (e) {
        e.preventDefault();
        //공정을 선택했는지 필터링 : 선택했을 때
        if (CheckProcess()) {
            $('.order_box').removeClass('sel');
            $(this).addClass('sel');

            //공정 박스 순서
            var orderidx = GetOrderbox_idx();
            last_position = orderidx;
            //선택한 공정 값 가져오기
            SearchAll();
            //alert(process_arr[orderidx][1].ORIGIN_PROCESS_ID2);
            var selected_process = $('#preset_create_process_tbody input[value='+process_arr[orderidx][1].ORIGIN_PROCESS_ID2+']').parent();
            selected_process.addClass('on');

            //작업특이사항/자주검사 리스트 그리기(초기화)
            Search_work_specialnote(process_arr[orderidx][1].ORIGIN_PROCESS_ID2);
            
            //작업특이사항 체크했던거 표시
            var arr = process_arr[orderidx][1].ORIGIN_UNIQUESS_ID3;
            if(arr[0]!=null){
                for(var i= 0; i<arr.length; i++)
                {
                    var selected_process = $('#preset_create_work_specialnote_table input:checkbox[value='+arr[i]+']')[0];
                    selected_process.checked = true;
                }
            }

            //작업특이사항 추가했던부분 그리기
            var arr2 = process_arr[orderidx][2];
            for(var i= 0; i<arr2.length; i++){
                var html = '';
                html += '<tr>';
                html += '    <td><input type="checkbox" name="work_specialnote_insert" value="'+i+'" checked disabled></td>';
                html += '    <td>';
                html += '        <input type="text" style="width: 97%;" onkeyup="work_special_add_textchange(this)" value="'+arr2[i]+'">';
                html += '    </td>';
                html += '</tr>';
            
                $('#preset_create_work_specialnote_table').append(html);
            }

            //작업기준시간 
            $('#work_time_input').val(process_arr[orderidx][1].SETTING_PRESET_PROCESS_WORKTIME_MIN2);

            //자주검사 저장했던거로 출력
            $("#SelfInspectionList").empty();
            html = '';
            html = process_arr[orderidx][1].SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2;
            $("#SelfInspectionList").append(html);
        }
    });

    //공정 추가
    $(document).on('click', '.order_add',
    function (e) {
        e.preventDefault();
        
        var boxlist = $('.box');
        //공정 박스가 하나도 없을땐 체크 안함
        if(boxlist.length!=0){
            //공정을 선택했는지 필터링 : 선택했을 때
            if (CheckProcess()) {
                Order_add();
            }
        }else{
            Order_add();
        }
    });
});

//원본 공정 row data 클릭시
$('#preset_create_process_tbody').on("click", "tr", function () {
    //공정 하이라이트 초기화
    var tr_list = $("#preset_create_process_tbody tr");
    tr_list.removeClass('on');

    $(this).addClass('on');
    
    //선택된 공정 식별키 가져오기
    //tr
    var selected_process = $('#preset_create_process_tbody .on')[0];
    //공정 키
    var key = selected_process.getElementsByTagName('input')[0].value;
    //공정 명칭
    var name = selected_process.getElementsByTagName('td')[1].innerHTML;
    //공정 코드
    var num = selected_process.getElementsByTagName('td')[2].innerHTML;

    // 외주 여부
    var ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value = selected_process.getElementsByTagName('td')[3].innerHTML;
    // 외주명
    var ORIGIN_PROCESS_CUSTOMER_NAME_Value = selected_process.getElementsByTagName('td')[4].innerHTML;
    // 외주 사업자번호
    var ORIGIN_PROCESS_CUSTOMER_NUMBER_Value = selected_process.getElementsByTagName('td')[5].innerHTML;

    if (ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value == 0) {
        $("#DisabledValue").val("");
    } else {
        $("#DisabledValue").val(ORIGIN_PROCESS_CUSTOMER_NAME_Value);
        $("#OutcheckSelect")[0].checked = true;
    }

    //작업 기준시간 비우기
    $('#work_time_input').val("");

    //공정 박스에 선택된 공정 명칭과 코드 삽입
    $(".sel #order_name").html(name);
    $(".sel #order_code").html(num);

    Search_work_specialnote(key);

    //자주검사 가져오기 
    $("#SelfInspectionList").empty();
    html = '';
    html = process_self_inspectionlist[key];
    console.log(html);
    alert(html);
    $("#SelfInspectionList").append(html);
});

//작업특이사항 가져오기
function Search_work_specialnote(key){
    var params = {
        "ORIGIN_PROCESS_ID" : key
    }

    // 작업내용 및 특이사항 가져오기
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SearchUniquess", params, false, function (data) {
        //값 초기화
        $("#preset_create_work_specialnote_table tr").remove();

        $.each(data, function (i, v) {
            var html = '';
            html += '<tr>';
            html += '    <td><input type="checkbox" name="work_specialnote_checkbox" value="'+v.ORIGIN_UNIQUESS_ID+'"></td>';
            html += '    <td>';
            html += '        <p>' + v.ORIGIN_UNIQUESS_CONTEXT + '</p>';
            html += '    </td>';
            html += '</tr>';

            $('#preset_create_work_specialnote_table').append(html);
        });
    });
}

//작업트이사항 추가
function Work_Specialnote_add() {
    //선택한 공정 값 가져오기
    var selected_process = $('#preset_create_process_tbody .on');
    //공정을 선택했는지 필터링 : 선택했을 때
    if (selected_process.length >= 1) {
        var html = '';

        html += '<tr>';
        html += '    <td><input type="checkbox" name="work_specialnote_insert" value="'+i+'" disabled></td>';
        html += '    <td>';
        html += '        <input type="text" style="width: 97%;" onkeyup="work_special_add_textchange(this)">';
        html += '    </td>';
        html += '</tr>';
    
        $('#preset_create_work_specialnote_table').append(html);
    }
    //공정 선택 안했을 때
    else{
        alert("공정을 선택해주세요");
    }
}

//작업특이사항 글자 수에 따른 체크박스 수정 기능
function work_special_add_textchange(obj){
    var checkb = $(obj).parent().parent()[0].getElementsByTagName('input')[0];
    if($(obj).val().length==0){
        //체크된 체크박스의 tr찾아서 input 태그 값 가져오기(추가된 작업 특이사항 내용)
        checkb.checked = false;
    }else{
        checkb.checked = true;
    }
}

var cnt = 0;
// 공정 추가 기능
function Order_add() {
    //공정박스를 선택했는지 필터링 : 선택했을 때
    var issel = $('.sel');

    var html = '';
    cnt++;
    html += '<div class="order_box box sel add_box">';
    html += '    <input type="hidden" id= "order_box_idx"  value="' + 0 + '">' //공정 식별 키
    html += '    <a href="#"><span id="order_name"></span><span id="order_code"></span></a>';
    html += '</div>';

    if (issel.length > 0) {
        var selected_box = $(".sel");
        selected_box.removeClass('sel');
        selected_box.after(html);
    } else {
        $('#orderbox_list .order_add').before(html);
    }
    SearchAll();
}

// 공정 제거 기능
function Order_del() {
    //공정 박스 순서
    var orderidx = GetOrderbox_idx();

    //삭제할 공정 iD 관리
    if(process_arr[orderidx][1].SETTING_PRESET_PROCESS_ID!=0){
        process_del_arr.push(process_arr[orderidx][1].SETTING_PRESET_PROCESS_ID);
    }

    process_arr.splice(orderidx, 1);

    $('.sel').remove();

    SearchAll();
    console.log(process_arr);
    console.log(process_del_arr);

    var boxlist = $('.box');
    var idx = boxlist.length-1;
    boxlist.last().addClass('sel');

    if(idx!=-1){
        selected_process_event(idx);
    }

    //삭제된 뒤 index 재정렬
    for (var i = orderidx; i < process_arr.length; i++) {
        process_arr[i][1].SETTING_PRESET_PROCESS_INDEX2 -= 1;
    }
}

//현재 선택된 공정 박스 idx값(순서) 가져오기 
function GetOrderbox_idx() {
    var idx = 0;
    $('.box').each(function (i, v) {
        if (v == $('.sel')[0]) {
            idx = i;
        }
    });
    return idx;
}

function checkclasslist(obj, str){
    for(var i = 0; i < obj.classList.length; ++i){
		if( obj.classList[i] == str ) {
			// 클릭한 대상의 classList 에 active 가 존재한다면 true 를 반환합니다.
			return true;
		}
	}	
    return false;
}

//공정 선택 여부 필터링(true:선택 , false: 선택 알림)
function CheckProcess() {
    //선택한 공정 값 가져오기
    var selected_process = $('#preset_create_process_tbody .on');

    //공정을 선택했는지 필터링 : 선택했을 때
    if (selected_process.length >= 1) {
        if($('#work_time_input').val()!=""){
            //선택된 공정 식별키 가져오기
            var key = selected_process[0].getElementsByTagName('input')[0].value;
            //공정 명칭
            var name = selected_process[0].getElementsByTagName('td')[1].innerHTML;
            //공정 코드
            var num = selected_process[0].getElementsByTagName('td')[2].innerHTML;

            // 외주 여부
            var ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value = selected_process[0].getElementsByTagName('td')[3].innerHTML;
            // 외주명
            var ORIGIN_PROCESS_CUSTOMER_NAME_Value = selected_process[0].getElementsByTagName('td')[4].innerHTML;
            // 외주 사업자번호
            var ORIGIN_PROCESS_CUSTOMER_NUMBER_Value = selected_process[0].getElementsByTagName('td')[5].innerHTML;

            // 자주검사 여부
            var SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2 = selected_process[0].getElementsByTagName('td')[7].innerHTML

            //공정박스 생성순서 가져오기
            var selected_orderbox = $('.sel')[0];

            //추가된 공정박스인지 체크 1: 추가된거 0 : 기존에 있던거
            var addbox = 0;
            if(checkclasslist(selected_orderbox,"add_box")){
                addbox = 1;
            }else{
                addbox = 0;
            }


            var orderbox_idx = selected_orderbox.getElementsByTagName('input')[0].value;

            //공정 박스 순서
            var orderidx = GetOrderbox_idx();

            //작업특이사항 체크정보 가져오기
            var checkbox = $("input[name=work_specialnote_checkbox]:checked");
            var work_specialnote_checklist = new Array();
            checkbox.each(function(i) {
                var work_special_key = $(this).val();
                work_specialnote_checklist.push(work_special_key);
            });

            //작업특이사항 추가 체크 정보 가져오기
            var checkbox = $("input[name=work_specialnote_insert]:checked");
            var work_specialnote_insert_checklist = new Array();
            checkbox.each(function(i) {
                //체크된 체크박스의 tr찾아서 input 태그 값 가져오기(추가된 작업 특이사항 내용)
                var work_specialnote_str = $(this).parent().parent()[0].getElementsByTagName('input')[1].value;
                work_specialnote_insert_checklist.push(work_specialnote_str);
            });

            //자주검사 내용 가져오기
            var SelfInspectionStr = $("#SelfInspectionList")[0].innerHTML;

            if(SelfInspectionStr==undefined){
                SelfInspectionStr="";
            }

            //작업기준 시간 가져오기
            var worktime = $('#work_time_input').val();
            
            var params = {
                "ORIGIN_PROCESS_ID2": key,
                "SETTING_PRESET_PROCESS_INDEX2": (orderidx+1),
                "ORIGIN_UNIQUESS_ID3": work_specialnote_checklist,
                "SETTING_PRESET_PROCESS_WORKTIME_MIN2": worktime,
                "SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2" : SelfInspectionStr,
                "SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2" : ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value,
                "SETTING_PRESET_PROCESS_CUSTOMER_NAME2" : ORIGIN_PROCESS_CUSTOMER_NAME_Value,
                "SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2" : ORIGIN_PROCESS_CUSTOMER_NUMBER_Value,
                "SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2": SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2,
                "PROCESS_NAME" : name,
                "PROCESS_CODE" : num,
                "SETTING_PRESET_PROCESS_ID" : orderbox_idx,
                "process_add_arr" : addbox
            }

            //데이터 수정
            if (process_arr.length == $('.box').length) {
                process_arr.splice(orderidx, 1, [orderbox_idx, params,work_specialnote_insert_checklist]);
            }
            //데이터 추가
            else {
                process_arr.splice(orderidx, 0, [orderbox_idx, params,work_specialnote_insert_checklist]);
                for (var i = orderidx + 1; i < process_arr.length; i++) {
                    process_arr[i][1].SETTING_PRESET_PROCESS_INDEX2 += 1;
                }
            }

            //필수정보 입력 체크
            is_suc = true;
            return true;
        }
        else{
            //필수정보 입력 체크
            is_suc = false;
            alert("작업기준 시간을 입력해주세요");
            return false;
        }
    }//선택안했을 때 
    else {
        //필수정보 입력 체크
        is_suc = false;
        alert("공정을 선택해주세요");
        return false;
    }
}

// 다음버튼 이후 예를 클릭했을때
function Next() {
    var modals = document.getElementsByClassName("modal");
    if ($(".order_box").length >= 2) {
        var issel = $('.sel');
        
        //현재 공정박스 선택이 있으면 공정선택 필터링 및 데이터 배열에 추가
        if (issel.length > 0) {
            if(!CheckProcess()){
                modals[0].style.display = "none";
                //return;
            };
        } 

        if(!is_suc){
            error();
            return;
        }

        //없으면 데이터 전송만
        //명칭 입력 필터링
        if($('#SETTING_PRESET_NAME').val()!=""){
            var params2 = {
                "SETTING_PRESET_ID" : preset_id,
                "SETTING_PRESET_NAME" : $('#SETTING_PRESET_NAME').val(),
                "USE_DIVISION_ID" : $('#USE_DIVISION_ID option:selected').val(),
                "ORIGIN_ACCOUNT_ID" : sessionStorage.getItem("ORIGIN_ACCOUNT_ID"),
                "ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID" : sessionStorage.getItem("ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID"),
                "ORIGIN_ACCOUNT_DIVISION_ID" : sessionStorage.getItem("ORIGIN_ACCOUNT_DIVISION_ID"),
    
                "ORIGIN_PROCESS_ID2" : new Array(),
                "SETTING_PRESET_PROCESS_INDEX2" : new Array(),
                "SETTING_PRESET_PROCESS_WORKTIME2" : new Array(),
                "SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2" : new Array(),
                "SETTING_PRESET_PROCESS_CUSTOMER_NAME2" : new Array(),
                "SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2" : new Array(),
                "ORIGIN_UNIQUESS_ID3" : new Array(),
                
                "CT_FILE_REGISTER_ID" : ct_file_type,
                
                "SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2" : new Array(),
                "SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2" : new Array(),
                
                "PresetFile" : new Array(),
                "JOBORDER_FILE_TYPE_ID2" : new Array(),
                "work_specialnote_insert_checklist" : new Array(),
                "process_del_arr" : process_del_arr,
                "process_add_arr" : new Array(),
                "SETTING_PRESET_PROCESS_ID" : new Array(),
            }
    
            //공정 정보
            for (var i = 0; i<process_arr.length; i++) {
                params2.ORIGIN_PROCESS_ID2.push(process_arr[i][1].ORIGIN_PROCESS_ID2);
                params2.SETTING_PRESET_PROCESS_INDEX2.push(process_arr[i][1].SETTING_PRESET_PROCESS_INDEX2);
                params2.ORIGIN_UNIQUESS_ID3.push(process_arr[i][1].ORIGIN_UNIQUESS_ID3);
                params2.SETTING_PRESET_PROCESS_WORKTIME2.push(process_arr[i][1].SETTING_PRESET_PROCESS_WORKTIME_MIN2);
                params2.work_specialnote_insert_checklist.push(process_arr[i][2]);
                params2.SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2.push(process_arr[i][1].SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2);
                params2.SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2.push(process_arr[i][1].SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2);
                params2.SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2.push(process_arr[i][1].SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2);
                params2.SETTING_PRESET_PROCESS_CUSTOMER_NAME2.push(process_arr[i][1].SETTING_PRESET_PROCESS_CUSTOMER_NAME2);
                params2.SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2.push(process_arr[i][1].SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2);
                params2.process_add_arr.push(process_arr[i][1].process_add_arr);
                params2.SETTING_PRESET_PROCESS_ID.push(process_arr[i][1].SETTING_PRESET_PROCESS_ID);
            }
    
            window.parent.postMessage({ type : 'movetab', childData : '3.registration_preset_update.html', arr : params2, processarr: process_arr, last_posi: last_position }, '*');
        }
        else{
            alert("명칭을 입력해주세요");
        }
        modals[0].style.display = "none";
    }
    else {
        alert("공정박스를 하나이상 추가해주세요");
        modals[0].style.display = "none";
    }
}

function error(){
    var modals = document.getElementsByClassName("error_modal");
    modals[0].style.display = "block";
}

$(document).on("change", "input[name='SelectCheck']", function () {
    if ($(this).is(':checked')) {
        this.setAttribute("checked", "ture");
    }else{
        this.setAttribute("checked", "false");
    }
});

window.addEventListener('message', function(e) {
	if(e.data.type == "firstload"){
        preset_id = e.data.num;
        
        var params = {
            "SETTING_PRESET_ID" : preset_id
        }
    
        // 프리셋 상단 조회
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/DetailPresetView", params, false, function (data) {
            //프리셋 명칭 값
            $('#SETTING_PRESET_NAME').val(data.SETTING_PRESET_NAME);
            //구분 값
            $("#USE_DIVISION_ID").val(data.USE_DIVISION_ID).prop("selected", true);
            console.log(data.SETTING_PRESET_CREATEDATE);
            document.getElementById('today').value = data.SETTING_PRESET_CREATEDATE;
        });

        //만들어진 프리셋 공정 조회
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/PresetProcessList", params, false, function (data2) {
            console.log(data2);    
            data2.sort(function (a, b) { 
                return a.SETTING_PRESET_PROCESS_INDEX < b.SETTING_PRESET_PROCESS_INDEX ? -1 : a.SETTING_PRESET_PROCESS_INDEX > b.SETTING_PRESET_PROCESS_INDEX ? 1 : 0;  
            });
            console.log(data2);

            for(var i = 0; i<data2.length; i++){
                var params2 = {
                    "SETTING_PRESET_PROCESS_ID" : data2[i].SETTING_PRESET_PROCESS_ID
                }
    
                var work_specialnote_checklist = new Array();
                //프리셋 눌렀을 때 작업특이사항 조회 2
                fun_ajax("POST", "http://220.89.167.212:8085/testing05/DetailPresetUniquessView2", params2, false, function (data3) {
                    for(var i = 0; i<data3.length; i++){
                        work_specialnote_checklist.push(data3[i].ORIGIN_UNIQUESS_ID);   
                    }
                });

                var work_specialnote_insert_checklist = new Array();

                var params = {
                    "ORIGIN_PROCESS_ID2": data2[i].ORIGIN_PROCESS_ID,
                    "SETTING_PRESET_PROCESS_INDEX2": data2[i].SETTING_PRESET_PROCESS_INDEX,
                    "ORIGIN_UNIQUESS_ID3": work_specialnote_checklist,
                    "SETTING_PRESET_PROCESS_WORKTIME_MIN2": data2[i].SETTING_PRESET_PROCESS_WORKTIME,
                    "SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2" : data2[i].SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY,
                    "SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2" : data2[i].SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER,
                    "SETTING_PRESET_PROCESS_CUSTOMER_NAME2" : data2[i].SETTING_PRESET_PROCESS_CUSTOMER_NAME,
                    "SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2" : data2[i].SETTING_PRESET_PROCESS_CUSTOMER_NUMBER,
                    "SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2": data2[i].SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER,
                    "PROCESS_NAME" : data2[i].ORIGIN_PROCESS_NAME,
                    "PROCESS_CODE" : data2[i].ORIGIN_PROCESS_CODE,
                    "SETTING_PRESET_PROCESS_ID" : data2[i].SETTING_PRESET_PROCESS_ID
                }

                process_arr.push([i, params,work_specialnote_insert_checklist]);
                ct_file_type = data2[i].CT_FILE_REGISTER_ID;
            }

            //공정 박스 마지막 sel 위치
            var orderidx = process_arr.length-1;

            //공정 박스 초기화
            $('#orderbox_list .box').remove();
            
            // 공정 박스 그리기
            for(var i = 0; i<process_arr.length; i++){
                var html = '';
                var str = "";
                if(i==orderidx){
                    str = "sel";
                }
                html += '<div class="order_box box '+str+'">';
                html += '    <input type="hidden" id= "order_box_idx"  value="' + process_arr[i][1].SETTING_PRESET_PROCESS_ID + '">' //공정 식별 키
                html += '    <a href="#"><span id="order_name">'+ process_arr[i][1].PROCESS_NAME +'</span><span id="order_code">'+ process_arr[i][1].PROCESS_CODE +'</span></a>';
                html += '</div>';
                $('#orderbox_list .order_add').before(html);
            }

            //선택한 공정 값 가져오기
            SearchAll();
            //alert(process_arr[orderidx][1].ORIGIN_PROCESS_ID2);
            selected_process_event(orderidx);
        });
    }
    else if(e.data.type == "movepre"){
		process_arr = e.data.param;
        preset_id = e.data.SETTING_PRESET_ID;
        process_del_arr = e.data.process_del_arr;
        
        //프리셋 명칭 값
        $('#SETTING_PRESET_NAME').val(e.data.SETTING_PRESET_NAME);
        //구분 값
        $("#USE_DIVISION_ID").val(e.data.USE_DIVISION_ID).prop("selected", true);

        //공정 박스 초기화
        $('#orderbox_list .box').remove();
        
        //공정 박스 마지막 sel 위치
        var orderidx = e.data.last_posi;
        
        // 공정 박스 그리기
        for(var i = 0; i<process_arr.length; i++){
            var html = '';
            var str = "";
            if(i==orderidx){
                str = "sel";
            }
            html += '<div class="order_box box '+str+'">';
            html += '    <input type="hidden" id= "order_box_idx"  value="' + process_arr[i][1].SETTING_PRESET_PROCESS_ID + '">' //공정 식별 키
            html += '    <a href="#"><span id="order_name">'+ process_arr[i][1].PROCESS_NAME +'</span><span id="order_code">'+ process_arr[i][1].PROCESS_CODE +'</span></a>';
            html += '</div>';
            $('#orderbox_list .order_add').before(html);
        }

        //선택한 공정 값 가져오기
        SearchAll();
        //alert(process_arr[orderidx][1].ORIGIN_PROCESS_ID2);
        selected_process_event(orderidx);
	}
});

//공정 선택시 이벤트 (작업특이사항 자주검사 작업기준시간 등등)
function selected_process_event(key){
    var selected_process = $('#preset_create_process_tbody input[value='+process_arr[key][1].ORIGIN_PROCESS_ID2+']').parent();
        selected_process.addClass('on');

        // 외주 여부
        var ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value = selected_process[0].getElementsByTagName('td')[3].innerHTML;
        // 외주명
        var ORIGIN_PROCESS_CUSTOMER_NAME_Value = selected_process[0].getElementsByTagName('td')[4].innerHTML;
        // 외주 사업자번호
        var ORIGIN_PROCESS_CUSTOMER_NUMBER_Value = selected_process[0].getElementsByTagName('td')[5].innerHTML;

        if (ORIGIN_PROCESS_OUTSOURCING_REGISTER_Value == 0) {
            $("#DisabledValue").val("");
        } else {
            $("#DisabledValue").val(ORIGIN_PROCESS_CUSTOMER_NAME_Value);
            $("#OutcheckSelect")[0].checked = true;
        }

        //작업특이사항/자주검사 리스트 그리기(초기화)
        Search_work_specialnote(process_arr[key][1].ORIGIN_PROCESS_ID2);
        
        //작업특이사항 체크했던거 표시
        var arr = process_arr[key][1].ORIGIN_UNIQUESS_ID3;
        if(arr[0]!=null){
            for(var i= 0; i<arr.length; i++)
            {
                var selected_process = $('#preset_create_work_specialnote_table input:checkbox[value='+arr[i]+']')[0];
                if(selected_process != undefined){
                    selected_process.checked = true;
                }
            }
        }

        //작업특이사항 추가했던부분 그리기
        var arr2 = process_arr[key][2];
        for(var i= 0; i<arr2.length; i++){
            var html = '';
            html += '<tr>';
            html += '    <td><input type="checkbox" name="work_specialnote_insert" value="'+i+'" checked disabled></td>';
            html += '    <td>';
            html += '        <input type="text" style="width: 97%;" onkeyup="work_special_add_textchange(this)" value="'+arr2[i]+'">';
            html += '    </td>';
            html += '</tr>';
        
            $('#preset_create_work_specialnote_table').append(html);
        }

        //작업기준시간 
        $('#work_time_input').val(process_arr[key][1].SETTING_PRESET_PROCESS_WORKTIME_MIN2);

        //자주검사 저장했던거로 출력
        $("#SelfInspectionList").empty();
        html = '';
        html = process_arr[key][1].SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2;
        $("#SelfInspectionList").append(html);
}

//공정 검색
function Search_Process(){
    var params = {
        "ORIGIN_PROCESS_NAME" : $('#Search_str').val()
    }

    // 공정 종류 가져오기
    // 공정 전체 조회 Ajax 통신
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SearchProcess", params, false, function (data) {
        //대분류 종류 값 가져오기
        //원본 공정 대분류 조회 Ajax 통신
        fun_ajax("GET", "http://220.89.167.212:8085/testing05/MainProcessList", null, false, function (data_Category) {
            //id="list" 값 초기화
            $("#preset_create_process_tbody tr").remove();
            process_self_inspectionlist = new Object();
            //foreach
            $.each(data, function (i, v) {
                $.each(data_Category, function (j, d) {
                    if (v.PROCESS_MAIN_CATEGORY_ID == d.PROCESS_MAIN_CATEGORY_ID) {
                        var ORIGIN_PROCESS_OUTSOURCING_REGISTER = Check_undefined(v.ORIGIN_PROCESS_OUTSOURCING_REGISTER);
                        var ORIGIN_PROCESS_CUSTOMER_NAME = Check_undefined(v.ORIGIN_PROCESS_CUSTOMER_NAME);
                        var ORIGIN_PROCESS_CUSTOMER_NUMBER = Check_undefined(v.ORIGIN_PROCESS_CUSTOMER_NUMBER);
                        var ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER = Check_undefined(v.ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER);

                        var html = '';

                        html += '<tr>';
                        html += '    <input type="hidden" id= "SETTING_PRESET_PROCESS_ID" value="' + v.ORIGIN_PROCESS_ID + '">' //공정 식별 키
                        html += '    <td>' + d.PROCESS_MAIN_CATEGORY_NAME + '</td>';
                        html += '    <td>' + v.ORIGIN_PROCESS_NAME + '</td>';
                        html += '    <td>' + v.ORIGIN_PROCESS_CODE + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_OUTSOURCING_REGISTER + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_CUSTOMER_NAME + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_CUSTOMER_NUMBER + '</td>';
                        html += '    <td style="display: none;">' + v.PROCESS_MAIN_CATEGORY_ID + '</td>';
                        html += '    <td style="display: none;">' + ORIGIN_PROCESS_SELF_INSPECTION_REPORT_REGISTER + '</td>';
                        html += '</tr>';

                        process_self_inspectionlist[v.ORIGIN_PROCESS_ID] = v.ORIGIN_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY;
                        $('#preset_create_process_tbody').append(html);
                    }
                });
            });
        });
    });

    $('#work_time_input').val("");
    $("#preset_create_work_specialnote_table tr").remove();
    $("#SelfInspectionList").remove();
}