console.log("T02 - Ejercicio 04");

let entrada = 0;
let isPrimo = true;
let raiz = 0;

do {
    entrada = Number(prompt("Ingrese el año a comprobar: "));
    console.log(entrada);
} while (!Number.isInteger(entrada));

raiz = Math.sqrt(entrada);
console.log(raiz);

for (let i = 2; i <= raiz; i++) {
    if (entrada % i == 0) {
        isPrimo = false;
        break;
    }
}

if (isPrimo) {
    alert("El numero es primo");
} else {
    alert("El numero NO es primo");
}