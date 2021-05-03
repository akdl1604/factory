//<!-- 주민번호 Hyper JS -->

    function licenseNum(str) {
        str = str.replace(/[^0-9]/g, '');
        var tmp = '';
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3);
            tmp += '.';
            tmp += str.substr(3);
            return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3);
            tmp += '.';
            tmp += str.substr(3, 3);
            tmp += '.';
            tmp += str.substr(6);
            return tmp;
        } else {
            tmp += str.substr(0, 3);
            tmp += '.';
            tmp += str.substr(3, 3);
            tmp += '.';
            tmp += str.substr(6, 3);
            tmp += '.';
            tmp += str.substr(9);
            return tmp;
        }
        return str;
    }

    var li_number = document.getElementById("ORIGIN_ACCOUNT_NETWORK");
    li_number.onkeyup = function (event) {
        event = event || window.event;
        var _val = this.value.trim();
        this.value = licenseNum(_val);
    }


//<!-- 예외 처리 JS -->

// 팝업 종료 버튼(X) 클릭 이벤트
function ClosePopup() {
    self.close();   //자기 자신창을 닫습니다.
}


//<!-- Cookie 관리 JS -->

    // 네트워크 IP 버튼 클릭 이벤트
    function savenet() {
        var netip = $('#ORIGIN_ACCOUNT_NETWORK').val();
        
        // 네트워크 IP 입력 값을 Cookie에 하루 저장 한다.
        setCookie("net", netip, 1);

        // 네트워크 IP 입력 값을 확인
        // 도메인 없는 상태에서는 Internet Explorer에서만 확인 가능하다.
        var is_expend = getCookie("net");
        console.log("쿠키 is_expend변수에 저장된 값: " + is_expend);

        self.close();   //자기 자신창을 닫습니다.
    }

    // Cookie 값 저장 함수
    // Cookie 저장은 도메인을 입히지 않으면 Chrome, Edge에서는 확인 할 수 없다.
    function setCookie(name, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
        // Todo
        // Chrome, Edge에서 드러가려면 도메인을 추가 입력 해야 한다.
        // domain=domain; -> 도메인 설정
        // secure"; -> SSL 전송 설정
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };

    // 저장된 Cookie 값을 가져온다
    function getCookie(cookie_name) {
        var x, y;
        var val = document.cookie.split(';');

        for (var i = 0; i < val.length; i++) {
            x = val[i].substr(0, val[i].indexOf('='));
            y = val[i].substr(val[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
            if (x == cookie_name) {
                return unescape(y); // unescape로 디코딩 후 값 리턴
            }
        }
    }