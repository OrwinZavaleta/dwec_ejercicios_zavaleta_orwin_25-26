console.log("T02 - Ejercicio 06");
let num1;
let num2;
do {
    num1 = parseInt(prompt("Ingrese el primer numero"));
} while (isNaN(num1));
do {
    num2 = parseInt(prompt("Ingrese el segundo numero"));
} while (isNaN(num2));

let producto = 0;
let isNegative = false;

if (num1 < 0 && num2 < 0) {
    num1 *= -1;
    num2 *= -1;
} else if (num1 < 0) {
    num1 *= -1;
    isNegative = true;
} else if (num2 < 0) {
    num2 *= -1;
    isNegative = true;
}

for (let i = 0; i < num1; i++) {
    producto += num2;
}

if (isNegative) {
    producto *= -1;
}

alert("El producto de los numeros es " + producto);
console.log("El producto de los numeros es " + producto);