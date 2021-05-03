// 설비 수정 버튼
$("#SelectBt").on('click', function () {
    var params = {
        ORIGIN_EQUIPMENT_ID: $('#ORIGIN_EQUIPMENT_ID').val(),
        ORIGIN_EQUIPMENT_NAME: $('#ORIGIN_EQUIPMENT_NAME').val(),
        ORIGIN_EQUIPMENT_MODELNAME: $('#ORIGIN_EQUIPMENT_MODELNAME').val(),
        ORIGIN_EQUIPMENT_CONTEXT: $('#ORIGIN_EQUIPMENT_CONTEXT').val()
    }

    // 설비 수정
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateEquip", params, true, function (data) {
        // 설비 테이블 Reload
        opener.SearchFacilities();

        // 창 닫기
        self.close();
    });
});