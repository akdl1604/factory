window.onload = function () {
    var bomdata = parent.BomData;
    if(bomdata == null){
        //load_bom_list();
        var joborder_id = parent.num;
            
        var params = {
            "JOBORDER_ID": joborder_id
        }

        fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderID", params, true, function (data) {

            var params2 = {
                "BOM_LIST_ID": data[0].BOM_LIST_ID
            }
        
            fun_ajax("POST", "http://220.89.167.212:8085/testing05/ViewBomDetail", params2, true, function (data2) {
        
                $("#bom_table > tbody").empty();

                for (var i = 0; i < data2.length; i++) {
        
                    var html = '';
        
                    html += '<tr>';
                    html += '<input type="hidden" value=' + "2" + '>';
                    html += '<input type="hidden" value=' + Check_undefined(data2[i].BOM_LIST_ID) + '>';
                    html += '<input type="hidden" value=' + Check_undefined(data2[i].ORIGIN_ACCOUNT_ID) + '>';
                    html += '<input type="hidden" value=' + Check_undefined(data2[i].BOM_FILE_MANAGEMENT_ID) + '>';
        
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_DIVISION) + '</td>'
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_INDEX) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_LEVERL) + '</td>';
        
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_PRODUCTNAME) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_PRODUCTCODE) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_QUANTITY) + '</td>';
        
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_BELLOWSCODE) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MOLDTYPE) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MOLDNUMBER) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_OD) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_C_ID) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIALCODE) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIAL) + '</td>';
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIALSIZE) + '</td>';//13 ***
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIALTHICK) + '</td>';//14 ***
                    html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_WD) + '</td>';//15 ***
                    html += '<input type="hidden" id="unique" value=' + data2[i].BOM_DETAIL_ID + '>';
                    html += '</tr>';
        
                    $("#bom_table").append(html);
                }
                
                var selected_bomdetail = $('#bom_table > tbody #unique[value='+data[0].BOM_DETAIL_ID+']').parent();
                selected_bomdetail.addClass('on');
            });   
        });
    }else{
        var params2 = {
            "BOM_LIST_ID": bomdata[0].BOM_LIST_ID
        }
    
        fun_ajax("POST", "http://220.89.167.212:8085/testing05/ViewBomDetail", params2, true, function (data2) {
    
            $("#bom_table > tbody").empty();

            for (var i = 0; i < data2.length; i++) {
    
                var html = '';
    
                html += '<tr>';
                html += '<input type="hidden" value=' + "2" + '>';
                html += '<input type="hidden" value=' + Check_undefined(data2[i].BOM_LIST_ID) + '>';
                html += '<input type="hidden" value=' + Check_undefined(data2[i].ORIGIN_ACCOUNT_ID) + '>';
                html += '<input type="hidden" value=' + Check_undefined(data2[i].BOM_FILE_MANAGEMENT_ID) + '>';
    
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_DIVISION) + '</td>'
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_INDEX) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_LEVERL) + '</td>';
    
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_PRODUCTNAME) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_PRODUCTCODE) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_QUANTITY) + '</td>';
    
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_BELLOWSCODE) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MOLDTYPE) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MOLDNUMBER) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_OD) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_C_ID) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIALCODE) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIAL) + '</td>';
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIALSIZE) + '</td>';//13 ***
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_MATERIALTHICK) + '</td>';//14 ***
                html += '<td>' + Check_undefined(data2[i].BOM_DETAIL_WD) + '</td>';//15 ***
                html += '<input type="hidden" id="unique" value=' + data2[i].BOM_DETAIL_ID + '>';
                html += '</tr>';
    
                $("#bom_table").append(html);
            }
            
            var selected_bomdetail = $('#bom_table > tbody #unique[value='+bomdata[0].BOM_UNIQUE+']').parent();
            selected_bomdetail.addClass('on');
        });  
    }
}

function bom_pop_next() {
    //선택한 bomdata 배열
    sel_bomdata = new Array();

    //선택된 붐 디테일 정보 tr
    var selected_bomdetail = $('#bom_table .on');
    var td = selected_bomdetail.children();
    if (selected_bomdetail.length >= 1) {
        params = {
            "type": td.eq(0).val(),
            "BOM_LIST_ID": td.eq(1).val(),
            "ORIGIN_ACCOUNT_ID": td.eq(2).val(),
            "BOM_FILE_MANAGEMENT_ID": td.eq(3).val(),
            "BOM_DETAIL_DIVISION": td.eq(4).text(),
            "BOM_DETAIL_INDEX": td.eq(5).text(),
            "BOM_DETAIL_LEVERL": td.eq(6).text(),
            "BOM_DETAIL_PRODUCTNAME": td.eq(7).text(),
            "BOM_DETAIL_PRODUCTCODE": td.eq(8).text(),
            "BOM_DETAIL_QUANTITY": td.eq(9).text(),
            "BOM_DETAIL_BELLOWSCODE": td.eq(10).text(),
            "BOM_DETAIL_MOLDTYPE": td.eq(11).text(),
            "BOM_DETAIL_MOLDNUMBER": td.eq(12).text(),
            "BOM_DETAIL_OD": td.eq(13).text(),
            "BOM_DETAIL_C_ID": td.eq(14).text(),
            "BOM_DETAIL_MATERIALCODE": td.eq(15).text(),
            "BOM_DETAIL_MATERIAL": td.eq(16).text(),
            "BOM_DETAIL_MATERIALSIZE": td.eq(17).text(),
            "BOM_DETAIL_MATERIALTHICK": td.eq(18).text(),
            "BOM_DETAIL_WD": td.eq(19).text(),
            //임시 식볇값 
            "BOM_UNIQUE": td.eq(20).val(),
        }
        
        sel_bomdata.push(params);
    
        //부모에게 선택한 bomdata 넘기는 코드
        window.parent.postMessage({ childData: 'sel_bomdata', arr: JSON.parse(JSON.stringify(sel_bomdata)) }, '*');
    
        $("#BOM").attr("href", "select_document_format_update.html")
    
        pop_workorder_btn_click('bom_next');

    }else{
        alert("행선택해주세요.");
        return;
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