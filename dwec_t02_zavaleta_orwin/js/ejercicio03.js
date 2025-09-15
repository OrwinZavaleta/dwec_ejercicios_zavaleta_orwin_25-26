console.log("T02 - Ejercicio 03");

let entrada = 0;
let salir;
do {
    do {
        entrada = Number(prompt("Ingrese el año a comprobar: "));
        console.log(entrada);
    } while (isNaN(entrada) || entrada < 0 || entrada > new Date().getFullYear());


    if ((entrada % 4 == 0 && entrada % 100 != 0) || entrada % 400 == 0) {
        console.log("Es bisiesto");
        alert("Es bisiesto");
    } else {
        console.log("NO Es bisiesto");
        alert("NO Es bisiesto");
    }
    salir = prompt("Presione s para comprobar otro año: ");
} while (salir == "s");
