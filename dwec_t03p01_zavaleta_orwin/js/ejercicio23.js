console.log("T03P01 - Ejercicio 23");

function validarFormatoFecha(fecha) {
    const patron = new RegExp("^\\d{2}([-/])(\\d{2})\\1\\d{2,4}$");
    // El \1 en esta expresion hace referencia a que ahí debe ir el primer grupo que es el primero que va entre ()
    return patron.test(fecha);
}

function validarFecha(fecha) {
    if (validarFormatoFecha(fecha)) {

        let dia = fecha.substring(0, 2);
        let mes = fecha.substring(3, 5);
        let anyo = fecha.substring(6);
        const fechaDate = new Date(anyo, mes - 1, dia);

        return (fechaDate.getMonth() == mes - 1);
    } else {
        return false;
    }
}

let entrada = prompt("Ingrese uan fecha con el siguiente formato: DD-MM-YYYY, DD-MM-YY, DD/MM/YYYY y DD/MM/YY : ");

console.log(validarFecha(entrada));

