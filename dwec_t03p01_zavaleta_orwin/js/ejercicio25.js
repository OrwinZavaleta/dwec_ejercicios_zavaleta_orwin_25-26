console.log("T03P01 - Ejercicio 25");

let cadena = prompt("Ingrese una cadena: ");
let letra = prompt("Ingrese una letra: ");
let ocurrencias;

const patron = new RegExp(letra, 'ig');

if ((ocurrencias = cadena.match(patron)) != null) {
    console.log(`Se encontraron ${ocurrencias.length} coincidencias.`);

} else {
    console.error("No existe ninguna incidencia.");

}