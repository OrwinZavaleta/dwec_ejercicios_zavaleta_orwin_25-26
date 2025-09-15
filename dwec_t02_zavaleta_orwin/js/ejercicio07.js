console.log("T02 - Ejercicio 07");
let entrada1;
let entrada2;

do {
    entrada1 = parseInt(prompt("Ingrese el numero 1: "));
    console.log(entrada1);

    entrada2 = parseInt(prompt("Ingrese el numero 2: "));
    console.log(entrada2);

} while (isNaN(entrada1) || isNaN(entrada2) || (entrada1 !== entrada2 && entrada1 !== 0 && entrada2 !== 0));

