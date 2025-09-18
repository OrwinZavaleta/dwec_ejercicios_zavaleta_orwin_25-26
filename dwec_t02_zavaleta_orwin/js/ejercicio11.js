console.log("T02 - Ejercicio 11");

// Funciones
function calcularFactorialImpar(num) {
    let factorial = 1;

    if (num > 1) {
        factorial = num * calcularFactorialImpar(num-1);
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

resultado = calcularFactorialImpar(entrada1);

console.log(`El factorial impar del numero ${entrada1} es: ${resultado}`);
alert(`El factorial impar del numero ${entrada1} es: ${resultado}`);
