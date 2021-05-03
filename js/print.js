window.onload = function(){
let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

$("#year").val(year + '.' + month + '.' + date);

}
scrollhidden -webkit-scrollbar ;{

    display: none; 

}
var initBody;
function beforePrint()
{
    initBody = document.body.innerHTML;
    document.body.innerHTML = print_page.innerHTML;
}

function afterPrint(){
    document.body.innerHTML = initBody;
}

function pagePrint(){
    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
    window.print();
}
