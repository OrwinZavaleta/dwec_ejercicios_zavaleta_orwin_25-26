console.log("T03P01 - Ejercicio 17");

function validarFecha(dia, mes, anyo) {
    dia = Number(dia);
    mes = Number(mes);
    anyo = Number(anyo);

    const fecha = new Date(anyo, mes - 1, dia);

    if (fecha.getMonth() === mes - 1 && fecha.getDate() === dia && fecha.getFullYear() === anyo) {
        return true;
    } else {
        return false;
    }
}

function calcularMeses(fecha1, fecha2) {

    let msegundosDiferencia = fecha1 - fecha2;

    if (msegundosDiferencia < 1) msegundosDiferencia *= -1;

    return Math.round(msegundosDiferencia / (1000 * 60 * 60 * 24 * 30));

}

// ======== Inicio del codigo ========

// Variables
let fecha;
let fechaSeparda1;
let fechaSeparda2;

// Pedir fecha 1
fecha1 = prompt("Ingrese la primera fecha usando los siguientes formatos:\"DD/MM/YYYY\": ");
console.log(fecha1);

if (fecha1.length == 10) {
    if (fecha1.match("/")) {
        fechaSeparda1 = fecha1.split("/");
    } else {
        console.log("Formato no reconocido...");
    }
} else {
    console.log("Fecha introducida no correcta...(tamaño)");
}

// Pedir fecha 2
fecha2 = prompt("Ingrese la segunda fecha usando los siguientes formatos:\"DD/MM/YYYY\": ");
console.log(fecha2);

if (fecha2.length == 10) {
    if (fecha2.match("/")) {
        fechaSeparda2 = fecha2.split("/");
    } else {
        console.log("Formato no reconocido...");
    }
} else {
    console.log("Fecha introducida no correcta...(tamaño)");
}

console.log(fechaSeparda1);
console.log(fechaSeparda2);

if (fechaSeparda1 && fechaSeparda2) {

    let dia1 = (fechaSeparda1[0]);
    let mes1 = (fechaSeparda1[1]);
    let anyo1 = (fechaSeparda1[2]);
    
    let dia2 = (fechaSeparda2[0]);
    let mes2 = (fechaSeparda2[1]);
    let anyo2 = (fechaSeparda2[2]);

    if (dia1.length == 2 && mes1.length == 2 && anyo1.length == 4 && validarFecha(dia1, mes1, anyo1) &&
        dia2.length == 2 && mes2.length == 2 && anyo2.length == 4 && validarFecha(dia2, mes2, anyo2)) {

        // accion a realizar

        const fecha1 = new Date(anyo1, mes1, dia1);
        const fecha2 = new Date(anyo2, mes2, dia2);

        let cantidadMeses = calcularMeses(fecha1, fecha2);

        console.log("La cantidad de meses de diferencia es: " + cantidadMeses);


    } else {
        console.log("Fecha introducida no correcta...(Existencia)");
    }
}