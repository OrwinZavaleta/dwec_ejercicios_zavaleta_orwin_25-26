console.log("T03P03 - Ejercicio 11");

const VALORES = ["piedra", "papel", "tijera", "lagarto", "spock"];

function pedirJugadas() {
    const array = [];

    let jugada = null;

    for (let i = 0; i < 5; i++) {
        do {
            jugada = prompt("ingrese su jugada " + (i + 1));

            if (VALORES.indexOf(jugada) != -1) {
                array.push(jugada);
            } else {
                jugada = null;
            }
        } while (jugada == null);
    }

    return array;
}

function compararDosJuegos(array1, array2) { // Retorna -1 si gana el primero, 0 si empate, y 1 si el segundo gana
    const resultados = [];

    for (let i = 0; i < array1.length; i++) {
        resultados.push(compararDosValores(array1[i], array2[i]));
    }

    let cantGanados1 = resultados.filter((e) => e == -1).length;
    let cantGanados2 = resultados.filter((e) => e == 1).length;

    if (cantGanados1 > cantGanados2) {
        return [-1, cantGanados1];
    } else if (cantGanados1 < cantGanados2) {
        return [1, cantGanados2];
    } else {
        return [0, null];
    }
}

function compararDosValores(val1, val2) { // Retorna -1 si gana el primero, 0 si empate, y 1 si el segundo gana
    if ((val1 == "tijeras" && val2 == "papel") ||
        (val1 == "papel" && val2 == "piedra") ||
        (val1 == "piedra" && val2 == "lagarto") ||
        (val1 == "lagarto" && val2 == "spock") ||
        (val1 == "spock" && val2 == "tijeras") ||
        (val1 == "lagarto" && val2 == "papel") ||
        (val1 == "papel" && val2 == "spock") ||
        (val1 == "spock" && val2 == "piedra") ||
        (val1 == "piedra" && val2 == "tijeras")) {
        return -1
    } else if ((val2 == "tijeras" && val1 == "papel") ||
        (val2 == "papel" && val1 == "piedra") ||
        (val2 == "piedra" && val1 == "lagarto") ||
        (val2 == "lagarto" && val1 == "spock") ||
        (val2 == "spock" && val1 == "tijeras") ||
        (val2 == "lagarto" && val1 == "papel") ||
        (val2 == "papel" && val1 == "spock") ||
        (val2 == "spock" && val1 == "piedra") ||
        (val2 == "piedra" && val1 == "tijeras")) {
        return 1;
    } else {
        return 0;
    }
}

let jugador1 = "Anonumus1";
let jugador2 = "Anonimus2";

const array1 = [];
const array2 = [];

jugador1 = prompt("Ingrese el nombre del jugador 1");

array1.push(...pedirJugadas());

jugador2 = prompt("Ingrese el nombre del jugador 2");

array2.push(...pedirJugadas());

// console.log(jugador1 + "  " + array1);
// console.log(jugador2 + "  " + array2);

let [resul, cantGanadas] = compararDosJuegos(array1, array2);

switch (resul) {
    case -1:
        console.log("Gano el jugador " + jugador1);
        console.log(`Tuvo ${cantGanadas} partidas ganadas.`);
        break;
    case 0:
        console.log("Fue un empate!!!!!!!! ");
        break;
    case 1:
        console.log("Gano el jugador " + jugador2);
        console.log(`Tuvo ${cantGanadas} partidas ganadas.`);
        break;
    default:
        console.log("Este mensaje no se deberia mostrar...");

}