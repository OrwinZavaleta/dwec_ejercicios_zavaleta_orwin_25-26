console.log("T02 - Ejercicio 05");

let entrada1 = parseFloat(prompt("Ingrese el numero 1: "));
let entrada2 = parseFloat(prompt("Ingrese el numero 2: "));
let entrada3 = parseFloat(prompt("Ingrese el numero 3: "));
let entrada4 = parseFloat(prompt("Ingrese el numero 4: "));
let entrada5 = parseFloat(prompt("Ingrese el numero 5: "));

let media = (entrada1 + entrada2 + entrada3 + entrada4 + entrada5) / 5;
let numerosMayores = "";

/* if (media < entrada1) {
    numerosMayores += ", " + entrada1;
}
if (media < entrada2) {
    numerosMayores += ", " + entrada2;
}
if (media < entrada3) {
    numerosMayores += ", " + entrada3;
}
if (media < entrada4) {
    numerosMayores += ", " + entrada4;
}
if (media < entrada5) {
    numerosMayores += ", " + entrada5;
} */
numerosMayores += (media < entrada1) ? ", " + entrada1 : "";
numerosMayores += (media < entrada2) ? ", " + entrada2 : "";
numerosMayores += (media < entrada3) ? ", " + entrada3 : "";
numerosMayores += (media < entrada4) ? ", " + entrada4 : "";
numerosMayores += (media < entrada5) ? ", " + entrada5 : "";

numerosMayores = numerosMayores.slice(2);

console.log(`Los siguientes números introducidos son superiores a la media (${media}): ${numerosMayores}`);
