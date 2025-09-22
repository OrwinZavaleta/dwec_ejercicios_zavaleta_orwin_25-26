console.log("T03P01 - Ejercicio 04");

// ======== Inicio del codigo ========

// Variables
let frase;
let palabra;

// Pedir frase
frase = prompt("Ingrese una frase con muchas palabras: ");
console.log(frase);

palabra = prompt("Ingrese una frase con muchas palabras: ");
console.log(palabra);

const iterator = frase.matchAll(palabra);
/* 
for (const coincidencia of iterator) {
    console.log(coincidencia[0]);
} */

let coincidencias = Array.from(iterator);
let numConcidencias = coincidencias.length;
if (numConcidencias>0) {
    console.log(`El numero de coincidencias encontradas son ${numConcidencias}`);
} else {
    console.error("No se encontraron ninguna coincidencia.")
}

