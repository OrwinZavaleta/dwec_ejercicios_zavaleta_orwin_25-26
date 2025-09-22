console.log("T03P01 - Ejercicio 02");

// ======== Inicio del codigo ========

// Variables
let entrada1;

// Pedir palabra

entrada1 = prompt("Ingrese una palabra: ");
console.log(entrada1);

console.log(entrada1.substr(2, 4)); // Esta deprecado y el primer parametro es el el inicio y el segundo es la longitud
console.log(entrada1.substring(2, 4)); // Primero es inicio y segundo parametro es el final. Si el valor start y end son menores que 0 se tratan como 0
console.log(entrada1.slice(2, 4)); // Primero es inicio y segundo parametro es el final

console.log("======================================");

console.log(entrada1.substring(-1, 4)); //Si el valor start y end son menores que 0 se tratan como 0
console.log(entrada1.slice(-1, 4)); 