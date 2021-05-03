// ajax 함수 
function fun_ajax(v_type, v_url, v_data, f_async, f_suc) {

    $.ajax({
        type: v_type,
        url: v_url,
        async: f_async,// false 일 경우 동기 요청으로 변경
        data: JSON.stringify(v_data),
        dataType: 'json',// xml, json, script, html
        timeout: 5000,
        contentType: "application/json;charset=UTF8",
        success: function (data) {
            f_suc(data);
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('2. fail : ' + errorThrown);
    });
}

// ajax 함수 
function fun_ajax_noreturn(v_type, v_url, v_data, f_async, f_suc) {

    $.ajax({
        type: v_type,
        url: v_url,
        async: f_async,// false 일 경우 동기 요청으로 변경
        data: JSON.stringify(v_data),
        dataType: 'text',// xml, json, script, html
        timeout: 5000,
        contentType: "application/json;charset=UTF8",
        success: function () {
            f_suc();
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('2. fail : ' + errorThrown);
    });
}

// Ajax Form-Data 형식
function fun_formdata_ajax(v_type, v_url, v_data, f_suc) {
    $.ajax({
        type: v_type,
        enctype: 'multipart/form-data',
        url: v_url,
        data: v_data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 60000,
        success: function (data) {
            f_suc(data);
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('2. fail 을 탄다 : ' + errorThrown);
    });
}

function loding(fun) {
    var popupWidth = 200;
    var popupHeight = 300;

    var popupX = (window.screen.width / 2) - (popupWidth / 2);
    // 만들 팝업창 width 크기의 1/2 만큼 보정값으로 빼주었음

    var popupY= (window.screen.height / 2) - (popupHeight / 2);
    // 만들 팝업창 height 크기의 1/2 만큼 보정값으로 빼주었음
    var new_popup = window.open('loding.html', '', 'status=no, height=' + popupHeight  + ', width=' + popupWidth  + ', left='+ popupX + ', top='+ popupY +',status=no,toolbar=no,scrollbars=no');
    
    fun();
    new_popup.close(); // new_popup 변수명에 저장된 창을 닫음 
}