//페이지 로드시 프리셋 리스트 출력
window.onload = function () {
    SearchAll();
}

// 프리셋 검색
function Search_Preset() {
    // Json 형식으로 전송 할 데이터 담기
    var params = {
        SETTING_PRESET_NAME: $('#SETTING_PRESET_NAME').val()
    }
    
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SearchSettingPreset", params, true, function(data) {
        $("#workorder_preset_tbody tr").remove(); 

        //서버에서 받은 데이터 프리셋으로 그룹화
        var setting_preset_group = groupBy(data, 'SETTING_PRESET_ID');
        
        //공정 최대크기 알아내기 위한 배열
        var arrlength = new Array();

        //프리셋 별로 돌면서 공정 길이 배열에 input
        $.each(setting_preset_group, function (i, v) {
            arrlength.push(v.length);
        });

        //프리셋 중 공정흐름 최대 길이 
        var maxlength = Math.max.apply(null, arrlength);

        //프리셋 별로 출력
        $.each(setting_preset_group, function (i, v) {
            // 프리셋 공정 순서로 정렬
            v.sort(function (a, b) { 
                return a.SETTING_PRESET_PROCESS_INDEX < b.SETTING_PRESET_PROCESS_INDEX ? -1 : a.SETTING_PRESET_PROCESS_INDEX > b.SETTING_PRESET_PROCESS_INDEX ? 1 : 0;  
            });
            
            if(v.length>0){
                var html = '';
            
                html += '<tr>';
                html += '<input type="hidden" name="SETTING_PRESET_ID" value="'+v[0].SETTING_PRESET_ID+'">';
                html += '<td > ';
                html +=     v[0].SETTING_PRESET_NAME;
                html += '</td>';
                html += '<td>'+v[0].USE_DIVISION_NAME+'</td>';
                html += '<td>'+v[0].ORIGIN_ACCOUNT_MEMBERNAME+'</td>';
                html += '<td  class="tb_intb">';
                html += '    <div>';
                html += '        <table>';
                html += '            <tr>';

                for(var i=0; i<v.length; i++){
                    html += '                <td>'+v[i].ORIGIN_PROCESS_NAME+'</td>';
                }
                for(var i=0; i<maxlength-v.length; i++){
                    html += '                <td>'+""+'</td>';
                }

                html += '            </tr>';
                html += '        </table>';
                html += '    </div>';
                html += '</td>';
                html += '</tr>';
                
                $('#workorder_preset_tbody').append(html);
            }
        });
    });
}

//구조체 특정 키로 그룹화 하는 함수
const groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
        var group = el[key];

        if (carry[group] === undefined) {
            carry[group] = []
        }

        carry[group].push(el)
        return carry
    }, {})
}

// 프리셋 전체 검색
function SearchAll() {    
    //서버와 통신
    fun_ajax("GET", "http://220.89.167.212:8085/testing05/PresetListView", null, true, function(data) {
        //프리셋 리스트 비우기
        $("#workorder_preset_tbody").empty(); 

        //서버에서 받은 데이터 프리셋으로 그룹화
        var setting_preset_group = groupBy(data, 'SETTING_PRESET_ID');
        
        //공정 최대크기 알아내기 위한 배열
        var arrlength = new Array();

        //프리셋 별로 돌면서 공정 길이 배열에 input
        $.each(setting_preset_group, function (i, v) {
            arrlength.push(v.length);
        });

        //프리셋 중 공정흐름 최대 길이 
        var maxlength = Math.max.apply(null, arrlength);

        //프리셋 별로 출력
        $.each(setting_preset_group, function (i, v) {
            
            // 프리셋 공정 순서로 정렬
            v.sort(function (a, b) { 
                return a.SETTING_PRESET_PROCESS_INDEX < b.SETTING_PRESET_PROCESS_INDEX ? -1 : a.SETTING_PRESET_PROCESS_INDEX > b.SETTING_PRESET_PROCESS_INDEX ? 1 : 0;  
            });
            
            if(v.length>0){
                var html = '';
            
                    html += '<tr>';
                    html += '<input type="hidden" name="SETTING_PRESET_ID" value="'+v[0].SETTING_PRESET_ID+'">';
                    html += '<td > ';
                    html +=     v[0].SETTING_PRESET_NAME;
                    html += '</td>';
                    html += '<td>'+v[0].USE_DIVISION_NAME+'</td>';
                    html += '<td>'+v[0].ORIGIN_ACCOUNT_MEMBERNAME+'</td>';
                    html += '<td  class="tb_intb">';
                    html += '    <div>';
                    html += '        <table>';
                    html += '            <tr>';

                    for(var i=0; i<v.length; i++){
                        html += '                <td>'+v[i].ORIGIN_PROCESS_NAME+'</td>';
                    }
                    for(var i=0; i<maxlength-v.length; i++){
                        html += '                <td>'+""+'</td>';
                    }

                    html += '            </tr>';
                    html += '        </table>';
                    html += '    </div>';
                    html += '</td>';
                    html += '</tr>';
                    
                    $('#workorder_preset_tbody').append(html);
            }
        });
    });
}

//원본 공정 row data 클릭시
$('#workorder_preset_tbody').on("click", "tr", function () {
    //공정 하이라이트 초기화
    var tr_list = $("#workorder_preset_tbody tr");
    tr_list.removeClass('on');

    $(this).addClass('on');
    
});

// 선택 버튼 클릭
$("#select_btn").on('click', function () {

    var selected_process = $('#workorder_preset_tbody .on')[0];
    //프리셋 키
    var key = selected_process.getElementsByTagName('input')[0].value;

    alert(key);

    //프리셋 공정 정보 가져오는 부분=====================================
    var params = {
        "SETTING_PRESET_ID" : key
    }

    //작업지시서에 필요한 데이터 --- 대분류 값 누락
    var params3 = {
        "SETTING_PRESET_ID" : key,
        "ORIGIN_PRCOESS_ID2": new Array(),
        "JOBORDER_PROCESS_INDEX2": new Array(),
        "JOBORDER_PROCESS_WORKTIME2": new Array(),
        "JOBORDER_PROCESS_SELFINSPECT_FILE2" : new Array(),
        "JOBORDER_UNIQUESS_CONTEXT3": new Array(),
        "CT_FILE_REGISTER_ID": null,
        "KEY" : new Array(),
        "PROCESS_NAME" : new Array(),
        "PROCESS_CODE" : new Array()
    }
    /*
            (int Array) ORIGIN_PRCOESS_ID2
            (int Array) JOBORDER_PROCESS_INDEX2
            (int Array) JOBORDER_PROCESS_WORKTIME2
            (String Array) JOBORDER_PROCESS_SELFINSPECT_FILE2
            (String Array) JOBORDER_UNIQUESS_CONTEXT3[][]

            문서등록 페이지에서 
            (int) CT_FILE_REGISTER_ID
            (File) JoborderFile
            (int Array) JOBORDER_FILE_TYPE_ID2

    */

    //만들어진 프리셋 공정 조회
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/PresetProcessList", params, false, function (data2) {
        data2.sort(function (a, b) { 
            return a.SETTING_PRESET_PROCESS_INDEX < b.SETTING_PRESET_PROCESS_INDEX ? -1 : a.SETTING_PRESET_PROCESS_INDEX > b.SETTING_PRESET_PROCESS_INDEX ? 1 : 0;  
        });

        for(var i = 0; i<data2.length; i++){
            var params2 = {
                "SETTING_PRESET_PROCESS_ID" : data2[i].SETTING_PRESET_PROCESS_ID
            }

            //각 공정에 대한 작업특이사항 리스트
            var work_specialnote_checklist = new Array();
            //프리셋 눌렀을 때 작업특이사항 조회 2
            fun_ajax("POST", "http://220.89.167.212:8085/testing05/DetailPresetUniquessView2", params2, false, function (data3) {
                for(var i = 0; i<data3.length; i++){
                    work_specialnote_checklist.push(data3[i].ORIGIN_UNIQUESS_ID);   
                }
            });

            var params4 = {
                "ORIGIN_PROCESS_ID" : data2[i].ORIGIN_PROCESS_ID
            }

            //원본 공정 매칭 서식 가져오기
            fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectMatchingProcess", params4, false, function (data3) {
                for(var i = 0; i<data3.length; i++){
                    params3.KEY.push(data3[i].JOBORDER_FORM_DETAIL_ID);
                }
            });

            params3.CT_FILE_REGISTER_ID = data2[i].CT_FILE_REGISTER_ID;
            params3.ORIGIN_PRCOESS_ID2.push(data2[i].ORIGIN_PROCESS_ID);
            params3.JOBORDER_PROCESS_INDEX2.push(data2[i].SETTING_PRESET_PROCESS_INDEX);
            params3.JOBORDER_PROCESS_WORKTIME2.push(data2[i].SETTING_PRESET_PROCESS_WORKTIME);
            params3.JOBORDER_PROCESS_SELFINSPECT_FILE2.push(data2[i].SETTING_PRESET_PROCESS_SELF_INSPECTION_REPORT_DIRECTORY);
            params3.JOBORDER_UNIQUESS_CONTEXT3.push(work_specialnote_checklist);
            params3.PROCESS_NAME.push(data2[i].ORIGIN_PROCESS_NAME);
            params3.PROCESS_CODE.push(data2[i].ORIGIN_PROCESS_CODE);
        }
    });
    //프리셋 공정 정보 가져오는 부분=====================================

    opener.Preset_insert(params3);
    //ClosePopup();
});

// 팝업 종료 버튼(X) 클릭 이벤트
function ClosePopup() {
    self.close();   //자기 자신창을 닫습니다.
}