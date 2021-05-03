function subtitle() {

    var params = {

        "JOBORDER_SUBTITLE_DIVISION": 1,
    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderSubtitle", params, false, function (data) {


        var length = data.length;

        var form = ["workorder_WB.html", "workorder_OD.html", "workorder_ID.html", "workorder_EFID_MD.html",
            "workorder_EFID_FD.html", "workorder_PR.html", "workorder_FD_PR.html", "workorder_EF_PR.html"]

        for (var i = 0; i < length; i++) {
            var option = '<option value=' + form[i] + '>' + data[i].JOBORDER_SUBTITLE_NAME + '</option>'
            $("#select_form").append(option);
        }

        // for (var i = 0; i < length; i++) {
        //     if (data[i].JOBORDER_SUBTITLE_NAME === $("#select_form option:selected").text()) {
        //         $("#JobOrder_QUANTITY").val(data[i].JOBORDER_DETAIL_QUANTITY);
        //         $("#JobOrder_SIZE").val(data[i].JOBORDER_DETAIL_SIZE);
        //         $("#JobOrder_SHEARINGWIDTH").val(data[i].JOBORDER_DETAIL_SHEARINGWIDTH);
        //         $("#JobOrder_MD").val(data[i].JOBORDER_DETAIL_MD);
        //         $("#JobOrder_FD").val(data[i].JOBORDER_DETAIL_FD);
        //         $("#JobOrder_PRESSNUMBER").val(data[i].JOBORDER_DETAIL_PRESSNUMBER);
        //         $("#JobOrder_PRESSTON").val(data[i].JOBORDER_DETAIL_PRESSTON);



        //         $("#JobOrder_QUANTITY_2")[0].innerText = data[i].JOBORDER_DETAIL_QUANTITY;
        //     }
        // }

    });
}



