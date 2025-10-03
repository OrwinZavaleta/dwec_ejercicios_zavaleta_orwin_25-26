console.log("T03P03 - Ejercicio 08");

function comprobarSumar(matriz1, matriz2) {
    return matriz1.length == matriz2.length && matriz1[0].length == matriz2[0].length;
}

function sumarMatrices(matriz1, matriz2) {
    const matrizSuma = [];
    if (comprobarSumar(matriz1, matriz2)) {
        for (let i = 0; i < matriz1; i++) {
            const temporal = []
            for (let j = 0; j < matriz1[0]; j++) {
                temporal.push(matriz1[i][j] + matriz2[i][j]);
            }
            matrizSuma.push(temporal);
        }
    } else {
        return null;
    }
    return matrizSuma;
}

function mostrarDatos(matriz) {
    for (const element of matriz) {
        console.log("[" + element + "]");
    }
}

const matriz1 = [
    [1, 32],
    [3, 4]
];

const matriz2 = [
    [1, 2],
    [3, 2]
];

const suma = structuredClone(sumarMatrices(matriz1, matriz2));

if (suma) {
    console.log("la suma es: ");
    console.log(mostrarDatos(suma));
} else {
    console.log("Las matrices no se puedne sumar.");
}
