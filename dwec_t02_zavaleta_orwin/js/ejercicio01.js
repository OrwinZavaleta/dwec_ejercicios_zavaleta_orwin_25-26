console.log("T01 - Ejercicio 01");

const CANTIDAD_NOTAS = 3;

let sumatoria = 0;
let promedio = 0;

for (let i = 0; i < CANTIDAD_NOTAS; i++) {
    let entrada = 0;

    do {
        entrada = Number(prompt(`Ingrese su nota ${i + 1}: `));
        console.log(entrada);
    } while (isNaN(entrada));

    sumatoria += entrada;
}
promedio = sumatoria / 3;

alert("Su promedio es " + promedio);
console.log("Su promedio es " + promedio);

switch (true) {
    case (promedio < 5):
        alert("Estas SUSPENSO");
        console.log("Estas SUSPENSO");
        break;
    case (promedio < 7):
        alert("Estas APROBADO");
        console.log("Estas APROBADO");
        break;
    case (promedio < 8.5):
        alert("Estas NOTABLE");
        console.log("Estas NOTABLE");
        break;
    case (promedio < 10):
        alert("Estas SOBRESALIENTE");
        console.log("Estas SOBRESALIENTE");
        break;
    default:
        alert("Hubo un error");
        console.log("Hubo un error");
        break;
}

