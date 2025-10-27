console.log("T03P03 - Ejercicio 01");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
/* let arr_buffer = structuredClone(arr);  // Para hacer una copia profunda (Disponible desde 2022)
let arr_anterior = []; */
let response;
let final = undefined;
let inicio = undefined;

do {
    response = prompt("Quieres borrar el ultimo elemento del array(u), o el primero(p), o ambos(up/pu) o ninguno(n) o deshacer(d) al ultimo estado: ").toLowerCase();

    switch (response) {
        case "u":
            console.log("Eliminas ultimo");
            if (arr.length >= 1) {
                final = arr.pop();// ELimina el ultimo
                inicio = undefined;
            } else {
                console.log("No se pueden borrar mas elementos.");
            }
            break;
        case "p":
            console.log("Eliminas primero");
            if (arr.length >= 1) {
                inicio = arr.shift();// Elimina el primero y mueve los demas
                final = undefined;
            } else {
                console.log("No se pueden borrar mas elementos.");
            }
            break;
        case "up":
        case "pu":
            if (arr.length >= 2) {
                final = arr.pop() // ELimina el ultimo
                inicio = arr.shift() // Elimina el primero y mueve los demas
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

            if (final !== undefined && inicio !== undefined) {
                console.log("No se puede deshacer.");
            }

            if (final !== undefined) {
                arr.push(final)
                final = undefined;
            }

            if (inicio !== undefined) {
                arr.unshift(inicio)
                inicio = undefined;
            }

            break;
        default:
            console.log("Opcion no valida...");
            break;
    }

    console.log("Array actual: ");
    console.log(arr);

    // 2 variables que vuardan el estado antes de borrado del inicio y final, si no se hizo nada, se guarda undefine, y se restaura y si es undefine no hay nada
    /*  arr_anterior = structuredClone(arr_buffer);
     arr_buffer = structuredClone(arr); */
} while (arr.length > 0 && response != "n");


