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
    fun_ajax("GET","http://220.89.167.212:8085/testing05/AllSelectCustomer", null, true ,function(data) { 
        $.each(data,function(i,v){
            html += '<tr>';
            html += '    <td><input type="checkbox" name="box"></td>';
            html += '    <td name="no" style="display:none;">'+ v.CUSTOMER_ID +'</td>';
            html += '    <td name="no">'+ (i+1) +'</td>';
            html += '    <td>';
            html += '    <a onclick="PageMove(\''+ v.CUSTOMER_NAME + '\', \''+ v.CUSTOMER_NUMBER + '\', \''+ v.CUSTOMER_ID +'\');" name="" style="cursor: pointer;">'+ v.CUSTOMER_NUMBER + '</a>';
            html += '    </td>';
            html += '    <td>'+ v.CUSTOMER_NAME + '</td>';
            html += '</tr>';

            $("#list").append(html);

            html = '';
        });
     });
}

//(업체명, 사업자 번호)검색 기능
$("#Search_Bt").click(function() {
    var params = {
        CUSTOMER_NAME : $('#CompanyName').val(),
        CUSTOMER_NUMBER : $('#CompanyNumber').val()
    }

    var html = '';

    //Ajax
    //거래처 등록 Ajax 검색(OutsourcingInsert)
    //(String) CUSTOMER_NAME : 거래처명
    //(String) CUSTOMER_NUMBER : 사업자번호
    fun_ajax("POST","http://220.89.167.212:8085/testing05/SearchCustomer", params, true ,function(data) { 
        //id="list" 값 초기화
        $("#list").empty();

        $.each(data,function(i,v){
            html += '<tr>';
            html += '    <td><input type="checkbox" name="box"></td>';
            html += '    <td name="no" style="display:none;">'+ v.CUSTOMER_ID +'</td>';
            html += '    <td name="no">'+ (i+1) +'</td>';
            html += '    <td>';
            html += '    <a onclick="PageMove(\''+ v.CUSTOMER_NAME + '\', \''+ v.CUSTOMER_NUMBER + '\', \'1\');" name="" style="cursor: pointer;">'+ v.CUSTOMER_NUMBER + '</a>';
            html += '    </td>';
            html += '    <td>'+ v.CUSTOMER_NAME + '</td>';
            html += '</tr>';

            $("#list").append(html);

            html = '';
        });
    });
});

//검색 조건 초기화
$("#Reflush_Bt").click(function() {
    $('#CompanyName').val("");
    $('#CompanyNumber').val("");
});

// 체크 박스 모두 체크
$("#CheckAll").click(function() {
    
    if($('input:checkbox[id="CheckAll"]').is(":checked") == true){
        $("input[name=box]:checkbox").each(function() {
            $(this).prop("checked", true);
    });
    }else{
        $("input[name=box]:checkbox").each(function() {
            $(this).prop("checked", false);
    });
    }
});

// (PopUp) 저장 버튼(수정 기능)
$("#CompanyUpdate_Btn").click(function() { 
    var params = {
        CUSTOMER_ID : $('#Pop_CompanyNo').val(),
        CUSTOMER_NAME : $('#Pop_CompanyName').val(),
        CUSTOMER_NUMBER : $('#Pop_CompanyNumber').val()
    }

    //Ajax
    //거래처 수정 Ajax 통신(RegisterCustomer)
    // (int) CUSTOMER_ID : 거래처 식별 키
    // (String) CUSTOMER_NAME : 거래처명
    // (String) CUSTOMER_NUMBER : 사업자번호
    fun_ajax("POST","http://220.89.167.212:8085/testing05/UpdateCustomer", params, true ,function(data) { 
        console.log("성공");
    });

    // 부모 창 Relaod
    opener.parent.location.reload();

    // 창 종료
    ClosePopup();
});

//(PopUp) 저장 버튼(등록 기능) CompanyAdd_Btn
$("#CompanyAdd_Btn").click(function() {    
    // Json 형식으로 전송 할 데이터 담기
    var params = {
        CUSTOMER_NAME: $('#Pop_CompanyName_insert').val(),
        CUSTOMER_NUMBER: $('#Pop_CompanyNumber_insert').val()
    }

    //Ajax
    //거래처 등록 Ajax 통신(OutsourcingInsert)
    //(String) CUSTOMER_NAME : 거래처명
    //(String) CUSTOMER_NUMBER : 사업자번호
     fun_ajax("POST","http://220.89.167.212:8085/testing05/RegisterCustomer", params, true ,function(data) { 
         console.log("성공");
     });

     // 부모 창 Relaod
     opener.parent.location.reload();

     // 창 종료
     ClosePopup();
});

// 사업자 등록 리스트 삭제 이벤트
$("#Delete_list").click(function() {  
    var rowData = new Array();
    var tdArr = new Array();
    var checkbox = $("input[name=box]:checked");

    //체크된 체크박스 값을 가져온다
    checkbox.each(function(i){
        var tr = checkbox.parent().parent().eq(i);
        var td = tr.children();

        rowData.push(tr.text());

        var no = td.eq(1).text();
        //a 태그 사용시 앞뒤 공백 발생으로 .trim() 사용
        var number = td.eq(3).text().trim();
        var companynumber = td.eq(4).text();

        tdArr.push(no);
        tdArr.push(number);
        tdArr.push(companynumber);

        console.log("no :" + no);
        console.log("number :" + number);
        console.log("companynumber :" + companynumber);

        // Json 형식으로 전송 할 데이터 담기
        var params = {
            CUSTOMER_ID: no
        }

        //Ajax
        //거래처 등록 Ajax 통신(OutsourcingInsert)
        //(int) CUSTOMER_ID : 거래처 식별 키
        fun_ajax("POST","http://220.89.167.212:8085/testing05/DeleteCustomer", params, true ,function(data) { 
            console.log("성공");
        });
    })
    
    modal_delete_cancle();

    //Relaod
    location.reload();
});


// 팝업 종료 버튼(X) 클릭 이벤트
function ClosePopup() {
    self.close();   //자기 자신창을 닫습니다.
}

// 모달 종료 버튼(X) 클릭 이벤트
function modal_delete_cancle() {

    var modals = document.getElementsByClassName("modal");

    modals[0].style.display = "none";

}

// popup 페이지 열기
function PageMove(arg1, arg2, arg3){
    var url = 'pop/customer_rewrite.html?arg1='+arg1+'&arg2='+arg2+'&arg3='+arg3;

    window.open(url, '', 'left='+(screen.availWidth-445)/2+',top='+(screen.availHeight-270)/2+', width=445px,height=270px');
}