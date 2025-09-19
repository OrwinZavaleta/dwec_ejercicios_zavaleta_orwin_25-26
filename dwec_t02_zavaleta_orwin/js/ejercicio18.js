console.log("T02 - Ejercicio 18");

function dividirFactoresPrimos(num) {

    let raizNum = Math.sqrt(num);

    let limitePrimos = [];

    let factoresPrimos = [];

    for (let i = 2; i < raizNum; i++) {
        if (num % i == 0) {
            limitePrimos.push(i);
        }
    }


    for (const primo of limitePrimos) {
        while (num % primo == 0) {
            factoresPrimos.push(primo);
            console.log(num);

            num = num / primo;
        }
    }

    return factoresPrimos;
}

// ======== Inicio del codigo ========

// Variables
let entrada1;
let factoresPrimos = [];

// Pedir numeros
do {
    entrada1 = Number(prompt("Ingrese el numero: "));
    console.log(entrada1);

} while (!Number.isInteger(entrada1) || entrada1 <= 0);


factoresPrimos = dividirFactoresPrimos(entrada1);

if (factoresPrimos.length == 0) {
    console.log("El numero ingresado es primo");
} else {
    console.log("Se descompone en: " + factoresPrimos);
}
