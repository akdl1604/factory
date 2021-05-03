$(document).ready(function() {
    //만약 저장된 데이터가 있을경우 
    var save_data = parent.Bellows_Save_data;
    // set_save_data(save_data)

    if(save_data==null){
        var joborder_id = parent.num;

        var params = {
            "JOBORDER_ID": joborder_id
        }

        fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderID", params, true, function (data) {
            subtitle_id_check(data[0].JOBORDER_SUBTITLE_ID);
        });
    }
    else{
        var id = parent.Unique_Id;
        var data = parent.BomData;
    
        if (save_data.length != 0 && check_save_data(data, id))
            set_save_data(save_data)
    }
});
  
function subtitle_id_check(key){
    //1~8 벨로우즈
    //Welded Bellows 제작
    var bellows = 1;
    //Welded Bellows OD Module
    var OD = 2;
    //ID 재고
    var ID = 3;
    //EFID MD
    var MD = 4;
    //EFID FD
    var FD = 5;
    //MD_PR
    var MD_PR = 6;
    //FD_PR
    var FD_PR = 7;
    //EF_PR
    var EF_PR = 8

    //9~14 공통서식
    //기본
    var nomal = 9;
    //상품
    var product = 10;
    //가공 
    var make = 11;
    //용접
    var welding = 12;
    //성형
    var surgery = 13;
    //밸브
    var Valves = 14;

    //Welded Bellows 제작
    if(key==bellows){
        location.href = 'Bellows_Form/workorder_WB_update.html';
    }
    //Welded Bellows OD Module
    else if(key==OD){

    }
    //ID 재고
    else if(key==ID){

    }
    //EFID MD
    else if(key==MD){

    }
    //EFID FD
    else if(key==FD){

    }
    //MD_PR
    else if(key==MD_PR){

    }
    //FD_PR
    else if(key==FD_PR){

    }
    //EF_PR
    else if(key==EF_PR){

    }
    //기본
    else if(key==nomal){

    }
    //상품
    else if(key==product){

    }
    //가공 
    else if(key==make){

    }
    //용접
    else if(key==welding){

    }
    //성형
    else if(key==surgery){

    }
    //밸브
    else if(key==Valves){

    }
    
}


// window.onload=function()
// {
    

// }

function set_save_data(save_data) {

    //$("#division_form option:eq(1)").prop("selected",true);
    $('#division_form').val('Bellows_Form/' + save_data[0].JOBORDER_DIVISION_ID).prop("selected",true);

    location.href='Bellows_Form/' + save_data[0].JOBORDER_DIVISION_ID

}

function check_save_data(data, unique_id) {

    for (var i = 0; i < unique_id.length; i++) {
        if (data[0].BOM_LIST_ID == unique_id[i].BOM_LIST_ID && data[0].BOM_UNIQUE == unique_id[i].BOM_UNIQUE)
            return true;
    }
    return false;
}

//문자열 undefined 체크
function Check_undefined(str){
    var return_str = "";
    if(str != undefined){
        return_str = str;
    }
    return return_str;
}