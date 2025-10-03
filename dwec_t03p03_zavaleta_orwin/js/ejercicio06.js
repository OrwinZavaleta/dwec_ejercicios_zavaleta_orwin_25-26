console.log("T03P03 - Ejercicio 06");

const nombres = ["alberto", "juan", "alberto", "miguel", "juan", "carmen", "victor", "manuel", "orwin", "maria"];
const numeros = [
    "612345671",
    "622345672",
    "632345673",
    "642345674",
    "652345675",
    "662345676",
    "672345677",
    "682345678",
    "692345679",
    "712345670"
];

function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

let entrada = prompt("ingrese el nombre de una persona").toLocaleLowerCase();
// let coincidencias = nombres.filter((e) => e == entrada);

let coincidencias = [];


nombres.forEach((n, i) => {
    if (n == entrada) {
        coincidencias.push(numeros[i]);
    }
});


if (coincidencias.length == 1) {
    console.log(`El numero de ${toCapitalize(entrada)} es: ${coincidencias[0]}`);

} else if (coincidencias.length > 1) {
    console.log(`Hay ${coincidencias.length} personas con el nombre ${toCapitalize(entrada)}, sus numeros son: `);
    coincidencias.forEach(e => console.log(e));

} else {
    console.log("Esa persona no esta registrada.");
}