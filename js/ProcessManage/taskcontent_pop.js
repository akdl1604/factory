//작업내용 및 특이사항 수정 버튼
$("#SelectBt").on('click', function () {
    var params = {
        ORIGIN_UNIQUESS_ID: $('#ORIGIN_UNIQUESS_ID').val(),
        ORIGIN_PROCESS_ID: $('#ORIGIN_PROCESS_ID').val(),
        ORIGIN_UNIQUESS_CONTEXT: $('#ORIGIN_UNIQUESS_CONTEXT').val()
    }

    // 작업내용 및 특이사항 수정
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/UpdateUniquess", params, true, function (data) {
        // 작업내용 및 특이사항 테이블 Reload
        opener.SearchUniquess();

        // 창 닫기
        self.close();
    });
});