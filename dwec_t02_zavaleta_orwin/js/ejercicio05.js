console.log("T02 - Ejercicio 05");

let entrada1 = parseFloat(prompt("Ingrese el numero 1: "));
let entrada2 = parseFloat(prompt("Ingrese el numero 2: "));
let entrada3 = parseFloat(prompt("Ingrese el numero 3: "));
let entrada4 = parseFloat(prompt("Ingrese el numero 4: "));
let entrada5 = parseFloat(prompt("Ingrese el numero 5: "));

let media = (entrada1 + entrada2 + entrada3 + entrada4 + entrada5) / 5;
let numerosMayores = "";

switch (true) {
    case (media < entrada1):
        numerosMayores += ", "+entrada1;
    case (media < entrada2):
        numerosMayores += ", "+entrada2;
    case (media < entrada3):
        numerosMayores += ", "+entrada3;
    case (media < entrada4):
        numerosMayores += ", "+entrada4;
    case (media < entrada5):
        numerosMayores += ", "+entrada5;
}

console.log("Los numeros mayores a la media son: "+numerosMayores);
