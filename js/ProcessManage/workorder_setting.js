// 클릭시 tr이 담기는 변수
var delete_tr;

// 원본 공정 테이블 tr의 하이라이트를 관리하는 배열
var process_register_table_array = new Array();

//원본공정 식별값 저장하는 배열
var process_array = new Array();

// 작업내용 및 특이사항 테이블 tr의 하이라이트를 관리하는 배열
var task_content_table_array = new Array();

// 작업내용 및 특이사항 내용 관리하는 배열
var task_array = new Array();

// 설비 테이블 tr의 하이라이트를 관리하는 배열
var equipment_table_array = new Array();

// 설비 테이블 내용 관리하는 배열 
var equipment_array = new Array();

//원본 공정의 추가 버튼 flag 변수
var lock = true;

// 원본 공정 검색창 키 입력시 호출되는 함수
// var process_name = document.getElementById("process_name");

// process_name.onkeyup = function (event) {
//     event = event || window.event;
//     var _val = this.value.trim();

//     if (_val == '') // 공백일 때 전체 검색
//     {
//         delete_all_left_table();
//         delete_all_right_table();
//         load_process_register_table();
//     }
//     else // 아닐 때
//     {
//         delete_all_left_table();
//         delete_all_right_table();
//     }
// }

// 원본 공정 검색
$('#search_process_name').click(function () {

    if ($('#process_name').val() == '') {
        alert("공정명을 입력해주세요.");
        return;
    }

    var params = {

        ORIGIN_PROCESS_NAME: $('#process_name').val()
    }

    alert("원본 공정 검색 : " + JSON.stringify(params));

    // 공정 추가 Ajax 통신
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

    for (var i = 0; i < 2; i++) {

        var html = '';

        html += '<tr>';
        html += '<input type="hidden"' + 'value=' + i + '>' // 공정 식별 키
        html += '<td>' + params.ORIGIN_PROCESS_NAME + '</td>'; // 공정명
        html += '<td>B00' + (i + 1) + '</td>'; // 공정 코드
        html += '</tr>';

        $('#process_register_table').append(html);
    }

});



//페이지 로드시 공정 부분 row data 생성 부분
window.onload = function () {
    //페이지 로딩시 체크 박스 해제
    if ($('input:checkbox[id="OutcheckSelect"]').is(":checked") == true) {
        $('input:checkbox[id="OutcheckSelect"]').prop("checked", false)
    }

    // 공정 세부 설정 iframe 설정
    $('#container2').attr('src', "workorder_set_tab_01.html");
}

//원본 공정 row data 클릭시
$('#process_register_table').on("click", "tr", function () {

    delete_tr = $(this);
    if (check_tr(delete_tr[0])) {

        click_process_register_tr();

    }
});


//원본 공정 row data 클릭시 하이라이트 부분
function click_process_register_tr() {

    if (process_register_table_array.length < 1) {
        delete_tr[0].style.backgroundColor = "#eeedfb";
        if (check_process_input(delete_tr[0]))
            delete_all_right_table();
        check_tr_isinput(delete_tr[0])
        process_register_table_array.push(delete_tr[0]);
        show(delete_tr[0]);
    }

    else {

        var temp = process_register_table_array.pop();
        temp.style.backgroundColor = "#FFFFFF";
        if (check_process_input(delete_tr[0]))
            delete_all_right_table();
        check_tr_isinput(delete_tr[0]);
        delete_tr[0].style.backgroundColor = "#eeedfb";
        process_register_table_array.push(delete_tr[0]);
        show(delete_tr[0]);
    }
}

//클릭한 tr 의 값이 새로운 공정 추가 인지 여부 체크
function check_process_input(tr) {

    var input = tr.getElementsByTagName('input');

    if (input[0].type == 'hidden')
        return false;
    else
        return true;
}

// 클릭한 tr의 값이 기존에 공정이고 새로운 공정 추가 버튼이 활성화 됐을때 삭제하는 부분
function check_tr_isinput(tr) {

    var input = tr.getElementsByTagName('input');

    // table행의 맨 마지막 tr 요소를 얻어와야함.
    var table = document.getElementById('process_register_table');
    var tbody = table.getElementsByTagName('tbody');
    var tr = tbody[0].getElementsByTagName('tr');

    var check_input = tr[tr.length - 1].getElementsByTagName('input');


    if (input[0].type == 'hidden' && check_input[0].type == 'text') {

        tr[tr.length - 1].remove();
        lock = true;
    }
}

//원본 공정 등록
$('#process_insert').click(function () {

    if (lock) {

        delete_all_right_table();

        var html = '';

        html += '<tr>';
        // 하단에 있는 공정식별키를 임의로 넣어 줌
        /*  html += '<input type="hidden" id="ORIGIN_PROCESS_ID"' + 'value=' + 2 + '>' //공정 식별 키 */
        html += '<td class="pd"><input type="text" id ="ORIGIN_PROCESS_NAME" width="100%"></td>'; // 공정명
        html += '<td class="pd"><input type="text" id ="ORIGIN_PROCESS_CODE"></td>'; // 공정 코드
        html += '</tr>';

        $('#process_register_table').append(html);

        lock = false;

        // table행의 맨 마지막 tr 요소를 얻어와야함.
        var table = document.getElementById('process_register_table');
        var tbody = table.getElementsByTagName('tbody');
        var tr = tbody[0].getElementsByTagName('tr');

        tr[tr.length - 1].style.backgroundColor = "#eeedfb";
        process_register_table_array.pop();
        process_register_table_array.push(tr[tr.length - 1]);


        for (var i = 0; i < tr.length - 1; i++) {
            tr[i].style.backgroundColor = "#FFFFFF";
        }

        show(tr[tr.length - 1]);

    }

    else {
        alert('공정은 하나만 추가 가능합니다.');
    }
});


//원본 공정 삭제 클릭시
$('#process_delete').click(function () {
    if (process_register_table_array.length != 0) {

        var tr = process_register_table_array.pop();
        var input = tr.getElementsByTagName('input');

        //input.length 2면 새로추가한 공정임
        if (input.length == 2) {
            lock = true;

            /* var params = {

                ORIGIN_PROCESS_NAME: $('#ORIGIN_PROCESS_NAME').val() //새로운 공정 추가에만 있는 id 값임 

            } */
        }
        else {
            var td = tr.getElementsByTagName('td');
            params = {

                ORIGIN_PROCESS_NAME: td[0].innerText

            }

            process_array.push(params);


            // 공정 추가 Ajax 통신
            /*  $.ajax({
                 type: "GET",
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

        }

        tr.remove();
        delete_all_right_table();

        //alert("원본 공정 삭제 " + JSON.stringify(params));

    }
    // 선택하지 않고 삭제 버튼 눌렀을시 맨아래에 있는 공정삭제 부분
    else {

        var table = document.getElementById('process_register_table');
        var tbody = table.getElementsByTagName('tbody');
        var tr = tbody[0].getElementsByTagName('tr');

        var input = tr[tr.length - 1].getElementsByTagName('input');

        if (input.length == 2) {
            lock = true;

            var params = {

                ORIGIN_PROCESS_NAME: $('#ORIGIN_PROCESS_NAME').val()

            }
        }
        else {
            var td = tr[tr.length - 1].getElementsByTagName('td');
            params = {

                ORIGIN_PROCESS_NAME: td[0].innerText

            }
        }

        tr[tr.length - 1].remove();

        alert("공정 삭제 " + JSON.stringify(params));
    }

});

//작업내용 및 특이사항 테이블 클릭시
$('#task_content_table').on("click", "tr", function () {

    delete_tr = $(this);
    if (check_tr(delete_tr[0])) {
        //alert("task_content_table")

        click_task_content_tr();

    }
});

//작업내용 및 특이사항 row data 클릭시 하이라이트 부분
function click_task_content_tr() {

    if (task_content_table_array.length < 1) {

        delete_tr[0].style.backgroundColor = "#eeedfb";
        task_content_table_array.push(delete_tr[0]);
    }

    else {

        var temp = task_content_table_array.pop();
        temp.style.backgroundColor = "#FFFFFF";

        delete_tr[0].style.backgroundColor = "#eeedfb";
        task_content_table_array.push(delete_tr[0]);

    }

}

//작업내용 및 특이사항 추가 버튼 클릭시 input 추가 부분
$('#order_content_insert').click(function () {

    if (process_register_table_array.length <= 0) {
        alert("공정을 먼저 선택하세요.");
        return;
    }

    /* //공정 식별키 가져오기
    var tr = process_register_table_array.pop();
    var input = tr.getElementsByTagName('input');
    //console.log(input[0].value); */

    var html = '';
    html += '<tr>';
    /*  html += '<input type="hidden" id="ORIGIN_PROCESS_ID"' + input[0].value + '>' // ORIGIN_PROCESS_ID 공정 식별 키 */
    html += '<td class="pd"><input type="text" width="100%"></td>'; // ORIGIN_UNIQUESS_CONTEXT 작업 특이사항 내용
    html += '</tr>';

    $('#task_content_table').append(html);

    // table행의 맨 마지막 요소를 얻어와야함.
    var table = document.getElementById('task_content_table');
    var tr = table.getElementsByTagName('tr');

    tr[tr.length - 1].style.backgroundColor = "#eeedfb";

    task_content_table_array.pop();
    task_content_table_array.push(tr[tr.length - 1]);


    for (var i = 0; i < tr.length - 1; i++) {
        tr[i].style.backgroundColor = "#FFFFFF";
    }

});


//작업내용 및 특이사항 부분 삭제 클릭시
$('#order_content_delete').click(function () {

    if (process_register_table_array.length <= 0) {
        alert("공정을 먼저 선택하세요.");
        return;
    }

    // 작업내용 및 특이사항 클릭 했을때 삭제
    if (task_content_table_array.length > 0) {

        var tr = task_content_table_array.pop();
        var input = tr.getElementsByTagName('input');

        // 새로 추가한 내용이 아닐때만 동작
        if (input[0].type != 'text') {
            params = {

                ORIGIN_UNIQUESS_ID: input[0].value

            }
            task_array.push(params);
        }
        tr.remove();
    }
    //작업내용 및 특이사항 클릭 안했을때 맽 밑의 행 삭제
    else {

        var table = document.getElementById('task_content_table');
        var tr = table.getElementsByTagName('tr');

        if (tr.length == 0)
            return;

        var input = tr[tr.length - 1].getElementsByTagName('input');

        // 새로 추가한 내용이 아닐때만 동작
        if (input[0].type != 'text') {
            params = {

                ORIGIN_UNIQUESS_ID: input[0].value

            }
            task_array.push(params);

        }
        tr[tr.length - 1].remove();

    }

});

// 설비 테이블 클릭시
$('#table_equipment_table').on("click", "tr", function () {

    delete_tr = $(this);
    if (check_tr(delete_tr[0])) {


        click_equipment_tr()

    }
});

//설비 테이블 row data 클릭시 하이라이트 부분
function click_equipment_tr() {

    if (equipment_table_array.length < 1) {

        delete_tr[0].style.backgroundColor = "#eeedfb";
        equipment_table_array.push(delete_tr[0]);
    }

    else {

        var temp = equipment_table_array.pop();
        temp.style.backgroundColor = "#FFFFFF";

        delete_tr[0].style.backgroundColor = "#eeedfb";
        equipment_table_array.push(delete_tr[0]);
    }

}


//설비 부분 + 클릭시 input 추가 부분
$('#equipment_insert').click(function () {

    if (process_register_table_array.length <= 0) {
        alert("공정을 먼저 선택하세요.");
        return;
    }

    var html = '';

    html += '<tr>';
    html += '<td class="pd"><input type="text" width="100%"></td>';
    html += '<td class="pd"><input type="text" ></td>';
    html += '<td class="pd"><input type="text" ></td>';
    html += '</tr>';

    $('#table_equipment_table').append(html);

    // table행의 맨 마지막 요소를 얻어와야함.
    var table = document.getElementById('table_equipment_table');
    var tr = table.getElementsByTagName('tr');

    tr[tr.length - 1].style.backgroundColor = "#eeedfb";

    equipment_table_array.pop();
    equipment_table_array.push(tr[tr.length - 1]);


    for (var i = 0; i < tr.length - 1; i++) {
        tr[i].style.backgroundColor = "#FFFFFF";
    }

});


//설비 부분 삭제 클릭시
$('#equipment_delete').click(function () {

    if (process_register_table_array.length <= 0) {
        alert("공정을 먼저 선택하세요.");
        return;
    }

    // 설비 클릭 했을때 삭제
    if (equipment_table_array.length > 0) {

        var tr = equipment_table_array.pop();
        var input = tr.getElementsByTagName('input');

        // 새로 추가한 내용이 아닐때만 동작
        if (input[0].type != 'text') {
            params = {
                ORIGIN_EQUIPMENT_ID: input[0].value
            }

            equipment_array.push(params);
        }
        tr.remove();
    }
    // 설비 클릭 안했을때 맽 밑의 행 삭제
    else {

        var table = document.getElementById('table_equipment_table');
        var tr = table.getElementsByTagName('tr');

        if (tr.length == 0)
            return;

        var input = tr[tr.length - 1].getElementsByTagName('input');

        // 새로 추가한 내용이 아닐때만 동작
        if (input[0].type != 'text') {

            params = {

                ORIGIN_EQUIPMENT_ID: input[0].value

            }
            equipment_array.push(params);

        }
        tr[tr.length - 1].remove();

    }

});

// 새로운 원본 공정 등록시 호출되는 함수
function show(value) {

    var input = value.getElementsByTagName('input');


    for (var i = 0; i < input.length; i++) {
        if (input[i].type == "hidden") {
            input = input[i];
        }
    }
    //input.value는 공정 식별 키
    switch (input.value) {

        case '0':
            delete_all_right_table();
            show_task_content_data(1);
            show_equipment_data(1);
            break;
        case '1':
            delete_all_right_table();
            show_task_content_data(2);
            show_equipment_data(2);
            break;
        case '2':
            delete_all_right_table();
            break;
        /* default:
            delete_all_right_table(); */


    }

}

//테이블에서 선택한 행
function check_tr(value) {

    var input = value.getElementsByTagName('input');

    if (input.length != 0) {

        return true;
    }
    else {

        return false;
    }
}

//공정에 따른 작업 특이사항 조회
function show_task_content_data(value) {

    //value는 공정 식별키

    var params = {
        ORIGIN_PROCESS_ID: value
    }

    alert("공정에 따른 작업 특이사항 조회 : " + JSON.stringify(params));


    // 공정 추가 Ajax 통신
    /*  $.ajax({
         type: "GET",
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

    var html = '';
    html += '<tr>';
    html += '<input type="hidden" id = "ORIGIN_UNIQUESS_ID" value=' + value + '>'; // ORIGIN_UNIQUESS_ID : 작업특이사항 식별 키
    /* html += '<input type="hidden" id = "ORIGIN_PROCESS_ID" value=' + value + '>'; // ORIGIN_PROCESS_ID 공정 식별 키 */
    html += '<td>' + 'test' + value + '</td>' // ORIGIN_UNIQUESS_CONTEXT : 작업 특이사항 내용
    html += '</tr>';

    $('#task_content_table').append(html);


}

//공정에 따른 작업 설비 조회 
function show_equipment_data(value) {

    //value는 공정 식별 키

    var params = {
        ORIGIN_PROCESS_ID: value
    }

    alert("공정에 따른 작업 설비 조회 : " + JSON.stringify(params));


    // 공정 추가 Ajax 통신
    /*  $.ajax({
         type: "GET",
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


    html = '';
    html += '<tr>';
    html += '<input type="hidden" id="ORIGIN_EQUIPMENT_ID" value=' + value + '>'; // ORIGIN_EQUIPMENT_ID 설비 식별 키
    /* html += '<input type="hidden" id="ORIGIN_PROCESS_ID" value=' + value + '>'; // ORIGIN_PROCESS_ID 공정 식별 키 */
    html += '<td>' + 'test' + value + '</td>'; // ORIGIN_EQUIPMENT_NAME 설비명
    html += '<td>' + 'test' + value + '</td>'; // ORIGIN_EQUIPMENT_CODE 설비 코드
    html += '<td>' + 'test' + value + '</td>'; // ORIGIN_EQUIPMENT_MODELNAME 설비 모델명
    html += '</tr>';

    $('#table_equipment_table').append(html);

}

// 오른쪽 테이블 전체 삭제
function delete_all_right_table() {

    var task_content_table = document.getElementById('task_content_table');
    var tr = task_content_table.getElementsByTagName('tr');
    var length = tr.length;

    for (var i = 0; i < length; i++) {
        tr[0].remove();
    }

    var equipment_table = document.getElementById('table_equipment_table');
    var tbody = equipment_table.getElementsByTagName('tbody');
    tr = tbody[0].getElementsByTagName('tr');
    length = tr.length;
    for (var i = 0; i < length; i++) {
        tr[0].remove();
    }

    $('#equipment_name').val('');
}

// 왼쪽 테이블 전체 삭제
function delete_all_left_table() {

    var table = document.getElementById('process_register_table');
    var tbody = table.getElementsByTagName('tbody');
    tr = tbody[0].getElementsByTagName('tr');
    length = tr.length;
    for (var i = 0; i < length; i++) {
        tr[0].remove();
    }
}

//저장
$('#process_save').click(function () {

    if (process_array.length > 0) {
        var length = process_array.length;

        for (var i = 0; i < length; i++) {
            //ajax 통신
            var process_name = process_array.pop();
            alert("원본 공정 삭제 " + JSON.stringify(process_name));
        }
    }
    else {

        var ORIGIN_PROCESS_ID = 0;
        if (process_register_table_array.length <= 0) {
            alert("공정을 먼저 선택하세요.");
            return;
        }

        var process_tr = process_register_table_array[0];
        var process_input = process_tr.getElementsByTagName('input')

        if (process_input[0].type == "hidden") // 기존에 있던 공정 수정 부분
        {
            //기존 작업내용 및 특이사항을 삭제 한경우
            if (task_array.length > 0) {
                var length = task_array.length;

                for (var i = 0; i < length; i++) {
                    var task_content = task_array.pop();
                    alert("작업내용 및 특이사항 삭제 " + JSON.stringify(task_content));
                }
            }

            var task_text = ''
            var task_table = document.getElementById('task_content_table');
            var task_tr = task_table.getElementsByTagName('tr');
            var task_length = task_tr.length;

            if (task_length == 0) {
                var task_params = {
                    ORIGIN_PROCESS_ID: process_input[0].value,
                    ORIGIN_UNIQUESS_CONTEXT: "없음"
                }
            }

            else {
                for (var i = 0; i < task_length; i++) {
                    var test = task_tr[i].getElementsByTagName('input');

                    if (test[0].type == 'hidden' || test[0].value == '')
                        continue;

                    if (i == task_tr.length - 1) {
                        task_text += test[0].value
                        break;
                    }
                    task_text += test[0].value + '/';
                }


                task_params = {
                    ORIGIN_PROCESS_ID: process_input[0].value,
                    ORIGIN_UNIQUESS_CONTEXT: task_text
                }

                if (task_params.ORIGIN_UNIQUESS_CONTEXT != '') {

                    alert("작업내용 및 특이사항 등록 " + JSON.stringify(task_params));

                }
            }

            //기존 설비를 삭제 한경우
            if (equipment_array.length > 0) {
                var length = equipment_array.length;

                for (var i = 0; i < length; i++) {
                    var equipment_content = equipment_array.pop();
                    alert(" 설비 삭제 " + JSON.stringify(equipment_content));
                }
            }

            var equipment_text = '';
            var equipment_table = document.getElementById('table_equipment_table');
            var tbody = equipment_table.getElementsByTagName('tbody');
            var equipment_tr = tbody[0].getElementsByTagName('tr');

            if (equipment_tr.length == 0) {
                var equipment_params = {
                    ORIGIN_PROCESS_ID: process_input[0].value,
                    ORIGIN_EQUIPMENT_NAME: "없음",
                    ORIGIN_EQUIPMENT_CODE: "없음",
                    ORIGIN_EQUIPMENT_MODELNAME: "없음"
                }
            }

            else {
                for (var i = 0; i < equipment_tr.length; i++) {
                    var test = equipment_tr[i].getElementsByTagName('input');

                    if (test[0].type == 'hidden' || test[0].value == '')
                        continue;

                    if (i == equipment_tr.length - 1) {
                        equipment_text = equipment_text + "내용: " + test[0].value + '/' + "모델: " + test[1].value + '/' + "제조사: " + test[2].value;
                        break;
                    }
                    equipment_text = equipment_text + "내용: " + test[0].value + '/' + "모델: " + test[1].value + '/' + "제조사: " + test[2].value + "/";
                }



                equipment_params = {
                    ORIGIN_PROCESS_ID: process_input[0].value,
                    ORIGIN_EQUIPMENT_NAME: equipment_text,
                    ORIGIN_EQUIPMENT_CODE: "",
                    ORIGIN_EQUIPMENT_MODELNAME: ""
                }
                if (equipment_text != '') {

                    alert("설비 등록 " + JSON.stringify(equipment_params));


                }
            }

        }
        else // 새로운 원본 공정 등록
        {

            if ($('#ORIGIN_PROCESS_NAME').val() == '' || $('#ORIGIN_PROCESS_CODE').val() == '') {
                alert("공정명 및 코드를 작성해주세요.");
                return;
            }


            var process_params = {
                ORIGIN_PROCESS_NAME: $('#ORIGIN_PROCESS_NAME').val(),
                ORIGIN_PROCESS_CODE: $('#ORIGIN_PROCESS_CODE').val()
            }

            // 공정 추가 Ajax 통신
            /*  $.ajax({
                 type: "GET",
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


            //ajax 통신 성공시 공정 식별값 가져오기 현재는 임의 숫자로 넣음
            var PROCESS_ID = 2;
            var task_text = ''
            var task_table = document.getElementById('task_content_table');
            var task_tr = task_table.getElementsByTagName('tr');

            if (task_tr.length == 0) {
                var task_params = {
                    ORIGIN_PROCESS_ID: PROCESS_ID,
                    ORIGIN_UNIQUESS_CONTEXT: "없음"
                }
            }

            else {
                for (var i = 0; i < task_tr.length; i++) {
                    var test = task_tr[i].getElementsByTagName('input');

                    if (test[0].value == '')
                        continue;

                    if (i == task_tr.length - 1) {
                        task_text += test[0].value
                        break;
                    }
                    task_text += test[0].value + '/';
                }

                task_params = {
                    ORIGIN_PROCESS_ID: PROCESS_ID,
                    ORIGIN_UNIQUESS_CONTEXT: task_text
                }

                if (task_params.ORIGIN_UNIQUESS_CONTEXT == '')
                    return;

            }

            var equipment_text = '';
            var equipment_table = document.getElementById('table_equipment_table');
            var tbody = equipment_table.getElementsByTagName('tbody');
            var equipment_tr = tbody[0].getElementsByTagName('tr');


            if (equipment_tr.length == 0) {
                var equipment_params = {
                    ORIGIN_PROCESS_ID: PROCESS_ID,
                    ORIGIN_EQUIPMENT_NAME: "없음",
                    ORIGIN_EQUIPMENT_CODE: "없음",
                    ORIGIN_EQUIPMENT_MODELNAME: "없음"
                }
            }

            else {
                for (var i = 0; i < equipment_tr.length; i++) {
                    var test = equipment_tr[i].getElementsByTagName('input');

                    if (i == equipment_tr.length - 1) {
                        equipment_text = equipment_text + "내용: " + test[0].value + '/' + "모델: " + test[1].value + '/' + "제조사: " + test[2].value;
                        break;
                    }
                    equipment_text = equipment_text + "내용: " + test[0].value + '/' + "모델: " + test[1].value + '/' + "제조사: " + test[2].value + "/";
                }

                equipment_params = {
                    ORIGIN_PROCESS_ID: PROCESS_ID,
                    ORIGIN_EQUIPMENT_NAME: equipment_text,
                    ORIGIN_EQUIPMENT_CODE: "",
                    ORIGIN_EQUIPMENT_MODELNAME: ""
                }
            }

            alert("원본 공정 등록 : " + '\n' + JSON.stringify(process_params) + '\n' + "작업특이사항 등록 : " + '\n' + JSON.stringify(task_params)
                + '\n' + "설비 등록 : " + '\n' + JSON.stringify(equipment_params));
        }
    }

});

//설비 검색
$('#search_equipment_name').click(function () {

    if (process_register_table_array.length <= 0) {
        alert("공정을 먼저 선택하세요.");
        return;
    }

    if ($('#equipment_name').val() == '') {
        alert("설비명을 입력해주세요.");
        return;
    }

    var process_tr = process_register_table_array[0];
    var process_input = process_tr.getElementsByTagName('input')

    if (process_input[0].type == "hidden") // 기존에 있던 공정 수정 부분
    {
        var params = {

            ORIGIN_PROCESS_ID: process_input[0].value,
            ORIGIN_EQUIPMENT_NAME: $('#equipment_name').val()

        }

        alert("설비검색 : " + JSON.stringify(params));

        $('#equipment_name').val('');
    }

});