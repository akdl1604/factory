window.onload = function () {

    load_bom_list();

}

function load_bom_list() {

    $('#bom_table > tbody').empty();

    //부모 배열 받아오기
    data = parent.AllBomdata;

    //이전 버튼 눌렀을 때 Bomlist 출력
    for (var i = 0; i < data.length; i++) {
        var html = '';

        html += '<tr>';
        html += data[i];
        html += '</tr>';

        $("#bom_table").append(html);
    }

}

// 테이블의 Row 클릭시 값 가져오기
$("#bom_table").on('click', 'tbody > tr', function () {
    var tdArr = new Array();	// 배열 선언

    // 현재 클릭된 Row(<tr>)
    var tr = $(this);
    td = tr.children();

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
    flag = true;
});

function bom_pop_next() {

    //선택한 bomdata 배열
    sel_bomdata = new Array();
    //전체 bomdata 배열
    all_bomdata = new Array();
    //저장을 위한 배열
    unique_bomid = new Array();

    if (flag == false) {
        alert("행선택해주세요.");
        return;
    }

    if (td.eq(0).val() == "1") {

        params = {
            "type": td.eq(0).val(),
            "BOM_LIST_ID": td.eq(1).val(),
            "ORIGIN_ACCOUNT_ID": td.eq(2).val(),
            "BOM_FILE_MANAGEMENT_ID": td.eq(3).val(),
            "BOM_DETAIL_DIVISION": td.eq(4).text(),
            "BOM_DETAIL_INDEX": td.eq(5).text(),
            "BOM_DETAIL_LEVERL": td.eq(6).text(),
            "BOM_DETAIL_PRODUCTNAME": td.eq(7).text(),
            "BOM_DETAIL_PRODUCTCODE": td.eq(8).text(),
            "BOM_DETAIL_QUANTITY": td.eq(9).text(),
            "BOM_DETAIL_BELLOWSCODE": td.eq(10).text(),
            "BOM_DETAIL_MOLDTYPE": td.eq(11).text(),
            "BOM_DETAIL_MOLDNUMBER": td.eq(12).text(),
            "BOM_DETAIL_OD": td.eq(13).text(),
            "BOM_DETAIL_C_ID": td.eq(14).text(),
            "BOM_DETAIL_MATERIALCODE": td.eq(15).text(),
            "BOM_DETAIL_MATERIAL": td.eq(16).text(),
            "BOM_DETAIL_MATERIALSIZE": td.eq(17).text(),
            "BOM_DETAIL_MATERIALTHICK": td.eq(18).text(),
            "BOM_DETAIL_WD": td.eq(19).text(),

            //임시 식볇값 
            "BOM_UNIQUE": td.eq(20).val(),
        }

        /*  html += '<tr>';
         html += '<input type="hidden" value=' + td.eq(0).val() + '>';
         html += '<input type="hidden" value=' + td.eq(1).val() + '>';
         html += '<input type="hidden" value=' + td.eq(2).val() + '>';
         html += '<input type="hidden" value=' + td.eq(3).val() + '>';
 
         html += '<td>' + td.eq(4).text() + '</td>'
         html += '<td>' + td.eq(5).text() + '</td>';
         html += '<td>' + td.eq(6).text() + '</td>';
 
         html += '<td>' + td.eq(7).text() + '</td>';
         html += '<td>' + td.eq(8).text() + '</td>';
         html += '<td>' + td.eq(9).text() + '</td>';
 
         html += '<td>' + td.eq(10).text() + '</td>';
         html += '<td>' + td.eq(11).text() + '</td>';
         html += '<td>' + td.eq(12).text() + '</td>';
         html += '<td>' + td.eq(13).text() + '</td>';
         html += '<td>' + td.eq(14).text() + '</td>';
         html += '<td>' + td.eq(15).text() + '</td>';
         html += '<td>' + td.eq(16).text() + '</td>';
         html += '<td>' + td.eq(17).text() + '</td>';
         html += '<td>' + td.eq(18).text() + '</td>';
         html += '<td>' + td.eq(19).text() + '</td>';
         html += '</tr>'; */

    }

    else {

        params = {
            "type": td.eq(0).val(),
            "BOM_LIST_ID": td.eq(1).val(),
            "ORIGIN_ACCOUNT_ID": td.eq(2).val(),
            "BOM_FILE_MANAGEMENT_ID": td.eq(3).val(),
            "BOM_DETAIL_DIVISION": td.eq(4).text(),
            "BOM_DETAIL_INDEX": td.eq(5).text(),
            "BOM_DETAIL_LEVERL": td.eq(6).text(),
            "BOM_DETAIL_PRODUCTNAME": td.eq(7).text(),
            "BOM_DETAIL_PRODUCTCODE": td.eq(8).text(),
            "BOM_DETAIL_QUANTITY": td.eq(9).text(),
            "BOM_DETAIL_BELLOWSCODE": td.eq(10).text(),
            "BOM_DETAIL_MOLDTYPE": td.eq(11).text(),
            "BOM_DETAIL_MOLDNUMBER": td.eq(12).text(),
            "BOM_DETAIL_OD": td.eq(13).text(),
            "BOM_DETAIL_C_ID": td.eq(14).text(),
            "BOM_DETAIL_MATERIALCODE": td.eq(15).text(),
            "BOM_DETAIL_MATERIAL": td.eq(16).text(),
            "BOM_DETAIL_MATERIALSIZE": td.eq(17).text(),
            "BOM_DETAIL_MATERIALTHICK": td.eq(18).text(),
            "BOM_DETAIL_WD": td.eq(19).text(),

             //임시 식볇값
            "BOM_UNIQUE": td.eq(20).val(),
        }
    }
    
    sel_bomdata.push(params);



    $('#bom_table tr').each(function () {
        if (!this.rowIndex) return; // skip first row

        console.log($(this));
        all_bomdata.push($(this)[0].innerHTML);

    });

    for (var i = 0; i < sel_bomdata.length; i++) {
        /* console.log(JSON.parse(JSON.stringify(tr_array)));
        console.log(tr_array[i]); */

        //console.log(JSON.stringify(tr_array[i].BOM_DATA));
    }

    


    //unique_bomid.push(params);


    /* a = JSON.stringify(tr_array);
    b = JSON.parse(a);
    console.log(b[0]); */

    //parent.BomData = JSON.parse(JSON.stringify(tr_array));

    //부모에게 선택한 bomdata 넘기는 코드
    window.parent.postMessage({ childData: 'sel_bomdata', arr: JSON.parse(JSON.stringify(sel_bomdata)) }, '*');
    window.parent.postMessage({ childData: 'all_bomdata', arr: JSON.parse(JSON.stringify(all_bomdata)) }, '*');
    

    if (flag) {
        
        $("#BOM").attr("href", "select_document_format.html")

        pop_workorder_btn_click('bom_next');
    }
    else {
        alert("행선택해주세요.");

    }

}

var flag = false;


