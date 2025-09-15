console.log("T02 - Ejercicio 09");

// Funciones
function multiplo2(num) {
    return num % 2 === 0;
}
function multiplo3(num) {
    return num % 3 === 0;
}
function multiplo5(num) {
    return num % 5 === 0;
}
// Variables
let entrada1;
let opcion;
let salida;

// Pedir numeros
do {
    entrada1 = parseInt(prompt("Ingrese el numero: "));
    console.log(entrada1);

} while (isNaN(entrada1));

console.log("Menú");
console.log("---");
console.log("1. Calcular si es múltiplo de 2.");
console.log("2. Calcular si es múltiplo de 3.");
console.log("3. Calcular si es múltiplo de 5.");
console.log("0. Salir");

// Pedir operacion
do {
    opcion = parseInt(prompt("Ingrese la opcion: "));
    console.log(opcion);

} while (isNaN(opcion) || opcion < 0 || opcion > 3);

// Resolver la eleccion del usuario
switch (opcion) {
    case 1:
        salida = (multiplo2(entrada1)) ? "Es multiplo de 2" : "NO es multiplo de 2";
        break;
    case 2:
        salida = (multiplo3(entrada1)) ? "Es multiplo de 3" : "NO es multiplo de 3";
        break;
    case 3:
        salida = (multiplo5(entrada1)) ? "Es multiplo de 5" : "NO es multiplo de 5";
        break;
    default:
        salida = "Saliendo ...";
        break;
}

console.log(salida);
