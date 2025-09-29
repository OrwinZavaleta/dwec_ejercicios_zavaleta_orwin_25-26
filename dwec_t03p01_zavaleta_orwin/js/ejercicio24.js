console.log("T03P01 - Ejercicio 24");



let cadena = prompt("Ingrese una cadena: ");
let repetir = false;
let posicion;

do {
    let palabra = prompt("Ingrese una palabra: ");
    const patron = new RegExp(palabra, 'i');
    if ((posicion = cadena.search(patron)) == -1) {
        console.log("No se encontro cadena");
        let respuesta = prompt("¿Quiere realizar otra busqueda? (s); ").toLowerCase();

        if (respuesta == "s") repetir = true;

    } else {
        console.log("La cadena se encuentra en la posicion " + posicion);
        repetir = false;
    }
} while (repetir);