console.log("T03P01 - Ejercicio 18");

console.log("T03P01 - Ejercicio 14");


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

function calcularEdad(dia, mes, anyo) { //retorna los
    const fecha = new Date(anyo, mes - 1, dia);

    let edad = new Date() - fecha;

    return edad / (1000 * 60 * 60 * 24 * 365);
}

function diasParaCumpleanyos(dia, mes, anyo) { //retorna los dias que faltan y si es hoy devuelve 0
    const fechaActual = new Date();
    let anyoActual = fechaActual.getFullYear();
    let cumpleanyos = new Date(anyoActual, mes - 1, dia)

    let diasFaltantes = cumpleanyos - fechaActual;

    if (diasFaltantes < 0) {
        diasFaltantes = new Date(anyoActual + 1, mes - 1, dia) - fechaActual;
    }

    diasFaltantes = diasFaltantes / (1000 * 60 * 60 * 24);

    // ya que calcula con milisegundos, si el dia es el mismo, lo toma como su cumpleaños
    if (fechaActual.getDate() == cumpleanyos.getDate()) diasFaltantes = 0;

    return diasFaltantes;
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

    if (dia.length == 2 && mes.length == 2 && anyo.length == 4 && validarFecha(dia, mes, anyo)) {

        console.log("Tu edad es: " + Math.floor(calcularEdad(dia, mes, anyo)));
        let diasFaltantes = Math.round(diasParaCumpleanyos(dia, mes, anyo));

        if (diasFaltantes == 0) {
            console.log("Felicidades, es tu cumpleaños");
        } else {
            console.log(`Faltan ${diasFaltantes} dias para tu cumpleaños.`);
        }

    } else {
        console.log("Fecha introducida no correcta...(Existencia)");
    }
}