window.onload = function () {

    search_init();
    
    select_all();
}

function select_all(){
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/SelectJbList", null, true, function(data) {
        var length = data.length
// (int) JOBORDER_ID : 작업지시서 식별 키
// (String) JOBORDER_DETAIL_JOBNUMBER : 작업지시서 작업지시번호(Job No)
// (String) BOM_DETAIL_PRODUCTCODE : BOM 품번(BOM 품번)
// (String) BOM_DETAIL_BELLOWSCODE : BOM 벨로우즈 코드(Bellows Code)
// (int) JOBORDER_DETAIL_QUANTITY : 작업지시서 서식 수량 (수량)
// (Date) JOBORDER_PUBLISHDAY : 작업지시서 배포일 (배포일)
// (Date) JOBORDER_DETAIL_DEILVERYDAY : 작업지시서 서식 납기일 (납기일)
// (String) JOBORDER_DETAIL_CLIENT : 작업지시서 서식 납품처 (납품처)
// (String) JOBORDER_EMERGENCY_STATUS_NAME : 긴급,우선 (구분)
// (String) JOBORDER_DETAIL_PRODUCTNUMBER : 작업지시서 서식 품번 (완료품목코드)
// (String) JOBORDER_CONTEXT : 작업지시서 내용
// (int) CT_FILE_REGISTER_DRAWING : 도면 여부
// (int) JOBORDER_STATUS_ID : 작업지시서 상태 식별 키
// (String) JOBORDER_STATUS_NAME : 작업지시서 상태명

        for(var i =0; i< length; i++)
        {
            var html ='';
            html += '<tr>';
            html += '<input type="hidden" value=' + Check_undefined(data[i].JOBORDER_ID) + '>';
            html += '<input type="hidden" value=' + Check_undefined(data[i].JOBORDER_STATUS_ID) + '>';
            html += '<td><input type="checkbox" name="box"></td>'
            html += '<td>' + (i + 1) + '</td>';
            html += '<td>'
            html += '<a onclick=\"window.open(\'pop/pop_workorder_update.html?num='+Check_undefined(data[i].JOBORDER_ID)+'\', \'작업지시서조회수정\', \'left=\'+(screen.availWidth-1200)/2+\',top=\'+(screen.availHeight-800)/2+\', width=1200px,height=800px\');\"name="" style="cursor: pointer;">'+Check_undefined(data[i].JOBORDER_DETAIL_JOBNUMBER)+'</a>'
            html += '</td>'
            html += '<td>' + Check_undefined(data[i].BOM_DETAIL_PRODUCTCODE) + '</td>';
            html += '<td>' + Check_undefined(data[i].BOM_DETAIL_BELLOWSCODE) + '</td>';
            html += '<td>' + Check_undefined(data[i].JOBORDER_DETAIL_QUANTITY) + '</td>';
            html += '<td>' + Check_undefined(change_date_ajax(data[i].JOBORDER_PUBLISHDAY)) + '</td>';
            html += '<td>' + Check_undefined(change_date_ajax(data[i].JOBORDER_DETAIL_DEILVERYDAY)) + '</td>';
            html += '<td>' + Check_undefined(data[i].JOBORDER_DETAIL_CLIENT) + '</td>';
            html += '<td>' + Check_undefined(data[i].JOBORDER_EMERGENCY_STATUS_NAME) + '</td>';
            html += '<td>' + Check_undefined(data[i].JOBORDER_DETAIL_PRODUCTNUMBER) + '</td>';
            html += '<td><input type="text" value = "'+ Check_undefined(data[i].JOBORDER_CONTEXT) +'" style="width:70%;float:left"><input type="button" id="id_check" class="btn btn-outline-primary" value="저장"  style="float:right">';
            html += '<td>' + Check_undefined(data[i].JOBORDER_STATUS_ID) + '</td>';
            html += '<td>' + Check_undefined(data[i].JOBORDER_STATUS_NAME) + '</td>';
            html += '</tr>';
            $('#create_deploy_table').append(html);
        }
    });
}

function change_date_ajax(ajax_date) {

    var date = new Date(ajax_date);
    // date Object를 받아오고 

    var years = date.getFullYear();
    // 년을 받아옵니다

    var months = date.getMonth() + 1;
    // 달을 받아옵니다 

    var days = date.getDate();

    return years + "." + month(months) + "." + day(days);

}

function month(months) {
    return months < 10 ? "0" + months : months
}

function day(days) {
    return days < 10 ? "0" + days : days
}


//<!---------------------------------날짜선택Start----------->

//한개만 단순하게 만들때
$("#datepicker").datepicker({
    language: 'ko'
});

//두개짜리 제어 연결된거 만들어주는 함수
datePickerSet($("#datepicker1"), $("#datepicker2"), true); //다중은 시작하는 달력 먼저, 끝달력 2번째

/*
    * 달력 생성기
    * @param sDate 파라미터만 넣으면 1개짜리 달력 생성
    * @example   datePickerSet($("#datepicker"));
    * 
    * 
    * @param sDate, 
    * @param eDate 2개 넣으면 연결달력 생성되어 서로의 날짜를 넘어가지 않음
    * @example   datePickerSet($("#datepicker1"), $("#datepicker2"));
    */
function datePickerSet(sDate, eDate, flag) {

    //시작 ~ 종료 2개 짜리 달력 datepicker	
    if (!isValidStr(sDate) && !isValidStr(eDate) && sDate.length > 0 && eDate.length > 0) {
        var sDay = sDate.val();
        var eDay = eDate.val();

        if (flag && !isValidStr(sDay) && !isValidStr(eDay)) { //처음 입력 날짜 설정, update...			
            var sdp = sDate.datepicker().data("datepicker");
            sdp.selectDate(new Date(sDay.replace(/-/g, "/")));  //익스에서는 그냥 new Date하면 -을 인식못함 replace필요

            var edp = eDate.datepicker().data("datepicker");
            edp.selectDate(new Date(eDay.replace(/-/g, "/")));  //익스에서는 그냥 new Date하면 -을 인식못함 replace필요
        }

        //시작일자 세팅하기 날짜가 없는경우엔 제한을 걸지 않음
        if (!isValidStr(eDay)) {
            sDate.datepicker({
                maxDate: new Date(eDay.replace(/-/g, "/"))
            });
        }
        sDate.datepicker({
            language: 'ko',
            autoClose: true,
            onSelect: function () {
                datePickerSet(sDate, eDate);
            }
        });

        //종료일자 세팅하기 날짜가 없는경우엔 제한을 걸지 않음
        if (!isValidStr(sDay)) {
            eDate.datepicker({
                minDate: new Date(sDay.replace(/-/g, "/"))
            });
        }
        eDate.datepicker({
            language: 'ko',
            autoClose: true,
            onSelect: function () {
                datePickerSet(sDate, eDate);
            }
        });

        //한개짜리 달력 datepicker
    } else if (!isValidStr(sDate)) {
        var sDay = sDate.val();
        if (flag && !isValidStr(sDay)) { //처음 입력 날짜 설정, update...			
            var sdp = sDate.datepicker().data("datepicker");
            sdp.selectDate(new Date(sDay.replace(/-/g, "/"))); //익스에서는 그냥 new Date하면 -을 인식못함 replace필요
        }

        sDate.datepicker({
            language: 'ko',
            autoClose: true
        });
    }


    function isValidStr(str) {
        if (str == null || str == undefined || str == "")
            return true;
        else
            return false;
    }
}

//<!-----------------날짜선택End----------->

function date_option(date_flag) {
    // 콤보박스 index 값 1. 납기일 2.배포일
    sel_flag = select_flag();

    // date flag 값 1. 오늘 2. 일주일 3. 1개월 4. 3개월

    if (date_flag == 1 && sel_flag == 1) {


        set_date(date_flag, 0, 0);

    }
    else if (date_flag == 2 && sel_flag == 1) {


        set_date(date_flag, 0, 7);

    }
    else if (date_flag == 3 && sel_flag == 1) {


        set_date(date_flag, 0, 30);

    }
    else if (date_flag == 4 && sel_flag == 1) {

        set_date(date_flag, 0, 90);
    }
    else if (date_flag == 1 && sel_flag == 2) {


        set_date(date_flag, 0, 0);

    }
    else if (date_flag == 2 && sel_flag == 2) {

        set_date(date_flag, -7, 0);

    }
    else if (date_flag == 3 && sel_flag == 2) {

        set_date(date_flag, -30, 0);

    }
    else if (date_flag == 4 && sel_flag == 2) {

        set_date(date_flag, -90, 0);
    }
}

function set_date(date_flag, firstday, secondday) {

    //date flag 값 1. 오늘 2. 일주일 3. 1개월 4. 3개월
    //select_flag 값 1. 납기일 2. 배포일 

    if (date_flag == 1) {
        $('#datepicker1').val(change_date(firstday));
        $('#datepicker2').val(change_date(secondday));
        day_color(date_flag);
    }
    else if (date_flag == 2) {
        $('#datepicker1').val(change_date(firstday));
        $('#datepicker2').val(change_date(secondday));
        day_color(date_flag);
    }
    else if (date_flag == 3) {
        $('#datepicker1').val(change_date(firstday));
        $('#datepicker2').val(change_date(secondday));
        day_color(date_flag);
    }
    else if (date_flag == 4) {
        $('#datepicker1').val(change_date(firstday));
        $('#datepicker2').val(change_date(secondday));
        day_color(date_flag);
    }
}
function change_date(sum) {
    var date = new Date();
    // date Object를 받아오고 

    var years = date.getFullYear();
    // 년을 받아옵니다

    var months = date.getMonth() + 1;
    // 달을 받아옵니다 

    var days = date.getDate();

    if (sum == 0) {
        return years + "-" + month(months) + "-" + day(days);
    }
    else {
        date.setDate(date.getDate() + sum);
        years = date.getFullYear();
        months = date.getMonth() + 1;
        days = date.getDate();

        return years + "-" + month(months) + "-" + day(days);
    }

}

function select_flag() {
    if ($("#select_day option:selected").val() == "납기일") {
        return 1;
    }
    else if ($("#select_day option:selected").val() == "배포일") {
        return 2;
    }
}

function month(months) {
    return months < 10 ? "0" + months : months
}

function day(days) {
    return days < 10 ? "0" + days : days
}

function search_init() {

    $('#datepicker1').val('');
    $('#datepicker2').val('');

    document.getElementById('today').setAttribute('class', "btn_bs sml non");
    document.getElementById('week').setAttribute('class', "btn_bs sml non");
    document.getElementById('1month').setAttribute('class', "btn_bs sml non");
    document.getElementById('3month').setAttribute('class', "btn_bs sml non");

    $("#not_distribute ").prop("checked", false);
    $("#complete_distribute").prop("checked", false);
    $("#ing_product").prop("checked", false);
    $("#complete_product").prop("checked", false);

    $('#bom_product_number').val('');
    $('#product_trade').val('');
    $('#complete_product_code').val('');
    $('#job_number').val('');
    $('#bellow_code').val('');
    $('#sortation').val('');
    $('#select_day').val('납기일');
}

// 체크 박스 모두 체크
$("#all_checkbox").click(function () {

    if ($('input:checkbox[id="all_checkbox"]').is(":checked") == true) {
        $("input[id=box]:checkbox").each(function () {
            $(this).prop("checked", true);
        });
    } else {
        $("input[id=box]:checkbox").each(function () {
            $(this).prop("checked", false);
        });
    }
});

/* var allcheckbox = document.getElementById('all_checkbox')

allcheckbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {

        change_all_checkbox(true);

    } else {

        change_all_checkbox(false);
    }

    function change_all_checkbox(flag) {
        var table = document.getElementById('create_deploy_table');
        var tbody = table.getElementsByTagName("tbody");
        var td_input = select_only_checkbox(tbody[0].getElementsByTagName('input'));


        for (var i = 0; i < td_input.length; i++) {
            td_input[i].checked = flag;
        }
    }
}) */

function job_order_delete() {
    var table = document.getElementById('create_deploy_table');
    var tbody = table.getElementsByTagName("tbody");
    var td_input = select_only_checkbox(tbody[0].getElementsByTagName('input'));

    var tr = tbody[0].getElementsByTagName('tr');

    var array_td = new Array();

    for (var i = 0; i < td_input.length; i++) {
        if (td_input[i].checked) {
            var td = tr[i].getElementsByTagName('td');

            array_td.push(td[1].textContent);

        }
    }

    for (var j = 0; j < array_td.length; j++) {
        var params = {
            BOM_LIST_ID: array_td[j]
        }


        // 삭제 ajax 통신
        /*  $.ajax({
             type: "POST",
             url: "http://localhost:8888/test/post/login",
             data: JSON.stringify(params),
             dataType: "json",
             contentType: "application/json;charset=UTF8",
             success: function (data) {
                 //data.키값 으로 Map<String, String> 값 가져오기
                 if (data.result === "1") {
                     alert("로그인 성공");
                     
                 } else if (data.result === "2") {
                     modals[0].style.display = "block";
                 }
             },
             error: function (xhr, status, error) {
                 alert(error);
             }
         });*/

        alert(JSON.stringify(params))
    }
}

/*   for(var j = 0; j < array_tr.length; j++)
  {
      array_tr[j].remove();
  } */




//검색
function search_() {
    
    var selday = $("#select_day option:selected").val();

    if (serach_date_condition() == true && search_etc_condition() == false) {

        var params = {

            "firstday": convert_date(1),
            "secondday": convert_date(2)
        }

        alert(JSON.stringify(params));
    }

    else if (serach_date_condition() == false && search_etc_condition() == false) {
        alert("전체 리스트 조회");
        //전체 조회
    }
    else {

        var firstday = convert_date(1);
        var secondday = convert_date(2);
        var bom_product_number = $('#bom_product_number').val();
        var product_trade = $('#product_trade').val();
        var complete_product_code = $('#complete_product_code').val();
        var job_number = $('#job_number').val();
        var bellow_code = $('#bellow_code').val();
        var sortation = $('#sortation').val();

        alert("입력된 값에 의한 조회 \n" + "선택 : "+selday+ "\n" + "firstday : " + firstday + "\n" + "secondday : " + secondday + "\n" +
        "미배포 : " + $("input:checkbox[id='not_distribute']").is(":checked") + "\n" +"배포 완료 : " + $("input:checkbox[id='complete_distribute']").is(":checked") +"\n" +
            "BOM 품번 : " + bom_product_number + "\n" + "납품처 : " + product_trade + "\n"  + "완료품목코드 : " + complete_product_code + "\n"
            + "JOB NO : " + job_number + "\n"  + "Bellow Code : " + bellow_code + "\n"  + "구분 : " + sortation + "\n");
    }
}


function serach_date_condition() {

    if ($('#datepicker1').val() != '' && $('#datepicker2').val() != '') {
        return true;
    }
    else {
        return false;
    }
}

function search_etc_condition() {

    if ($('#bom_product_number').val() != '' || $('#product_trade').val() != '' || $('#complete_product_code').val() != '' || $('#job_number').val() != ''
    ||  $('#bellow_code').val() != '' || $('#sortation').val() != '' || $("input:checkbox[id='not_distribute']").is(":checked") != false || $("input:checkbox[id='complete_distribute']").is(":checked") != false ||
    $("input:checkbox[id='ing_product']").is(":checked") != false || $("input:checkbox[id='complete_product']").is(":checked") != false ) {
        return true;
    }
    else {
        return false;
    }
}

function convert_date(flag) {
    if (flag == 1) {
        if ($('#datepicker1').val() == '')
            return "없음";
        var date = $('#datepicker1').val().split('-');
        return date[0] + date[1] + date[2];

    }
    else {
        if ($('#datepicker2').val() == '')
            return "없음";
        var date = $('#datepicker2').val().split('-');
        return date[0] + date[1] + date[2];

    }
}


function select_only_checkbox(value) {
    var input = new Array();
    for (var i = 0; i < value.length; i = i + 2) {
        input.push(value[i]);
    }
    return input

}

$('#create_deploy_table tr').dblclick(function () {
    var delete_tr = $(this);
    var test;
    test = delete_tr[0].getElementsByTagName('td');

    if (test.length > 1) {
        window.open('pop/pop_workorder_check.html', '작업지시서조회수정', 'left=' + (screen.availWidth - 950) / 2 + ',top=' + (screen.availHeight - 700) / 2 + ', width=950px,height=700px');
        /* " name="" style="cursor: pointer;" */
    }
});

function day_color(date_flag) {
    var today = document.getElementById('today');
    var week = document.getElementById('week');
    var one_month = document.getElementById('1month');
    var three_month = document.getElementById('3month');

    if (date_flag == 1) {
        today.setAttribute('class', "btn_bs sml blue");
        week.setAttribute('class', "btn_bs sml non");
        one_month.setAttribute('class', "btn_bs sml non");
        three_month.setAttribute('class', "btn_bs sml non");
    }
    else if (date_flag == 2) {
        today.setAttribute('class', "btn_bs sml non");
        week.setAttribute('class', "btn_bs sml blue");
        one_month.setAttribute('class', "btn_bs sml non");
        three_month.setAttribute('class', "btn_bs sml non");
    }
    else if (date_flag == 3) {
        today.setAttribute('class', "btn_bs sml non");
        week.setAttribute('class', "btn_bs sml non");
        one_month.setAttribute('class', "btn_bs sml blue");
        three_month.setAttribute('class', "btn_bs sml non");
    }
    else {
        today.setAttribute('class', "btn_bs sml non");
        week.setAttribute('class', "btn_bs sml non");
        one_month.setAttribute('class', "btn_bs sml non");
        three_month.setAttribute('class', "btn_bs sml blue");
    }

}


// excel 내보내기 --시작--
function download_excel() {

    if (check_table_data() != false) {
        // step 1. workbook 생성
        var wb = XLSX.utils.book_new();

        // step 2. 시트 만들기 
        var newWorksheet = excelHandler.getWorksheet();

        // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
        XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

        // step 4. 엑셀 파일 만들기 
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

        // step 5. 엑셀 파일 내보내기 
        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), excelHandler.getExcelFileName());
    }

}


var excelHandler = {
    getExcelFileName: function () {
        return change_excel_date() + '.xlsx';
    },
    getSheetName: function () {
        return 'Sheet';
    },
    getExcelData: function () {
        var value = make_excel_file()
        if (value != -1)
            return value
        else
            return;
    },
    getWorksheet: function () {
        console.log(this.getExcelData());
        return XLSX.utils.json_to_sheet(this.getExcelData());
    }
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

function make_excel_file() {

    var excel_array = new Array();

    try {

        var table = document.getElementById('create_deploy_table');

        var tbody = table.getElementsByTagName("tbody");

        //테이블 row data 값
        var tr = tbody[0].getElementsByTagName('tr');

        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName('td');

            var params = {

                '순번': td[1].textContent,
                'JOB NO': td[2].textContent,
                'BOM 품번': td[3].textContent,
                'Bellows Code': td[4].textContent,
                '수량': td[5].textContent,
                '배포일': td[6].textContent,
                '납기일': td[7].textContent,
                '납품처': td[8].textContent,
                '구분': td[9].textContent,
                '완료품목코드': td[10].textContent,
                '작업지시서내용': td[11].textContent,
                '도면': td[12].textContent,
                '상태': td[13].textContent

            }
            excel_array.push(params);
        }
        return excel_array;

    }
    catch (e) {
        return -1;
    }
}

function check_table_data() {

    var table = document.getElementById('create_deploy_table');

    var tbody = table.getElementsByTagName("tbody");

    //테이블 row data 값
    var tr = tbody[0].getElementsByTagName('tr');

    if (tr.length == 0) {
        alert("테이블에 아무 데이터도 없습니다.");
        return false;
    }
    else
        return true;
}

function change_excel_date() {
    var date = new Date();
    // date Object를 받아오고 

    var years = date.getFullYear();
    // 년을 받아옵니다

    var months = date.getMonth() + 1;
    // 달을 받아옵니다 

    var days = date.getDate();


    return years + "-" + month(months) + "-" + day(days);

}

// excel 내보내기 --끝--

//문자열 undefined 체크
function Check_undefined(str){
    var return_str = "";
    if(str != undefined){
        return_str = str;
    }
    return return_str;
}
