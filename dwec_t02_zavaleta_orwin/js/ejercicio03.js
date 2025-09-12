console.log("T02 - Ejercicio 03");

let entrada = 0;

do {
    entrada = Number(prompt("Ingrese el año a comprobar: "));
    console.log(entrada);
} while (isNaN(entrada) || entrada < 0 || entrada > new Date().getFullYear());


if ((entrada % 4 == 0 && entrada % 100 != 0) || entrada % 400 == 0) {
    console.log("Es bisiesto");
} else if (entrada % 4 == 0) {
    console.log("NO Es bisiesto");
}