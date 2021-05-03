window.onload = function () {

    for (var i = 0; i < 2; i++) {

        var html = '';

        html += '<tr>';
        html += '<td><input type="checkbox"></td>' 
        html +='<td>2021.01.01</td>'
        html +='<td></td>'
        html +='<td>J21L7576</td>'
        html +='<td>ID 용접</td>'
        html +='<td>191</td>'
        html +='<td>445</td>'
        html += '</tr>'

        $("#outsourcing_order_status").append(html);

    }
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
            sdp.selectDate(new Date(sDay.replace(/-/g, "/"))); //익스에서는 그냥 new Date하면 -을 인식못함 replace필요

            var edp = eDate.datepicker().data("datepicker");
            edp.selectDate(new Date(eDay.replace(/-/g, "/"))); //익스에서는 그냥 new Date하면 -을 인식못함 replace필요
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

    // date flag 값 1. 오늘 2. 일주일 3. 1개월 4. 3개월

    if (date_flag == 1) {

        set_date(date_flag, 0, 0);

    }
    else if (date_flag == 2) {

        set_date(date_flag, -7, 0);

    }
    else if (date_flag == 3) {

        set_date(date_flag, -30, 0);

    }
    else if (date_flag == 4) {

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


function month(months) {
    return months < 10 ? "0" + months : months
}

function day(days) {
    return days < 10 ? "0" + days : days
}


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


function search_init() {

    $('#datepicker1').val('');
    $('#datepicker2').val('');

    document.getElementById('today').setAttribute('class', "btn_bs sml non");
    document.getElementById('week').setAttribute('class', "btn_bs sml non");
    document.getElementById('1month').setAttribute('class', "btn_bs sml non");
    document.getElementById('3month').setAttribute('class', "btn_bs sml non");

    $('#Job_no').val('');
    $('#trade').val('');
    $('#product_number').val('');

}


//검색
function search_() {
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
        var job_no = $('#Job_no').val();
        var trade = $('#trade').val();
        var product_number = $('#product_number').val();

        alert("입력된 값에 의한 조회 \n" + "firstday :" + firstday + "\n" + "secondday :" + secondday + "\n" +
            "JOB NO. :" + job_no + "\n" + "거래처 :" + trade + "\n" + "품번 :" + product_number + "\n");
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
    if ($('#Job_no').val() != '' || $('#trade').val() != '' || $('#product_number').val() != '') {
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

        var table = document.getElementById('outsourcing_order_status');

        var tbody = table.getElementsByTagName("tbody");

        //테이블 row data 값
        var tr = tbody[0].getElementsByTagName('tr');

        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName('td');

            var params = {

                '발주일자': td[1].textContent,
                'JOB NO.': td[2].textContent,
                '거래처.': td[3].textContent,
                '품번': td[4].textContent,
                '품명': td[5].textContent,
                '수량': td[6].textContent

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

    var table = document.getElementById('outsourcing_order_status');

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

