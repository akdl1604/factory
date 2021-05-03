var process_arr = new Object();
var tab1_data = new Object();
var tab1_box_lastposition = 0;
var tab2_data = null;
// 프리셋 검색
function Chage_tab(str) {
    var container = document.getElementById('container3');
	container.src= str;

	var tabs=document.getElementById('tabs').getElementsByTagName("a");
	for (var i=0; i < tabs.length; i++)
	{
		if(tabs[i].rel == str) 
			tabs[i].className="selected";
		else
			tabs[i].className="";
	}
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

		if(e.data.childData=='3.registration_preset.html'){
			tab1_data = e.data.processarr;
			process_arr = e.data.arr;
			tab1_box_lastposition = e.data.last_posi;
			container.onload = function() {
				container.onload = null;
				container.contentWindow.postMessage( { type : 'movenext', param : tab2_data }, '*' );
			}
		}else if(e.data.childData=='preset_creat.html'){
			tab2_data = e.data.param;

			container.onload = function() {
				container.onload = null;
				container.contentWindow.postMessage( { type : 'movepre', param : tab1_data, last_posi : tab1_box_lastposition, SETTING_PRESET_NAME: process_arr.SETTING_PRESET_NAME, USE_DIVISION_ID : process_arr.USE_DIVISION_ID }, '*' );
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
			if(process_arr.ORIGIN_UNIQUESS_ID3[i].length==0){
				process_arr.ORIGIN_UNIQUESS_ID3[i].push(null);
			}
		}

		if(is_suc_RegisterUniquess){
			var formData = new FormData();
		
			formData.append('SETTING_PRESET_NAME', process_arr.SETTING_PRESET_NAME);
			formData.append('USE_DIVISION_ID', process_arr.USE_DIVISION_ID);
			formData.append('ORIGIN_ACCOUNT_ID', process_arr.ORIGIN_ACCOUNT_ID);
			formData.append('ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID', process_arr.ORIGIN_ACCOUNT_EMPLOYMENT_STATUS_ID);
			formData.append('ORIGIN_ACCOUNT_DIVISION_ID', process_arr.ORIGIN_ACCOUNT_DIVISION_ID);
			formData.append('ORIGIN_PROCESS_ID2', process_arr.ORIGIN_PROCESS_ID2);
			formData.append('SETTING_PRESET_PROCESS_INDEX2', process_arr.SETTING_PRESET_PROCESS_INDEX2);
			formData.append('SETTING_PRESET_PROCESS_WORKTIME2', process_arr.SETTING_PRESET_PROCESS_WORKTIME2);
			formData.append('SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2', process_arr.SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY2);
			formData.append('SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2', process_arr.SETTING_PRESET_PROCESS_OUTSOURCING_REGISTER2);
			formData.append('SETTING_PRESET_PROCESS_CUSTOMER_NAME2', process_arr.SETTING_PRESET_PROCESS_CUSTOMER_NAME2);
			formData.append('SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2', process_arr.SETTING_PRESET_PROCESS_CUSTOMER_NUMBER2);
			for(var i=0; i<process_arr.ORIGIN_UNIQUESS_ID3.length; i++){
				formData.append('ORIGIN_UNIQUESS_ID3['+i+']', process_arr.ORIGIN_UNIQUESS_ID3[i]);
			}
			formData.append('CT_FILE_REGISTER_ID', process_arr.CT_FILE_REGISTER_ID);
			formData.append('SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2', process_arr.SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_REGISTER2);
			
			if(process_arr.JOBORDER_FILE_TYPE_ID2.length!=0){
				// 파일 데이터
				for(var i=0; i<process_arr.PresetFile.length; i++){
					formData.append('PresetFile', process_arr.PresetFile[i]);
				}
				formData.append('JOBORDER_FILE_TYPE_ID2', process_arr.JOBORDER_FILE_TYPE_ID2);
			}
			
			// 공정 프리셋 등록
			fun_formdata_ajax("POST", "http://220.89.167.212:8085/testing05/RegisterSettingPresetTest", formData, function(data) {      
				if(data.Preset_overlap==0){
					opener.location.reload();
					window.close();
				}else{
					alert("프리셋 명칭이 중복되었습니다");
				}
			});
		}
	}
});