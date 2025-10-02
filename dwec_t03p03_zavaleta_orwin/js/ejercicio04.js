console.log("T03P03 - Ejercicio 04");

function orderAlfabeticamente(array, orden) {
    if (orden == "asc") {
        return array.toSorted();
    } else if (orden == "desc") {
        return array.toSorted((a, b) => b.localeCompare(a));
    }
}

console.log(orderAlfabeticamente(["a", "c", "b"], "asc"));
console.log(orderAlfabeticamente(["a", "c", "b"], "desc"));

