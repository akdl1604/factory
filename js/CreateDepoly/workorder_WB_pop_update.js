var objPopup; //전역변수 선언

window.onload = function () {

    //작업지시서 상단 세팅
    Bellows_joborder_top_set()

    var params = {

        "JOBORDER_SUBTITLE_DIVISION": 1,
    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderSubtitle", params, true, function (data) {

        var subtitle = new Array();

        var length = data.length;

        // var form = ["workorder_WB.html","workorder_OD.html","workorder_ID.html","workorder_EFID_MD.html",
        // "workorder_EFID_FD.html", "workorder_PR.html","workorder_FD_PR.html","workorder_EF_PR.html"]

        for (var i = 0; i < length; i++) {
            var option = '<option value=' + data[i].JOBORDER_SUBTITLE_ID + '>' + data[i].JOBORDER_SUBTITLE_NAME + '</option>'
            $("#select_form").append(option);
        }
        subtitle.push(data);

        window.parent.postMessage({ childData: 'subtitle', arr: JSON.parse(JSON.stringify(subtitle)) }, '*');
        // for (var i = 0; i < length; i++) {
        //     if (data[i].JOBORDER_SUBTITLE_NAME === $("#select_form option:selected").text()) {
        //         $("#JobOrder_QUANTITY").val(data[i].JOBORDER_DETAIL_QUANTITY);
        //         $("#JobOrder_SIZE").val(data[i].JOBORDER_DETAIL_SIZE);
        //         $("#JobOrder_SHEARINGWIDTH").val(data[i].JOBORDER_DETAIL_SHEARINGWIDTH);
        //         $("#JobOrder_MD").val(data[i].JOBORDER_DETAIL_MD);
        //         $("#JobOrder_FD").val(data[i].JOBORDER_DETAIL_FD);
        //         $("#JobOrder_PRESSNUMBER").val(data[i].JOBORDER_DETAIL_PRESSNUMBER);
        //         $("#JobOrder_PRESSTON").val(data[i].JOBORDER_DETAIL_PRESSTON);



        //         $("#JobOrder_QUANTITY_2")[0].innerText = data[i].JOBORDER_DETAIL_QUANTITY;
        //     }
        // }

    });

    //만약 저장된 데이터가 있을경우 
    var save_data = parent.Bellows_Save_data;
    // set_save_data(save_data)

    if(save_data==null){
        var joborder_id = parent.num;

        //관리자, 작업자 화면 세팅 (작업자공용) =========================================================
        var params = {
            "JOBORDER_ID": joborder_id
        }

        fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderID", params, true, function (data) {
            $('.order_form').empty();
            html = '';
            html += data[0].JOBORDER_CODEFILE;
            $('.order_form').append(html);
        });
        //관리자, 작업자 화면 세팅 =========================================================
    }
    else{
        var id = parent.Unique_Id;
        var data = parent.BomData;

        if (save_data.length != 0 && check_save_data(data, id))
            set_save_data(save_data)
    }

    //관리자, 작업자 화면 세팅 (작업자공용) =========================================================
    var type = 1; //1 관리자, 2 작업자, 3. 관리자 설비작업현황
    setdisplay_fromtype(type);
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


//다음 버튼
function workorder_WB_pop_next_btn() {
    if (save_flag) {
        if (is_check_joborder_content() && is_check_preset()) {

            location.href = "../3.registration.html";
            pop_workorder_btn_click('workorder_next');

        }
        else {
            modals[0].style.display = "block";
        }


    }
    else {
        modals[1].style.display = "block";
    }

}

//이전 버튼
function workorder_WB_pop_pre_btn() {


    if (save_flag) {

        location.href = "../1.bom.html";
        pop_workorder_btn_click('workorder_prev');

    }
    else {
        modals[2].style.display = "block";
    }

}
//저장 버튼 클릭시 모든 양식 저장시켜야함.
function workorder_WB_pop_save_btn() {

    // 작업지시서 서식 등록(작업지시서 상단
    //     var params = {

    //    "JOBORDER_DETAIL_BUSINESSNAME" : $("#JobOrder_Business_Name").val(),
    //    "JOBORDER_DETAIL_PRODUCTNAME" : $("#JobOrder_Product_Name").val(),
    //    //"수량 입력칸"
    //    "JOBORDER_DETAIL_QUANTITY" : $("#JobOrder_QUANTITY").val(),
    //    "JOBORDER_DETAIL_CLIENT" : $("#JobOrder_Work_CompanyName").text(),
    //    "CONVERT_JOBORDER_DETAIL_DEILVERYDAY" : $("#JobOrder_Delivery_Day").val(),
    //    "JOBORDER_DETAIL_JOBNUMBER" :  $("#JobOrder_Number").val(),
    //    "JOBORDER_DETAIL_PRODUCTNUMBER" :$("#JobOrder_Product_Number").val(),
    //    //"RubberContainer 사이즈 입력칸"
    //    "JOBORDER_DETAIL_SIZE" : $("#JobOrder_SIZE").val(),
    //    //"RubberContainer 샤링폭 입력칸"
    //    "JOBORDER_DETAIL_SHEARINGWIDTH" : $("#JobOrder_SHEARINGWIDTH").val(),
    //    "JOBORDER_DETAIL_MD" :  $("#JobOrder_MD").val(),
    //    "JOBORDER_DETAIL_FD" :  $("#JobOrder_FD").val(),
    //    "CONVERT_JOBORDER_DETAIL_PLANENDDAY" : $("#JobOrder_Plan_Day").val(),
    //    "JOBORDER_DETAIL_PRESSNUMBER" :$("#JobOrder_PRESSNUMBER").val(),
    //    "JOBORDER_DETAIL_PRESSTON" : $("#JobOrder_PRESSTON").val(),

    //     }

    //       fun_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterJoborderDetail", params, true, function (data) {

    //         console.log(data);

    //     });

    var bellows_input_save = Array();

    //작업지시서 상단 공정, 자주검사
    var params = {
        //양식 대분류 id
        "JOBORDER_DIVISION_ID": $("select[id=Bellows_division_id] option:selected").val(),
        //서브 타이틀
        "JOBORDER_SUBTITLE_ID": $("select[id=select_form] option:selected").val(),
        //긴급 우선
        "JOBORDER_EMERGENCY_ID": check_Emergency(),

        //최상단 체크박스 부분
        "JobOrder_chk_Inventory_Usage": $("input:checkbox[id=JobOrder_chk_Inventory_Usage]").is(":checked"),
        "JobOrder_chk_Proceed": $("input:checkbox[id=JobOrder_chk_Proceed]").is(":checked"),
        "JobOrder_chk_Material_Team": $("input:checkbox[id=JobOrder_chk_Material_Team]").is(":checked"),

        //작업지시서 상단
        "JobOrder_Business_Name": $("#JobOrder_Business_Name").val(),
        "JobOrder_Product_Name": $("#JobOrder_Product_Name").val(),
        "JobOrder_QUANTITY": $("#JobOrder_QUANTITY").val(),
        "JobOrder_Work_CompanyName": $("#JobOrder_Work_CompanyName").text(),
        "JobOrder_Work_CompanyNumber": $("#JobOrder_Work_CompanyNumber").val(),
        "JobOrder_Work_CompanyNo": $("#JobOrder_Work_CompanyNo").val(),
        "JobOrder_Delivery_Day": $("#JobOrder_Delivery_Day").val(),
        "JobOrder_Plan_Day": $("#JobOrder_Plan_Day").val(),
        "JobOrder_Number": $("#JobOrder_Number").val(),
        "JobOrder_Product_Number": $("#JobOrder_Product_Number").val(),
        "JobOrder_SIZE": $("#JobOrder_SIZE").val(),
        "JobOrder_SHEARINGWIDTH": $("#JobOrder_SHEARINGWIDTH").val(),
        "JobOrder_MD": $("#JobOrder_MD").val(),
        "JobOrder_FD": $("#JobOrder_FD").val(),
        "JobOrder_PRESSNUMBER": $("#JobOrder_PRESSNUMBER").val(),
        "JobOrder_PRESSTON": $("#JobOrder_PRESSTON").val(),



        //작업지시서 공정 및 자주검사 적성 제외한 나머지 입력 폼
        //첫번째 여부 체크 부분 true 여 false 부
        "JobOrder_CV_Number": $("#JobOrder_CV_Number").val(),

        //첫번째 노트 부분
        "JobOrder_Drawing_Number": $("#JobOrder_Drawing_Number").val(),
        "JobOrder_Sales_Person": $("#JobOrder_Sales_Person").val(),
        "JobOrder_Note": $("#JobOrder_Note").val(),
        "JobOrder_Note_2": $("#JobOrder_Note_2").val(),
        "JobOrder_Note_3": $("#JobOrder_Note_3").val(),

        //두번 째 여부 체크 부분 true 여 false 부
        "JobOrder_CV_Number_2": $("#JobOrder_CV_Number_2").val(),

        //두번째 노트 부분
        "JobOrder_Requirements": $("#JobOrder_Requirements").val(),
        "JobOrder_Floor_Plan": $("#JobOrder_Floor_Plan").val(),
        "JobOrder_Sales_Person_2": $("#JobOrder_Sales_Person_2").val(),
        "JobOrder_Drawing_Number_2": $("#JobOrder_Drawing_Number_2").val(),
        "JobOrder_Sales_Person_3": $("#JobOrder_Sales_Person_3").val(),

        "JobOrder_Note2": $("#JobOrder_Note2").val(),
        "JobOrder_Note2_1": $("#JobOrder_Note2_1").val(),
        "JobOrder_Note2_2": $("#JobOrder_Note2_2").val(),

        "JobOrder_Special_Marking": $("#JobOrder_Special_Marking").val()


    }

    bellows_input_save.push(params)

    var unique_id = parent.BomData;

    //bom data 저장을 위한 식별값
    params = {

        "BOM_LIST_ID": unique_id[0].BOM_LIST_ID,
        "BOM_UNIQUE": unique_id[0].BOM_UNIQUE
    }


    window.parent.postMessage({ childData: 'save_bellows_data', arr: JSON.parse(JSON.stringify(bellows_input_save)) }, '*');
    window.parent.postMessage({ childData: 'unique_bomdata', arr: JSON.parse(JSON.stringify(params)) }, '*');

    if (parent.preset_info == null && parent.self_info == null) {
        save_flag = true;

        modals[3].style.display = "block";
        return;
    }
    else if (parent.self_info == null) {
        var preset = parent.preset_info;
    }
    else {
        var preset = parent.self_info;
    }

    var all_code = $('.order_form').html();
    console.log(all_code);
    params = {

        "JOBORDER_PROCESS_INDEX2": preset.JOBORDER_PROCESS_INDEX2,
        "JOBORDER_PROCESS_SELFINSPECT_FILE2": preset.JOBORDER_PROCESS_SELFINSPECT_FILE2,
        "JOBORDER_PROCESS_WORKTIME2": preset.JOBORDER_PROCESS_WORKTIME2,
        "JOBORDER_UNIQUESS_CONTEXT3": preset.JOBORDER_UNIQUESS_CONTEXT3,

        "KEY": preset.KEY,
        "ORIGIN_PRCOESS_ID2": preset.ORIGIN_PRCOESS_ID2,
        "SETTING_PRESET_ID": preset.SETTING_PRESET_ID,
        "PROCESS_NAME": preset.PROCESS_NAME,
        "PROCESS_CODE": preset.PROCESS_CODE,
        "JOBORDER_CODEFILE" : all_code
    }
    
    window.parent.postMessage({ childData: 'save_bellows_gongjeong_data', arr: params }, '*');
    save_flag = true;

    modals[3].style.display = "block";

}

function modal_delete_ok(value) {

    if (value == 1)
        modals[0].style.display = "none";

    else if (value == 2) {
        modals[1].style.display = "none";

    }
    else if (value == 3) {

        modals[2].style.display = "none";
        location.href = "../1.bom.html";
        pop_workorder_btn_click('workorder_prev');
    }


    else
        modals[3].style.display = "none";

}

function modal_delete_cancle() {
    modals[2].style.display = "none";

}

function is_check_joborder_content() {

    console.log(
    "JobOrder_Business_Name"+$("#JobOrder_Business_Name").val()+'\n'+
    "JobOrder_Product_Name"+ $("#JobOrder_Product_Name").val()+'\n'+
    "JobOrder_QUANTITY"+$("#JobOrder_QUANTITY").val()+ '\n'+
    "JobOrder_Work_CompanyName"+$("#JobOrder_Work_CompanyName").text()+'\n'+
    "JobOrder_Delivery_Day"+$("#JobOrder_Delivery_Day").val()+'\n'+
    "JobOrder_Plan_Day"+$("#JobOrder_Plan_Day").val()+'\n'+
    "JobOrder_Number"+$("#JobOrder_Number").val()+ '\n'+
    "JobOrder_Product_Number"+$("#JobOrder_Product_Number").val()+'\n'+
    "JobOrder_SIZE"+$("#JobOrder_SIZE").val()+ '\n'+
    "JobOrder_SHEARINGWIDTH"+$("#JobOrder_SHEARINGWIDTH").val()+'\n'+
    "JobOrder_MD"+$("#JobOrder_MD").val()+ '\n'+
    "JobOrder_FD"+$("#JobOrder_FD").val()+'\n'+
    "JobOrder_PRESSNUMBER"+$("#JobOrder_PRESSNUMBER").val()+'\n'+
    "JobOrder_PRESSTON"+$("#JobOrder_PRESSTON").val()+'\n'+
    "JobOrder_CV_Number"+$("#JobOrder_CV_Number").val()+ '\n'+
    "JobOrder_Drawing_Number"+$("#JobOrder_Drawing_Number").val()+'\n'+
    "JobOrder_Sales_Person"+$("#JobOrder_Sales_Person").val()+'\n'+
    "JobOrder_Note"+$("#JobOrder_Note").val()+'\n'+
    "JobOrder_Note_2"+$("#JobOrder_Note_2").val()+ '\n'+
    "JobOrder_Note_3"+$("#JobOrder_Note_3").val()+'\n'+
    "JobOrder_CV_Number_2"+$("#JobOrder_CV_Number_2").val()+'\n'+
    "JobOrder_Requirements"+$("#JobOrder_Requirements").val()+'\n'+
    "JobOrder_Floor_Plan"+$("#JobOrder_Floor_Plan").val()+ '\n'+
    "JobOrder_Sales_Person_2"+$("#JobOrder_Sales_Person_2").val()+ '\n'+
    "JobOrder_Drawing_Number_2"+$("#JobOrder_Drawing_Number_2").val()+ '\n'+
    "JobOrder_Sales_Person_3"+$("#JobOrder_Sales_Person_3").val()+ '\n'+
    "JobOrder_Note2"+$("#JobOrder_Note2").val()+ '\n'+
    "JobOrder_Note2_1"+$("#JobOrder_Note2_1").val()+'\n'+
    "JobOrder_Note2_2"+$("#JobOrder_Note2_2").val() +'\n'+
    "JobOrder_Special_Marking"+$("#JobOrder_Special_Marking").val()+'\n')

    if ($("#JobOrder_Business_Name").val() != '' && $("#JobOrder_Product_Name").val() != '' && 
        $("#JobOrder_QUANTITY").val() != ''&& $("#JobOrder_Work_CompanyName").text() != '' && 
        $("#JobOrder_Delivery_Day").val() != '' && $("#JobOrder_Plan_Day").val() != ''&& 
        $("#JobOrder_Number").val() != '' && $("#JobOrder_Product_Number").val() != '' && 
        $("#JobOrder_SIZE").val() != ''&& $("#JobOrder_SHEARINGWIDTH").val() != '' && 
        $("#JobOrder_MD").val() != '' && $("#JobOrder_FD").val() != '' &&
        $("#JobOrder_PRESSNUMBER").val() != '' && $("#JobOrder_PRESSTON").val() != '' && 
        $("#JobOrder_CV_Number").val() != ''&& $("#JobOrder_Drawing_Number").val() != '' && 
        $("#JobOrder_Sales_Person").val() != '' && $("#JobOrder_Note").val() != ''&& 
        $("#JobOrder_Note_2").val() != '' && $("#JobOrder_Note_3").val() != '' && 
        $("#JobOrder_CV_Number_2").val() != ''&& $("#JobOrder_Requirements").val() != '' && 
        $("#JobOrder_Floor_Plan").val() != '' && $("#JobOrder_Sales_Person_2").val() != ''&& 
        $("#JobOrder_Drawing_Number_2").val() != '' && $("#JobOrder_Sales_Person_3").val() != '' && 
        $("#JobOrder_Note2").val() != ''&& $("#JobOrder_Note2_1").val() != '' && 
        $("#JobOrder_Note2_2").val() != '' && $("#JobOrder_Special_Marking").val() != '') {
        return true;
    }
    else {
        return false;
    }
}

function is_check_preset() {

    if (parent.Bellows_Save_gongjeong_data == null) {
        return false;
    }
    else {
        return true;
    }
}





// 나중에 공정테이블 추가시에 필요한 함수 
function CheckBox_OnlyOne(element, name) {

    //var checkboxes = document.getElementsByName("form_examine_checkbox");


    $('input:checkbox[name=' + name + ']').each(function () {

        this.checked = false; //checked 처리
    });


    /* checkboxes.forEach((cb) => {
      cb.checked = false;
    }) */

    element.checked = true;
}

//Bellows 양식 공정 및 자주검사 성적서를 제외한 나머지 폼 저장된 값 세팅
function set_save_data(save_data) {

    //서브 타이틀
    $('#select_form').val('JOBORDER_SUBTITLE_ID').prop("selected", true);



    //최상단 체크박스 부분
    $("input:checkbox[id=JobOrder_chk_Inventory_Usage]").prop("checked", save_data[0].JobOrder_chk_Inventory_Usage);
    $("input:checkbox[id=JobOrder_chk_Proceed]").prop("checked", save_data[0].JobOrder_chk_Proceed);
    $("input:checkbox[id=JobOrder_chk_Material_Team]").prop("checked", save_data[0].JobOrder_chk_Material_Team);

    //작업지시서 상단
    $("#JobOrder_Business_Name").val(save_data[0].JobOrder_Business_Name);
    $("#JobOrder_Product_Name").val(save_data[0].JobOrder_Product_Name);
    $("#JobOrder_QUANTITY").val(save_data[0].JobOrder_QUANTITY);
    $("#JobOrder_Work_CompanyName").text(save_data[0].JobOrder_Work_CompanyName);
    $("#JobOrder_Work_CompanyNumber").val(save_data[0].JobOrder_Work_CompanyNumber);
    $("#JobOrder_Work_CompanyNo").val(save_data[0].JobOrder_Work_CompanyNo);
    $("#JobOrder_Delivery_Day").val(save_data[0].JobOrder_Delivery_Day);
    $("#JobOrder_Plan_Day").val(save_data[0].JobOrder_Plan_Day);
    $("#JobOrder_Number").val(save_data[0].JobOrder_Number);
    $("#JobOrder_Product_Number").val(save_data[0].JobOrder_Product_Number);
    $("#JobOrder_SIZE").val(save_data[0].JobOrder_SIZE);
    $("#JobOrder_SHEARINGWIDTH").val(save_data[0].JobOrder_SHEARINGWIDTH);
    $("#JobOrder_MD").val(save_data[0].JobOrder_MD);
    $("#JobOrder_FD").val(save_data[0].JobOrder_FD);
    $("#JobOrder_PRESSNUMBER").val(save_data[0].JobOrder_PRESSNUMBER);
    $("#JobOrder_PRESSTON").val(save_data[0].JobOrder_PRESSTON);



    //작업지시서 공정 및 자주검사 적성 제외한 나머지 입력 폼
    //첫번째 여부 체크 부분 true 여 false 부
    $("#JobOrder_CV_Number").val(save_data[0].JobOrder_CV_Number);

    //첫번째 노트 부분
    $("#JobOrder_Drawing_Number").val(save_data[0].JobOrder_Drawing_Number);
    $("#JobOrder_Sales_Person").val(save_data[0].JobOrder_Sales_Person);
    $("#JobOrder_Note").val(save_data[0].JobOrder_Note);
    $("#JobOrder_Note_2").val(save_data[0].JobOrder_Note_2);
    $("#JobOrder_Note_3").val(save_data[0].JobOrder_Note_3);

    $("#JobOrder_Business_Name_2")[0].innerText = save_data[0].JobOrder_Business_Name
    $("#JobOrder_QUANTITY_2")[0].innerText = save_data[0].JobOrder_QUANTITY
    $("#JobOrder_Number_2")[0].innerText = save_data[0].JobOrder_Number

    //두번 째 여부 체크 부분 true 여 false 부
    $("#JobOrder_CV_Number_2").val(save_data[0].JobOrder_CV_Number_2),

        //두번째 노트 부분
        $("#JobOrder_Requirements").val(save_data[0].JobOrder_Requirements),
        $("#JobOrder_Floor_Plan").val(save_data[0].JobOrder_Floor_Plan),
        $("#JobOrder_Sales_Person_2").val(save_data[0].JobOrder_Sales_Person_2),
        $("#JobOrder_Drawing_Number_2").val(save_data[0].JobOrder_Drawing_Number_2),
        $("#JobOrder_Sales_Person_3").val(save_data[0].JobOrder_Sales_Person_3),

        $("#JobOrder_Note2").val(save_data[0].JobOrder_Note2),
        $("#JobOrder_Note2_1").val(save_data[0].JobOrder_Note2_1),
        $("#JobOrder_Note2_2").val(save_data[0].JobOrder_Note2_2),

        $("#JobOrder_Special_Marking").val(save_data[0].JobOrder_Special_Marking)

    if (parent.Bellows_Save_gongjeong_data != null) {
        $('#temp_gongjeong').empty();

        for (var i = 0; i < parent.Bellows_Save_gongjeong_data.KEY.length; i++) {
            select_gongjeong_form(parent.Bellows_Save_gongjeong_data.KEY[i],parent.Bellows_Save_gongjeong_data.PROCESS_NAME[i],parent.Bellows_Save_gongjeong_data.PROCESS_CODE[i])
        }
    }

}

function check_save_data(data, unique_id) {

    for (var i = 0; i < unique_id.length; i++) {
        if (data[0].BOM_LIST_ID == unique_id[i].BOM_LIST_ID && data[0].BOM_UNIQUE == unique_id[i].BOM_UNIQUE)
            return true;
    }
    return false;
}

function check_Emergency() {
    var emer = $("input:checkbox[id=JobOrder_Emergency_Check]").is(":checked")
    var first = $("input:checkbox[id=JobOrder_First_Check]").is(":checked")

    if (emer == true) {
        return 2
    }
    else if (first == true) {
        return 3
    }
    else {
        return 1
    }
}


var save_flag = false;
var modals = document.getElementsByClassName("modal");



//데이터 저장==============================
//프리셋불러오기==================
function Preset_insert(preset_data) {
    window.parent.postMessage({ childData: 'Preset_insert', arr: JSON.parse(JSON.stringify(preset_data)) }, '*');

    closePopup();
}
//프리셋불러오기==================
//직접설정==================
function Self_data_insert(self_data) {
    window.parent.postMessage({ childData: 'Self_data_insert', arr: JSON.parse(JSON.stringify(self_data)) }, '*');

    closePopup();
}
//직접설정==================

function closePopup() {
    if (objPopup != null && objPopup != undefined) objPopup.close();
}

//프리셋 불러오기 open이벤트
function PresetOpen() {
    objPopup = window.open('../../pop/preset_list.html', 'BOM 선택', 'left=' + (screen.availWidth - 1000) / 2 + ',top=' + (screen.availHeight - 380) / 2 + ', width=1000px,height=480px');
}

//직접설정 open이벤트
function SettingOpen() {
    objPopup = window.open('../../pop/self_setting.html', 'BOM 선택', 'left=' + (screen.availWidth - 860) / 2 + ',top=' + (screen.availHeight - 620) / 2 + ', width=860px,height=620px');
}
//데이터 저장==============================


window.addEventListener('message', function (e) {

    /* console.log('parent message');
    console.log(e.data); // { childData : 'test data' }
    console.log("e.origin : " + e.origin); //http://123.com(자식창 도메인) */

    if (e.data.childData === 't_Preset_insert') {

        var t_proset_info = e.data.arr;

        $('#temp_gongjeong').empty();

        for (var i = 0; i < t_proset_info.KEY.length; i++) {
            select_gongjeong_form(t_proset_info.KEY[i], t_proset_info.PROCESS_NAME[i], t_proset_info.PROCESS_CODE[i])
        }
    }


});
