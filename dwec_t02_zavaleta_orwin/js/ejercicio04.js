console.log("T02 - Ejercicio 04");

let entrada = 0;
let isPrimo = true;
let raiz = 0;

do {
    entrada = Number(prompt("Ingrese el numero a comprobar: "));
    console.log(entrada);
} while (!Number.isInteger(entrada) || entrada <= 0);

raiz = Math.sqrt(entrada);
console.log(raiz);

if (entrada != 2 && (entrada == 1 || entrada % 2 == 0)) {
    isPrimo = false;
}

for (let i = 3; i <= raiz; i += 2) {
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