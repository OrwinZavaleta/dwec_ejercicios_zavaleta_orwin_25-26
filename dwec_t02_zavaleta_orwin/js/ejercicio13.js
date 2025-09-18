console.log("T02 - Ejercicio 13");

let entrada1 = prompt("Ingrese la palabra que desea comprobar: ");
entrada1 = entrada1.toLowerCase();
let longitudPalabra = entrada1.length;
let isPalindromo = true;

for (let i = 0; i < ((longitudPalabra) / 2) - 1; i++) {
    let letraI = entrada1.substring(i, i + 1);
    let letraF = entrada1.substring(longitudPalabra - 1 - i, longitudPalabra - i)

    if (letraI !== letraF) {
        isPalindromo = false;
    }
}

if (isPalindromo) {
    console.log("Es palindromo");
    alert("Es palindromo");
} else {
    console.log("NO es palindromo");
    alert("NO es palindromo");
}
