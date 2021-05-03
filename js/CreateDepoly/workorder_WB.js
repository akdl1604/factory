window.onload = function () {

    console.log(parent.BomData);
    //부모 배열 받아오기
    data = parent.BomData;

    if (data[0].type == "1") {
        alert("통합서식으로");
        return;
    }
    //밸로우즈 코드
    $("#BELLOWSCODE")[0].innerText = data[0].BOM_DETAIL_BELLOWSCODE;
    //금형
    $("#MOLDTYPE")[0].innerText = data[0].BOM_DETAIL_MOLDTYPE;
    //금형번호
    $("#MOLDNUMBER")[0].innerText = data[0].BOM_DETAIL_MOLDNUMBER;
    //금형 OD
    $("#BOM_DETAIL_OD")[0].innerText = data[0].BOM_DETAIL_OD;
    //금형 ID
    $("#BOM_DETAIL_C_ID")[0].innerText = data[0].BOM_DETAIL_C_ID;
    //자재 Code
    $("#MATERIALCODE")[0].innerText = data[0].BOM_DETAIL_MATERIALCODE;
    //소재
    $("#MATERIAL")[0].innerText = data[0].BOM_DETAIL_MATERIAL;
    //소재 두께inch
    $("#MATERIALTHICK")[0].innerText = data[0].BOM_DETAIL_MATERIALTHICK;
    //Weldring 직경
    $("#WD")[0].innerText = data[0].BOM_DETAIL_WD;

    //작업지시서 상단 날짜 갱신
    $("#date").text(set_date());

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

$('#select_form').on('change', function () {
    console.log(this);
    console.log($(this).val());
    console.log($(this).text());


    window.location.href = $(this).val();
    $("#select_form").val($(this).val());

});