window.onload = function () {

    load_bom_list();

}

function load_bom_list() {

    $('#bom_sel_table > tbody').empty();
 
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
            html += '<td>' + (i + 1) + '</td>';
            html += '<td>' + data[i].BOM_LIST_DIVISION + '</td>'
            html += '<td>' + data[i].BOM_LIST_MAIN_NAME + '</td>';
            html += '<td>' + data[i].BOM_LIST_MAIN_PRODUCTCODE + '</td>';
            html += '<td>' + data[i].ORIGIN_ACCOUNT_MEMBERNAME + '</td>';
            html += '<td>' + change_date_ajax(data[i].BOM_LIST_CREATEDATE) + '</td>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_INDEX + '>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_LEVERL + '>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_QUANTITY + '>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_OD + '>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_C_ID + '>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_MATERIALSIZE + '>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_MATERIALTHICK + '>';
            html += '<input type="hidden" value=' + data[i].BOM_DETAIL_WD + '>';
            html += '<input type="hidden" value=' + data[i].BOM_FILE_MANAGEMENT_ID + '>';
            html += '</tr>';

            $("#bom_sel_table").append(html);

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

// 테이블의 Row 클릭시 값 가져오기
$("#bom_sel_table").on('click', 'tbody > tr', function () {
    var tdArr = new Array();	// 배열 선언

    // 현재 클릭된 Row(<tr>)
    var tr = $(this);
    td = tr.children();
    console.log(tr);

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
        //console.log(td.eq(i).text());
        //console.log(td);
    });
    flag = true;
});

// 선택 버튼 클릭
$("#select_btn").on('click', function () {

    if(flag)
    {
        var params = {
            "BOM_LIST_ID": td.eq(0).val()
        }
    
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/ViewBomDetail", params, true, function (data) {
    
            //Json key 갯수 길이
            var json_length = Object.keys(data[0]).length;
            //배열 갯수 길이
            var length = data.length;
    
            $("#bom_table > tbody", opener.document).empty();

            for (var i = 0; i < length; i++) {
    
                var html = '';
    
                html += '<tr>';
                html += '<input type="hidden" value=' + "2" + '>';
                html += '<input type="hidden" value=' + Check_undefined(data[i].BOM_LIST_ID) + '>';
                html += '<input type="hidden" value=' + Check_undefined(data[i].ORIGIN_ACCOUNT_ID) + '>';
                html += '<input type="hidden" value=' + Check_undefined(data[i].BOM_FILE_MANAGEMENT_ID) + '>';
    
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_DIVISION) + '</td>'
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_INDEX) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_LEVERL) + '</td>';
    
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_PRODUCTNAME) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_PRODUCTCODE) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_QUANTITY) + '</td>';
    
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_BELLOWSCODE) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_MOLDTYPE) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_MOLDNUMBER) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_OD) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_C_ID) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_MATERIALCODE) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_MATERIAL) + '</td>';
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_MATERIALSIZE) + '</td>';//13 ***
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_MATERIALTHICK) + '</td>';//14 ***
                html += '<td>' + Check_undefined(data[i].BOM_DETAIL_WD) + '</td>';//15 ***
                html += '<input type="hidden" id="unique" value=' + data[i].BOM_DETAIL_ID + '>';
                html += '</tr>';
    
                $("#bom_table", opener.document).append(html);
            }
            ClosePopup();
        });
    }
    else
    {
        alert("행 선택 해주세요.");
        return;
    }
});

//문자열 undefined 체크
function Check_undefined(str){
    var return_str = "";
    if(str != undefined){
        return_str = str;
    }
    return return_str;
}

// 팝업 종료 버튼(X) 클릭 이벤트
function ClosePopup() {
    self.close();   //자기 자신창을 닫습니다.
}

var flag = false;