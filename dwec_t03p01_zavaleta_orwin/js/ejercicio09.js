console.log("T03P01 - Ejercicio 09");

// ======== Inicio del codigo ========

// Variables
let cantidad;
const numeros = [];
// Pedir numeros
do {
    cantidad = Number(prompt("Ingrese la cnatidad de numeros: "));
    console.log(cantidad);

} while (Number.isNaN(cantidad) || cantidad <= 0);

for (let i = 0; i < cantidad; i++) {
    numeros.push(Number(prompt(`Ingrese el numero ${i + 1}: `)));
}

console.log("El menor es: " + Math.min(...numeros));
console.log("El mayor es: " + Math.max(...numeros));