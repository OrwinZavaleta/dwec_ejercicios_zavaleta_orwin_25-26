console.log("T03P03 - Ejercicio 09");

// ¿Qué es la transpuesta de una matriz?
// Una matriz transpuesta es intercambiar las filas por columnas de la matriz original.
// Es decir una matriz de 3x2 se convierte en una de 2x3.

function mostrarDatos(matriz) {
    for (const element of matriz) {
        console.log("[" + element + "]");
    }
}

function calcularTranspuesta(matriz) {
    const matrizTranspuesta = [];

    for (let i = 0; i < matriz[0].length; i++) {
        const temporal = []
        for (let j = 0; j < matriz.length; j++) {
            temporal.push(matriz[j][i]);
        }
        matrizTranspuesta.push(temporal);
    }

    return matrizTranspuesta;
}

const matriz = [
    [1, 2, 3],
    [6, 7, 8]
];

console.log("Matriz original");
mostrarDatos(matriz);
console.log("\nMatriz transpuesta");
mostrarDatos(calcularTranspuesta(matriz));



