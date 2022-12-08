function validate() {
    return validateX() && validateY() && validateR();
}

function validateX() {
    const elementX = $('[name="value_X"]:checked')
    if (!elementX.length) {
        error('Выберите значение X')
        return false
    }
    return true;
}

function validateY() {
    const valueY = parseFloat($("#value_Y").val().replace(",", "."));

    if (isNaN(valueY) || valueY <= -3.0 || valueY >= 5.0) {
        error('Некорректное значение Y')
        return false
    }
    return true;
}

function validateR() {
    return true;

}