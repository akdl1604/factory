window.onload = function () {

    //console.log(parent.BomData);
    //부모 배열 받아오기
    data = parent.BomData;

    if (data[0].type != "1") {
        alert("Bellows 서식으로");
        return;
    }

    //작업지시서 상단 날짜 갱신
    $("#date").text(set_date());


    var params = {

        "JOBORDER_SUBTITLE_DIVISION": 2,
    }

    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderSubtitle", params, true, function (data) {

        var length = data.length;

        for (var i = 0; i < length; i++) {
            var option = '<option value=' + data[i].JOBORDER_SUBTITLE_ID + '>' + data[i].JOBORDER_SUBTITLE_NAME + '</option>'
            $("#select_form").append(option);
        }

        // var length = data.length;

        // for (var i = 0; i < length; i++) {

        //     if (data[i].JOBORDER_SUBTITLE_NAME === $("#select_form option:selected").text()) {
        //         $("#JOBORDER_DETAIL_QUANTITY").val(data[i].JOBORDER_DETAIL_QUANTITY);
        //         $("#JOBORDER_DETAIL_SIZE").val(data[i].JOBORDER_DETAIL_SIZE);
        //         $("#JOBORDER_DETAIL_SHEARINGWIDTH").val(data[i].JOBORDER_DETAIL_SHEARINGWIDTH);
        //         $("#JOBORDER_DETAIL_MD").val(data[i].JOBORDER_DETAIL_MD);
        //         $("#JOBORDER_DETAIL_FD").val(data[i].JOBORDER_DETAIL_FD);
        //         $("#JOBORDER_DETAIL_PRESSNUMBER").val(data[i].JOBORDER_DETAIL_PRESSNUMBER);
        //         $("#JOBORDER_DETAIL_PRESSTON").val(data[i].JOBORDER_DETAIL_PRESSTON);



        //         $("#QUANTITY_2")[0].innerText = data[i].JOBORDER_DETAIL_QUANTITY;
        //     }
        // }

    });
}


function set_date() {

    // date Object를 받아오고 
    var date = new Date();

    // 년을 받아옵니다 
    var year = date.getFullYear();

    // 달을 받아옵니다 
    var months = date.getMonth() + 1;

    // 몇일인지 받아옵니다 
    var days = date.getDate();

    return "*JOB 발행일자 : " + year + "년" + convert_two(months) + "월" + convert_two(days) + "일";
}

function convert_two(value) {
    return value < 10 ? "0" + value : value
}

//<!---------------------------------날짜선택Start----------->
//한개만 단순하게 만들때
$("#datepicker").datepicker({
    language: 'ko'
});
//두개짜리 제어 연결된거 만들어주는 함수
//datePickerSet($("#datepicker1"), $("#datepicker2"), true); //다중은 시작하는 달력 먼저, 끝달력 2번째
datePickerSet($("#datepicker1"));
datePickerSet($("#datepicker2"));
/*
 * 달력 생성기
 * @param sDate 파라미터만 넣으면 1개짜리 달력 생성
 * @example   datePickerSet($("#datepicker"));
 * 
 * 
 * @param sDate, 
 * @param eDate 2개 넣으면 연결달력 생성되어 서로의 날짜를 넘어가지 않음
 * @example   datePickerSet($("#datepicker1"), $("#datepicker2"));
 */
function datePickerSet(sDate, eDate, flag) {

    //시작 ~ 종료 2개 짜리 달력 datepicker	
    if (!isValidStr(sDate) && !isValidStr(eDate) && sDate.length > 0 && eDate.length > 0) {
        var sDay = sDate.val();
        var eDay = eDate.val();

        if (flag && !isValidStr(sDay) && !isValidStr(eDay)) { //처음 입력 날짜 설정, update...			
            var sdp = sDate.datepicker().data("datepicker");
            sdp.selectDate(new Date(sDay.replace(/-/g, "/"))); //익스에서는 그냥 new Date하면 -을 인식못함 replace필요

            var edp = eDate.datepicker().data("datepicker");
            edp.selectDate(new Date(eDay.replace(/-/g, "/"))); //익스에서는 그냥 new Date하면 -을 인식못함 replace필요
        }

        //시작일자 세팅하기 날짜가 없는경우엔 제한을 걸지 않음
        if (!isValidStr(eDay)) {
            sDate.datepicker({
                maxDate: new Date(eDay.replace(/-/g, "/"))
            });
        }
        sDate.datepicker({
            language: 'ko',
            autoClose: true,
            onSelect: function () {
                datePickerSet(sDate, eDate);
            }
        });

        //종료일자 세팅하기 날짜가 없는경우엔 제한을 걸지 않음
        if (!isValidStr(sDay)) {
            eDate.datepicker({
                minDate: new Date(sDay.replace(/-/g, "/"))
            });
        }
        eDate.datepicker({
            language: 'ko',
            autoClose: true,
            onSelect: function () {
                datePickerSet(sDate, eDate);
            }
        });

        //한개짜리 달력 datepicker
    } else if (!isValidStr(sDate)) {
        var sDay = sDate.val();
        if (flag && !isValidStr(sDay)) { //처음 입력 날짜 설정, update...			
            var sdp = sDate.datepicker().data("datepicker");
            sdp.selectDate(new Date(sDay.replace(/-/g, "/"))); //익스에서는 그냥 new Date하면 -을 인식못함 replace필요
        }

        sDate.datepicker({
            language: 'ko',
            autoClose: true
        });
    }


    function isValidStr(str) {
        if (str == null || str == undefined || str == "")
            return true;
        else
            return false;
    }
}

//<!-----------------날짜선택End----------->