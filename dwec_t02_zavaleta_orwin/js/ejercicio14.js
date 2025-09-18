console.log("T02 - Ejercicio 14");

function calcularDivisores(num) {
    let divisores = [];
    let raizNum = Math.sqrt(num);

    // Ineficiente
    /* for (let i = 1; i < num; i++) {
        if (num % i == 0) {
            divisores.push(i);
        }
    } */

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

function calcularAbundante(num, divisores) {
    let isAbundante = false;
    let sumatoria = 0;

    for (const divisor of divisores) {
        sumatoria += divisor;
    }

    if (sumatoria > num) {
        isAbundante = true;
    }

    return isAbundante;
}

// ======== Inicio del codigo ========

// Variables
let entrada1;

// Pedir numeros
do {
    entrada1 = parseInt(prompt("Ingrese el numero: "));
    console.log(entrada1);

} while (isNaN(entrada1) || entrada1 <= 0);

let divisores = calcularDivisores(entrada1);
console.log(divisores);

if (calcularAbundante(entrada1, divisores)) {
    console.log(`El numero ${entrada1} con los divisores ${divisores},${entrada1}
        Es abundante`);
    alert(`El numero ${entrada1} con los divisores ${divisores},${entrada1}
        Es abundante`);
} else {
    console.log(`El numero ${entrada1} con los divisores ${divisores},${entrada1}
        NO es abundante`);
    alert(`El numero ${entrada1} con los divisores ${divisores},${entrada1}
        NO es abundante`);
}