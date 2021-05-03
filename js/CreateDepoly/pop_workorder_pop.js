//Bom리스트 전체 데이터를 담을 배열
var AllBomdata = new Array();

//Bom리스트 중 하나의 데이터를 담을 배열
var BomData = new Array();

//Bellows 양식 데이터 폼 저장 데이터를 담을 배열
var Bellows_Save_data = new Array();

//저장된 데이터일 경우 id값으로 비교하기위한 배열 
var Unique_Id = new Array();

//Bellows 서브타이틀 담을 배열
var Bellows_subtitle = new Array();

//preset 불러오기 데이터
var preset_info = null;

//preset 직접 설정 데이터
var self_info = null;

//문서등록 데이터
var file_data = null;

var Bellows_Save_gongjeong_data = null;

function pop_workorder_btn_click(text) {
  window.parent.postMessage({ childData: text }, '*');
}

window.addEventListener('message', function (e) {

  /* console.log('parent message');
  console.log(e.data); // { childData : 'test data' }
  console.log("e.origin : " + e.origin); //http://123.com(자식창 도메인) */

  if (e.data.childData === 'bom_next') {

    $('#bom_html').attr('class', '');
    $('#workorder_html').attr('class', 'selected');
    $('#registration_html').attr('class', '');

    //location.href = "workorder_WB.html"; -> 이렇게 쓰면 iframe 해제됨
  }

  else if (e.data.childData === 'workorder_prev') {

    $('#bom_html').attr('class', 'selected');
    $('#workorder_html').attr('class', '');
    $('#registration_html').attr('class', '');

  }

  else if (e.data.childData === 'workorder_next') {
    $('#bom_html').attr('class', '');
    $('#workorder_html').attr('class', '');
    $('#registration_html').attr('class', 'selected');
  }

  else if (e.data.childData === "sel_bomdata") {
    BomData = e.data.arr;
  }

  else if (e.data.childData === "all_bomdata") {
    AllBomdata = e.data.arr;
  }

  else if (e.data.childData === "save_bellows_data") {
    Bellows_Save_data = e.data.arr;
  }

  else if (e.data.childData === "unique_bomdata") {
    Unique_Id = new Array();
    Unique_Id.push(e.data.arr);
  }

  else if (e.data.childData === "subtitle") {
    Bellows_subtitle = e.data.arr;
    console.log(Bellows_subtitle);
  }

  else if (e.data.childData === "Preset_insert") {
    preset_info = e.data.arr;
    self_info =null;
    var container = document.getElementById('container');

    console.log(preset_info);

    container.contentWindow.postMessage({ childData: 't_Preset_insert', arr: preset_info }, '*');
  }

  else if (e.data.childData === "Self_data_insert") {
    self_info = e.data.arr;
    preset_info = null;

    var container = document.getElementById('container');
    container.contentWindow.postMessage({ childData: 't_Preset_insert', arr: self_info }, '*');
  }
  else if (e.data.childData === "workorder_insert") {
    file_data = e.data.param;

    console.log(file_data);
    //작업지시서 등록 기능 ===============================
    //ajax
    console.log("등록");
    var formData = new FormData();
    
    formData.append('JOBORDER_DETAIL_BUSINESSNAME', Bellows_Save_data[0].JobOrder_Business_Name);
    formData.append('JOBORDER_DETAIL_PRODUCTNAME', Bellows_Save_data[0].JobOrder_Product_Name);
    formData.append('JOBORDER_DETAIL_QUANTITY', Bellows_Save_data[0].JobOrder_QUANTITY);
    formData.append('JOBORDER_DETAIL_CLIENT', Bellows_Save_data[0].JobOrder_Work_CompanyName);
    formData.append('CONVERT_JOBORDER_DETAIL_DEILVERYDAY', Bellows_Save_data[0].JobOrder_Delivery_Day);
    formData.append('JOBORDER_DETAIL_JOBNUMBER', Bellows_Save_data[0].JobOrder_Number);
    formData.append('JOBORDER_DETAIL_PRODUCTNUMBER', Bellows_Save_data[0].JobOrder_Product_Number);
    formData.append('JOBORDER_DETAIL_SIZE', Bellows_Save_data[0].JobOrder_SIZE);
    formData.append('JOBORDER_DETAIL_SHEARINGWIDTH', Bellows_Save_data[0].JobOrder_SHEARINGWIDTH);
    formData.append('JOBORDER_DETAIL_MD', Bellows_Save_data[0].JobOrder_MD);
    formData.append('JOBORDER_DETAIL_FD', Bellows_Save_data[0].JobOrder_FD);

    formData.append('CONVERT_JOBORDER_DETAIL_PLANENDDAY', Bellows_Save_data[0].JobOrder_Plan_Day);
    formData.append('JOBORDER_DETAIL_PRESSNUMBER', Bellows_Save_data[0].JobOrder_PRESSNUMBER);
    formData.append('JOBORDER_DETAIL_PRESSTON', Bellows_Save_data[0].JobOrder_PRESSTON);
    
    formData.append('JOBORDER_SUBTITLE_ID', Bellows_Save_data[0].JOBORDER_SUBTITLE_ID);
    formData.append('JOBORDER_EMERGENCY_ID', Bellows_Save_data[0].JOBORDER_EMERGENCY_ID);

    formData.append('CT_FILE_REGISTER_ID', file_data.CT_FILE_REGISTER_ID);
    formData.append('ORIGIN_ACCOUNT_ID', '13');

    formData.append('BOM_DETAIL_ID', Unique_Id[0].BOM_UNIQUE);
    formData.append('BOM_LIST_ID', Unique_Id[0].BOM_LIST_ID);

    formData.append('ORIGIN_PRCOESS_ID2', Bellows_Save_gongjeong_data.ORIGIN_PRCOESS_ID2);
    formData.append('JOBORDER_PROCESS_INDEX2', Bellows_Save_gongjeong_data.JOBORDER_PROCESS_INDEX2);
    formData.append('JOBORDER_PROCESS_WORKTIME2', Bellows_Save_gongjeong_data.JOBORDER_PROCESS_WORKTIME2);
    formData.append('JOBORDER_PROCESS_SELFINSPECT_FILE2', Bellows_Save_gongjeong_data.JOBORDER_PROCESS_SELFINSPECT_FILE2);

    //통합서식일때 사용되는 데이터 
    formData.append('JOBORDER_DETAIL_SSCPARTNO', '');
    formData.append('JOBORDER_DETAIL_REV', '');
    formData.append('JOBORDER_DETAIL_SERIALNO', '');

    //공정서식을 포함한 전체 코드
    formData.append('JOBORDER_CODEFILE', Bellows_Save_gongjeong_data.JOBORDER_CODEFILE);
    //공정 서식을 제외한 전체 코드
    formData.append('JOBORDER_DETAIL_CODE', 'test');

    //임시
    // for (var i = 0; i < Bellows_Save_gongjeong_data.JOBORDER_PROCESS_SELFINSPECT_FILE2.length; i++) {
    //   formData.append('JoborderFile', Bellows_Save_gongjeong_data.JOBORDER_PROCESS_SELFINSPECT_FILE2[i] = 'test');
    // }

    if (file_data.JOBORDER_FILE_TYPE_ID2.length != 0) {
      // 파일 데이터
      for (var i = 0; i < file_data.PresetFile.length; i++) {
        formData.append('JoborderFile', file_data.PresetFile[i]);
      }

      formData.append('JOBORDER_FILE_TYPE_ID2', file_data.JOBORDER_FILE_TYPE_ID2);

    }

    //프리셋 파일 저장
    var origin_file = new Array();
    for (var i = 0; i < file_data.origin_file_list.length; i++) {
      origin_file.push(file_data.origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID);
    }
    formData.append('SETTING_PRESET_FILE_MANAGEMENT_ID2', origin_file);

    for (var i = 0; i < Bellows_Save_gongjeong_data.JOBORDER_UNIQUESS_CONTEXT3.length; i++) {
      formData.append('JOBORDER_UNIQUESS_CONTEXT3[' + i + ']', 'test');
    }

    // 작업지시서 등록
    fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/AllCreateJoborder", formData, function (data) {
      if (data.AllCreateJoborder == 0) {
        alert("작업지시서 등록 실패");
      } else {
        alert("작업지시서 등록 성공")
        //opener.SelfInspectionFunction();
        self.close();
      }
    });

    /*
    (String) JOBORDER_DETAIL_BUSINESSNAME : 작업지시서 서식 사업명
    (String) JOBORDER_DETAIL_PRODUCTNAME : 작업지시서 서식 품명
    (int) JOBORDER_DETAIL_QUANTITY : 작업지시서 서식 수량
    (String) JOBORDER_DETAIL_CLIENT : 작업지시서 서식 납품처
    (String) CONVERT_JOBORDER_DETAIL_DEILVERYDAY : 작업지시서 서식 납기일
    (String) JOBORDER_DETAIL_JOBNUMBER : 작업지시서 서식 작업지시서 번호
    (String) JOBORDER_DETAIL_PRODUCTNUMBER : 작업지시서 서식 품번
    (String) CONVERT_JOBORDER_DETAIL_PLANENDDAY : 작업지시서 서식 계획 종료일

    (int) JOBORDER_DETAIL_SIZE : 작업지시서 Bellows서식 Rubber Container Size 
    (float) JOBORDER_DETAIL_SHEARINGWIDTH : 작업지시서 Bellows서식 Rubber Container 샤링폭
    (int) JOBORDER_DETAIL_MD : 작업지시서 Bellows서식 MD
    (int) JOBORDER_DETAIL_FD : 작업지시서 Bellows서식 FD
    (int) JOBORDER_DETAIL_PRESSNUMBER : 작업지시서 Bellows서식 프레스 호기
    (int) JOBORDER_DETAIL_PRESSTON : 작업지시서 Bellows서식 프레스 톤

    (String) JOBORDER_DETAIL_SSCPARTNO : 작업지시서 통합서식 SSCPARTNO
    (String) JOBORDER_DETAIL_REV : 작업지시서 통합서식 Rev.  
    (String) JOBORDER_DETAIL_SERIALNO : 작업지시서 통합서식 SERIALNO

    //???????서브타이블 서식 타이틀
    (int) JOBORDER_SUBTITLE_ID : 작업지시서 서브타이틀 식별 키
    (int) JOBORDER_EMERGENCY_ID : 작업지시서 긴급 우선 키
    
    (String) JOBORDER_DETAIL_CODE : 작업지시서 서식 HTML 코드
    
    
    (int) CT_FILE_REGISTER_ID : 파일 허용 키
    (int) ORIGIN_ACCOUNT_ID : 계정 식별 키
    (int) BOM_DETAIL_ID : BOM DETAIL 식별 키
    (int) BOM_LIST_ID : BOM LIST 식별 키
    (String) JOBORDER_CODEFILE : 작업지시서 HTML 코드
    (int Array) ORIGIN_PRCOESS_ID2 : 원본 공정 배열
    (int Array) JOBORDER_PROCESS_INDEX2 : 작업지시서 공정 순서 배열
    (int Array) JOBORDER_PROCESS_WORKTIME2 : 작업지시서 작업기준시간 배열
    (String Array) JOBORDER_PROCESS_SELFINSPECT_FILE2 : 작업지시서 자주검사 배열
    (File) JoborderFile : 작업지시서 파일
    (int Array) SETTING_PRESET_FILE_MANAGEMENT_ID2 : 세팅프리셋 파일 식별 키 배열
    (int Array) JOBORDER_FILE_TYPE_ID2 : 작업지시서 파일 타입
    (String Array) JOBORDER_UNIQUESS_CONTEXT3[][] : 작업지시서 공정 특이사항 배열
    */
  }

  else if (e.data.childData === "save_bellows_gongjeong_data") {
    Bellows_Save_gongjeong_data = e.data.arr;
    console.log(Bellows_Save_gongjeong_data);
  }

  else if (e.data.childData === 'move_second') {
    file_data = e.data.param;
    $('#bom_html').attr('class', 'selected');
    $('#workorder_html').attr('class', '');
    $('#registration_html').attr('class', '');
  }
});
