console.log("T04P02 - Ejercicio 01 - Principal");

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector("#btn-comprar");

    boton.addEventListener("click", () => {
        main();
    })
});

function main() {
    // try {
    const miTienda = Tienda.gerInstancia("El fede"); 
    miTienda.iniciar();

    // } catch (error) {
    //     console.log("Error en la ejecución: " + error.message);
    // }
}