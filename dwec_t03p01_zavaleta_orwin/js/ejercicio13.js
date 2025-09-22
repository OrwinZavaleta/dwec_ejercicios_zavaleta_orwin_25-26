console.log("T03P01 - Ejercicio 13");

Math.random2 = function (lim_inf, lim_sup) {
    return Math.floor(Math.random() * (lim_sup - lim_inf + 1) + lim_inf);
};

let cupon = "";

for (let i = 0; i < 5; i++) {
    cupon += Math.random2(0, 9);
}

console.log(cupon);
