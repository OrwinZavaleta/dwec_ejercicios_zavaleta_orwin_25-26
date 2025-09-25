console.log("T03P01 - Ejercicio 15");

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

function calcularEdad(dia, mes, anyo) {
    const fecha = new Date(anyo, mes - 1, dia);

    let edad = new Date() - fecha;

    return edad / (1000 * 60 * 60 * 24 * 365);
}

// ======== Inicio del codigo ========

// Variables
let fecha;
let fechaSeparda;

// Pedir fecha
fecha = prompt("Ingrese una fecha usando los siguientes formatos:\"DD/MM/YYYY\": ");
console.log(fecha);

if (fecha.length == 10) {

    if (fecha.match("/")) {
        fechaSeparda = fecha.split("/");
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

    if (dia.length == 2 && mes.length == 2 && anyo.length == 4 && validarFecha(dia, mes, anyo)) {
        console.log("Tu edad es: " + Math.floor(calcularEdad(dia, mes, anyo)));
    } else {
        console.log("Fecha introducida no correcta...(Existencia)");
    }
}