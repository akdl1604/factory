window.onload = function () {

    var html = ''
    html += '<tr>'
    html += '<th>용접</th>'
    html += '<td>용접기 #1</td>'
    html += '<td>홍길동</td>'
    html += '<td>3</td>'
    html += '<td>3</td>'
    html += '</tr>'

    var html1 = ''
    html1 += '<tr>'
    html1 += '<th>용접</th>'
    html1 += '<td>용접기 #1</td>'
    html1 += '<td>홍길동</td>'
    html1 += '<td>3</td>'
    html1 += '<td>3</td>'
    html1 += '</tr>'

    $('#equipment_check_table').append(html);
    $('#equipment_check_table').append(html1);
}


//<!---------------------------------날짜선택Start----------->

//한개만 단순하게 만들때
$("#datepicker").datepicker({
    language: 'ko'
});

//두개짜리 제어 연결된거 만들어주는 함수
datePickerSet($("#datepicker1"), $("#datepicker2"), true); //다중은 시작하는 달력 먼저, 끝달력 2번째

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




var ctx = document.getElementById("myChart");

var myChart = new Chart(ctx, {
    type: 'pie',
    data: {

        labels: ['완료', '미진행', '진행중'],

        datasets: [{
            /* label: '# of Tomatoes', */
            data: [2, 3, 4],
            backgroundColor: [
                'rgba(141, 181, 83, 1)',
                'rgba(246, 111, 84, 1)',
                'rgba(247, 194, 10, 1)'
            ],
            borderColor: [
                'rgba(141, 181, 83, 1)',
                'rgba(246, 111, 84, 1)',
                'rgba(247, 194, 10, 1)'
            ],
            borderWidth: 1,

        }]
    },

    options: {
        plugins: {
            datalabels: {
                color: '#ffffff',
                formatter: function (value, context) {
                    return context.chart.data[context.dataIndex];
                }
            }
        },

        cutoutPercentage: 40,
        responsive: true,
        maintainAspectRatio: false,

        tooltips: {
            enabled: false
        },
        pieceLabel: {
            render: 'label',
            arc: true,
            fontColor: '#000',
            position: 'outside'
        },


        legend: {
            display: true,
            position: 'bottom',

            labels: {
                render: 'label',
                boxWidth: 12,
                boxHeight: 12,
            }
        },
    }
});

function search_()
{

    alert("검색 " +"\n"+ "공정 : " + $('#line').val() + "\n" + "설비 : " + $('#equip').val() +"\n" + "작업자 : " +  $('#worker').val() +"\n");

}