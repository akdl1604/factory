window.onload = function () {

    console.log("새로고침 됐다.");
    load_bom_list();
    search_init();

}

function load_bom_list() {


    $('#bom_register_table > tbody').empty();

    //Bom 리스트 조회 Ajax 통신()
    //(int) BOM_LIST_ID : BOM List 식별 키
    //(int) ORIGIN_ACCOUNT_ID : 계정 식별 키
    //(String) BOM_LIST_DIVISION : BOM List 구분명 (구분)
    //(String) BOM_LIST_MAIN_NAME : BOM List 명칭 (품명)
    //(Date) BOM_LIST_CREATEDATE : Bom List 등록일 (등록일)
    //(String) ORIGIN_ACCOUNT_MEMBERNAME : 계정 이름 (담당자)

    //(table 형식) 순번(반복문값), 구분, 품명, 품번, 담당자, 등록일



    fun_ajax("GET", "http://220.89.167.212:8085/testing05/ViewBomList", null, true, function (data) {

        console.log(data);
        var length = data.length;

        if (length == 0) {
            modals[0].style.display = "block";
        }


        for (var i = 0; i < length; i++) {


            var html = '';

            html += '<tr>';
            html += '<input type="hidden" value=' + data[i].BOM_LIST_ID + '>';
            html += '<input type="hidden" value=' + data[i].ORIGIN_ACCOUNT_ID + '>';
            html += '<td><input type="checkbox" name="box"></td>'
            html += '<td>' + (i + 1) + '</td>';
            html += '<td>' + data[i].BOM_LIST_DIVISION + '</td>'
            html += '<td>' + data[i].BOM_LIST_MAIN_NAME + '</td>';
            html += '<td>' + data[i].BOM_LIST_MAIN_PRODUCTCODE + '</td>';
            html += '<td>' + data[i].ORIGIN_ACCOUNT_MEMBERNAME + '</td>';
            html += '<td>' + change_date_ajax(data[i].BOM_LIST_CREATEDATE) + '</td>';
            html += '</tr>';

            $("#bom_register_table").append(html);

        }
    });


    /*  for (var i = 0; i < 3; i++) {
         var html = '';
 
         html += '<tr>';
         html += '<input type="hidden" value=' + 1 + '>';
         html += '<input type="hidden" value=' + 2 + '>';
         html += '<td><input type="checkbox" name="box"></td>'
         html += '<td>' + 3 + '</td>';
         html += '<td>' + 4 + '</td>'
         html += '<td>' + 5 + '</td>';
         html += '<td>' + "품번없음" + '</td>';
         html += '<td>' + 6 + '</td>';
         html += '<td>' + 7 + '</td>';
         html += '</tr>';
 
         $("#bom_register_table").append(html);
 
     } */
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


function excelExport(event) {
    if ($("#ex_file").val() == '')
        return;

    var input = event.target;
    var regex = /^([a-zA-Z0-9가-힣\s_\\.\-:])+(.xlsx|.xls)$/;
    /*Checks whether the file is a valid excel file*/

    if (regex.test($("#ex_file").val().toLowerCase())) {
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/

        if ($("#ex_file").val().toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        /*Checks whether the browser supports HTML5*/

        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function () {
                var fileData = reader.result;

                /*Converts the excel data in to object*/
                if (xlsxflag) {
                    var workbook = XLSX.read(fileData, { type: 'array' });
                } else {
                    var workbook = XLS.read(fileData, { type: 'binary' });
                }
                /*Gets all the sheetnames of excel in to a variable*/
                var sheet_name_list = workbook.SheetNames;

                var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                    /*Convert the cell value to Json*/
                    if (xlsxflag) {
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    } else {
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                    }
                    if (exceljson.length > 0 && cnt == 0) {

                        if (ischeck_excel(exceljson, workbook.Sheets[y])) {
                            alert("양식이 맞음");
                            send_excel_file();
                            $("#ex_file").val('');
                            return;

                        }
                        else {

                            modals[2].style.display = "block";
                            $("#ex_file").val('');
                            return;
                        }

                        //cnt++;
                    }
                });
            }
            if (xlsxflag) { /*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                reader.readAsArrayBuffer(input.files[0]);
            } else {
                reader.readAsBinaryString(input.files[0]);
            }
        } else {
            alert("Sorry! Your browser does not support HTML5!");
        }
    } else {



        modals[2].style.display = "block";
        //alert("Please upload a valid Excel file!");
    }

}

function excelExport22(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, { type: 'binary' });
        wb.SheetNames.forEach(function (sheetName) {
            var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            var rowObj2 = XLSX.utils.sheet_to_json(wb.Sheets[0]);
            var rowObj3 = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]["B2"]);
            alert(wb.Sheets[sheetName]);
            alert(wb.Sheets[sheetName]["B2"]);
            console.log(JSON.stringify(rowObj));
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

var delete_tr;
var delete_array = new Array();

function date_option(date_flag) {
    //콤보박스 index 값 1. 등록일 2. 납기일2 3. 납기일3
    /* sel_flag = select_flag(); */
    //date flag 값 1. 오늘 2. 일주일 3. 1개월 4. 3개월

    var today = document.getElementById('today');
    var week = document.getElementById('week');
    var one_month = document.getElementById('1month');
    var three_month = document.getElementById('3month');



    if (date_flag == 1) {

        today.setAttribute('class', "btn_bs sml blue");
        week.setAttribute('class', "btn_bs sml non");
        one_month.setAttribute('class', "btn_bs sml non");
        three_month.setAttribute('class', "btn_bs sml non");
        set_date(date_flag);

    }
    else if (date_flag == 2) {

        today.setAttribute('class', "btn_bs sml non");
        week.setAttribute('class', "btn_bs sml blue");
        one_month.setAttribute('class', "btn_bs sml non");
        three_month.setAttribute('class', "btn_bs sml non");
        set_date(date_flag);

    }
    else if (date_flag == 3) {

        today.setAttribute('class', "btn_bs sml non");
        week.setAttribute('class', "btn_bs sml non");
        one_month.setAttribute('class', "btn_bs sml blue");
        three_month.setAttribute('class', "btn_bs sml non");
        set_date(date_flag);

    }
    else {
        today.setAttribute('class', "btn_bs sml non");
        week.setAttribute('class', "btn_bs sml non");
        one_month.setAttribute('class', "btn_bs sml non");
        three_month.setAttribute('class', "btn_bs sml blue");
        set_date(date_flag);

    }
}

function set_date(date_flag) {

    //date flag 값 1. 오늘 2. 일주일 3. 1개월 4. 3개월
    //select_flag 값 1. 등록일 2. 납기일 3. 납기일

    if (date_flag == 1) {
        $('#datepicker1').val(change_date(0));
        $('#datepicker2').val(change_date(0));
    }

    else if (date_flag == 2) {
        $('#datepicker1').val(change_date(-7));
        $('#datepicker2').val(change_date(0));
    }

    else if (date_flag == 3) {
        $('#datepicker1').val(change_date(-30));
        $('#datepicker2').val(change_date(0));
    }

    else if (date_flag == 4) {
        $('#datepicker1').val(change_date(-90));
        $('#datepicker2').val(change_date(0));
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

/*    function select_flag()
   {
       if($("#select_day option:selected").val()== "등록일" )
       {
       return 1;
       }
       else if($("#select_day option:selected").val()=="납기일")
       {
           return 2;
       }
   
 
   } */


function search_init() {
    $('#datepicker1').val('');
    $('#datepicker2').val('');

    document.getElementById('today').setAttribute('class', "btn_bs sml non");
    document.getElementById('week').setAttribute('class', "btn_bs sml non");
    document.getElementById('1month').setAttribute('class', "btn_bs sml non");
    document.getElementById('3month').setAttribute('class', "btn_bs sml non");

    $('#product_name').val('');
    $('#product_number').val('');
    $('#product_manager').val('');

    $('input:checkbox[id="all_checkbox"]').prop("checked", false);


}


/* $('#bom_register_table').on("click", "box", function () {
     //현재 클릭된 Row(<tr>)
    delete_tr = $(this);
    var td = tr.children();

     //tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
    console.log("클릭한 Row의 모든 데이터 : " + tr.text());

     //반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
     td.each(function(i){
        tdArr.push(td.eq(i).text());
    });
     

     var no = td.eq(0).text();
        var userid = td.eq(1).text();
        var name = td.eq(2).text();
        var email = td.eq(3).text();


    tr.remove();

    tr[0].style.background="red";

    var color = tr[0].style.backgroundColor;


    if (delete_tr[0].style.backgroundColor == "rgb(238, 237, 251)") {
        delete_tr[0].style.backgroundColor = "#FFFFFF";
        var td = delete_tr[0].getElementsByTagName('td');
         console.log(td[0].textContent); 

        pop_delete_tr(td[0].textContent);
    }
    else {
        delete_tr[0].style.backgroundColor = "#eeedfb";

        delete_array.push(delete_tr);

    }
}); */

function modal_delete_ok(flag) {

    var delete_array = Array();

    if (flag == 1) {

        modals[0].style.display = 'none';
    }

    else if (flag == 2) {


        var checkbox = $("input[name=box]:checked");

        //체크된 체크박스 값을 가져온다
        checkbox.each(function (i) {
            var tr = checkbox.parent().parent().eq(i);
            var td = tr.children();

            /* console.log(tr.text()); */
            //BOM_LIST 식별번호
            //console.log(td.parent().parent().remove());
            delete_array.push(parseInt(td.eq(0).val()));
            //console.log(td.eq(0).val());
        });

        // 체크여부 확인

        if (delete_array.length == 0) {
            alert("삭제할 행을 선택해주세요.");
            modals[1].style.display = "none";
            /* modals[1].style.display= "none"; */
            return;
        }

        for (var i = 0; i < delete_array.length; i++) {
            //ajax 통신에 사용될
            var BOM_LIST_ID = delete_array[i];
            //var input = tr[0].getElementsByTagName('input');
            console.log(BOM_LIST_ID);
            //parseInt(BOM_LIST_ID)


            var params = {
                "BOM_LIST_ID": BOM_LIST_ID // BOM List 식별 키
            }

            //BOM 삭제 Ajax 통신()
            //(int) BOM_LIST_ID : BOM List 식별 키
            fun_ajax("POST", "http://220.89.167.212:8085/testing05/AllDeleteBom", params, true, function (data) {

                console.log("성공");
            });

            //alert(JSON.stringify(params));

            //보여주기식
            //delete_array[i].remove();

            modals[1].style.display = "none";
        }
        delete_array.splice(0, delete_array.length);
        location.reload();

        //delete_tr.remove();
        //modals[1].style.display = "block";
        //modals[0].style.display = "none";
    }
    else if (flag == 3) {

        modals[2].style.display = 'none';
    }

}

function modal_delete_cancle() {



    modals[1].style.display = "none";

}
function pop_delete_tr(value) {
    for (var i = 0; i < delete_array.length; i++) {
        //ajax 통신에 사용될
        var tr = delete_array[i];
        var td = tr[0].getElementsByTagName('td');
        if (td[0].textContent == value)
            delete_array.splice(i, 1);
    }

}

// 검색
function search_() {


    if (serach_date_condition() == true && search_etc_condition() == false) {


        var params = {

            "firstday": convert_date(1),
            "secondday": convert_date(2)
        }

        console.log(JSON.stringify(params));


        //alert("BOM 등록일 범위 조회" + JSON.stringify(params));

        //BOM 등록일 범위 조회 Ajax 통신()

        fun_ajax("POST", "http://220.89.167.212:8085/testing05/CreateDayFindView", params, true, function (data) {

            console.log("성공");

            $('#bom_register_table > tbody').empty();

            var length = data.length;

            if (length == 0) {
                modals[0].style.display = "block";
            }

            for (var i = 0; i < length; i++) {

                var html = '';

                html += '<tr>';
                html += '<input type="hidden" value=' + data[i].BOM_LIST_ID + '>';
                html += '<input type="hidden" value=' + data[i].ORIGIN_ACCOUNT_ID + '>';
                html += '<td><input type="checkbox" name="box"></td>'
                html += '<td>' + (i + 1) + '</td>';
                html += '<td>' + data[i].BOM_LIST_DIVISION + '</td>'
                html += '<td>' + data[i].BOM_LIST_MAIN_NAME + '</td>';
                html += '<td>' + data[i].BOM_LIST_MAIN_PRODUCTCODE + '</td>';
                html += '<td>' + data[i].ORIGIN_ACCOUNT_MEMBERNAME + '</td>';
                html += '<td>' + change_date_ajax(data[i].BOM_LIST_CREATEDATE) + '</td>';
                html += '</tr>';

                $("#bom_register_table").append(html);
            }
        });
    }
    else if (serach_date_condition() == false && search_etc_condition() == false) {

        load_bom_list();

    }

    else if (serach_date_condition() == false && search_etc_condition() == true) {


        var product_name = $('#product_name').val();
        var product_number = $('#product_number').val();
        var product_manager = $('#product_manager').val();

        alert("BOM 품번, 품명, 담당자 조회 \n" +
            "품명 :" + product_name + "\n" + "품번 :" + product_number + "\n" + "담당자 :" + product_manager);


        var params = {

            "BOM_LIST_MAIN_NAME": product_name,
            "BOM_LIST_MAIN_PRODUCTCODE": product_number,
            "ORIGIN_ACCOUNT_MEMBERNAME": product_manager
        }

        console.log(JSON.stringify(params));

        /* alert("입력된 값에 의한 조회 \n" + "firstday :" + firstday + "\n" + "secondday :" + secondday + "\n" +
            "품명 :" + product_name + "\n" + "품번 :" + product_number + "\n" + "담당자 :" + product_manager); */

        fun_ajax("POST", "http://220.89.167.212:8085/testing05/SearchBomListFindView", params, true, function (data) {

            console.log(data);

            $('#bom_register_table > tbody').empty();

            var length = data.length;

            if (length == 0) {
                modals[0].style.display = "block";
            }

            for (var i = 0; i < length; i++) {

                var html = '';

                html += '<tr>';
                html += '<input type="hidden" value=' + data[i].BOM_LIST_ID + '>';
                html += '<input type="hidden" value=' + data[i].ORIGIN_ACCOUNT_ID + '>';
                html += '<td><input type="checkbox" name="box"></td>'
                html += '<td>' + (i + 1) + '</td>';
                html += '<td>' + data[i].BOM_LIST_DIVISION + '</td>'
                html += '<td>' + data[i].BOM_LIST_MAIN_NAME + '</td>';
                html += '<td>' + data[i].BOM_LIST_MAIN_PRODUCTCODE + '</td>';
                html += '<td>' + data[i].ORIGIN_ACCOUNT_MEMBERNAME + '</td>';
                html += '<td>' + change_date_ajax(data[i].BOM_LIST_CREATEDATE) + '</td>';
                html += '</tr>';

                $("#bom_register_table").append(html);

            }

        });

    }
    else {
        var params = {

            "BOM_LIST_MAIN_NAME": $('#product_name').val(),
            "BOM_LIST_MAIN_PRODUCTCODE": $('#product_number').val(),
            "ORIGIN_ACCOUNT_MEMBERNAME": $('#product_manager').val(),
            "firstday": convert_date(1),
            "secondday": convert_date(2)

        }

        fun_ajax("POST", "http://220.89.167.212:8085/testing05/AllListFindView", params, true, function (data) {

            console.log(data);

            $('#bom_register_table > tbody').empty();

            var length = data.length;

            if (length == 0) {
                modals[0].style.display = "block";
            }

            for (var i = 0; i < length; i++) {

                var html = '';

                html += '<tr>';
                html += '<input type="hidden" value=' + data[i].BOM_LIST_ID + '>';
                html += '<input type="hidden" value=' + data[i].ORIGIN_ACCOUNT_ID + '>';
                html += '<td><input type="checkbox" name="box"></td>'
                html += '<td>' + (i + 1) + '</td>';
                html += '<td>' + data[i].BOM_LIST_DIVISION + '</td>'
                html += '<td>' + data[i].BOM_LIST_MAIN_NAME + '</td>';
                html += '<td>' + data[i].BOM_LIST_MAIN_PRODUCTCODE + '</td>';
                html += '<td>' + data[i].ORIGIN_ACCOUNT_MEMBERNAME + '</td>';
                html += '<td>' + change_date_ajax(data[i].BOM_LIST_CREATEDATE) + '</td>';
                html += '</tr>';

                $("#bom_register_table").append(html);

            }

        });


        alert("BOM 통합 검색 조회 \n" + "firstday :" + params.firstday + "\n" + "secondday :" + params.secondday + "\n" +
            "품명 :" + params.BOM_LIST_MAIN_NAME + "\n" + "품번 :" + params.BOM_LIST_MAIN_PRODUCTCODE + "\n" + "담당자 :" + params.ORIGIN_ACCOUNT_MEMBERNAME);

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
    if ($('#product_name').val() != '' || $('#product_number').val() != '' || $('#product_manager').val() != '') {
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

function ischeck_excel(json, n_json) {

    try {
        var range = n_json["!ref"];
        var length = Number(range[4]);

        if (range[0] == "A" && range[3] == "F") {
            if (n_json["A1"].w == "구분" && n_json["B1"].w == "순번" && n_json["C1"].w == "Level" && n_json["D1"].w == "품번" && n_json["E1"].w == "품명" && n_json["F1"].w == "수량") {

                return ischeck_excel_space(n_json, length, 1);
            }
        }
        else {
            if (n_json["A1"].w == "구분" && n_json["B1"].w == "순번" && n_json["C1"].w == "Level" && n_json["D1"].w == "품번" && n_json["E1"].w == "품명" && n_json["F1"].w == "수량" && n_json["G1"].w == "벨로우즈코드" && n_json["H1"].w == "금형 TYPE" && n_json["I1"].w == "금형번호" && n_json["J1"].w == "OD" && n_json["K1"].w == "ID"
                && n_json["L1"].w == "소재코드" && n_json["M1"].w == "소재" && n_json["N1"].w == "소재크기" && n_json["O1"].w == "소재두께" && n_json["P1"].w == "W/D 직경") {

                return ischeck_excel_space(n_json, length, 2);
            }
        }
    }
    catch (e) {

        return false;
    }
}

function convert_file_time() {

    var date = new Date();
    // date Object를 받아오고 

    var year = date.getFullYear();


    var months = date.getMonth() + 1;
    // 달을 받아옵니다 

    var clockDate = date.getDate();
    // 몇일인지 받아옵니다 



    return year + "." + convert_two(months) + "." + convert_two(clockDate);
}

function convert_two(value) {
    return value < 10 ? "0" + value : value
}

// undifined 일때 공백으로
/* function ischeck_tr(value) {
    if (value == undefined)
        return ' ';
    else
        return value;
}
 */

function send_excel_file() {

    /* var n = sessionStorage.getItem("ORIGIN_ACCOUNT_ID");
    alert(n); */
    //var form = $('#excelForm')[0];

    // FormData 객체 생성
    var formData = new FormData();
    //var file = $('#ex_file');
    //console.log($("#ex_file")[0].files[0]);
    //alert(file[0].files);
    //console.log(document.getElementById('ex_file').files[0]);
    // 코드로 동적으로 데이터 추가 가능.

    formData.append('bom file', $("input[id=ex_file]")[0].files[0]);
    /* formData.append('ORIGIN_ACCOUNT_ID', sessionStorage.getItem("ORIGIN_ACCOUNT_ID")); // id 추가 나중에 세션값에서 가지고 오면됨 */
    formData.append('ORIGIN_ACCOUNT_ID', "13");

    //console.log(formData.get('bom file'));
    //console.log(formData.get('ORIGIN_ACCOUNT_ID'));

    //BOM 파일 업로드 및 등록 Ajax 통신()
    //(File) bom file : BOM 파일 key
    //(int) ORIGIN_ACCOUNT_ID : 계정 식별 키

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://220.89.167.212:8085/testing05/RegisterBomlist",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            location.reload();
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('2. fail 을 탄다 : ' + errorThrown);
    });
}

function ischeck_excel_space(n_json, length, flag) {
    var excel_type_array1 = new Array('A', 'B', 'C', 'D', 'E', 'F');
    var excel_type_array2 = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P');

    if (flag == 1) {
        for (var i = 2; i <= length; i++) {
            for (var j = 0; j < 6; j++) {
                var temp = excel_type_array1[j] + i;
                if (j == 0) {
                    if (n_json[temp].w == "개발" || n_json[temp].w == "영업" || n_json[temp].w == "없음") {
                        continue;
                    }
                    else {
                        return false;
                    }
                }
                if (n_json[temp].w == undefined) {
                    return false;
                }
            }
        }
        return true;
    }
    else {
        for (var i = 2; i <= length; i++) {
            for (var j = 0; j < 16; j++) {
                var temp = excel_type_array2[j] + i;
                
                    if (n_json[temp].w != undefined) {
                        continue;
                    }
                    else
                    {
                        return false;
                    }
                }
                
            }
        }
        return true;
    }


// 체크 박스 모두 체크
$("#all_checkbox").click(function () {

    if ($('input:checkbox[id="all_checkbox"]').is(":checked") == true) {
        $("input[name=box]:checkbox").each(function () {
            $(this).prop("checked", true);
        });
    } else {
        $("input[name=box]:checkbox").each(function () {
            $(this).prop("checked", false);
        });
    }
});


function ischeck_value(value) {
    if (value == undefined)
        return '';
    else
        return value;
}
//모달정의
var modals = document.getElementsByClassName("modal");



