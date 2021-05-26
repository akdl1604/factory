window.onload = function () {
    //작업지시서 넘버 받아오는 부분 추가 필요
    //현재 임시값
    var joborder_id = 184;

    var params = {
        "JOBORDER_ID": joborder_id
    }

    // 작업지시서 전체 조회
    fun_ajax("POST", "http://220.89.167.212:8085/testing05/SelectJoborderID", params, true, function (data) {
        // 자주검사성적표 통합 코드    
        // data[0].JOBORDER_INSPECTIONFILE -> 자주검사성적표
        // 내부 형식 변경을 위한 HTML 임시 출력 후 Hide
        $('#processHtml').append(data[0].JOBORDER_INSPECTIONFILE);
        var htmlCode = "";

        // 공정 전체 검색
        fun_ajax("GET", "http://220.89.167.212:8085/testing05/AllselectProcess", null, true, function (sub_data) {
            sub_data.forEach(function (v) {
                // 항목 체크
                // tr name="ORIGIN_PROCESS_ID" 공정 고유 번호로 조회
                var allListElements = $('tr[name=' + v.ORIGIN_PROCESS_ID + ']');
                // span name="PTitleName" 검사항목 이름
                var allListNameElements = $('span[name=PTitleName]');
                // td name="Rcontents" 자주검사 항목 내용
                var allListContentsElements = $('td[name=Rcontents]');
                // 자주검사성적표 전체 사이즈
                var size = $("#processHtml").find(allListElements).length;

                // input name="valueCheckInputWorker" 자주검사 내용 Check 입력 창
                var allListCheckElements = $('input[name=valueCheckInputWorker]');
                // valueCheckInputWorker 전체 사이즈
                var sizeCheck = $("#processHtml").find(allListCheckElements).length;

                // input name="valueInputWorker" 자주검사 내용 Check 입력 창
                var allListInputElements = $('input[name=valueInputWorker]');
                // valueInputWorker 전체 사이즈
                var sizeInput = $("#processHtml").find(allListInputElements).length;

                // 작업자 입력 부분 체크 박스 비활성화 해제
                for(var i = 0; i < sizeCheck; i++){
                    $("#processHtml").find(allListCheckElements).eq(i).attr("disabled", false);
                }
                // 작업자 입력 부분 Input 태그 비활성화 해제
                for(var i = 0; i < sizeInput; i++){
                    $("#processHtml").find(allListInputElements).eq(i).attr("disabled", false);
                }

                // 수정 필요 코드
                if (size > 0) {
                    htmlCode += '<tr>';
                    htmlCode += '    <th rowspan="4">' + v.ORIGIN_PROCESS_NAME + '</th>';
                }

                // HTML 양식에 맞춰 변경
                for (var i = 0; i < size; i++) {
                    htmlCode += '    <th>' + (i + 1) + '</th>';
                    htmlCode += '    <td class="txt_lf">' + $("#processHtml").find(allListNameElements).eq(i).html(); +'</td>';
                    htmlCode += '    <td><input type="text" name="workDate" maxlength="20"></td>';
                    htmlCode += '    <td>홍길동(자동입력)</td>';
                    htmlCode += '    <td></td>';
                    htmlCode += '    <td colspan="3">';
                    htmlCode += $("#processHtml").find(allListContentsElements).eq(i).html();
                    htmlCode += '    </td>';
                    htmlCode += '</tr>';
                }
            });
            
            htmlCode += '<tr>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th colspan="9" class="b_line">아래 항목은 Q.C 담당자 확인 사항임</th>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th rowspan="7" class="b_line">완제품(Ass\'y)</th>';
            htmlCode += '    <th>1</th>';
            htmlCode += '    <td class="txt_lf">Free Length</td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td colspan="3">';
            htmlCode += '        <div class="form_pr">';
            htmlCode += '            <table>';
            htmlCode += '                <tr>';
            htmlCode += '                    <td>';
            htmlCode += '                        <span class="dot">설계 F/L :</span>';
            htmlCode += '                    </td>';
            htmlCode += '                </tr>';
            htmlCode += '            </table>';
            htmlCode += '        </div>';
            htmlCode += '    </td>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th>2</th>';
            htmlCode += '    <td class="txt_lf">Solid Length</td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td colspan="3">';
            htmlCode += '        <div class="form_pr">';
            htmlCode += '            <table>';
            htmlCode += '                <tr>';
            htmlCode += '                    <td>';
            htmlCode += '                        <span class="dot">설계 F/L :</span>';
            htmlCode += '                    </td>';
            htmlCode += '                </tr>';
            htmlCode += '            </table>';
            htmlCode += '        </div>';
            htmlCode += '    </td>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th>3</th>';
            htmlCode += '    <td class="txt_lf">용접 버드 두께 측정</td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td colspan="3">';
            htmlCode += '        <div class="form_pr">';
            htmlCode += '            <table>';
            htmlCode += '                <tr>';
            htmlCode += '                    <td>';
            htmlCode += '                        <span class="dot">비드 값:</span>';
            htmlCode += '                    </td>';
            htmlCode += '                    <td>';
            htmlCode += '                    </td>';
            htmlCode += '                    <td>';
            htmlCode += '                        mm -';
            htmlCode += '                    </td>';
            htmlCode += '                    <td>';
            htmlCode += '                    </td>';
            htmlCode += '                    <td class="txt_r">';
            htmlCode += '                        mm';
            htmlCode += '                    </td>';
            htmlCode += '                </tr>';
            htmlCode += '            </table>';
            htmlCode += '        </div>';
            htmlCode += '    </td>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th>4</th>';
            htmlCode += '    <td class="txt_lf">Convolution Check</td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td colspan="3">';
            htmlCode += '        <div class="form_pr">';
            htmlCode += '            <table>';
            htmlCode += '                <tr>';
            htmlCode += '                    <td>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 합격';
            htmlCode += '                        </label>';
            htmlCode += '                    </td>';
            htmlCode += '                    <td>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 불합격 /';
            htmlCode += '                        </label>';
            htmlCode += '                    </td>';
            htmlCode += '                    <td>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 특이사항:';
            htmlCode += '                        </label>';
            htmlCode += '                    </td>';
            htmlCode += '                </tr>';
            htmlCode += '            </table>';
            htmlCode += '        </div>';
            htmlCode += '    </td>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th>5</th>';
            htmlCode += '    <td class="txt_lf">Orientation Check</td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td colspan="3">';
            htmlCode += '        <div class="form_pr">';
            htmlCode += '            <table>';
            htmlCode += '                <tr>';
            htmlCode += '                    <td>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 합격';
            htmlCode += '                        </label>';
            htmlCode += '                    </td>';
            htmlCode += '                    <td>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 불합격 /';
            htmlCode += '                        </label>';
            htmlCode += '                    </td>';
            htmlCode += '                    <td>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 특이사항:';
            htmlCode += '                        </label>';
            htmlCode += '                    </td>';
            htmlCode += '                </tr>';
            htmlCode += '            </table>';
            htmlCode += '        </div>';
            htmlCode += '    </td>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th>6</th>';
            htmlCode += '    <td class="txt_lf">Visual</td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td colspan="3">';
            htmlCode += '        <div class="form_pr ch_s">';
            htmlCode += '            <table>';
            htmlCode += '                <tr>';
            htmlCode += '                    <td>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 양호';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 쏠림';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 불균형';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 정렬불량';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 이물질';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 기타';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 찍힘';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> 긁힘';
            htmlCode += '                        </label>';
            htmlCode += '                        <label>';
            htmlCode += '                            <input type="checkbox"> Burr';
            htmlCode += '                        </label>';
            htmlCode += '                    </td>';
            htmlCode += '                </tr>';
            htmlCode += '            </table>';
            htmlCode += '        </div>';
            htmlCode += '    </td>';
            htmlCode += '</tr>';
            htmlCode += '<tr class="b_line">';
            htmlCode += '    <th>7</th>';
            htmlCode += '    <td class="txt_lf">Marking</td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td></td>';
            htmlCode += '    <td colspan="3">';
            htmlCode += '    </td>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th colspan="9" class="b_line">특이사항</th>';
            htmlCode += '</tr>';
            htmlCode += '<tr>';
            htmlCode += '    <th></th>';
            htmlCode += '    <td colspan="9" class="txt_pdn">';
            htmlCode += '        <textarea class="txt_area"></textarea>';
            htmlCode += '    </td>';
            htmlCode += '</tr>';

            $("#reportTbody").append(htmlCode);

            // 달력 설정
            // 프리셋 설정 값을 가져오는데 계획종료일 컬럼에 Input 달력을 설정하기 위해서 사용
            for (var i = 0; i < $("input[name=workDate]").length; i++) {
                // 달력 설정
                datePickerSet($('input[name=workDate]').eq(i));
            }

            //취소 버튼 색 변경
            $('#btn_inspection_cancle').css('background-color', '#6f7f94');

            //저장 버튼 비활성화
            $('#btn_inspection_save').prop('disabled', true);
            $('#btn_inspection_save').css('background-color', '#95a4bf');
        });
    });
}

//<!---------------------------------날짜선택Start----------->
//한개만 단순하게 만들때
$("#datepicker").datepicker({
    language: 'ko'
});

//자주 검사 취소 버튼 클릭 이벤트
function workorder_WB_report_cancle_btn(){
    window.history.back();
}

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
            onSelect: function (dateText) {
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