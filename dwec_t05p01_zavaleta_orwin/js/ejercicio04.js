console.log("T05 - Ejercicio 04");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#formAgregar").addEventListener("submit", formAgregar);
});

function formAgregar(e) {
    e.preventDefault();
    e.stopPropagation();

    agregarAlista(this.producto.value)
}

function agregarAlista(elemento) {
    const lista = document.querySelector("#listaCompra");

    lista.innerHTML += `<li class="list-group-item"></li>`;

    lista.lastChild.textContent = elemento;
}