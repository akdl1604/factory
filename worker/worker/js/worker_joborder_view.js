
window.onload = function () {
    //작업지시서 넘버 받아오는 부분 추가 필요
    
    //현재 임시값
    var joborder_id = 108;
    var jobsub_division = 3;

    //관리자, 작업자 화면 세팅 (작업자공용) =========================================================
    var params = {
        "JOBORDER_ID": joborder_id
    }
    var params2 = {
        "JOBORDER_SUBTITLE_DIVISION": jobsub_division
    }

    fun_ajax("GET", "http://220.89.167.212:8085/testing05/SelectJoborderID", params, true, function (data) {
        $('.order_form').empty();
        html = '';
        html += data[0].JOBORDER_CODEFILE;
        $("#JobOrder_BELLOWSCODE").val(data[0].BOM_DETAIL_ID);
        $('.order_form').append(html);
        //관리자, 작업자 화면 세팅 (작업자공용) =========================================================
        var type = 2; //1 관리자, 2 작업자, 3. 관리자 설비작업현황
        setdisplay_fromtype(type);
        //관리자, 작업자 화면 세팅 =========================================================
    });
    //관리자, 작업자 화면 세팅 =========================================================
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/SelectJoborderDetail",null, true, function (data) {
        $("#JobOrder_Business_Name").val(data[0].JOBORDER_DETAIL_BUSINESSNAME);
        $("#JobOrder_Product_Name").val(data[0].JOBORDER_DETAIL_PRODUCTNAME);
        $("#JobOrder_QUANTITY").val(data[0].JOBORDER_DETAIL_QUANTITY);
        $("#JobOrder_Work_CompanyName").html(data[0].JOBORDER_DETAIL_CLIENT);
        $("#JobOrder_Delivery_Day").val(data[0].JOBORDER_DETAIL_DEILVERYDAY);
        $("#JobOrder_Number").val(data[0].JOBORDER_DETAIL_JOBNUMBER);
        $("#JobOrder_Product_Number").val(data[0].JOBORDER_DETAIL_PRODUCTNUMBER);
        $("#JobOrder_SIZE").val(data[0].JOBORDER_DETAIL_SIZE );
        $("#JobOrder_SHEARINGWIDTH").val(data[0].JOBORDER_DETAIL_SHEARINGWIDTH);
        $("#JobOrder_MD").val(data[0].JOBORDER_DETAIL_MD);
        $("#JobOrder_FD").val(data[0].JOBORDER_DETAIL_FD);
        $("#JobOrder_Plan_Day").val(data[0].JOBORDER_DETAIL_PLANENDDAY);
        $("#JobOrder_PRESSNUMBER").val(data[0].JOBORDER_DETAIL_PRESSNUMBER);
        $("#JobOrder_PRESSTON").val(data[0].JOBORDER_DETAIL_PRESSTON);

    });

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/WorkerJobView1",params, true, function (data) {
        $("#ico_qr").children("img").attr("src",data[0].QRCODE_DIRECTORY);
    });

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderSubtitle", params2, true, function (data){
        if(data[0].JOBORDER_SUBTITLE_DIVISION == 1)
        {$("#JobOrder_BELLOWSCODE").val(data[0].JOBORDER_SUBTITLE_DIVISION)}
        else if(data[0].JOBORDER_SUBTITLE_DIVISION == 2)
        {$("#JobOrder_BELLOWSCODE").val(data[0].JOBORDER_SUBTITLE_DIVISION)}
    });
}
//작업지시서 상단화면 수정 (작업자공용)
function setdisplay_fromtype(type){
    //관리자 작업지시서 생성 및 수정일때
    if(type==1){
        //좌측 QR, 도면, 조립절차 display 설정
        $(".worker_view").css("display","none");
        //우측 공정수정이력, 작업중지이력 display 설정
        $(".admin_history_view").css("display","none");
        //우측 작성, 검토, 승인란 display 설정
        $(".admin_view").css("display","block");
    }
    //작업자
    else if(type==2){
        //좌측 QR, 도면, 조립절차 display 설정
        $(".worker_view").css("display","block");
        //우측 공정수정이력, 작업중지이력 display 설정
        $(".admin_history_view").css("display","none");
        //우측 작성, 검토, 승인란 display 설정
        $(".admin_view").css("display","none");
    }
    //관리자 설비작업현황에서 작지 확인할때
    else if(type==3){
        //좌측 QR, 도면, 조립절차 display 설정
        $(".worker_view").css("display","block");
        //우측 공정수정이력, 작업중지이력 display 설정
        $(".admin_history_view").css("display","block");
        //우측 작성, 검토, 승인란 display 설정
        $(".admin_view").css("display","none");
    }
}

//체크박스 클릭시 html에 강제로 반영되게 하는 부분 (작업자공용)
$(document).on("change", "input:checkbox", function () {
    if ($(this).is(':checked')) {
        this.setAttribute("checked", "ture");
    }else{
        this.setAttribute("checked", "false");
    }
});
//===========================================================

//input 수정시 html에 강제로 반영되게 하는 부분 (작업자공용)
$(document).on("change", 'input[type="text"]', function () {
    this.setAttribute("value", $(this).val());
});
//=======================================================


//<!---------------------------------날짜선택Start----------->
//한개만 단순하게 만들때
$("#datepicker").datepicker({
    language: 'ko'
});
//두개짜리 제어 연결된거 만들어주는 함수
//datePickerSet($("#datepicker1"), $("#datepicker2"), true); //다중은 시작하는 달력 먼저, 끝달력 2번째
datePickerSet($("#JobOrder_Delivery_Day"));
datePickerSet($("#JobOrder_Plan_Day"));
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
            autoClose: true,
            onSelect: function(dateText) {
                $(sDate).attr("value", dateText);
            }
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
function showPopup() { 
    url = "appworker_pop.html";
    name = "팝업";
    specs = "width=500, heigt=400, top=200, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=yes";
    window.open(url, name, specs);

    return false;
}

//------------------ url 파라미터 파싱 ------------------ key=?
function getURLParams(url) {
    var result = {};
    url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { result[k] = decodeURIComponent(v); });
    return result;
}

getURLParams(location.search);
alert(getURLParams(location.search));