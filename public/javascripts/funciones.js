// EN CONSTRUCCION
//let screen = require(./Global.js)

function plus() {
    let screen = document.getElementById('pantalla').innerHTML;
    document.getElementById("pantalla").innerHTML = ++screen;

    ////////////
    var miObjeto = { 'screen': screen };
    // Guardo el objeto como un string
    localStorage.setItem('screen', JSON.stringify(miObjeto));

}
///extrae la variable de local storage
window.onload = function () {
    if (localStorage.getItem('screen') !== null) {
        var guardado = localStorage.getItem('screen');
        let num = 0;
        console.log(guardado)
        for (i = 0; i < guardado.length; i++) {
            console.log(guardado)
            num = guardado[i - 1];
        }
        document.getElementById("pantalla").innerHTML = num;
    }
}




