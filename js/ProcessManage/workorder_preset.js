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
                html += '<td><input type="checkbox" name="checkbox" value="'+v[0].SETTING_PRESET_ID+'"></td>';
                html += '<td > ';
                html +=     '<a onclick="Update_Preset(this, '+v[0].SETTING_PRESET_ID+')" name="" style="cursor: pointer;"> '+v[0].SETTING_PRESET_NAME+'</a>'
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

// 프리셋 새로고침
function Refresh_Preset() {
    $('#SETTING_PRESET_NAME').val("");
    SearchAll();
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

        //체크박스 전체 선택 체크 X
        var test = $("#checkAll");
        test[0].checked = false;

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
            //복사된건지 필터링
            var check_copy = false;
            
            // 프리셋 공정 순서로 정렬
            v.sort(function (a, b) { 
                return a.SETTING_PRESET_PROCESS_INDEX < b.SETTING_PRESET_PROCESS_INDEX ? -1 : a.SETTING_PRESET_PROCESS_INDEX > b.SETTING_PRESET_PROCESS_INDEX ? 1 : 0;  
            });
            
            if(v.length>0){
                $.each(copy_preset_arr, function (c, x) {
                    if(v[0].SETTING_PRESET_ID==x){
                        check_copy = true;
                    }
                });

                if(check_copy){
                    var html = '';
            
                    html += '<tr class="on_copy">';
                    html += '<td><input type="checkbox" name="checkbox" value="'+v[0].SETTING_PRESET_ID+'"></td>';
                    html += '<td > ';
                    html +=     '<a onclick="Update_Preset(this, '+v[0].SETTING_PRESET_ID+')" name="" style="cursor: pointer;"> '+v[0].SETTING_PRESET_NAME+'</a>'
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
                    
                    $('#workorder_preset_tbody').prepend(html);
                }else{
                    var html = '';
            
                    html += '<tr>';
                    html += '<td><input type="checkbox" name="checkbox" value="'+v[0].SETTING_PRESET_ID+'"></td>';
                    html += '<td > ';
                    html +=     '<a onclick="Update_Preset(this, '+v[0].SETTING_PRESET_ID+')" name="" style="cursor: pointer;"> '+v[0].SETTING_PRESET_NAME+'</a>'
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
            }
        });
        copy_preset_arr = [];
    });
}

//복사된 프리셋 ID arr
var copy_preset_arr = new Array();
// 프리셋 복사
function Copy_Preset() {
    var checkbox = $("input[name=checkbox]:checked");

    if(checkbox.length>0){
        loding(function(){
            //체크된 체크박스 값을 가져온다
            checkbox.each(function(i) {
                // Json 형식으로 전송 할 데이터 담기
                var params = {
                    SETTING_PRESET_ID: $(this).val(),
                    ORIGIN_ACCOUNT_ID: sessionStorage.getItem("ORIGIN_ACCOUNT_ID")
                }
                
                //서버와 통신
                fun_ajax("POST", "http://220.89.167.212:8085/testing05/CopySettingPreset", params, false, function(data) {
                    copy_preset_arr.push(data.CopyPresetId);
                });
            });
    
            SearchAll();
        });
    }
}

// 프리셋 삭제
function Del_Preset() {
    var checkbox = $("input[name=checkbox]:checked");
    var ischeck = true;
    var presetid_list = new Array();
    //삭제 리스트 관리자 본인여부 확인
    checkbox.each(function(i) {
        var tr = checkbox.parent().parent().eq(i);
        var td = tr.children();

        var Membername = sessionStorage.getItem("ORIGIN_ACCOUNT_MEMBERNAME");
        presetid_list.push($(this).val());
        if(Membername!=td[3].innerText){
            ischeck = false;
        }
    });

    if(ischeck){
        var params = {
            SETTING_PRESET_ID2: presetid_list,
            ORIGIN_ACCOUNT_ID: sessionStorage.getItem("ORIGIN_ACCOUNT_ID")
        }

        //서버와 통신
        fun_ajax_noreturn("POST", "http://220.89.167.212:8085/testing05/DeleteSettingPreset", params, false, function(data) {

        });
    }else{
        alert("다른 관리자가 등록한 프리셋이 선택되었습니다.");
    }

    SearchAll();
}

//공정 프리셋 수정 팝업 - 명칭 클릭시 
function Update_Preset(obj,num){
    var tr = obj.parentElement.parentElement;
    var td = tr.children;

    var Membername = sessionStorage.getItem("ORIGIN_ACCOUNT_MEMBERNAME");

    if(Membername == null){
        alert("세션 초기화 다시 로그인 해주세요");
        return;
    }
    
    if(Membername==td[3].innerText){
        var childWin = window.open('pop/tab_preset_update.html?num='+num, '공정Preset 수정', 'left='+(screen.availWidth-865)/2+',top='+(screen.availHeight-740)/2+', width=865px,height=740px');
    }else{
        alert("다른 관리자가 등록한 프리셋 입니다.");
    }
    
}

// 체크 박스 모두 체크
$("#checkAll").click(function() {
    if($('input:checkbox[id="checkAll"]').is(":checked") == false){
        $("input[name=checkbox]:checkbox").each(function() {
            $(this).attr("checked", false);
        });
    }
    else{
        $("input[name=checkbox]:checkbox").each(function() {
            $(this).attr("checked", true);
        });
    }
});

