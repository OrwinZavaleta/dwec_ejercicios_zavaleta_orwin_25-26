console.log("T02 - Ejercicio 11");

// Funciones
function calcularFactorialImpar(num) {
    if (num%2==0) {
        num--;
    }

    if (num <= 1) {
        return 1;
    }else{
        return num * calcularFactorialImpar(num-2);
    }
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
