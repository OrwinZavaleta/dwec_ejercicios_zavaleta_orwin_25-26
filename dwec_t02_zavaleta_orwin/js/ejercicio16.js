console.log("T02 - Ejercicio 16");

// ======== Inicio del codigo ========

// Variables
let entrada1;
let longitud;
let invertido = "";

// Pedir numeros
do {
    entrada1 = Number(prompt("Ingrese el numero: "));
    console.log(entrada1);

} while (!Number.isInteger(entrada1) || entrada1 <= 0);

longitud = entrada1.length;

console.log(longitud);


for (let i = longitud-1; i > 0; i--) {
    invertido += entrada1.substring(i, i+1)
    console.log(i);
    
}

console.log(invertido);
