console.log("T03P03 - Ejercicio 02");

function pedirValidarNumero(pregunta, limInf = -Infinity) {
    let entrada = null;
    do {
        if (entrada != null) console.log("Entrada invalida");
        entrada = prompt(pregunta);
    } while (isNaN(entrada) || entrada <= limInf);
    return entrada;
}

function pedirDatos(cantidadEntradas) {
    const arr = [];
    for (let i = 0; i < cantidadEntradas; i++) {
        arr.push(pedirValidarNumero(`Ingrese el numero ${i + 1}:`));
    }
    return arr;
}

//calcular la media de un array
const calcularMedia = function (propiedades) {
    let suma = 0;
    for (const propiedad of propiedades) {
        suma += propiedad;
    }
    return suma / (propiedades.length);
};

function calcuarlSuperioresMedia(array, media) {
    return array.filter((element) => element > media);
}

// TODO: Falta completar la ordenacion
function ordenarArray(array, orden = "asc") { // el orden puede ser asc o desc
    const arrayOrdenado = [];

    array = structuredClone(array);

    arrayOrdenado.unshift(array[0]);
    array.shift();

    if (orden == "asc") {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];

            for (let j = arrayOrdenado.length - 1; j >= 0; j--) {
                const elementOrder = arrayOrdenado[j];
                if (element > elementOrder) {
                    arrayOrdenado.splice(j + 1, 0, element);
                    break;
                } else if (j == 0) {
                    arrayOrdenado.unshift(element);
                    break;
                }
            }
        }
    } else if (orden == "desc") {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];

            for (let j = arrayOrdenado.length - 1; j >= 0; j--) {
                const elementOrder = arrayOrdenado[j];
                if (element < elementOrder) {
                    arrayOrdenado.splice(j + 1, 0, element);
                    break;
                } else if (j == 0) {
                    arrayOrdenado.unshift(element);
                    break;
                }
            }
        }

    }


    return arrayOrdenado;
}

const mostrarArray = (array) => console.log(array);

const mostrarArrayOrdenado = (array, orden) => console.log(ordenarArray(array, orden));


// =======================================================================
// =========================Inicio del programa===========================
// =======================================================================


let cantidadEntradas;
const entradas = [];
let media;
const valoresSuperioresMedia = [];

cantidadEntradas = pedirValidarNumero("¿Cuantos numeros va a ingresar? ", 0);

entradas.push(...pedirDatos(cantidadEntradas));

media = calcularMedia(entradas);

valoresSuperioresMedia.push(...calcuarlSuperioresMedia(entradas, media));


console.log(`Son ${valoresSuperioresMedia.length} numeros superiores a la media.`);
console.log("El conjunto de valores originales el: \n");
mostrarArray(entradas);
console.log(`El conjunto ordenado es: `);
mostrarArrayOrdenado(entradas, "asc");
console.log(`El conjunto ordenado descendentemente es: `);
mostrarArrayOrdenado(entradas, "desc");
console.log(``);
