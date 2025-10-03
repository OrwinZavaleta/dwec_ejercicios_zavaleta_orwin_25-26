console.log("T03P03 - Ejercicio 07");

function pedirDatos(pregunta, limInf = -Infinity) {
    let entrada = null;
    do {
        if (entrada != null) console.log("Entrada invalida");
        entrada = prompt(pregunta);
    } while (isNaN(entrada) || entrada <= limInf);
    return entrada;
}

function mostrarDatos(matriz) {
    for (const element of matriz) {
        console.log("[" + element + "]");
    }
}

let nHorizontales = pedirDatos("Ingrese el numero de filas.", 0);
let nVerticales = pedirDatos("Ingrese el numero de columnas.", 0);

const matriz = [];

for (let i = 0; i < nHorizontales; i++) {
    const temporal = []
    for (let j = 0; j < nVerticales; j++) {
        temporal.push(pedirDatos(`Ingrese el elemento n(${i + 1}${j + 1}): `));
    }
    matriz.push(temporal);
}

mostrarDatos(matriz);