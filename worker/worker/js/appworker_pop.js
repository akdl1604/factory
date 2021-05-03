function handleOnChange(e) {
    // 선택된 데이터 가져오기
    const value = e.value;
    
    // 데이터 출력
    document.getElementById('iframe').src = value;
  }

var pdfArr = ["C:\\Users\\user\\anaconda3\\envs\\client\\Lib\\site-packages\\matplotlib\\mpl-data\\images\\back.pdf", "C:\Users\\user\\anaconda3\\envs\\client\\Lib\\site-packages\\matplotlib\\mpl-data\\images\\filesave.pdf",
                               "C:\\Users\\user\\anaconda3\\envs\\client\\Lib\\site-packages\\matplotlib\\mpl-data\\images\\forward.pdf", "C:\\Users\\user\\anaconda3\\envs\\client\\Lib\\site-packages\\matplotlib\\mpl-data\\images\\hand.pdf"];


for (var count = 0; count < pdfArr.length; count++) {

  var a = pdfArr[count];
  var b = pdfArr.indexOf(a);
  var option = $("<option value=" + a + ">" +"도면"+ (parseInt(b)+parseInt(1)) +"</option>");

  $('#combo').append(option);

}

$("#close").on("click", function(e){
  e.preventDefault();

  window.close();

});