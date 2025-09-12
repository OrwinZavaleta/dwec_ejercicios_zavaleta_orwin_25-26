console.log("T02 - Ejercicio 03");

let entrada = 0;

do {
    entrada = Number(prompt("Ingrese el año a comprobar: "));
    console.log(entrada);
} while (isNaN(entrada) || entrada < 0);


if ((entrada % 400 == 0)) {
    console.log("biciesto");
} else if (entrada % 100 == 0) {
    console.log("NO");
} else if (entrada % 4 == 0) {
    console.log("biciesto");
} else {
    console.log("NO");
}