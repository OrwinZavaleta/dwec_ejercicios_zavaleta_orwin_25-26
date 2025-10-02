console.log("T03P02 - Ejercicio 01");

// Los convierte a numeros y si es un valor no valido, devuelve undefined
function validarNumeros(valor) {
    if (isNaN(valor)) {
        console.error(`El valor ${valor} no es un numero.`);
        return;
    } else {
        return Number(valor);
    }
}

//calcular la media de un array
const calcularMedia = function (propiedades) {
    let suma = 0;
    for (const propiedad of propiedades) {
        suma += propiedad;
    }
    return suma / (propiedades.length);
};

// Valor maximo
const calcularMaximo = (propiedades) => Math.max(...propiedades);

// Valor minimo
const calcularMinimo = (propiedades) => Math.min(...propiedades);

// calcular la desviacion
function calcularDesviacion(valor, media) {
    return valor - media;
}

// devuelve segun un valor
const devolverMensaje = function (media, min, max, variaciones) {
    if (media < 30) {
        return "Tu destino es entrenar más duro. Tus estadísticas están por debajo del mínimo requerido.";
    } else if (media < 60) {
        return `Estás en el camino del héroe. El valor máximo alcanzado fue ${max} y el mínimo ${min}.`;
    } else {
        return `Eres un maestro legendario. Tus desviaciones son: ${variaciones}.`;
    }
};

function oraculo(edad = 0, nivelPoder = 0, numeroBatallas = 0) {
    let propiedades = [];
    for (let i = 0; i < arguments.length; i++) {
        let valor = validarNumeros(arguments[i]);
        if (valor !== undefined) {
            propiedades.push(valor);
        }
    }
    // console.log(propiedades);

    let media = calcularMedia(propiedades);
    // console.log(media);

    let valorMax = calcularMaximo(propiedades);
    // console.log(valorMax);

    let valorMin = calcularMinimo(propiedades);
    // console.log(valorMin);

    // Hago una funcion anonima para calcular la desviacion en cada uno de los valores del array
    let variaciones = propiedades.map(function (e) {
        return calcularDesviacion(e, media).toFixed(2);
    });

    // console.log(variaciones);

    return devolverMensaje(media, valorMin, valorMax, variaciones);

}

// Crear una funcion autoivocada con varios valores de oraculo

(function () {
    console.log(oraculo(2, "pepe", 4));
    console.log(oraculo(6, 123, 17));
    debugger;
    console.log(oraculo(4, 54, 4, "54", "54.6", "hola", "4e"));
})();