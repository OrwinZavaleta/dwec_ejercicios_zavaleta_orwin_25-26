console.log("T03P01 - Ejercicio 03");

// ======== Inicio del codigo ========

// Variables
let entrada1;
let palabras = [];

// Pedir frase
entrada1 = prompt("Ingrese una frase con muchas palabras: ");
console.log(entrada1);

palabras = entrada1.split(" ");

// console.table(palabras);

for (const palabra of palabras) {
    console.log(palabra);
}