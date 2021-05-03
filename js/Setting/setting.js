//작업자 정보 ROW 클릭 고유 값
var WorkerORIGIN_ACCOUNT_RESIDENTNUMBER = '';
var WorkerORIGIN_ACCOUNT_EMPLOYEENUMBER = '';
//관리자 정보 ROW 클릭 고유 값
var AdminNo = '';

window.onload = function () {
    var html = '';

    //id="list" 값 초기화
    $("#WorkerList").empty();
    $("#AdminList").empty();

    //Ajax
    // 작업자들만 조회 Ajax 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/WorketMemberSelect", null, true, function (data) {
        $.each(data, function (i, v) {
            html += '<tr>';
            html += '    <td id = "wid" style="display: none">' + v.ORIGIN_ACCOUNT_ID + '</td>'
            html += '    <td id = "wper" style="display: none">' + v.ORIGIN_ACCOUNT_DIVISION_ID + '</td>'
            html += '    <td id = "wphoto" style="display: none">' + v.ORIGIN_ACCOUNT_IMG_DIRECTORY + '</td>'
            html += '    <td id = "wnum" style="display: none">' + v.ORIGIN_ACCOUNT_EMPLOYEENUMBER + '</td>'
            html += '    <td>' + (i + 1) + '</td>';
            html += '    <td>';
            html += '        <a onclick="window.open(\'pop/setting_add_edit.html\', \'\', \'left=\'+(screen.availWidth-445)/2+\',top=\'+(screen.availHeight-590)/2+\', width=445px,height=590px\');" name="" style="cursor: pointer;">' + v.ORIGIN_ACCOUNT_EMPLOYEENUMBER + '</a>';
            html += '    </td>';
            html += '    <td id = "wname">' + v.ORIGIN_ACCOUNT_MEMBERNAME + '</td>';
            html += '    <td id = "wdepart">' + v.ORIGIN_ACCOUNT_DEPARTMENT + '</td>';
            html += '    <td id = "wtier">' + v.ORIGIN_ACCOUNT_TIER + '</td>';
            html += '    <td id = "wresident">' + v.ORIGIN_ACCOUNT_RESIDENTNUMBER + '</td>';
            html += '    <td id ="wpassword">' + v.ORIGIN_ACCOUNT_PASSWORD + '</td>';
            html += '</tr>';

            $("#WorkerList").append(html);

            html = '';
        });
    });

    // 관리자들만 조회 Ajax 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/AdminMemberSelect", null, true, function (data) {
        $.each(data, function (i, v) {
            var Auth = '';

            if (v.ORIGIN_ACCOUNT_DIVISION_ID == 2) {
                Auth = "일반";
            } else if (v.ORIGIN_ACCOUNT_DIVISION_ID == 4) {
                Auth = "Master";
            }
            html += '<tr>';
            html += '    <td id = "aid" style="display: none">' + v.ORIGIN_ACCOUNT_ID + '</td>'
            html += '    <td id = "aper" style="display: none">' + v.ORIGIN_ACCOUNT_DIVISION_ID + '</td>'
            html += '    <td id = "aphoto" style="display: none">' + v.ORIGIN_ACCOUNT_IMG_DIRECTORY + '</td>'
            html += '    <td id = "anum" style="display: none">' + v.ORIGIN_ACCOUNT_EMPLOYEENUMBER + '</td>'
            html += '    <td>' + (i + 1) + '</td>';
            html += '    <td>';
            html += '        <a onclick="window.open(\'pop/setting_admin_add_edit.html\', \'\', \'left=\'+(screen.availWidth-445)/2+\',top=\'+(screen.availHeight-590)/2+\', width=445px,height=590px\');" name="" style="cursor: pointer;">' + v.ORIGIN_ACCOUNT_EMPLOYEENUMBER + '</a>';
            html += '    </td>';
            html += '    <td id = "aname">' + v.ORIGIN_ACCOUNT_MEMBERNAME + '</td>';
            html += '    <td id = "adepart">' + v.ORIGIN_ACCOUNT_DEPARTMENT + '</td>';
            html += '    <td id = "atier">' + v.ORIGIN_ACCOUNT_TIER + '</td>';
            html += '    <td id = "aresident">' + v.ORIGIN_ACCOUNT_RESIDENTNUMBER + '</td>';
            html += '    <td id = "apassword">' + v.ORIGIN_ACCOUNT_PASSWORD + '</td>';
            html += '    <td id = "aauth">' + Auth + '</td>';
            html += '</tr>';

            $("#AdminList").append(html);

            html = '';
        });
    });
}

// 작업자 테이블의 Row 클릭시 값 가져오기
$("#WorkerTable").on('click', 'tr', function callworker () {
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
    // 주민등록번호
    WorkerORIGIN_ACCOUNT_RESIDENTNUMBER = td.eq(9).text().trim();
    //alert(WorkerORIGIN_ACCOUNT_RESIDENTNUMBER);
    // 사번
    WorkerORIGIN_ACCOUNT_EMPLOYEENUMBER = td.eq(5).text().trim();
    //alert(WorkerORIGIN_ACCOUNT_EMPLOYEENUMBER);
});

// 관리자 테이블의 Row 클릭시 값 가져오기
$("#AdminTable").on('click', 'tr', function () {
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
    // 주민등록번호
    AdminORIGIN_ACCOUNT_RESIDENTNUMBER = td.eq(9).text().trim();
    // 사번
    AdminORIGIN_ACCOUNT_EMPLOYEENUMBER = td.eq(5).text().trim();
});

// 작업자 정보 Modal 예 버튼 이벤트
$("#WorkerDelete").click(function () {
    var params = {
        ORIGIN_ACCOUNT_RESIDENTNUMBER: WorkerORIGIN_ACCOUNT_RESIDENTNUMBER,
        ORIGIN_ACCOUNT_EMPLOYEENUMBER: WorkerORIGIN_ACCOUNT_EMPLOYEENUMBER
    }

    if (WorkerORIGIN_ACCOUNT_RESIDENTNUMBER == '' || WorkerORIGIN_ACCOUNT_EMPLOYEENUMBER == '') {
        // 작업자 정보 테이블에서 값을 선택 하지 않고 제거 버튼 누를 시 모달창만 닫는다.
        $("#WorkerModal").css("display", "none");
    } else {
        //Ajax
        // 작업자 선택 삭제
        // (String) ORIGIN_ACCOUNT_RESIDENTNUMBER : 계정 주민등록번호 
        // (String) ORIGIN_ACCOUNT_EMPLOYEENUMBER : 계정 사번
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/DeleteMember", params, true, function (data) {
            
            if(data.DeleteFail == 1){
                location.reload();
            }
            else
            {
                alert("삭제 실패");
                $("#WorkerModal").css("display", "none");
            }
        });
    }
   
});

$("#AdminDelete").click(function () {
    var params = {
        ORIGIN_ACCOUNT_RESIDENTNUMBER: AdminORIGIN_ACCOUNT_RESIDENTNUMBER,
        ORIGIN_ACCOUNT_EMPLOYEENUMBER: AdminORIGIN_ACCOUNT_EMPLOYEENUMBER
    }

    console.log(params.ORIGIN_ACCOUNT_RESIDENTNUMBER);
    //console.log(params.ORIGIN_ACCOUNT_EMPLOYEENUMBER);

    if (AdminORIGIN_ACCOUNT_RESIDENTNUMBER == '' || AdminORIGIN_ACCOUNT_EMPLOYEENUMBER == '') {
        // 작업자 정보 테이블에서 값을 선택 하지 않고 제거 버튼 누를 시 모달창만 닫는다.
        $("#AdminModal").css("display", "none");
    } else {
        //Ajax
        // 작업자 선택 삭제
        // (String) ORIGIN_ACCOUNT_RESIDENTNUMBER : 계정 주민등록번호 
        // (String) ORIGIN_ACCOUNT_EMPLOYEENUMBER : 계정 사번
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/DeleteMember", params, true, function (data) {
            location.reload();
        });
    }
    if(data.DeleteFail == 0){
        alert("삭제 실패");
    }
});

// 작업자 정보 Modal 아니요 버튼 이벤트
$("#WorkerNo").click(function () {
    $("#WorkerModal").css("display", "none");
});
$("#AdminNo").click(function () {
    $("#AdminModal").css("display", "none");
});

function PageMove(arg1, arg2, arg3){
    var url = 'pop/customer_rewrite.html?arg1='+arg1+'&arg2='+arg2+'&arg3='+arg3;

    window.open(url, '', 'left='+(screen.availWidth-445)/2+',top='+(screen.availHeight-270)/2+', width=445px,height=270px');
}