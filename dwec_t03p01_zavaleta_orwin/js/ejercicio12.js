console.log("T03P01 - Ejercicio 12");

function generar_numeros_entre_0_9() {
    return Math.floor(Math.random()*10);
}

let cupon = "";

for (let i = 0; i < 5; i++) {
    cupon += generar_numeros_entre_0_9();
}

console.log(cupon);
