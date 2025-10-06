console.log("T03P03 - Ejercicio 10");

const clasificacion = [
    ["Equipo", "PTS", "PJ", "PG", "PE", "PP"],
    ["Levante", 40, 14, 13, 1, 0],
    ["Malaga", 37, 14, 12, 1, 1],
    ["Eibar", 34, 14, 11, 1, 2],
    ["Cordoba C F", 27, 14, 8, 3, 3]
];

function buscarMaxEnColumna(matriz, columna) {
    let puntos = [];

    for (let i = 1; i < matriz.length; i++) {
        puntos.push(matriz[i][columna]);
    }

    let lider = puntos.indexOf(Math.max(...puntos));

    return lider + 1; // Devuelve el indice de donde encontro el mayor valor.
}

function calcularLider(matriz) {
    let indexColumna = matriz[0].indexOf("PTS");
    
    let fila = buscarMaxEnColumna(matriz, indexColumna);

    return matriz[fila][0];
}

function calcularMasPerdidos(matriz) {
    let indexColumna = matriz[0].indexOf("PP");

    let fila = buscarMaxEnColumna(matriz, indexColumna);

    return matriz[fila][0];
}

function calcularMasGanados(matriz) {
    let indexColumna = matriz[0].indexOf("PG");

    let fila = buscarMaxEnColumna(matriz, indexColumna);

    return matriz[fila][0];
}

console.log(calcularLider(clasificacion));
console.log(calcularMasGanados(clasificacion));
console.log(calcularMasPerdidos(clasificacion));
