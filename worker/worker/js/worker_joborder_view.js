
window.onload = function () {
    //작업지시서 넘버 받아오는 부분 추가 필요
    //var key = document.location.href.split("=");
    //var joborder_id = key[1];

    //현재 임시값
    var joborder_id = 184;
    var process_id = null;

    //관리자, 작업자 화면 세팅 (작업자공용) =========================================================
    var params = {
        "JOBORDER_ID": joborder_id
    }

    //작업 시작 버튼 비활성화
    $('#btn_start').prop('disabled', true);
    $('#btn_start').css('background-color', '#95a4bf');

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/WorkerJobView1", params, true, function (data) {
        $('.order_form').empty();
        html = '';
        html += data[0].JOBORDER_CODEFILE;
        $('.order_form').append(html);
        //관리자, 작업자 화면 세팅 (작업자공용) =========================================================
        var type = 2; //1 관리자, 2 작업자, 3. 관리자 설비작업현황
        setdisplay_fromtype(type);
        //관리자, 작업자 화면 세팅 =========================================================
        $()
        //QR코드 URL 변경
        $(".worker_view").children("li:eq(0)").children("img").attr("src",data[0].QRCODE_DIRECTORY);

        //공정 결과창 비활성화
        $(".tableprint tbody input, textarea").attr("disabled",true);
        $(".tableprint").css("background-color","#eee");

        //합, 불 값입력
        $("input[name=pass]").attr("value","1");
        $("input[name=npass]").attr("value","0");
        $("input[name=npass]").attr("name","pass");

        //합, 불 체크박스 중복 선택 불가
        $("input[name=pass]").click(function(){
            if($(this).prop('checked')){
                $("input[name=pass]").prop("checked",false);
                $(this).prop("checked",true);
            }
        });
        //검증 유형 체크박스 중복 선택 불가
        $("input[name=press_verified]").click(function(){
            if($(this).prop('checked')){
                $("input[name=press_verified]").prop("checked",false);
                $(this).prop("checked",true);
            }
        });
    });
    //관리자, 작업자 화면 세팅 =========================================================
    //설비 목록 세팅 =========================================================
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderIDProcess", params, true, function (data) {
        process_id = data[0].PROCESS_MAIN_CATEGORY_ID;
        var params_equip =  {
            "PROCESS_MAIN_CATEGORY_ID" : process_id
        }
        getequipment(params_equip);
    });
}

//설비 정보 가져오기
function getequipment(params){
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectWorkerEquip", params, true, function (data) {
        var listLen = data.length;
        for (var count = 0; count < listLen; count++){
            var option = $("<option>"+ data[count].ORIGIN_EQUIPMENT_NAME +"</option>");
            $('.equipment').append(option);
        }
    });
}
//공정시작 버튼클릭이벤트
function workorder_WB_pop_start_btn(){
    $(".tableprint tbody input, textarea").attr("disabled",false);
    $(".tableprint").css("background-color","#fff");
    $("[name=JobOrder_process_worker]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=JobOrder_process_date]").html("<input type='text' size='25' style='width:80%' />");
    $("[name=JobOrder_process_qty]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=JobOrder_process_dcode]").html("<select name=dcode><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=JobOrder_process_dqty]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=JobOrder_process_eqty]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=JobOrder_process_code]").html("<select name='code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=JobOrder_process_manger]").html("<input type='text' size='12' style='width:80%' />");
    $("[name=press_worker1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_workdate1]").html("<input type='text' size='8' style='width:80%' />" + "/" + "<input type='text' size='8' style='width:80%' />");
    $("[name=press_workdate2]").html("<input type='text' size='8' style='width:80%' />" + "/" + "<input type='text' size='8' style='width:80%' />");
    $("[name=press_workdate3]").html("<input type='text' size='8' style='width:80%' />" + "/" + "<input type='text' size='8' style='width:80%'/>");
    $("[name=press_worker1_m1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker1_m2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker1_m3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker1_m4]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker1_f1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker1_f2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker1_f3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker1_f4]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_arc1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_ton1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_m1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_m2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_m3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_m4]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_f1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_f2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_f3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker2_f4]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_arc2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_ton2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3_m1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3_m2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3_m3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3_m4]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3_f1]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3_f2]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_worker3_f3]").html("<input type='text' size='8'  style='width:80%'/>");
    $("[name=press_worker3_f4]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=press_arc3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press_ton3]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=press-code]").html("<select name='press_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=press_manager]").html("<input type='text' size='8' style='width:80%' />");
    $("[name=processing_worker1]").html("<input type='text' size='12'style='width:80%' />");
    $("[name=processing_worker2]").html("<input type='text' size='12' style='width:80%'/>");
    $("[name=processing_workdate1]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=processing_workdate2]").html("<input type='text' size='12' style='width:50%'/>" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=processing_qty1]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=processing_qty2]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=processing_decode1]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=processing_decode2]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=processing_dqty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=processing_dqty2]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=processing_etc1]").html("<input type='text' size='15'style='width:80%' />");
    $("[name=processing_etc2]").html("<input type='text' size='15'style='width:80%' />");
    $("[name=processing_code]").html("<select name='processing_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=processing_manager]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wb_md_stock]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wb_fd_stock]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=wb_id_stock]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wb_od_stock]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=wb_md_jno]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wb_fd_jno]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=wb_id_jno]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wb_od_jno]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=wb_code]").html("<select name='wb_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=wb_manager]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=ob_md_stock]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=ob_fd_stock]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=ob_id_stock]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=ob_md_jno]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=ob_fd_jno]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=ob_id_jno]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=ob_code]").html("<select name='od_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=od_manager]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=id_md_stock]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=id_fd_stock]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=id_md_jno]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=id_fd_jno]").html("<input type='text' size='8' style='width:80%'/>");
    $("[name=id_code]").html("<select name='od_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=id_manager]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=JobOrder_worker_process_etc]").html("<input type='text' size='12'style='width:80%' />");
    $("[name=dp_product1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_product2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_product3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_product_num1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_product_num2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_product_num3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_spec1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_spec2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_spec3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_lot1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_lot2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_lot3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_rev1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_rev2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_rev3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_inqty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_inqty2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_inqty3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_outqty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_outqty2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_outqty3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=dp_manger]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_manager]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=Shearing_worker1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=Shearing_worker2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=Shearing_workdate1]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=Shearing_workdate2]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=Shearing_qty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=Shearing_qty2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_worker1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_worker2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_qty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_qty2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_etc1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_etc2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_workdate1]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=incom_workdate2]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=incom_code]").html("<select name='od_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=incom_total_qty]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=incom_total_etc]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_dp_qty]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_worker1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_worker2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_worker3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_workdate1]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=idw_workdate2]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=idw_workdate3]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=idw_dcode1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_dcode2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_dcode3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_dqty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_dqty2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_dqty3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_etc1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_etc2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_etc3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=idw_code]").html("<select name='od_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=idw_manager]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_dp_qty]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_worker1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_worker2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_worker3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_workdate1]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=odw_workdate2]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=odw_workdate3]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=odw_dcode1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_dcode2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_dcode3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_dqty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_dqty2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_dqty3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_etc1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_etc2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_etc3]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=odw_code]").html("<select name='od_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=odw_manager]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wbef_worker1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wbef_worker2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wbef_workdate1]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=wbef_workdate2]").html("<input type='text' size='12'style='width:50%' />" + "/" + "<input type='text' size='12' style='width:50%'/>");
    $("[name=wbef_dcode1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wbef_dcode2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wbef_dqty1]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wbef_dqty2]").html("<input type='text' size='8'style='width:80%' />");
    $("[name=wbef_etc1]").html("<input type='text' size='12'style='width:80%' />");
    $("[name=wbef_etc2]").html("<input type='text' size='12'style='width:80%' />");
    $("[name=wbef_code]").html("<select name='od_code'><option value=''>코드선택</option><option value=''>1</option><option value=''>2</option></select>");
    $("[name=wbef_manager]").html("<input type='text' size='8'style='width:80%' />");
    $('.equipment_center').empty();
    $("#btn_stop").attr({
        type: "button",
        class: "btn_bs blue"
    });
    $("#btn_end").attr({
        type: "button",
        class: "btn_bs",
        disabled:"true",
    });
    $("#btn_cancle").attr({
        type: "button",
        class: "btn_bs"
    });

    $("#btn_stop").val("일시 정지");
    $("#btn_cancle").val("취소");
    $("#btn_end").val("작업 완료");

    //임시 주석 처리(작업 완료 버튼)
    //$('#btn_end').prop('disabled', true);
    //$('#btn_end').css('background-color', '#95a4bf');
}
$("input[name=JobOrder_process_worker]").keyup(function(){
    alert("asd");
    $("#btn_end").attr({
        class: "btn_bs blue",
        disabled:"false",
    });
});
//일시정지 버튼 클릭 이벤트
$("#btn_stop").click(function(){
    $('#cancle_date').empty();

    //날짜 저장
    var Now = new Date();
    var NowTime = Now.getFullYear() + "-" + 
    ("00" + (Now.getMonth() + 1)).slice(-2) + "-" + 
    ("00" + Now.getDate()).slice(-2) + " " + 
    ("00" + Now.getHours()).slice(-2) + ":" + 
    ("00" + Now.getMinutes()).slice(-2) + ":" + 
    ("00" + Now.getSeconds()).slice(-2)
    
    //날짜 텍스트 추가
    var date = $("<p>" + "일시 " + NowTime + "</p>");
    $('#cancle_date').append(date);
    $('#cancle_date').css({
        "position" : "absolute",
        "right" : "40px"
    });
});

//설비 선택 시 버튼 활성화
$('.equipment').on('change', function(){
    $('#btn_start').prop('disabled', false);
    $('#btn_start').css('background-color', '#6179a3');
});

//작업 완료 버튼 클릭 이벤트
function btn_end_work(){
    //버튼 비활성화
    $("#btn_stop").attr({
        type: "hidden",
        class: ".btn"
    });
    $("#btn_end").attr({
        type: "hidden",
        class: ".btn"
    });
    $("#btn_cancle").attr({
        type: "hidden",
        class: ".btn"
    });

    $('.equipment_center').empty();

    var option = $("<a href='#' class='btn_bs blue' id='btn_inspection_start' onclick='workorder_WB_start_inspection_btn();'>" + "자주 검사" + "</a>" + 
    "<a href='#' class='btn_bs' id='btn_end_work_cancle' onclick='workorder_WB_end_work_cancle_btn();'>" + "취소" + "</a>");

    $('.equipment_center').append(option);
}

//작업 완료 취소 버튼 클릭 이벤트
function workorder_WB_end_work_cancle_btn(){
    $('.equipment_center').empty();

    $("#btn_stop").attr({
        type: "button",
        class: "btn_bs blue"
    });
    $("#btn_end").attr({
        type: "button",
        class: "btn_bs blue"
    });
    $("#btn_cancle").attr({
        type: "button",
        class: "btn_bs blue"
    });

    //임시 주석 처리(작업 완료 버튼)
    //$('#btn_end').prop('disabled', true);
    //$('#btn_end').css('background-color', '#95a4bf');
}

//자주 검사 버튼 클릭 이벤트
function workorder_WB_start_inspection_btn(){
    var link = 'workorder_report_view.html'
    location.replace(link);
}

//자주 검사 취소 버튼 클릭 이벤트
function workorder_WB_cancle_inspection_btn(){
    $('.equipment_center').empty();

    var option = $("<a href='#' class='btn_bs blue' id='btn_inspection_start' onclick='workorder_WB_start_inspection_btn();'>" + "자주 검사" + "</a>" + 
    "<a href='#' class='btn_bs' id='btn_end_work_cancle' onclick='workorder_WB_end_work_cancle_btn();'>" + "취소" + "</a>");

    $('.equipment_center').append(option);

    var joborder_id = 143;

    var params = {
        "JOBORDER_ID": joborder_id
    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/WorkerJobView1", params, true, function (data) {
        $('.order_form').empty();
        html = '';
        html += data[0].JOBORDER_CODEFILE;
        $('.order_form').append(html);
        //관리자, 작업자 화면 세팅 (작업자공용) =========================================================
        var type = 2; //1 관리자, 2 작업자, 3. 관리자 설비작업현황
        setdisplay_fromtype(type);
        //관리자, 작업자 화면 세팅 =========================================================
    });
    //관리자, 작업자 화면 세팅 =========================================================
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
//alert(getURLParams(location.search));