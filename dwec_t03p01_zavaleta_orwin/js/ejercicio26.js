console.log("T03P01 - Ejercicio 26");

let cadena = prompt("Ingrese una cadena: ");
let letra1 = prompt("Ingrese una letra: ");
let letra2 = prompt("Ingrese otra letra: ");
let ocurrencias;

const patron = new RegExp(letra1, 'ig');

let cadenaRem =  cadena.replace(patron, letra2);

if (cadenaRem == cadena) {
    console.error("No se encontraron ninguna coincidencia");
    
} else{
    console.log(`La nueva cadena es: ${cadenaRem}`);
}