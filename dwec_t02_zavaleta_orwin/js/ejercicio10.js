console.log("T02 - Ejercicio 10");

// Funciones
function factorial(num) {
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
        factorial *= i;
    }
    return factorial;
}

// Variables
let entrada1;
let resultado;

// Pedir numeros
do {
    entrada1 = parseInt(prompt("Ingrese el numero: "));
    console.log(entrada1);

} while (isNaN(entrada1) || entrada1 < 0);

resultado = factorial(entrada1);

console.log(`El factorial del numero ${entrada1} es: ${resultado}`);
alert(`El factorial del numero ${entrada1} es: ${resultado}`);
