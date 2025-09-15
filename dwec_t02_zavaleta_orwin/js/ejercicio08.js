console.log("T02 - Ejercicio 08");

let entrada1;
let entrada2;
let min;
let numIntermedios = [];

// Funcion para calcular el menos
function calcular_menor(num1, num2) {
    return (num1 < num2) ? num1 : num2;
}

// Pedir numeros
do {
    entrada1 = parseInt(prompt("Ingrese el numero 1: "));
    console.log(entrada1);

    entrada2 = parseInt(prompt("Ingrese el numero 2: "));
    console.log(entrada2);

} while (isNaN(entrada1) || isNaN(entrada2));


min = calcular_menor(entrada1, entrada2);
max = entrada1 + entrada2 - min;

for (let i = min+1; i < max; i++) {
    numIntermedios.push(i);
}

console.log("Los numeros intermedios son estos: ");
console.table(numIntermedios);
console.log("Son en total: " + numIntermedios.length);