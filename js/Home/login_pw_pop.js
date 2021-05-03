//주민번호 hyphen JS
function licenseNum(str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 6) {
        return str;
    } else {
        tmp += str.substr(0, 6);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }
    return str;
}

var li_number = document.getElementById("ORIGIN_ACCOUNT_RESIDENTNUMBER");
li_number.onkeyup = function (event) {
    event = event || window.event;
    var _val = this.value.trim();
    this.value = licenseNum(_val);
}
// <!-- 예외 처리 JS -->
function ClosePopup() {
    self.close();   //자기 자신창을 닫습니다.
}


//<!-- Ajax JS -->
 // 비밀번호 찾기 Bt 클릭 이벤트
 function PwSearch() {

    //var result = "1";

    // Json 형식으로 전송 할 데이터 담기

    var params = {

        "ORIGIN_ACCOUNT_RESIDENTNUMBER": $('#ORIGIN_ACCOUNT_RESIDENTNUMBER').val(),
        "ORIGIN_ACCOUNT_EMPLOYEENUMBER": $('#ORIGIN_ACCOUNT_EMPLOYEENUMBER').val()

    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/PassFinding", params, true, function (data) {

    console.log(data.ORIGIN_ACCOUNT_PASSWORD);
    document.getElementById('passwordword').style.display = "block";
    document.getElementById('passwordword').innerText = data.ORIGIN_ACCOUNT_PASSWORD;
    });


    // 비밀번호 찾기 Ajax 통신
 /*    $.ajax({
        type: "POST",
        url: "http://localhost:8888/test/post/passwordfind",
        data: JSON.stringify(params),
        dataType: "json",
        contentType: "application/json;charset=UTF8",
        success: function (data) {
            //data.키값 으로 Map<String, String> 값 가져오기
            if (data.result === "1") {
                document.getElementById('passwordword').style.display = "block";
                document.getElementById('passwordword').innerText = "비밀번호는 " + data.value + "입니다.";
            } else if (data.result === "2") {
                document.getElementById('passwordword').style.display = "block";
                document.getElementById('passwordword').innerText = "입력 정보가 올바르지 않습니다.";
            } else if (data.result === "3") {
                document.getElementById('passwordword').style.display = "block";
                document.getElementById('passwordword').innerText = "등록되지 않은 정보입니다.";
            }
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    }); */

    //밑에 있는 코드 result === "1" ajax 통신이 아니여서 작동안됨

        /*     if (result === "1") {
                document.getElementById('passwordword').style.display = "block";
                //document.getElementById('passwordword').innerText = "비밀번호는 " + data.value + "입니다.";
            } else if (result === "2") {
                document.getElementById('passwordword').style.display = "block";
                document.getElementById('passwordword').innerText = "입력 정보가 올바르지 않습니다.";
            } else if (result === "3") {
                document.getElementById('passwordword').style.display = "block";
                document.getElementById('passwordword').innerText = "등록되지 않은 정보입니다.";
            }
        } */

    }