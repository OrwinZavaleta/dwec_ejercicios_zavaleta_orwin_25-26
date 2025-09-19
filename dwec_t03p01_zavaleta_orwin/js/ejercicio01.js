console.log("T03P01 - Ejercicio 0X");

// ======== Inicio del codigo ========

// Variables
let entrada1;

// Pedir numeros
do {
    entrada1 = Number(prompt("Ingrese el numero con decimales y sin decimales: "));
    console.log(entrada1);

} while (Number.isNaN(entrada1) || entrada1 <= 0);

console.log(entrada1.toFixed(4));
console.log(entrada1.toPrecision(4));

// Ambos truncan un decimal, pero el fixed lo hace a partir del punto decimal y el precision lo hace usando todo el numero.
