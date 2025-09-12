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

/* for (let i = 0; i < raiz; i++) {
        
} */