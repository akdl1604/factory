// 팝업 이동시 전달 정보
var CompanyNumber = '';
var CompanyName = '';
var CompanyNo = '';

// GET URL 파라미터 값 가져오기
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

//거래처 전체 조회
window.onload = function () {
    var html = '';

    //id="list" 값 초기화
    $("#list").empty();

    //Ajax
    //거래처 조회 Ajax 통신(OutsourcingList)
    //CUSTOMER_ID : 거래처 식별 키
    //CUSTOMER_NAME : 거래처명
    //CUSTOMER_NUMBER : 사업자번호
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/AllSelectCustomer", null, true, function (data) {
        $.each(data, function (i, v) {
            html += '<tr>';
            html += '    <td name="no" style="display:none;">' + v.CUSTOMER_ID + '</a></td>';
            html += '    <td name="no"><a href="#">' + v.CUSTOMER_NUMBER + '</a></td>';
            html += '    <td colspan="2" name="no"><a href="#">' + v.CUSTOMER_NAME + '</a></td>';
            html += '</tr>';

            $("#list").append(html);

            html = '';
        });
    });
}

// 사업자 검색 기능
$("#CompanySearchBt").click(function () {
    var params = {
        CUSTOMER_NAME: $('#CompanyName').val(),
        CUSTOMER_NUMBER: $('#CompanyNumber').val()
    }

    var html = '';

    //Ajax
    //거래처 검색 Ajax 통신(OutsourcingInsert)
    //(String) CUSTOMER_NAME : 거래처명
    //(String) CUSTOMER_NUMBER : 사업자번호
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SearchCustomer", params, true, function (data) {
        //id="list" 값 초기화
        $("#list").empty();

        $.each(data, function (i, v) {
            html += '<tr>';
            html += '    <td name="no" style="display:none;">' + v.CUSTOMER_ID + '</a></td>';
            html += '    <td name="no"><a href="#">' + v.CUSTOMER_NUMBER + '</a></td>';
            html += '    <td colspan="2" name="no"><a href="#">' + v.CUSTOMER_NAME + '</a></td>';
            html += '</tr>';

            $("#list").append(html);

            html = '';
        });
    });
});

// 테이블의 Row 클릭시 값 가져오기
$("#CompanyTable").on('click', 'tr', function () {
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
    CompanyNo = td.eq(0).text().trim();
    CompanyNumber = td.eq(1).text().trim();
    CompanyName = td.eq(2).text().trim();
});

// 선택 버튼 클릭
$("#SelectBt").on('click', function () {
    // 이전 페이지에서 값 가져오기
    var choice = $.urlParam('arg1');

    // GET 방식으로 arg1 = 0 -> 공정 등록
    // GET 방식으로 arg1 = 1 -> 공정 수정
    // GET 방식으로 arg1 = 2 -> 작업지시서 생성(거래처 생성) Welded Bellow 제작
    if(choice == 0){
        window.open('fair_add.html?arg1='+CompanyName+'&arg2='+CompanyNumber+'', 'BOM 선택', 'left='+(screen.availWidth-470)/2+',top='+(screen.availHeight-450)/2+', width=470px,height=450px');
    }else if(choice == 1){
        window.open('fair_add_rewrite.html?arg1='+$.urlParam('arg2')+'&arg2='+CompanyName+'&arg3='+CompanyNumber+'', 'BOM 선택', 'left='+(screen.availWidth-470)/2+',top='+(screen.availHeight-450)/2+', width=470px,height=450px');
    }else if(choice == 2){
       
        $("#JobOrder_Work_CompanyName", opener.document).text(CompanyName); //jquery 이용
        $("#JobOrder_Work_CompanyNumber", opener.document).val(CompanyNumber); //jquery 이용
        $("#JobOrder_Work_CompanyNo", opener.document).val(CompanyNo); //jquery 이용 
        
        window.close();
        return;
    }

    ClosePopup();
});

// 팝업 종료 버튼(X) 클릭 이벤트
function ClosePopup() {
    ClosePopup();
}