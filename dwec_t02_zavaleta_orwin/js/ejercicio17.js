console.log("T02 - Ejercicio 17");

function calcularDivisores(num) {
    let divisores = [];
    let raizNum = Math.sqrt(num);

    // Mas eficiente
    for (let i = 1; i < raizNum; i++) {
        if (num % i == 0) {
            divisores.push(i);
        }
    }

    let divisoresTemporal = [...divisores];

    if (Number.isInteger(raizNum)) {
        divisores.push(raizNum)
    }

    for (let i = divisoresTemporal.length-1; i > 0; i--) {
        const divisor = divisoresTemporal[i];
        divisores.push(num/divisor)
    }

    return divisores;
}

function calcularPerfecto(num, divisores) {
    let isPerfecto = false;
    let sumatoria = 0;

    for (const divisor of divisores) {
        sumatoria += divisor;
    }

    if (sumatoria == num) {
        isPerfecto = true;
    }

    return isPerfecto;
}

// ======== Inicio del codigo ========

// Variables
let entrada1;
let divisores = [];

// Pedir numeros
do {
    entrada1 = Number(prompt("Ingrese el numero: "));
    console.log(entrada1);

} while (!Number.isInteger(entrada1) || entrada1 <= 0);

divisores = calcularDivisores(entrada1);
console.log(divisores);


if (calcularPerfecto(entrada1, divisores)) {
    console.log("El numero es perfecto");
    
} else {
    console.log("El numero NO es perfecto");
    
}
