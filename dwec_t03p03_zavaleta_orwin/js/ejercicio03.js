console.log("T03P03 - Ejercicio 03");

function invertirOrden(array) {
    array = structuredClone(array);

    let arrayInvertido = [];

    array.forEach((element) => arrayInvertido.unshift(element));

    return arrayInvertido;
}

function inversionHecha(array) {
    return array.toReversed();
}

const miarray = [2, 4, 3, 5];

console.log(invertirOrden(miarray));
console.log(inversionHecha(miarray)); 
