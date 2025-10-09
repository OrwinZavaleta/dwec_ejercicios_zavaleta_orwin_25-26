console.log("T03P03 - Ejercicio 10");

const clasificacion = [
    ["Equipo", "PTS", "PJ", "PG", "PE", "PP"],
    ["Cordoba C F", 27, 14, 8, 3, 3],
    ["Eibar", 34, 14, 11, 1, 2],
    ["Levante", 40, 14, 13, 1, 0],
    ["Malaga", 37, 14, 12, 1, 1],
];

function buscarMaxEnColumna(matriz, columna) {
    let puntos = [];

    for (let i = 1; i < matriz.length; i++) {
        puntos.push(matriz[i][columna]);
    }

    let lider = puntos.indexOf(Math.max(...puntos));

    return lider + 1; // Devuelve el indice de donde encontro el mayor valor.
}

function buscarColumna(matriz, name) {
    return matriz[0].indexOf(name);
}

function calcularLider(matriz) {
    let indexColumna = buscarColumna(matriz, "PTS");

    let fila = buscarMaxEnColumna(matriz, indexColumna);

    return matriz[fila][0];
}

function calcularMasPerdidos(matriz) {
    let indexColumna = buscarColumna(matriz, "PP");

    let fila = buscarMaxEnColumna(matriz, indexColumna);

    return matriz[fila][0];
}

function calcularMasGanados(matriz) {
    let indexColumna = buscarColumna(matriz, "PG");

    let fila = buscarMaxEnColumna(matriz, indexColumna);

    return matriz[fila][0];
}

function mostrarMatriz(matriz) {
    console.table(matriz);
}

function recalcularPuntos(matriz, fila) {
    const filaM = matriz[fila];
    let pg = filaM[buscarColumna(matriz, "PG")];
    let pp = filaM[buscarColumna(matriz, "PP")];
    let pe = filaM[buscarColumna(matriz, "PE")];

    filaM[buscarColumna(matriz, "PJ")] = pg + pp + pe;
    filaM[buscarColumna(matriz, "PTS")] = pg * 3 + pe;
}

function recalcularOrden(matriz) {
    let pts = buscarColumna(matriz, "PTS");

    let matrizTemp = matriz.slice(1);

    matrizTemp.sort((a, b) => b[pts] - a[pts]);

    matriz.splice(1, matriz.length - 1, ...matrizTemp);
}

function pedirPuntos(mensaje) {
    let puntos = null;
    do {
        puntos = prompt(mensaje);
    } while (isNaN(puntos) || puntos < 0);

    return puntos;
}

function agregarPartidos(max) {
    let pp = null;
    let pg = null;
    let pe = null;

    do {
        pp = Number(pedirPuntos("Ingrese el numero de partidos perdidos:"));
        pg = Number(pedirPuntos("Ingrese el numero de partidos ganados:"));
        pe = Number(pedirPuntos("Ingrese el numero de partidos empatados:"));
    } while (pp + pg + pe != max);

    return [pg, pe, pp];
}

function agregarEquipo(matriz) {
    let nombre = null;

    do {
        nombre = prompt("Ingrese el nombre del equipo:");
    } while (nombre == null);

    let [pg, pe, pp] = agregarPartidos(matriz[buscarColumna("PJ")][1]);

    const fila = [nombre, null, null, pg, pe, pp];

    matriz.push(fila);

    recalcularPuntos(matriz, matriz.length - 1);
    recalcularOrden(matriz);
}

function agregarJornada(matriz) {
    for (let i = 1; i < matriz.length; i++) {
        console.log(`Ingrese los partidos adicionales de ${matriz[i][0]}.`);

        let [pg, pe, pp] = agregarPartidos(1);

        matriz[i][buscarColumna(matriz, "PP")] = matriz[i][buscarColumna(matriz, "PP")] + pp;
        matriz[i][buscarColumna(matriz, "PE")] = matriz[i][buscarColumna(matriz, "PE")] + pe;
        matriz[i][buscarColumna(matriz, "PG")] = matriz[i][buscarColumna(matriz, "PG")] + pg;

        recalcularPuntos(matriz, i);
        console.log(`Partidos de ${matriz[i][0]} agregados correctamente`);
    }
    recalcularOrden(matriz);
    console.log("Jornada agregada correctamente.");
}

let entrada = -1;
do {

    do {
        entrada = prompt(`
    Menu:
    1. Ver el lider en la clasificación.
    2. Ver quien tiene más partidos perdidos.
    3. Ver quien tiene más partidos ganados.
    4. Ver tabla de clasificación.
    5. Introducir un nuevo Equipo.
    6. Recalcular el orden de los equipos.
    7. Agregar una Jornada
    0. Salir
    `);
    } while (isNaN(entrada) || entrada < 0 || entrada > 7);

    switch (Number(entrada)) {
        case 1:
            console.log("El lider de la clasificación es: ");
            console.log(calcularLider(clasificacion));
            break;
        case 2:
            console.log("Quien tiene más partidos perdidos es: ");
            console.log(calcularMasPerdidos(clasificacion));
            break;
        case 3:
            console.log("Quien tiene más partidos ganados es: ");
            console.log(calcularMasGanados(clasificacion));
            break;
        case 4:
            console.log("Tabla de clasificación: ");
            mostrarMatriz(clasificacion);
            break;
        case 5:
            agregarEquipo(clasificacion);
            break;
        case 6:
            recalcularOrden(clasificacion);
            break;
        case 7:
            agregarJornada(clasificacion);
            break;
        case 0:
            console.log("Saliendo del programa...");
            break;
        default:
            console.log("Entrada no valida.");
            break;
    }

} while (entrada != 0);
