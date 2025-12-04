console.log("T05 - Ejercicio 02");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#ocultarleer").addEventListener("click", ocultarleer);
    // document.querySelector("#ocultar").addEventListener("click", ocultar);
});

function ocultarleer() {
    document.querySelector("#contenido").classList.toggle("d-block");
    document.querySelector("#contenido").classList.toggle("d-none");

    this.textContent = (this.textContent === "Ocultar...")? "Leer más..." :"Ocultar...";
}

// function ocultar() {
//     document.querySelector("#contenido").classList.remove("d-block");
//     document.querySelector("#contenido").classList.add("d-none");
// }