console.log("T03P01 - Ejercicio 20");

function validarMiReal(cadena) {
    let patron = new RegExp("^(\\d{1,6}\|0)([\\.,]\\d{2})?$");

    /*  if (patron.test(cadena)) {
         return true;
     } else {
         return false;
     } */

    return patron.test(cadena);
}

function convertirMiReal(num) {
    if (num.includes(",")) {
        return Number(num.replace(",", "."));
    } else {
        return Number(num);
    }
}

let entrada = prompt("Ingrese el precio: ");

if (validarMiReal(entrada)) {
    console.log("El valor es valido, ingresado");
    console.log(convertirMiReal(entrada));
} else {
    console.log("El valor no es valido");

}