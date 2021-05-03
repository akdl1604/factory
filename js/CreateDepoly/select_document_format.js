$(document).ready(function() {
    //만약 저장된 데이터가 있을경우 
    var save_data = parent.Bellows_Save_data;
    // set_save_data(save_data)

    var id = parent.Unique_Id;
    var data = parent.BomData;

    if (save_data.length != 0 && check_save_data(data, id))
        set_save_data(save_data)
  });
  
  


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
