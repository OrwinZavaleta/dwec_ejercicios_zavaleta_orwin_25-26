console.log("T04P02 - Ejercicio 0X");

document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector("#btn-comprar");

    boton.addEventListener("click", () => {
        main();
    })
});

function main() {
    try {
        const miTienda = new Tienda("El fede");
        miTienda.cargarDatosPrueba();

        console.log(miTienda.mostrarCatalogoLibrosDisponibles());
    } catch (error) {
        console.log("Error en la ejecución: " + error.message);
    }
}