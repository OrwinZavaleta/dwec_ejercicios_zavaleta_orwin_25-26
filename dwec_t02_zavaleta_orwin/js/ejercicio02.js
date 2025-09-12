console.log("T02 - Ejercicio 02");

let entrada = 0;

do {
    entrada = parseInt(prompt("Ingrese el numero a comprobar: "));
} while (isNaN(entrada));

switch (true) {
    case (entrada % 10 == 0):
        alert("El numero es numtiplo de 2 y de 5")
        break;
    case (entrada % 5 == 0):
        alert("El numero es numtiplo de 5")
        break;
    case (entrada % 2 == 0):
        alert("El numero es numtiplo de 2")
        break;
    default:
        alert("El numero NO es numtiplo de nungino.")
        break;
}