console.log("T03P01 - Ejercicio 06");

function esBisiesto(anyo) {
    return (anyo % 4 === 0 && anyo % 100 !== 0) || anyo % 400 === 0;
}

function validarFecha(dia, mes, anyo) {
    dia = Number(dia);
    mes = Number(mes);
    anyo = Number(anyo);

    const fecha = new Date(anyo, mes - 1, dia);
    console.log(fecha);
    console.log(fecha.getDay());
    console.log(fecha.getMonth());
    console.log(fecha.getFullYear());

    if (fecha.getMonth() === mes - 1 && fecha.getDate() === dia && fecha.getFullYear() === anyo) {
        return true;
    } else {
        return false;
    }
}

// ======== Inicio del codigo ========

// Variables
let fecha;
let fechaSeparda;

// Pedir fecha
fecha = prompt("Ingrese una fecha usando los siguientes formatos: \"DD-MM-YYYY\", \"DD/MM/YYYY\" o \"DD MM YYYY\": ");
console.log(fecha);

if (fecha.length == 10) {

    if (fecha.match("-")) {
        fechaSeparda = fecha.split("-");
    } else if (fecha.match("/")) {
        fechaSeparda = fecha.split("/");
    } else if (fecha.match(" ")) {
        fechaSeparda = fecha.split(" ");
    } else {
        console.log("Formato no reconocido...");
    }
} else {
    console.log("Fecha introducida no correcta...(tamaño)");
}

console.log(fechaSeparda);

if (fechaSeparda) {

    let dia = (fechaSeparda[0]);
    let mes = (fechaSeparda[1]);
    let anyo = (fechaSeparda[2]);

    if (dia.length == 2 && mes.length == 2 && anyo.length == 4) {
        /* console.log(dia);
        console.log(mes);
        console.log(anyo);

        dia = Number(dia);
        mes = Number(mes);
        anyo = Number(anyo);

        if (anyo < 0) {
            console.log("Anyo no valido");
        } else if (mes > 12 || mes < 1) {
            console.log("Mes no valido");
        } else if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
            console.log("El dia no es correcto");
        } else if (mes == 2 && ((esBisiesto(anyo) && dia > 29) || (!esBisiesto(anyo) && dia > 28))) {
            console.log("El dia no es correcto");
        } else if (dia > 31) {
            console.log("El dia no es correcto");
        } else {
            console.log("Fecha correcta");
        }

        let fechaValida = new Date(anyo, mes, dia);
        console.log(fechaValida); */

        if (validarFecha(dia, mes, anyo)) {
            console.log("Fecha valida");
        } else {
            console.log("Fecha  NO valida");
        }

    } else {
        console.log("Fecha introducida no correcta...(Existencia)");
    }
}