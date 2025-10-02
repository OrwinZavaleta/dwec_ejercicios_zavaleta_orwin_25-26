console.log("T03P03 - Ejercicio 01");

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let arr_buffer = structuredClone(arr);  // Para hacer una copia profunda (Disponible desde 2022)
let arr_anterior = [];
let response;

do {
    response = prompt("Quieres borrar el ultimo elemento del array(u), o el primero(p), o ambos(up/pu) o ninguno(n) o deshacer(d) al ultimo estado: ").toLowerCase();

    switch (response) {
        case "u":
            console.log("Eliminas ultimo");
            if (arr.length >= 1) {
                arr.pop() // ELimina el ultimo
            } else {
                console.log("No se pueden borrar mas elementos.");
            }
            break;
        case "p":
            console.log("Eliminas primero");
            if (arr.length >= 1) {
                arr.shift() // Elimina el primero y mueve los demas
            } else {
                console.log("No se pueden borrar mas elementos.");
            }
            break;
        case "up":
        case "pu":
            if (arr.length >= 2) {
                arr.pop() // ELimina el ultimo
                arr.shift() // Elimina el primero y mueve los demas
            } else {
                console.log("No se pueden borrar 2 elementos ya que quedan menos de 2.");
            }
            console.log("Eliminas ambos");

            break;
        case "n":
            console.log("Eliminas ninguno");
            console.log("Saliendo del programa...");
            break;
        case "d":
            console.log("deshacer");

            arr = structuredClone(arr_anterior);

            break;
        default:
            console.log("Opcion no valida...");
            break;
    }

    console.log("Array actual: ");
    console.log(arr);

    arr_anterior = structuredClone(arr_buffer);
    arr_buffer = structuredClone(arr);
} while (arr.length > 0 && response != "n");


