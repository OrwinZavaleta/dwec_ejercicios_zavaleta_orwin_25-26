console.log("T03P01 - Ejercicio 27");

let cadena = prompt("Ingrese una cadena: ");

let patron = /\s+/;

let palabrasSeparadas = cadena.split(patron);

console.log(`La cadena tiene ${palabrasSeparadas.length} palabras.`);
