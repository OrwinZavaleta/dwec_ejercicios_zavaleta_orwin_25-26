console.log("T03P01 - Ejercicio 07");

// ======== Inicio del codigo ========

// Variables
let hora;
let horaSeparada;

// Pedir fecha
hora = prompt("Ingrese una hora usando los siguientes formatos: \"HH:MM\", \"HH-MM\" o \"HH.MM\": ");
console.log(hora);

if (hora.length == 5) {

    if (hora.match(":")) {
        horaSeparada = hora.split(":");
    } else if (hora.match("-")) {
        horaSeparada = hora.split("-");
    } else if (hora.match(".")) {
        horaSeparada = hora.split(".");
    } else {
        console.log("Formato no reconocido...");
    }
} else {
    console.log("hora introducida no correcta...(tamaño)");
}

console.log(horaSeparada);

if (horaSeparada) {
    let hora = Number(horaSeparada[0]);
    let min = Number(horaSeparada[1]);
    /*
        if (hora >= 0 && hora < 24 && min >= 0 && min < 60) {
            console.log("Hora correcta");
        } else {
            console.log("Hora INCORRECTA");
        } */

    const horaValida = new Date("1234", "01", "01", hora, min);

    if (horaValida.getHours() === hora && horaValida.getMinutes() === min) {
        console.log("Hora correcta");
    } else {
        console.log("Hora INCORRECTA");
    }
} else {
    console.log("hora introducida no correcta...(existencia)");
}