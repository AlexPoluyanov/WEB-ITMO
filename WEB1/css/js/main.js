$(function() {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  
    function validateX() {
        const X_MIN = -3;
        const X_MAX = 3;
      
        let xField = $('#value_X');
        let numX = xField.val().replace(',', '.');
      
        if (isNumeric(numX) && numX >= X_MIN && numX <= X_MAX)
        {
          xField.removeClass('text-error');
          
          return true;
        } else {
          alert('Введите значение X');
          xField.addClass('text-error');
          return false;
        }
      }
    
    function validateY() {
      const Y_MIN = -5;
      const Y_MAX = 3;
    
      let yField = $('#value_Y');
      let numY = yField.val().replace(',', '.');
    
      if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX)
      {
        yField.removeClass('text-error');
        return true;
      } else {
        alert('Введите значение Y');
        yField.addClass('text-error');
        return false;
      }
    }
    
    function validateR() {
      let array = [1,2,3,4,5];
    
      let rField = $('#value_R');
      let numR = rField.val().replace(',', '.');
    
      if (isNumeric(numR) && numR in array) 
      {
        rField.removeClass('text-error');
        return true;
      } else {
        alert('Введите значение R');
        rField.addClass('text-error');
        return false;
      }
    }
    
    function validateForm() {
      return validateX() & validateY() & validateR(); //  & validateR()
    }
  
    $('#input-form').on('submit', function(event) {
      event.preventDefault();
      if (!validateForm()) return;
      $.ajax({
        url: 'php/handler.php',
        method: 'POST',
        data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset(),
        dataType: "json",
        beforeSend: function() {
          $('.button').attr('disabled', 'disabled');
        },
        success: function(data) {
          $('.button').attr('disabled', false);
          {
            newRow = '<tr>';
            newRow += '<td>' + data.req_count + '</td>';
            newRow += '<td>' + data.value_X + '</td>';
            newRow += '<td>' + data.value_Y + '</td>';
            newRow += '<td>' + data.value_R + '</td>';
            newRow += '<td>' + data.value_hit + '</td>';
            newRow += '<td>' + data.current_time + '</td>';
            newRow += '<td>' + data.script_time + '</td>';
            + '</tr>';
            $('#result-table').append(newRow);
          }
        }
      });
    });
  });
