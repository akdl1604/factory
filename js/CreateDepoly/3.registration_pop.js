// 팝업 종료 버튼(X) 클릭 이벤트
function registration_prev() {
    $("#registration").attr("href", "Bellows_Form/workorder_WB.html")

    movepre();
    pop_workorder_btn_click('bom_next');
}

var modals = document.getElementsByClassName("modal");

// 모달 종료 버튼(X) 클릭 이벤트
function modal_delete_cancle() {

    var modals = document.getElementsByClassName("modal");

    modals[0].style.display = "none";

}

var previewIndex = 0;
var previewIndex2 = 0;
var previewIndex3 = 0;

//프리셋 파일 정보리스트
var origin_file_list = new Array();

//const dt = new _DataTransfer(); 
const dt = new Array();
const dt2 = new Array();
const dt3 = new Array();

var file_check1 = 0;
var file_check2 = 0;
var file_check3 = 0;


window.onload = function () {
    var preset_info = parent.preset_info;
    var file_data = parent.file_data;


    if (file_data == null) {
        if(preset_info != null){
            var params = {
                "SETTING_PRESET_ID": preset_info.SETTING_PRESET_ID
            };
            Check_Ct_File_Register_Id(preset_info.CT_FILE_REGISTER_ID);
    
            

            // 프리셋 파일조회
            fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectPresetFile", params, false, function (data) {
                $.each(data, function (i, v) {
                    
                    var presetfile = {        
                        "CT_FILE_REGISTER_ID" : v.CT_FILE_REGISTER_ID,
                        "SETTING_PRESET_FILE_MANAGEMENT_ID" : v.SETTING_PRESET_FILE_MANAGEMENT_ID,
                        "SETTING_PRESET_FILE_MANAGEMENT_NAME" : v.SETTING_PRESET_FILE_MANAGEMENT_NAME,
                        "JOBORDER_FILE_TYPE_ID" : v.JOBORDER_FILE_TYPE_ID
                    }
                    origin_file_list.push(presetfile);

                    if(v.JOBORDER_FILE_TYPE_ID==1){
                        var html = '';
                        html += "<tr class=\"preview-box2\" value=\"" + v.SETTING_PRESET_FILE_MANAGEMENT_ID +"\">";
                        html +=     "<td>" + v.SETTING_PRESET_FILE_MANAGEMENT_NAME + "<button class=\"btn_del\" value=\""+ v.SETTING_PRESET_FILE_MANAGEMENT_ID + "\" onclick=\"orgindeletePreview(this)\"></button></td>";
                        html += "</tr>";
                        $("#preview").append(html);
                        file_check1++;
                    }else if(v.JOBORDER_FILE_TYPE_ID==2){
                        var html = '';
                        html += "<tr class=\"preview-box2\" value=\"" + v.SETTING_PRESET_FILE_MANAGEMENT_ID +"\">";
                        html +=     "<td>" + v.SETTING_PRESET_FILE_MANAGEMENT_NAME + "<button class=\"btn_del\" value=\""+ v.SETTING_PRESET_FILE_MANAGEMENT_ID + "\" onclick=\"orgindeletePreview2(this)\"></button></td>";
                        html += "</tr>";
                        $("#preview2").append(html);
                        file_check2++;
                    }else if(v.JOBORDER_FILE_TYPE_ID==3){
                        var html = '';
                        html += "<tr class=\"preview-box2\" value=\"" + v.SETTING_PRESET_FILE_MANAGEMENT_ID +"\">";
                        html +=     "<td>" + v.SETTING_PRESET_FILE_MANAGEMENT_NAME + "<button class=\"btn_del\" value=\""+ v.SETTING_PRESET_FILE_MANAGEMENT_ID + "\" onclick=\"orgindeletePreview3(this)\"></button></td>";
                        html += "</tr>";
                        $("#preview3").append(html);
                        file_check3++;
                    }
                });
            });
        }        
    } 
    else{
        origin_file_list = file_data.origin_file_list;

        for (var i = 0; i < origin_file_list.length; i++) {
            if(origin_file_list[i].JOBORDER_FILE_TYPE_ID==1){
                var html = '';
                html += "<tr class=\"preview-box2\" value=\"" + origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID +"\">";
                html +=     "<td>" + origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_NAME + "<button class=\"btn_del\" value=\""+ origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID + "\" onclick=\"orgindeletePreview(this)\"></button></td>";
                html += "</tr>";
                $("#preview").append(html);
                file_check1++;
            }else if(origin_file_list[i].JOBORDER_FILE_TYPE_ID==2){
                var html = '';
                html += "<tr class=\"preview-box2\" value=\"" + origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID +"\">";
                html +=     "<td>" + origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_NAME + "<button class=\"btn_del\" value=\""+ origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID + "\" onclick=\"orgindeletePreview2(this)\"></button></td>";
                html += "</tr>";
                $("#preview2").append(html);
                file_check2++;
            }else if(origin_file_list[i].JOBORDER_FILE_TYPE_ID==3){
                var html = '';
                html += "<tr class=\"preview-box2\" value=\"" + origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID +"\">";
                html +=     "<td>" + origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_NAME + "<button class=\"btn_del\" value=\""+ origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID + "\" onclick=\"orgindeletePreview3(this)\"></button></td>";
                html += "</tr>";
                $("#preview3").append(html);
                file_check3++;
            }
        }

        Check_Ct_File_Register_Id(file_data.CT_FILE_REGISTER_ID);

        for (var i = 0; i < file_data.PresetFile.length; i++) {
            if (file_data.JOBORDER_FILE_TYPE_ID2[i] == 1) {
                var imgNum = previewIndex++;
                var html = '';
                html += "<tr class=\"preview-box\" value=\"" + imgNum + "\">";
                html += "<td>" + file_data.PresetFile[i].name + "<button class=\"btn_del\" value=\"" + imgNum + "\" onclick=\"deletePreview(this)\"></button></td>";
                html += "</tr>";
                $("#preview").append(html);
                dt.push(file_data.PresetFile[i]);
            } else if (file_data.JOBORDER_FILE_TYPE_ID2[i] == 2) {
                var imgNum = previewIndex2++;
                var html = '';
                html += "<tr class=\"preview-box\" value=\"" + imgNum + "\">";
                html += "<td>" + file_data.PresetFile[i].name + "<button class=\"btn_del\" value=\"" + imgNum + "\" onclick=\"deletePreview2(this)\"></button></td>";
                html += "</tr>";
                $("#preview2").append(html);
                dt2.push(file_data.PresetFile[i]);
            } else if (file_data.JOBORDER_FILE_TYPE_ID2[i] == 3) {
                var imgNum = previewIndex3++;
                var html = '';
                html += "<tr class=\"preview-box\" value=\"" + imgNum + "\">";
                html += "<td>" + file_data.PresetFile[i].name + "<button class=\"btn_del\" value=\"" + imgNum + "\" onclick=\"deletePreview3(this)\"></button></td>";
                html += "</tr>";
                $("#preview3").append(html);
                dt3.push(file_data.PresetFile[i]);
            }
        }
    }
}


function readURL(input) {
    if (input.files && input.files[0]) {
        //파일 선택이 여러개였을 시의 대응
        for (var fileIndex = 0; fileIndex < input.files.length; fileIndex++) {
            var file = input.files[fileIndex];

            if (validation(file.name))
                continue;

            dt.push(file);

            var reader = new FileReader();
            reader.onload = function (img) {
                //div id="preview" 내에 동적코드추가.
                //이 부분을 수정해서 이미지 링크 외 파일명(name), 사이즈(size), 타입(type) 등의 부가설명을 할 수 있다.
                var imgNum = previewIndex++;
                $("#preview")
                    .append(
                        "<tr class=\"preview-box\" value=\"" + imgNum + "\">"
                        + "<td>" + dt[imgNum].name + "<button class=\"btn_del\" value=\"" + imgNum + "\" onclick=\"deletePreview(this)\"></button></td>"//+"<td>" + dt.files[imgNum].name + "<button class=\"btn_del\" value=\""+ imgNum + "\" onclick=\"deletePreview(this)\"></button></td>"
                        + "</tr>");
            };

            reader.readAsDataURL(file);
        }
    }
}

function readURL2(input) {
    if (input.files && input.files[0]) {
        //파일 선택이 여러개였을 시의 대응
        for (var fileIndex = 0; fileIndex < input.files.length; fileIndex++) {
            var file = input.files[fileIndex];

            if (validation(file.name))
                continue;

            //dt2.items.add(file);
            dt2.push(file);

            var reader = new FileReader();
            reader.onload = function (img) {
                //div id="preview" 내에 동적코드추가.
                //이 부분을 수정해서 이미지 링크 외 파일명(name), 사이즈(size), 타입(type) 등의 부가설명을 할 수 있다.
                var imgNum = previewIndex2++;
                $("#preview2")
                    .append(
                        "<tr class=\"preview-box\" value=\"" + imgNum + "\">"
                        + "<td>" + dt2[imgNum].name + "<button class=\"btn_del\" value=\"" + imgNum + "\" onclick=\"deletePreview2(this)\"></button></td>"
                        + "</tr>");
            };

            reader.readAsDataURL(file);
        }
        //input.files = dt2.files;
    }
}

function readURL3(input) {
    if (input.files && input.files[0]) {

        //파일 선택이 여러개였을 시의 대응
        for (var fileIndex = 0; fileIndex < input.files.length; fileIndex++) {
            var file = input.files[fileIndex];

            if (validation(file.name))
                continue;

            dt3.push(file);

            var reader = new FileReader();
            reader.onload = function (img) {
                //div id="preview" 내에 동적코드추가.
                //이 부분을 수정해서 이미지 링크 외 파일명(name), 사이즈(size), 타입(type) 등의 부가설명을 할 수 있다.
                var imgNum = previewIndex3++;
                $("#preview3")
                    .append(
                        "<tr class=\"preview-box\" value=\"" + imgNum + "\">"
                        + "<td>" + dt3[imgNum].name + "<button class=\"btn_del\" value=\"" + imgNum + "\" onclick=\"deletePreview3(this)\"></button></td>"
                        + "</tr>");
            };

            reader.readAsDataURL(file);
        }
        input.files = dt3.files;
    }
}

$("#exampleInputFile").change(function () {
    readURL(this);
});
$("#exampleInputFile2").change(function () {
    readURL2(this);
});
$("#exampleInputFile3").change(function () {
    readURL3(this);
});

//preview 영역에서 삭제 버튼 클릭시 해당 미리보기이미지 영역 삭제
function deletePreview(obj) {
    var imgNum = obj.attributes['value'].value;
    $("#preview .preview-box[value=" + imgNum + "]").remove();
    dt.splice(imgNum, 1, null);
    previewIndex--;
}

function deletePreview2(obj) {
    var imgNum = obj.attributes['value'].value;
    $("#preview2 .preview-box[value=" + imgNum + "]").remove();
    dt2.splice(imgNum, 1, null);
    previewIndex2--;
}

function deletePreview3(obj) {
    var imgNum = obj.attributes['value'].value;
    $("#preview3 .preview-box[value=" + imgNum + "]").remove();
    dt3.splice(imgNum, 1, null);
    previewIndex3--;
}

function orgindeletePreview(obj) {
    var imgNum = obj.attributes['value'].value;
    $("#preview .preview-box2[value=" + imgNum + "]").remove();
    for(var i = 0; i <origin_file_list.length; i++){
        if(origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID==imgNum){
            origin_file_list.splice(i, 1);
        }
    }
}

function orgindeletePreview2(obj) {
    var imgNum = obj.attributes['value'].value;
    $("#preview2 .preview-box2[value=" + imgNum + "]").remove();
    for(var i = 0; i <origin_file_list.length; i++){
        if(origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID==imgNum){
            origin_file_list.splice(i, 1);
        }
    }
}

function orgindeletePreview3(obj) {
    var imgNum = obj.attributes['value'].value;
    $("#preview3 .preview-box2[value=" + imgNum + "]").remove();
    for(var i = 0; i <origin_file_list.length; i++){
        if(origin_file_list[i].SETTING_PRESET_FILE_MANAGEMENT_ID==imgNum){
            origin_file_list.splice(i, 1);
        }
    }
}

//확장자 체크
function validation(fileName) {
    fileName = fileName + "";
    var fileNameExtensionIndex = fileName.lastIndexOf('.') + 1;
    var fileNameExtension = fileName.toLowerCase().substring(
        fileNameExtensionIndex, fileName.length);
    if (!((fileNameExtension === 'pdf') || (fileNameExtension === 'PDF'))) {
        alert('pdf, PDF 확장자만 업로드 가능합니다.');
        return true;
    } else {
        return false;
    }
}

function Submitbtn() {
    var CT_FILE_REGISTER_ID = 0;
    var JOBORDER_FILE_TYPE_ID2 = new Array();
    var PresetFile = new Array();
    if ($('#check1').is(":checked") == true) {
        if ($('#check2').is(":checked") == true) {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 8;
            } else {
                CT_FILE_REGISTER_ID = 7;
                if (dt3.length == 0 && file_check3==0) {
                    alert("작업표준서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
            }
        } else {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 5;
                if (dt2.length == 0 && file_check2==0) {
                    alert("작업절차서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
            } else {
                CT_FILE_REGISTER_ID = 4;
                if (dt2.length == 0 && file_check2==0) {
                    alert("작업절차서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
                if (dt3.length == 0 && file_check3==0) {
                    alert("작업표준서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
            }
        }
    } else {
        if ($('#check2').is(":checked") == true) {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 6;
                if (dt.length == 0 && file_check1==0) {
                    alert("도면을 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
            } else {
                CT_FILE_REGISTER_ID = 3;
                if (dt.length == 0 && file_check1==0) {
                    alert("도면을 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
                if (dt3.length == 0 && file_check3==0) {
                    alert("작업표준서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
            }
        } else {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 2;
                if (dt.length == 0 && file_check1==0) {
                    alert("도면을 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
                if (dt2.length == 0 && file_check2==0) {
                    alert("작업절차서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
            } else {
                CT_FILE_REGISTER_ID = 1;
                if (dt.length == 0 && file_check1==0) {
                    alert("도면을 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
                if (dt2.length == 0 && file_check2==0) {
                    alert("작업절차서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
                if (dt3.length == 0 && file_check3==0) {
                    alert("작업표준서를 등록해주세요");
                    modal_delete_cancle();
                    return;
                }
            }
        }
    }

    for (var i = 0; i < dt.length; i++) {
        if (dt[i] != null) {
            JOBORDER_FILE_TYPE_ID2.push(1);
            PresetFile.push(dt[i]);
        }
    }

    for (var i = 0; i < dt2.length; i++) {
        if (dt2[i] != null) {
            JOBORDER_FILE_TYPE_ID2.push(2);
            PresetFile.push(dt2[i]);
        }
    }

    for (var i = 0; i < dt3.length; i++) {
        if (dt3[i] != null) {
            JOBORDER_FILE_TYPE_ID2.push(3);
            PresetFile.push(dt3[i]);
        }
    }

    var params2 = {
        "CT_FILE_REGISTER_ID": CT_FILE_REGISTER_ID,
        "PresetFile": PresetFile,
        "JOBORDER_FILE_TYPE_ID2": JOBORDER_FILE_TYPE_ID2,
        "origin_file_list" : origin_file_list
    }

    window.parent.postMessage({ childData: 'workorder_insert', param: params2 }, '*');
    modal_delete_cancle();
    return;
}

$(function () {
    $('#InputFileBtn').click(function (e) {
        e.preventDefault();
        if ($('#check1').is(":checked") != true) {
            $('#exampleInputFile').click();
        } else {
            alert("등록안함을 해제해주세요");
        }
    });

    $('#InputFileBtn2').click(function (e) {
        e.preventDefault();
        if ($('#check2').is(":checked") != true) {
            $('#exampleInputFile2').click();
        } else {
            alert("등록안함을 해제해주세요");
        }
    });

    $('#InputFileBtn3').click(function (e) {
        e.preventDefault();
        if ($('#check3').is(":checked") != true) {
            $('#exampleInputFile3').click();
        } else {
            alert("등록안함을 해제해주세요");
        }
    });
});

//이전 클릭시 데이터 보존
function movepre() {
    var CT_FILE_REGISTER_ID = 0;
    var JOBORDER_FILE_TYPE_ID2 = new Array();
    var PresetFile = new Array();
    if ($('#check1').is(":checked") == true) {
        if ($('#check2').is(":checked") == true) {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 8;
            } else {
                CT_FILE_REGISTER_ID = 7;
            }
        } else {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 5;
            } else {
                CT_FILE_REGISTER_ID = 4;
            }
        }
    } else {
        if ($('#check2').is(":checked") == true) {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 6;
            } else {
                CT_FILE_REGISTER_ID = 3;
            }
        } else {
            if ($('#check3').is(":checked") == true) {
                CT_FILE_REGISTER_ID = 2;
            } else {
                CT_FILE_REGISTER_ID = 1;
            }
        }
    }

    for (var i = 0; i < dt.length; i++) {
        if (dt[i] != null) {
            JOBORDER_FILE_TYPE_ID2.push(1);
            PresetFile.push(dt[i]);
        }
    }

    for (var i = 0; i < dt2.length; i++) {
        if (dt2[i] != null) {
            JOBORDER_FILE_TYPE_ID2.push(2);
            PresetFile.push(dt2[i]);
        }
    }

    for (var i = 0; i < dt3.length; i++) {
        if (dt3[i] != null) {
            JOBORDER_FILE_TYPE_ID2.push(3);
            PresetFile.push(dt3[i]);
        }
    }

    var params2 = {
        "CT_FILE_REGISTER_ID": CT_FILE_REGISTER_ID,
        "PresetFile": PresetFile,
        "JOBORDER_FILE_TYPE_ID2": JOBORDER_FILE_TYPE_ID2,
        "origin_file_list" : origin_file_list
    }

    window.parent.postMessage({ childData: 'move_second', param: params2 }, '*');
}

function Check_Ct_File_Register_Id(key) {
    if (key == 1) {
        $('#check1')[0].checked = false;
        $('#check2')[0].checked = false;
        $('#check3')[0].checked = false;
    } else if (key == 2) {
        $('#check1')[0].checked = false;
        $('#check2')[0].checked = false;
        $('#check3')[0].checked = true;
    } else if (key == 3) {
        $('#check1')[0].checked = false;
        $('#check2')[0].checked = true;
        $('#check3')[0].checked = false;
    } else if (key == 4) {
        $('#check1')[0].checked = true;
        $('#check2')[0].checked = true;
        $('#check3')[0].checked = false;
    } else if (key == 5) {
        $('#check1')[0].checked = true;
        $('#check2')[0].checked = false;
        $('#check3')[0].checked = true;
    } else if (key == 6) {
        $('#check1')[0].checked = false;
        $('#check2')[0].checked = true;
        $('#check3')[0].checked = true;
    } else if (key == 7) {
        $('#check1')[0].checked = true;
        $('#check2')[0].checked = true;
        $('#check3')[0].checked = false;
    } else if (key == 8) {
        $('#check1')[0].checked = true;
        $('#check2')[0].checked = true;
        $('#check3')[0].checked = true;
    }
}