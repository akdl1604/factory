// 수정 파라미터 저장 값
var array = '';
// 구분, 옵션 값
var choice = '';
// 검사 항목 이름
var title = '';

$.urlParam = function (key) {
    var _parammap = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        _parammap[decode(arguments[1])] = decode(arguments[2]);
    });

    return _parammap[key];
}

$(document).ready(function () {
    // 이전 페이지에서 값 가져오기
    array = $.urlParam('arg1').split(",");
    choice = $.urlParam('arg2').split(",");
    title = $.urlParam('arg3').split(",");
    option1 = $.urlParam('arg4');
    option2 = $.urlParam('arg5');

    // html 코드 값 확인
    $.each(choice, function (index, value) {
        //Display 초기화
        Initialization();

        switch (value) {
            // 구분-> 측정값
            // 옵션1-> 단일
            // 옵션2-> 개수
            case "1":
                $('#option_1_col').css('display', '');
                $('#option_1').css('display', '');

                $('#option_2_col').css('display', '');
                $('#option_2').css('display', '');
                
                $("#MeasurementsSelect").val("측정값");
                $("#MeasurementsSelect2").val("단일");

                $('#contents_col').css('display', '');
                $('#contents').css('display', '');

                $("#Number").val(Number(option1));

                $("#TitleName").val(title[index]);
                
                $('#MeasurementsContents').empty();
                
                for(var i = 0; i < array.length; i++){
                    $('#MeasurementsContents').append(array[i]);
                }
                break;
            // 구분-> 측정값
            // 옵션-> 범위
            case "2":
                $('#option_1_col').css('display', '');
                $('#option_1').css('display', '');

                $('#contents_col').css('display', '');
                $('#contentsRange').css('display', '');

                $("#MeasurementsSelect").val("측정값");
                $("#MeasurementsSelect2").val("범위");

                $("#TitleName").val(title[index]);

                $('#Measurements').empty();
                $('#Measurements').append(array[index]);
                break;
            // 구분-> 합/불 체크
            case "3":
                $('#contents_col').css('display', '');
                $('#CheckPassFailure').css('display', '');

                $("#MeasurementsSelect").val("합/불 체크");

                $("#TitleName").val(title[index]);

                $('#CheckPassFailureContents').empty();
                $('#CheckPassFailureContents').append(array[index]);
                break;
            // 구분 -> 유/무 체크
            case "4":
                $('#contents_col').css('display', '');
                $('#CheckIsIsNot').css('display', '');

                $("#MeasurementsSelect").val("유/무 체크");

                $("#TitleName").val(title[index]);

                $('#CheckIsIsNotContents').empty();
                $('#CheckIsIsNotContents').append(array[index]);
                break;
            // 구분 -> 항목 체크
            // 옵션 -> 개수
            case "5":
                $('#option_2_col').css('display', '');
                $('#CheckItemoption_2').css('display', '');

                $('#contents_col').css('display', '');
                $('#CheckItem').css('display', '');

                $("#MeasurementsSelect").val("항목 체크");

                $("#TitleName").val(title[index]);

                $("#CheckItemNumber").val(Number(option2));

                $('#CheckItemContents').empty();
                $('#CheckItemContents').append(array[index]);
                break;
            // 구분 -> 누설 검사
            case "6":
                $('#contents_col').css('display', '');
                $('#LeakageInspection').css('display', '');

                $("#MeasurementsSelect").val("누설 검사");

                $("#TitleName").val(title[index]);
                break;
            // 구분 -> 문장 -> 확인
            case "7":
                $('#option_1_col').css('display', '');
                $('#Sentenceoption_1').css('display', '');

                $('#contents_col').css('display', '');
                $('#SentenceContents').css('display', '');

                $("#MeasurementsSelect").val("문장");
                $("#SentenceSelect2").val("확인")

                $("#TitleName").val(title[index]);

                $('#SentenceContents').empty();
                $('#SentenceContents').append(array[index]);
                break;
            // 구분 -> 문장 -> 입력
            case "8":
                $('#option_1_col').css('display', '');
                $('#Sentenceoption_1').css('display', '');

                $('#contents_col').css('display', '');
                $('#SentenceContentsInput').css('display', '');

                $("#MeasurementsSelect").val("문장");
                $("#SentenceSelect2").val("입력")

                $("#TitleName").val(title[index]);

                $('#SentenceContentsInput').empty();
                $('#SentenceContentsInput').append(array[index]);
                break;
        }
    });
});

// 구분 타입에 따른 SelectOption
function MeasurementsItemChange() {
    //Display 초기화
    Initialization();

    //측정값 구분 옵션
    var Measurements = ["단일", "범위"];
    //항목체크 구분 옵션
    var CheckItem = ["개수"];
    //문장 구분 옵션
    var Sentence = ["확인", "입력"];

    //타입 선택 SelectBox
    var selectItem = $("#MeasurementsSelect").val();

    //콤보 박스 내용 변수
    var changeItem;

    if (selectItem == "측정값") {
        //Display 초기화
        Initialization();

        $('#option_1_col').css('display', '');
        $('#option_1').css('display', '');

        $('#option_2_col').css('display', '');
        $('#option_2').css('display', '');

        changeItem = Measurements;

        $('#MeasurementsSelect2').empty();

        for (var count = 0; count < changeItem.length; count++) {
            var option = $("<option>" + changeItem[count] + "</option>");
            $('#MeasurementsSelect2').append(option);
        }
    } else if (selectItem == "합/불 체크") {
        //Display 초기화
        Initialization();

        $('#contents_col').css('display', '');
        $('#CheckPassFailure').css('display', '');
    } else if (selectItem == "유/무 체크") {
        //Display 초기화
        Initialization();

        $('#contents_col').css('display', '');
        $('#CheckIsIsNot').css('display', '');
    } else if (selectItem == "항목 체크") {
        //Display 초기화
        Initialization();

        $('#option_2_col').css('display', '');
        $('#CheckItemoption_2').css('display', '');
    } else if (selectItem == "누설 검사") {
        //Display 초기화
        Initialization();

        $('#contents_col').css('display', '');
        $('#LeakageInspection').css('display', '');
    } else if (selectItem == "문장") {
        //Display 초기화
        Initialization();

        $('#option_1_col').css('display', '');
        $('#Sentenceoption_1').css('display', '');

        $('#contents_col').css('display', '');
        $('#SentenceContents').css('display', '');
    }
}

// 구분 타입에 문장 -> 확인/입력 SelectOption
function SentenceItemChange() {
    //타입 선택 SelectBox
    var selectItem = $("#SentenceSelect2").val();

    //콤보 박스 내용 변수
    var changeItem;

    if (selectItem == "확인") {
        $('#contents_col').css('display', '');
        $('#SentenceContents').css('display', '');
        $('#SentenceContentsInput').css('display', 'none');

    } else if (selectItem == "입력") {
        $('#contents_col').css('display', '');
        $('#SentenceContents').css('display', 'none');
        $('#SentenceContentsInput').css('display', '');

    }
}

// 구분 타입에 측정값 -> 단일/복수 SelectOption
function MeasurementsSelect2ItemChange() {
    //타입 선택 SelectBox
    var selectItem = $("#MeasurementsSelect2").val();

    //콤보 박스 내용 변수
    var changeItem;

    if (selectItem == "단일") {
        $('#option_2_col').css('display', '');
        $('#option_2').css('display', '');

        $('#contents_col').css('display', 'none');
        $('#contentsRange').css('display', 'none');

    } else if (selectItem == "범위") {
        $('#option_2_col').css('display', 'none');
        $('#option_2').css('display', 'none');
        $('#contents').css('display', 'none');

        $('#contents_col').css('display', '');
        $('#contentsRange').css('display', '');
    }
}

//측정값 -> 단일 -> 개수 입력시 해당 값 저장
$("#Number").on("change keyup paste", function () {
    html = '';

    $('#contents_col').css('display', '');
    $('#contents').css('display', '');

    var currentVal = $(this).val();

    // 입력 값이 문자 일 경우 True
    if (isNaN(currentVal) == true) {
        return;
    } else if (isNaN(currentVal) == false) {
        $('#MeasurementsContents').empty();

        if (currentVal != '') {
            for (var count = 0; count < currentVal; count++) {
                html += '<li>';
                html += '<input name="value" type="text" placeholder="항목"></option>';
                html += '<input type="text" disabled></option>';
                html += '<input name="value" type="text" placeholder="단위"></option>';
                html += '</li>';

                $('#MeasurementsContents').append(html);

                html = '';
            }
        }
    }
});

//항목 체크 -> 개수입력시 해당 값 저장
$("#CheckItemNumber").on("change keyup paste", function () {
    html = '';

    $('#contents_col').css('display', '');
    $('#CheckItem').css('display', '');

    var currentVal = $(this).val();

    // 입력 값이 문자 일 경우 True
    if (isNaN(currentVal) == true) {
        return;
    } else if (isNaN(currentVal) == false) {
        $('#CheckItemContents').empty();

        if (currentVal != '') {
            for (var count = 0; count < currentVal; count++) {

                html += '<input name="value" type="checkbox">&nbsp';
                html += '<input name="inputvalue" type="text" placeholder="항목" style="width:60px;">&nbsp&nbsp';

                $('#CheckItemContents').append(html);

                html = '';
            }
        }
    }
});

//Display 초기화 함수
function Initialization() {
    $('#option_1_col').css('display', 'none');
    $('#option_1').css('display', 'none');

    $('#option_2_col').css('display', 'none');
    $('#option_2').css('display', 'none');

    $('#contents_col').css('display', 'none');
    $('#contents').css('display', 'none');

    $('#contentsRange').css('display', 'none');
    $('#CheckPassFailure').css('display', 'none');
    $('#CheckIsIsNot').css('display', 'none');
    $('#CheckItem').css('display', 'none');
    $('#CheckItemoption_2').css('display', 'none');
    $('#LeakageInspection').css('display', 'none');
    $('#Sentenceoption_1').css('display', 'none');
    $('#SentenceContents').css('display', 'none');
    $('#SentenceContentsInput').css('display', 'none');
}

// 팝업 종료 버튼(X) 클릭 이벤트
function ClosePopup() {
    self.close();   //자기 자신창을 닫습니다.
}

// 닫기 버튼 클릭(개인적으로는 닫기 버튼이 아니라 저장 버튼이 되어야 될듯 하다.)
$("#fair_pop_close").click(function () {
    // 입력 배열값 저장
    var tdArr = new Array();	// 배열 선언
    // 구분 값 콤보 박스 값 가져오기
    var SelectComboBox = $("#MeasurementsSelect option:selected").text();
    // 측정 값 단위/범위 값 가져오기
    var MeasurementsSelect = $("#MeasurementsSelect2 option:selected").text();
    // 문장 옵션 1 저장 값 -> 확인/입력
    var selectItem = $("#SentenceSelect2").val();

    if (SelectComboBox == "타입 선택") {
        // 타입 선택
        // 구분 선택을 안했기 때문에 구분 선택 경고창 출력
        alert("구분 값을 선택 해 주세요.");
    } else if (SelectComboBox == "측정값") {
        // 측정값(단일/범위)
        if (MeasurementsSelect == "단일") {
            var allListElements = $("input[name=value]");
            var size = $("#MeasurementsContents").find(allListElements).length;

            // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
            for (var i = 0; i < size; i++) {
                tdArr.push($("#MeasurementsContents").find(allListElements).eq(i).val());
            }
        } else if (MeasurementsSelect == "범위") {
            // 측정값 범위 td id=contentsRange
            var allListElements = $("input[name=value]");
            var size = $("#MeasurementsContentsRange").find(allListElements).length;

            // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
            for (var i = 0; i < size; i++) {
                tdArr.push($("#MeasurementsContentsRange").find(allListElements).eq(i).val());
            }
        }
    } else if (SelectComboBox == "합/불 체크") {
        // 합/불 체크
        var allListElements = $('input:checkbox[name="value"]');
        var size = $("#CheckPassFailureContents").find(allListElements).length;

        // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
        for (var i = 0; i < size; i++) {
            tdArr.push($("#CheckPassFailureContents").find(allListElements).eq(i).is(":checked"));
        }
    } else if (SelectComboBox == "유/무 체크") {
        // 유/무 체크
        var allListElements = $('input:checkbox[name="value"]');
        var size = $("#CheckIsIsNotContents").find(allListElements).length;

        // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
        for (var i = 0; i < size; i++) {
            tdArr.push($("#CheckIsIsNotContents").find(allListElements).eq(i).is(":checked"));
        }
    } else if (SelectComboBox == "항목 체크") {
        // 항목 체크
        var allListElements = $('input:checkbox[name="value"]');
        // 입력 Text 값
        var allListElementsInput = $("input[name=inputvalue]");
        var size = $("#CheckItemContents").find(allListElements).length;

        // Check 박스 값들
        // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
        for (var i = 0; i < size; i++) {
            tdArr.push($("#CheckItemContents").find(allListElements).eq(i).is(":checked"));
            tdArr.push($("#CheckItemContents").find(allListElementsInput).eq(i).val());
        }
    } else if (SelectComboBox == "누설 검사") {
        // 누설 검사
        var html = '';

        // 누설 검사는 Input 창이 따로 없기 때문에 HTML 코드 그대로 전달
        html += '<label>(<input type="text" style="width: 50px;" disabled>) x 10<sup>-(<input type="text" style="width: 30px;" disabled>)</sup>Pa-m<sup>3</sup> /sec He. Max.<input type="text" style="width: 50px;" disabled>torr</label>';

        // html 코드 값 그대로 전달
        tdArr.push(html);
    } else if (SelectComboBox == "문장") {
        // 문장
        if ($("#SentenceSelect2").val() == "확인") {
            var allListElements = $('input:checkbox[name="value"]');
            var allListElementsInput = $("input[name=inputvalue]");

            // 배열에 값을 담아 사용할 수 도 있다.
            tdArr.push($("#SentenceContents").find(allListElements).eq(0).is(":checked"));
            tdArr.push($("#SentenceContents").find(allListElementsInput).eq(0).val());
        } else if ($("#SentenceSelect2").val() == "입력") {
            var allListElements = $("input[name=value]");
            var size = $("#SentenceContentsInput").find(allListElements).length;

            // 배열에 값을 담아 사용할 수 도 있다.
            tdArr.push($("#SentenceContentsInput").find(allListElements).eq(0).val());
        }
    }

    $("#PTitleName", opener.document).val($("#TitleName").val());
    $("#PSelectComboBox", opener.document).val(SelectComboBox);
    $("#PMeasurementsSelect", opener.document).val(MeasurementsSelect);
    $("#PselectItem", opener.document).val(selectItem);
    $("#value", opener.document).val(tdArr);

    // 부모 함수 실행
    // 선택 된 체크 박스 값 삭제
    opener.FinalUpdate();
    // 자주 검사 내용 추가
    opener.SelfInspectionFunction();

    // 창 종료
    ClosePopup();
});