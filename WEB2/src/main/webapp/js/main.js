$('#submit_button').on('click', () => {
    if (!validate()) {
        return
    }
    requestData({
        clicked: false,
        x: $("label[for='" + $('[name="value_X"]:checked').attr('id') + "']").html(),
        y: $('#value_Y').val().replace(',', '.'),
        r: $('#value_R').val()
    })
})

function error(message) {
    Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: message,
        heightAuto: false
    })
}


