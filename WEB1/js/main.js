// Валидация данных
// https://monsterlessons.com/project/lessons/validaciya-formy-v-javascript  ---- вдохновлялся этим
console.log(1);
var form= document.querySelector('.validate_form');
var validatedButton = document.querySelector('.button_send');
var xCoordinate = document.querySelector(".x");
var yCoordinate = document.querySelector(".y");
var rCoordinates = document.querySelectorAll(".r");

console.log(2);
function isNumber(s){
  var n = parseFloat(s.replace(',','.'));
  return !isNaN(n) && isFinite(n);
}

//функция для генерации ошибок
function generateTip(text, color) { 
    var tip = document.createElement('div');
    tip.className = 'tip';
    tip.style.color = color;
    tip.innerHTML = text;
    return tip;
}


//функция для очистки подсказок при повторной валидации 
function removeValidation() {
  var tips = form.querySelectorAll('.tip')      
  for (var i = 0; i < tips.length; i++) {
      tips[i].remove();
  }
}


//функция для проверки наличия выбранной radio кнопки
function checkSelection(radios) {
    for(var i=0; i<radios.length; i++){
      if(radios[i].checked) return true;
    }
    var error = generateTip('field is blank','red');
    radios[0].parentElement.insertBefore(error, radios[0]);

    return false;
}

// проверка значения в поле на попадание в заданный диапазон
function validateField(coordinate,min,max){
  if(coordinate.value){
      coordinate.value = coordinate.value.replace(',','.');
      if(coordinate.value<=min || coordinate.value>=max || !isNumber(coordinate.value)){
        var error = generateTip('Wrong number format','red')
        coordinate.parentElement.insertBefore(error, coordinate)              
        
          return false;
      }
      else{
        var correct = generateTip('Correct data','green');
        coordinate.parentElement.insertBefore(correct, coordinate)              
                
          return true;              
      }
  }
  return false; 
}


// фунция для повторной проверки, что поля заполнены верно, чтобы передать их php скрипту
function validateAll(){
  return validateField(xCoordinate,-3,3) && validateField(yCoordinate,-5,3)  && checkSelection(rCoordinates);
}  
$(document).ready(function(){
  console.log(4);
  $.ajax({
    url: 'php/load.php',
    method: "POST",
    dataType: "html",
    success: function(data){
      console.log(data);
      $("#result_table>tbody").html(data);
    },
    error: function(error){
      console.log(error);	
    },
  })
})

$(".validate_form").on("submit", function(event){
  event.preventDefault(); 
    removeValidation();
    if(!validateAll()){
      console.log("post canceled")
      return
    }

    console.log($(this).serialize());
    $.ajax({
      url: 'php/handler.php',
      method: "POST",
      data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
      dataType: "html",

      success: function(data){
        console.log(data);
        $(".button_send").attr("disabled", false);	
        $("#result_table>tbody").html(data);
      },
      error: function(error){
        console.log(error);
        $(".button_send").attr("disabled", false);	
      },
    })
});

$(".button_reset_table").on("click",function(){
  $.ajax({
    url: 'php/clear.php',
    method: "POST",
    dataType: "html",
    success: function(data){
      console.log(data);
      $("#result_table>tbody").html(data);
    },
    error: function(error){
      console.log(error);	
    },
  })
})