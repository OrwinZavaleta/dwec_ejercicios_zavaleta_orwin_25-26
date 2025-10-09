console.log("T03P03 - Ejercicio 11");

const VALORES = new Set(["piedra", "papel", "tijera", "lagarto", "spock"]);

function pedirJugadas() {
    const array = [];

    let jugada = null;

    for (let i = 0; i < 5; i++) {
        do {
            jugada = prompt(`
                Ingrese el numero o la jugada:
                1. piedra
                2. papel
                3. tijera
                4. lagarto
                5. spock

                Ingrese su jugada ${i + 1}
                `);

            if (!isNaN(jugada)) {
                jugada = darNumeroJugadaEquivalente(jugada);
            } else {
                jugada.toLocaleLowerCase();
            }

            if (VALORES.has(jugada)) {
                array.push(jugada);
            } else {
                jugada = null;
            }
        } while (jugada == null);
    }

    return array;
}

function darNumeroJugadaEquivalente(num) {
    let aux = null;
    switch (Number(num)) {
        case 1:
            aux = "piedra";
            break;
        case 2:
            aux = "papel";
            break;
        case 3:
            aux = "tijera";
            break;
        case 4:
            aux = "lagarto";
            break;
        case 5:
            aux = "spock";
            break;
    }
    return aux;
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

function generarJugadasAleatorias() {
    const array = [];

    for (let i = 0; i < 5; i++) {
        array.push(darNumeroJugadaEquivalente(Math.random() * 5 + 1));
    }

    return array;
}
// =========================================================
// ================== Inicio del programa ==================
// =========================================================

const JUGADORES = new Map();

let jugador1 = null;
let jugador2 = null;

jugador1 = prompt("Ingrese el nombre del jugador 1");
JUGADORES.set(jugador1, pedirJugadas());

do {
    jugador2 = prompt("Ingrese el nombre del jugador 2");
    if (!JUGADORES.has(jugador2)) {
        let confirmacion = prompt("desea jugar contra la maquina? (s/n) (defecto n)").toLowerCase();
        if (confirmacion == "s") {
            JUGADORES.set(jugador2, generarJugadasAleatorias());
        } else {
            JUGADORES.set(jugador2, pedirJugadas());
        }
    } else {
        jugador2 = null;
    }
} while (jugador2 == null);

let [resul, cantGanadas] = compararDosJuegos(JUGADORES.get(jugador1), JUGADORES.get(jugador2));

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