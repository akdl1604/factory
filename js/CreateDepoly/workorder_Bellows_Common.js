function Bellows_joborder_top_set()
{
    //console.log(parent.BomData);
    //부모 배열 받아오기
    var data = parent.BomData;

    if (data.length == 0)
        return;

    if (data[0].type != "2") {
        alert("통합서식으로");
        return;
    }


    //작업지시서 상단 날짜 갱신
    $("#JobOrder_Date").text(set_date());
    //밸로우즈 코드
    $("#JobOrder_BELLOWSCODE").text(data[0].BOM_DETAIL_BELLOWSCODE);
    //금형
    $("#JobOrder_MOLDTYPE").text(data[0].BOM_DETAIL_MOLDTYPE);
    //금형번호
    $("#JobOrder_MOLDNUMBER").text(data[0].BOM_DETAIL_MOLDNUMBER);
    //금형 OD
    $("#JobOrder_OD").text(data[0].BOM_DETAIL_OD);
    //금형 ID
    $("#JobOrder_C_ID").text(data[0].BOM_DETAIL_C_ID);
    //자재 Code
    $("#JobOrder_MATERIALCODE").text(data[0].BOM_DETAIL_MATERIALCODE);
    //소재
    $("#JobOrder_MATERIAL").text(data[0].BOM_DETAIL_MATERIAL);
    //소재 두께inch
    $("#JobOrder_MATERIALTHICK").text(data[0].BOM_DETAIL_MATERIALTHICK);
    //Weldring 직경
    $("#JobOrder_WD").text(data[0].BOM_DETAIL_WD);

    //하위 자동입력 부분 세팅
    $("#JobOrder_BELLOWSCODE_2").text(data[0].BOM_DETAIL_BELLOWSCODE);
    $("#JobOrder_MOLDTYPE_2").text(data[0].BOM_DETAIL_MOLDTYPE + " - " + data[0].BOM_DETAIL_MOLDNUMBER);
    $("#JobOrder_OD_2").text(data[0].BOM_DETAIL_OD);
    $("#JobOrder_C_ID_2").text(data[0].BOM_DETAIL_C_ID);
    $("#JobOrder_WD_2").text(data[0].BOM_DETAIL_WD);
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

//작업지시 상단에서 입력시 자동 세팅 되는 부분
$("#JobOrder_Business_Name").on('keyup', function (e) {

    $("#JobOrder_Business_Name_2").text(e.target.value);

});

$("#JobOrder_QUANTITY").on('keyup', function (e) {

    $("#JobOrder_QUANTITY_2").text(e.target.value);

});

$("#JobOrder_Number").on('keyup', function (e) {

    $("#JobOrder_Number_2").text(e.target.value);

});

function Bellows_joborder_subtitle_set(number)
{
    
    var subtitle_value = parent.Bellows_subtitle[0];

    console.log(Bellows_subtitle);

    var length = subtitle_value.length;

    /* var form = ["workorder_WB.html", "workorder_OD.html", "workorder_ID.html", "workorder_EFID_MD.html",
        "workorder_EFID_FD.html", "workorder_PR.html", "workorder_FD_PR.html", "workorder_EF_PR.html"] */

    for (var i = 0; i < length; i++) {
        if(number == i)
        {
            var option = '<option value=' + subtitle_value[i].JOBORDER_SUBTITLE_ID + '>' + subtitle_value[i].JOBORDER_SUBTITLE_NAME + '</option>'
        $("#select_form").prepend(option);
        continue;
             
        }
        var option = '<option value=' + subtitle_value[i].JOBORDER_SUBTITLE_ID + '>' + subtitle_value[i].JOBORDER_SUBTITLE_NAME + '</option>'
        $("#select_form").append(option);

    }

}

// 작업지시서 여,부 관련 체크 함수
$('.yeobu').on('click', function (event) {

    var btn = $(event.target).parent().find('button');
    btn[0].className = 'yeobu';
    btn[1].className = 'yeobu';
    $(event.target)[0].className = 'sel yeobu'

});

// 작업지시서 긴급 우선 체크
$('.emer_fisrt').on('click', function (event) {

    var btn = $(event.target).parent().parent().find('input');
    btn[0].checked =false
    btn[1].checked =false
    $(event.target)[0].checked = true

});

$("#select_form").change(function() {

    var form = ["workorder_WB.html","workorder_OD.html","workorder_ID.html","workorder_EFID_MD.html",
        "workorder_EFID_FD.html", "workorder_PR.html","workorder_FD_PR.html","workorder_EF_PR.html"]

    if ($(this).val() == 1)
    {
        //select box 선택된 value 값 가져오기
        //alert($("#select_form option:selected").val());

        location.href= form[0]
    }
    else if ($(this).val() == 2)
    {
        location.href= form[1]
    }
    else if ($(this).val() == 3)
    {
        location.href= form[2]
    }
    else if ($(this).val() == 4)
    {
        location.href= form[3]
    }
    else if ($(this).val() == 5)
    {
        location.href= form[4]
    }
    else if ($(this).val() == 6)
    {
        location.href= form[5]
    }
    else if ($(this).val() == 7)
    {

        location.href= form[6]
    }
    else if ($(this).val() == 8)
    {

        location.href= form[7]
    }
});
//<!---------------------------------날짜선택Start----------->
//한개만 단순하게 만들때
$("#datepicker").datepicker({
    language: 'ko'
});
//두개짜리 제어 연결된거 만들어주는 함수
//datePickerSet($("#datepicker1"), $("#datepicker2"), true); //다중은 시작하는 달력 먼저, 끝달력 2번째
datePickerSet($("#JobOrder_Delivery_Day"));
datePickerSet($("#JobOrder_Plan_Day"));
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
            autoClose: true,
            onSelect: function(dateText) {
                $(sDate).attr("value", dateText);
            }
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
