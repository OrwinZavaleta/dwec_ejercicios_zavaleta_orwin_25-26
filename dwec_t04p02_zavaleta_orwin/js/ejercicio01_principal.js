console.log("T04P02 - Ejercicio 01 - Principal"); // TODO: revisar si en algun sitio falta un try catch

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector("#btn-comprar");

    boton.addEventListener("click", () => {
        main();
    })
});

function main() {
    // try {
    const miTienda = new Tienda("El fede");
    miTienda.iniciar();

    console.log(miTienda.mostrarCatalogoLibrosDisponibles());
    // } catch (error) {
    //     console.log("Error en la ejecución: " + error.message);
    // }
}