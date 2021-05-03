var process_arr = new Object();
var tab1_data = new Object();
var tab1_box_lastposition = 0;
var tab2_data = null;
var num = 0;
var first_next = 0;

$.urlParam = function (key) {
    var _parammap = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        _parammap[decode(arguments[1])] = decode(arguments[2]);
    });

    return _parammap[key];
}

//페이지 로드시
window.onload = function () {
	window.onload = null;
	num = $.urlParam('num');
    
	var tabs=document.getElementById('tabs').getElementsByTagName("a");
	var container = document.getElementById('container3');
	container.src = tabs[0].rel;
	container.onload = function() {
		container.onload = null;
		container.contentWindow.postMessage( { type : 'firstload', num : num }, '*' );
	}
}

//문자열 undefined 체크
function Check_undefined(str){
    var return_str = "";
    if(str != undefined){
        return_str = str;
    }
    return return_str;
}

window.addEventListener('message', function(e) {
	if(e.data.type == "movetab"){
		var container = document.getElementById('container3');
		container.src= e.data.childData;
		//$("#container3").empty();
		//$("#container3").get(0).contentWindow.location.replace(e.data.childData);

		var tabs=document.getElementById('tabs').getElementsByTagName("a");
		for (var i=0; i < tabs.length; i++)
		{
			if(tabs[i].rel == e.data.childData) 
				tabs[i].className="selected";
			else
				tabs[i].className="";
		} 

		if(e.data.childData=='3.registration_preset_update.html'){
			tab1_data = e.data.processarr;
			process_arr = e.data.arr;
			tab1_box_lastposition = e.data.last_posi;
			container.onload = function() {
				container.onload = null;
				if(first_next==0){
					first_next++;
					container.contentWindow.postMessage( { type : 'movenext_first', param : tab2_data, num : num, CT_FILE_REGISTER_ID : process_arr.CT_FILE_REGISTER_ID}, '*' );
				}else{
					container.contentWindow.postMessage( { type : 'movenext', param : tab2_data }, '*' );
				}
			}
		}else if(e.data.childData=='preset_creat_update.html'){
			tab2_data = e.data.param;

			container.onload = function() {
				container.onload = null;
				container.contentWindow.postMessage( { type : 'movepre', param : tab1_data, last_posi : tab1_box_lastposition, SETTING_PRESET_NAME: process_arr.SETTING_PRESET_NAME, USE_DIVISION_ID : process_arr.USE_DIVISION_ID, SETTING_PRESET_ID : process_arr.SETTING_PRESET_ID, process_del_arr : process_arr.process_del_arr }, '*' );
			}
		}   
	}
	else if(e.data.type == "next_btn"){
		//파일 관련 데이터
		var dt = e.data.param;

		//작업 특이사항 성공여부
		var is_suc_RegisterUniquess = true;

		//부모에 옮기기
		process_arr.CT_FILE_REGISTER_ID = dt.CT_FILE_REGISTER_ID;
		process_arr.JOBORDER_FILE_TYPE_ID2 = dt.JOBORDER_FILE_TYPE_ID2;
		process_arr.PresetFile = dt.PresetFile;

		//생성일 가져오기
		let today = new Date();
		let year = today.getFullYear(); // 년도
		let month = ("0" + (today.getMonth() + 1)).slice(-2);  // 월
		let date = ("0" + today.getDate()).slice(-2);  // 날짜
		var cur_day = year + "-" + month + "-" + date;

		console.log(process_arr.SETTING_PRESET_PROCESS_INDEX2);

		var params = {
			"SETTING_PRESET_ID" : process_arr.SETTING_PRESET_ID, 
			"SETTING_PRESET_NAME" : process_arr.SETTING_PRESET_NAME, 
			"ConvertSETTING_PRESET_CREATEDATE" : cur_day,
			"USE_DIVISION_ID" : process_arr.USE_DIVISION_ID
		}
	
		// 프리셋 상단 수정
		fun_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateSettingPreset", params, false, function (data) {
			if(Check_undefined(data.Preset_overlap)==1){
				alert("프리셋 명칭 중복");
				return;
			}
			if(Check_undefined(data.UpdateSettingPreset)==1){
				
			}
			
		});

		if(process_arr.process_del_arr.length>0){
			var params2 = {
				"SETTING_PRESET_PROCESS_ID2" : process_arr.process_del_arr
			}

			fun_ajax_noreturn("POST", "http://220.89.167.212:8085/testing05/DeleteProcessIndex", params2, false, function (data) {
				
			});
		}

		//프리셋 공정 등록 변수======================================
		var ADD_ORIGIN_PROCESS_ID2 = new Array();
		var ADD_SETTING_PRESET_ID2 = new Array();
		var ADD_SETTING_PRESET_PROCESS_INDEX2 = new Array();
		var ADD_SETTING_PRESET_PROCESS_WORKTIME2 = new Array();
		var ADD_SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2 = new Array();
		var ADD_SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2 = new Array();
		var ADD_SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2 = new Array();
		var ADD_SETTING_PRESET_PROCESS_CUSTOMER_NAME2 = new Array();
		var ADD_SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2 = new Array();
		//===========================================================

		//공정 index 업데이트 변수====================================
		var SETTING_PRESET_PROCESS_ID_list = new Array();
		var SETTING_PRESET_PROCESS_INDEX2_list = new Array();
		//===========================================================

		//작업특이사항 추가 기능
		for(var i = 0; i<process_arr.work_specialnote_insert_checklist.length; i++){
			for(var j = 0; j<process_arr.work_specialnote_insert_checklist[i].length; j++){
				var params = {
					"ORIGIN_PROCESS_ID" : process_arr.ORIGIN_PROCESS_ID2[i],
					"ORIGIN_UNIQUESS_CONTEXT" : process_arr.work_specialnote_insert_checklist[i][j]
				};
				// 작업내용 추가
				fun_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterUniquess", params, false, function (data) {
					if(data.RegisterUniquess==1){
						process_arr.ORIGIN_UNIQUESS_ID3[i].push(String(data.ORIGIN_UNIQUESS_ID));
					}else{
						is_suc_RegisterUniquess = false;
						alert("작업특이사항 등록 실패");
					}
				});
			}
		}

		//process_add_arr이 1 : 추가 , 0: 수정
		for(var i = 0; i<process_arr.process_add_arr.length; i++){
			if(process_arr.process_add_arr[i] == 1){
				ADD_ORIGIN_PROCESS_ID2.push(process_arr.ORIGIN_PROCESS_ID2[i]);
				ADD_SETTING_PRESET_ID2.push(process_arr.SETTING_PRESET_ID);
				ADD_SETTING_PRESET_PROCESS_INDEX2.push(process_arr.SETTING_PRESET_PROCESS_INDEX2[i]);
				ADD_SETTING_PRESET_PROCESS_WORKTIME2.push(process_arr.SETTING_PRESET_PROCESS_WORKTIME2[i]);
				ADD_SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2.push(process_arr.SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2[i]);
				ADD_SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2.push(process_arr.SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2[i]);
				ADD_SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2.push(process_arr.SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2[i]);
				ADD_SETTING_PRESET_PROCESS_CUSTOMER_NAME2.push(process_arr.SETTING_PRESET_PROCESS_CUSTOMER_NAME2[i]);
				ADD_SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2.push(process_arr.SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2[i]);
			}else{
				SETTING_PRESET_PROCESS_ID_list.push(process_arr.SETTING_PRESET_PROCESS_ID[i]);
				SETTING_PRESET_PROCESS_INDEX2_list.push(process_arr.SETTING_PRESET_PROCESS_INDEX2[i]);

				//프리셋 공정 수정(작업기준시간, 자주검사, 공정 정보 수정)======================
				var params3 = {   
					"ORIGIN_PROCESS_ID" : process_arr.ORIGIN_PROCESS_ID2[i],
					"SETTING_PRESET_PROCESS_ID" : process_arr.SETTING_PRESET_PROCESS_ID[i],
					"SETTING_PRESET_PROCESS_WORKTIME" : process_arr.SETTING_PRESET_PROCESS_WORKTIME2[i],
					"SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY" : process_arr.SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2[i],
					"ORIGIN_UNIQUESS_ID2" : process_arr.ORIGIN_UNIQUESS_ID3[i]
				}
		
				fun_ajax_noreturn("POST", "http://220.89.167.212:8085/testing05/UpdatePresetProcessTimeandInspection", params3, false, function (data) {
					
				});
				//프리셋 공정 수정(작업기준시간, 자주검사, 공정 정보 수정)======================
			}
		}

		var formData = new FormData();

		formData.append('ORIGIN_PROCESS_ID2', ADD_ORIGIN_PROCESS_ID2);
		formData.append('SETTING_PRESET_ID2', ADD_SETTING_PRESET_ID2);
		formData.append('SETTING_PRESET_PROCESS_INDEX2', ADD_SETTING_PRESET_PROCESS_INDEX2);
		formData.append('SETTING_PRESET_PROCESS_WORKTIME2', ADD_SETTING_PRESET_PROCESS_WORKTIME2);
		formData.append('SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2', ADD_SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2);
		formData.append('SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2', ADD_SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2);
		formData.append('SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2', ADD_SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2);
		formData.append('SETTING_PRESET_PROCESS_CUSTOMER_NAME2', ADD_SETTING_PRESET_PROCESS_CUSTOMER_NAME2);
		formData.append('SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2', ADD_SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2);
		for(var i=0; i<process_arr.ORIGIN_UNIQUESS_ID3.length; i++){
			formData.append('ORIGIN_UNIQUESS_ID3['+i+']', process_arr.ORIGIN_UNIQUESS_ID3[i]);
		}
								
		//프리셋 공정 등록
		fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterSettingPresetProcess", formData, function(data) {      
			
		});		

		//공정 순서 업데이트=================================================
		var params4 = {
			"SETTING_PRESET_PROCESS_ID2" : SETTING_PRESET_PROCESS_ID_list,
			"SETTING_PRESET_PROCESS_INDEX2" : SETTING_PRESET_PROCESS_INDEX2_list
		 }

		fun_ajax_noreturn("POST", "http://220.89.167.212:8085/testing05/UpdateSettingPresetProcess", params4, false, function (data) {
			
		});
		//공정 순서 업데이트 ==================================================

		//파일 삭제==========================================================
		var SETTING_PRESET_ID2_list = new Array();
		for(var i = 0; i<dt.delfile_ID_list.length; i++){
			SETTING_PRESET_ID2_list.push(num);
		}
		
		var params5 = {
			"SETTING_PRESET_FILE_MANAGEMENT_ID2" : dt.delfile_ID_list,
			"SETTING_PRESET_ID2" : SETTING_PRESET_ID2_list
		 }

		fun_ajax_noreturn("POST", "http://220.89.167.212:8085/testing05/DeletePresetFile", params5, false, function (data) {
			
		});
		//파일 삭제==========================================================

		//파일 허용 타입 수정================================================
		var params6 = {
			"SETTING_PRESET_ID" : num,
			"CT_FILE_REGISTER_ID" : dt.CT_FILE_REGISTER_ID
		};
		
		fun_ajax("POST", "http://220.89.167.212:8085/testing05/UpdatePresetFileRegister", params6, false, function (data) {
			
		});
		//파일 허용 타입 수정================================================
		
		if(process_arr.JOBORDER_FILE_TYPE_ID2.length!=0){
			//파일 등록 ========================================================
			var formData2 = new FormData();

			// 파일 데이터
			for(var i=0; i<process_arr.PresetFile.length; i++){
				formData2.append('SETTING_PRESET_ID2', num);
				formData2.append('PresetFile', process_arr.PresetFile[i]);
			}
			formData2.append('JOBORDER_FILE_TYPE_ID2', process_arr.JOBORDER_FILE_TYPE_ID2);

			fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/PresetFileUpload", formData2, function(data) {      
				opener.location.reload();
				window.close();
			});	
			//파일 등록 ========================================================
		}else{
			opener.location.reload();
			window.close();
		}
	}
});