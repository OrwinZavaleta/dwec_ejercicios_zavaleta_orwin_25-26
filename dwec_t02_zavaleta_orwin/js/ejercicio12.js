console.log("T02 - Ejercicio 12");

let capital;
let taza;
let tiempo;

let interes;

// Pedir capital
do {
    capital = parseFloat(prompt("Ingrese el Capital: "));
    console.log(capital);

} while (isNaN(capital) || capital <= 0);

// Pedir taza de interes anual
do {
    taza = parseFloat(prompt("Ingrese el la taza de interes anual (ej: 0.05): "));
    console.log(taza);

} while (isNaN(taza) || taza <= 0 || taza > 1);

// Pedir tiempo en años
do {
    tiempo = parseInt(prompt("Ingrese el tiempo an años: "));
    console.log(tiempo);

} while (isNaN(tiempo) || tiempo <= 0);

interes = capital * taza * tiempo;

console.log(`Su Capital inicial fue ${capital}`);
console.log(`Su interes recolectado será ${interes}`);
console.log(`Su monto optenido será ${interes + capital}`);
