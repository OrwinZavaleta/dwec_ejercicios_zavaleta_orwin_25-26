console.log("T03P03 - Ejercicio 05");

function orderAlfabeticamente(array, orden) {
    if (orden == "asc") {
        return array.toSorted((a, b) => a - b);
    } else if (orden == "desc") {
        return array.toSorted((a, b) => b - a); // en este caso, si da positivo b va primero, si da negativo a va primero
    }
}

console.log(orderAlfabeticamente([4, 7, 5, 6], "asc"));
console.log(orderAlfabeticamente([4, 7, 5, 6], "desc"));