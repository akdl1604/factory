function select_gongjeong_form(key,name,code) {

    var import_inspection = 1;//수입검사
    var basic_common = 2;//기본공통
    var welding_ID = 3;//용접ID
    var welding_OD = 4;//용접OD
    var press = 5;//프레스
    var semi_finished_product_out_ID = 6;//반제품불출ID
    var semi_finished_product_out_OD = 7;//반제품불출OD
    var semi_finished_product_out_WB = 8;//반제품불출WB
    var processed_raw_materials = 9;//가공원자재
    var receiving_confirmation = 10;//입고확인
    var sharing = 11;//샤링
    var welding_WBEF = 12;//용접WBEF
    var semi_finished_product_out = 13;//반제품불출 통합서식


    if (key == basic_common) {

    
        var html = '';

        // html += '<table>';
        html += '<tr>'
        html += '<th colspan="2">공정명/공정번호</th>'
        html += '<th colspan="1">계획종료일</th>'

        html += '<th colspan="3">작업자</th>'

        html += '<th colspan="3">작업일</th>'
        html += '<th colspan="1">작업수량</th>'
        html += '<th colspan="1">불량코드</th>'
        html += '<th colspan="1">불량수량</th>'
        html += '<th colspan="1">양품수량</th>'
        html += '<th colspan="3">기타사항</th>'
        html += '<th colspan="2">CODE</th>'
        html += '<th colspan="2">공정확인자</th>'
        html += '</tr>'


        //<!-- 기본 서식 start-->
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" class="align_left" id="process_number">&nbsp;'+name+'</br>[공정번호 : '+code+']</td>'
        html += '<td style="width:100%;" colspan="1">(관리자)</td>'

        html += '<td style="width:100%;" colspan="3">(자동입력)</td>'

        html += '<td style="width:100%;" colspan="3">(자동입력)</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">목록에서 선택해야함</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2" rowspan="2">불량코드 목록에서 선택</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="2"> 계정에 등록된 서명 또는 도장 이미지 입력</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" class="align_center">작업내용 및</br>특이사항</td>'
        html += '<td style="width:100%;" colspan="14"><textarea name="Text1" cols="120" rows="3" style="resize: none; width:80%;"></textarea></td>'
        html += '</tr>'
        // html += '</table>'

        //<!-- 기본 서식 end-->


        $('#temp_gongjeong').append(html);
    }


    else if (key == import_inspection) {
        var html = ''
        //<!-- 수입검사 서식 start-->
        // html += '<table>';


        html += '<tr>'
        html += '<th colspan="2">공정명/공정번호</th>'
        html += '<th colspan="1">계획종료일</th>'

        html += '<th colspan="3">작업자</th>'

        html += '<th colspan="3">작업일</th>'
        html += '<th colspan="1">작업수량</th>'
        html += '<th colspan="1">불량코드</th>'
        html += '<th colspan="1">불량수량</th>'
        html += '<th colspan="1">양품수량</th>'
        html += '<th colspan="3">기타사항</th>'
        html += '<th colspan="2">CODE</th>'
        html += '<th colspan="2">공정확인자</th>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" class="align_left" id="process_number">&nbsp;수입검사</br>[공정번호 : '+code+']</td>'
        html += '<td style="width:100%;" colspan="1">(관리자)</td>'

        html += '<td style="width:100%;" colspan="3">(자동입력)</td>'

        html += '<td style="width:100%;" colspan="3">(자동입력)</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">목록에서 선택해야함</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="3"> 합 <input type="checkbox" name="form_examine_checkbox"> 불 <input type="checkbox" name="checkbox" onclick="checkOnlyOne(this);"></td>'
        html += '<td style="width:100%;" colspan="2" rowspan="2">불량코드 목록에서 선택</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="2"> 계정에 등록된 서명 또는 도장 이미지 입력</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" class="align_center">작업내용 및</br>특이사항</td>'
        html += '<td style="width:100%;" colspan="14"><textarea name="Text1" cols="120" rows="3" style="resize: none; width:80%;a></td>'
        html += '</tr>'
        // html += '</table>'

        //<!-- 수입검사 서식 end-->
        $('#temp_gongjeong').append(html);

    }

    else if (key == welding_ID) {
        var html = ''
        //<!-- ID 용접 서식 start-->
        // html += '<table>'

        html += '<tr>'
        html += '<th colspan="2">공정명/공정번호</th>'
        html += '<th colspan="1">계획종료일</th>'

        html += '<th colspan="3">작업자</th>'

        html += '<th colspan="3">작업일</th>'
        html += '<th colspan="1">작업수량</th>'
        html += '<th colspan="1">불량코드</th>'
        html += '<th colspan="1">불량수량</th>'
        html += '<th colspan="1">양품수량</th>'
        html += '<th colspan="3">기타사항</th>'
        html += '<th colspan="2">CODE</th>'
        html += '<th colspan="2">공정확인자</th>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="6" class="align_left" id="process_number">&nbsp;ID 용접</br>[공정번호 : '+code+']</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="6">(관리자)</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="4" class="fb"> ① ID 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3"> (관리자) </td>'
        html += '<td style="width:100%;" colspan="4" class="fb"> ② DP 재고 투입수량 : </td>'
        html += '<td style="width:100%;" colspan="3"> <input type="text" style="width:80%;"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="3" class="fb"> </td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 작업 특이사항 ☞ (관리자) (작업자)</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">공정확인자</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'

        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '</tr>'

        // html += '</table>'
        //<!-- ID 용접 서식 end-->

        $('#temp_gongjeong').append(html);
    }

    else if (key == welding_OD) {
        var html = '';

        //<!-- OD 용접 서식 start-->
        // html += '<table>'

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'

        html += '<tr>'

        html += '<td style="width:100%;" colspan="2" rowspan="6" class="align_left" id="process_number">&nbsp;OD 용접</br>[공정번호 : '+code+']</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="6">(관리자)</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="4" class="fb"> ① OD 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3"> (관리자) </td>'
        html += '<td style="width:100%;" colspan="4" class="fb"> ② DP 재고 투입수량 : </td>'
        html += '<td style="width:100%;" colspan="3"> <input type="text" style="width:80%;"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="3" class="fb"> </td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 작업 특이사항 ☞ (관리자) (작업자)</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">공정확인자</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'

        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'

        html += '</tr>'

        // html += '</table>'

        //<!-- OD 용접 서식 end-->

        $('#temp_gongjeong').append(html);

    }

    else if (key == press) {
        var html = '';

        //<!-- 프레스 서식 start-->
        // html += '<table>'

       html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'


        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="8" class="align_left" id="process_number">&nbsp;프레스</br>[공정번호 : '+code+']</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="8">(관리자)</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 금형 검증 유/무 : 검증 된 금형 <input type="checkbox" name="checkbox"onclick="checkOnlyOne(this);"> 검증 안된 금형 <input type="checkbox" name="checkbox" onclick="checkOnlyOne(this);"></td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="1" rowspan="2"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">/</td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1" rowspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">호기</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">톤</td>'

        html += '<td style="width:100%;" colspan="2" rowspan="7">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="7">공정확인자</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="1" rowspan="2"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">/</td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1" rowspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">호기</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">톤</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="1" rowspan="2"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">/</td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">M :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1" rowspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">호기</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1" rowspan="2">톤</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1">F :</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'

        // html += '</table>'

        //<!-- 프레스 서식 end-->

        $('#temp_gongjeong').append(html);
    }

    else if (key == semi_finished_product_out_ID) {
        var html = '';

        //<!-- 반제품 불출(ID) 서식 start-->

        // html += '<table>'

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="4" class="align_left" id="process_number">&nbsp;반제품 불출</br>[공정번호 : '+code+']</td>'
        html += '<td style="width:100%;" colspan="1" rowspan="4">(관리자)</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 반제품 불출 담당자는 아래 재고 투입수량을 확인 바라며, 문제 발생시 생산관리팀에 연락바람.</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">1. MD 세척 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">공정확인자</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">2. FD 세척 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'
        // html += '</table>'

        //<!-- 반제품 불출(ID) 서식 end-->

        $('#temp_gongjeong').append(html);
    }

    else if (key == semi_finished_product_out_OD) {
        var html = '';

        //<!-- 반제품 불출(OD) 서식 start-->

        // html += '<table>'

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="5" class="align_left" id="process_number">&nbsp;반제품 불출</br>[공정번호 : '+code+']</td>'
        html += '<td style="width:100%;" colspan="1" rowspan="5">(관리자)</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 반제품 불출 담당자는 아래 재고 투입수량을 확인 바라며, 문제 발생시 생산관리팀에 연락바람.</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">1. MD 세척 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2" rowspan="4">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="4">공정확인자</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">2. FD 세척 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">3. ID 용접 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'
        // html += '</table>'

        //<!-- 반제품 불출(OD) 서식 end-->

        $('#temp_gongjeong').append(html);
    }

    else if (key == semi_finished_product_out_WB) {
        var html = '';

        //<!-- 반제품 불출(WB) 서식 start-->
        // html += '<table>'

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="6" class="align_left" id="process_number">&nbsp;반제품 불출</br>[공정번호 : '+code+']</td>'
        html += '<td style="width:100%;" colspan="1" rowspan="6">(관리자)</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 반제품 불출 담당자는 아래 재고 투입수량을 확인 바라며, 문제 발생시 생산관리팀에 연락바람.</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">1. MD 세척 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2" rowspan="4">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="4">공정확인자</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">2. FD 세척 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3">3. ID 용접 품목번호 : </td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="3"> 4. OD 용접 품목번호 :</td>'
        html += '<td style="width:100%;" colspan="3">(관리자)</td>'
        html += '<td style="width:100%;" colspan="3">재고사용 : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2">JOB NO. : </td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'

        // html += '</table>'

        //<!-- 반제품 불출(WB) 서식 end-->


        $('#temp_gongjeong').append(html);
    }
    else if (key == processed_raw_materials) {
        var html = '';

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'


        //<!-- 가공 원자재 서식 start-->
        // html += '<table>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="3" class="align_left" id="process_number">&nbsp;가공 원자재</br>[공정번호 : '+code+']</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="3">(관리자)</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"></td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" class="fb" colspan="2"></td>'
        html += '<td style="width:100%;" colspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">공정확인자</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"></td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" class="fb" colspan="2"></td>'
        html += '<td style="width:100%;" colspan="2"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'
        // html += '</table>'

        //<!-- 가공 원자재 서식 end-->

        $('#temp_gongjeong').append(html);
    }
    else if (key == receiving_confirmation) {
        var html = '';

        //<!-- 입고확인 서식 start-->
        // html += '<table>'

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'


        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="5" class="align_left" id="process_number">&nbsp;입고 확인</br>[공정번호 : '+code+']</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="5">(관리자)</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 자재 담당자는 [ERP: 1202] 창고로 입고된 수량 및 내역 확인 후 [ERP: 1155] 재고창고로 입고 바람.</td>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="2">/</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="2" class="fb backslash"></td>'
        html += '<td style="width:100%;" colspan="1" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> CV </td>'
        html += '<td style="width:100%;" colspan="3"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">공정확인자</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="2">/</td>'
        html += '<td style="width:100%;" colspan="1" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> CV </td>'
        html += '<td style="width:100%;" colspan="3"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="7"> ■ 최종 입고일 및 총 수량</td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> CV </td>'
        html += '<td style="width:100%;" colspan="3"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'

        html += '</tr>'

        // html += '</table>'


        //<!-- 입고확인 서식 end-->

        $('#temp_gongjeong').append(html);
    }
    else if (key == sharing) {
        var html = '';


        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'

        //<!-- 샤링 서식 start-->

        // html += '<table>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="4" class="align_left" id="process_number">&nbsp;샤 링</br>[공정번호 : '+code+']</td>'
        html += '<td style="width:100%;" colspan="1" rowspan="4">(관리자)</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ Shearing 작업자는 상단에 명기된 자재 확인 후 LOT 번호를 기입 할 것. ■ LOT No. :</td>'
        html += '</tr>'
        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"></td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="3">공정확인자</td>'
        html += '</tr>'

        html += '<tr>'

        html += '<td style="width:100%;" colspan="2"></td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">kg</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5"  maxlength="6"></td>'
        html += '</tr>'

        // html += '</table>'

        //<!-- 샤링 서식 end-->


        $('#temp_gongjeong').append(html);
    }

    else if (key == welding_WBEF) {
        var html = '';

        //<!-- WBEF 용접 서식 start-->
        // html += '<table>'

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'


        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" rowspan="5" class="align_left" id="process_number">&nbsp;WBEF 용접</br>[공정번호: '+code+']</td>'

        html += '<td style="width:100%;" colspan="1" rowspan="5">(관리자)</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 작업 전 도면 및 지그번호 확인 바라며, 문제 발생 시 생산관리팀으로 연락 바람.</td>'


        html += '<tr>'
        html += '<td style="width:100%;" colspan="17" class="fb"> ※ 작업 특이사항 ☞ (관리자) (작업자)</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" rowspan="2">code</td>'
        html += '<td style="width:100%;" colspan="2" rowspan="2">공정확인자</td>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"> </td>'
        html += '<td style="width:100%;" colspan="3">/</td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="1"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '<td style="width:100%;" colspan="2" class="fb"></td>'
        html += '<td style="width:100%;" colspan="2"> <input type="text" style="width:80%;" size="5"  maxlength="6"> </td>'
        html += '</tr>'
        // html += '</table>'

        //<!-- WBEF 용접 서식 end-->
        $('#temp_gongjeong').append(html);
    }
    else if (key == semi_finished_product_out) {

        var html = '';

        html += '<tr>'
        html += '<th colspan="2" style="display:none;">공정명/공정번호</th>'
        html += '<th colspan="1" style="display:none;">계획종료일</th>'

        html += '<th colspan="3" style="display:none;">작업자</th>'

        html += '<th colspan="3" style="display:none;">작업일</th>'
        html += '<th colspan="1" style="display:none;">작업수량</th>'
        html += '<th colspan="1" style="display:none;">불량코드</th>'
        html += '<th colspan="1" style="display:none;">불량수량</th>'
        html += '<th colspan="1" style="display:none;">양품수량</th>'
        html += '<th colspan="3" style="display:none;">기타사항</th>'
        html += '<th colspan="2" style="display:none;">CODE</th>'
        html += '<th colspan="2" style="display:none;">공정확인자</th>'
        html += '</tr>'


        //<!-- 통합 서식 - 반제품 불출 서식 start-->

        html += '<tr>'
        html += '<th colspan="2">공정명/공정번호</th>'
        html += '<th colspan="1">계획종료일</th>'
        html += '<th colspan="3">작업자</th>'
        html += '<th colspan="3">작업일</th>'
        html += '<th colspan="1">작업수량</th>'
        html += '<th colspan="1">불량코드</th>'
        html += '<th colspan="1">불량수량</th>'
        html += '<th colspan="1">양품수량</th>'
        html += '<th colspan="3">기타사항</th>'

        html += '<th colspan="2">CODE</th>'
        html += '<th colspan="1">불출인</th>'
        html += '<th colspan="1">인수인</th>'
        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2" class="align_left" id="process_number">&nbsp;반제품 불출</br>[공정번호: '+code+']</td>'

        html += '<td style="width:100%;" colspan="1">(관리자)</td>'

        html += '<td style="width:100%;" colspan="3">(관리자)</td>'

        html += '<td style="width:100%;" colspan="3">/</td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1">목록에서 선택해야함</td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'
        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="2" rowspan="5">code</td>'
        html += '<td style="width:100%;" colspan="1" rowspan="5">불량코드 목록에서 선택</td>'
        html += '<td style="width:100%;" colspan="1" rowspan="5"> 계정에 등록된 서명 또는 도장 이미지 입력</td>'

        html += '</tr>'

        html += '<tr>'
        html += '<th colspan="2">품명</th>'
        html += '<th colspan="1"></th>'
        html += '<th colspan="3">품번</th>'
        html += '<th colspan="3">규격(Spec)</th>'
        html += '<th colspan="4">LOT NO/COC NO/성적서 NO</th>'
        html += '<th colspan="1">Rev.</th>'
        html += '<th colspan="1">필요QTV</th>'
        html += '<th colspan="1">불출QTV</th>'
        html += '</tr>'


        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="4"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'


        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="4"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'


        html += '</tr>'

        html += '<tr>'
        html += '<td style="width:100%;" colspan="2"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="3"><input type="text" style="width:80%;"  maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="4"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '<td style="width:100%;" colspan="1"><input type="text" style="width:80%;" size="5" maxlength="6"></td>'

        html += '</tr>'

        //<!--통합 서식 - 반제품 불출 서식 end-->

        $('#temp_gongjeong').append(html);
    }
 }


