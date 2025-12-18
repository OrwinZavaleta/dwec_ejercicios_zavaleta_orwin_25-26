console.log("T04P02 - Ejercicio 01 - Principal");

// ====== VALIDACION DE LOS FORMULARIO ======
(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

// ====== ASIGNACION DE LOS EVENTOS ======
document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = location.pathname;
    const miTienda = main();

    if (currentUrl.search("01catalogo") !== -1) {
        //==== Catalogo =====
        document.querySelectorAll('[data-bs-toggle="modal"]').forEach(modal => {
            modal.addEventListener("click", () => actualizarDatosModal(document.querySelector(".modal"), modal.querySelector("p").textContent, miTienda));
        });
        document.querySelector("#filterForm").addEventListener("submit", (e) => cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"), miTienda.lector.leerCadena(this, "buscador"), e));
    } else if (currentUrl.search("02cliente") !== -1) {
        //==== Cliente =====
        document.querySelectorAll(".btn-detalle").forEach(detalle => {
            detalle.addEventListener("click", () => {
                document.querySelector("#detalleCard").classList.toggle("d-none");
            });
        });
    } else if (currentUrl.search("03nuevoLibro") !== -1) {
        //==== Nuevo Libro =====
    } else if (currentUrl.search("04crearPedido") !== -1) {
        //==== Crear un pedido =====
    } else {
        //==== Web no existente =====
    }

    // console.log(currentUrl);

});

// ====== FUNCION QUE CARGA LA APLICACION ======
function main() {
    // try {
    const miTienda = Tienda.gerInstancia("El fede");
    // miTienda.iniciar();
    miTienda.cargarDatosPrueba();
    cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"));

    // } catch (error) {
    //     console.log("Error en la ejecución: " + error.message);
    // }
    return miTienda;
}

function cargarActualizarLibros(tienda, bodyTable, query = "", e = null) {

    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    bodyTable.innerHTML = "";

    const libros = tienda.mostrarCatalogoLibrosDisponibles();
    let librosFiltrados = libros;
    query = query.trim().toLocaleLowerCase();

    if (query) {
        librosFiltrados = libros.filter(libro => libro.titulo.toLowerCase().includes(query) || 
                                                libro.genero.toLowerCase().includes(query) || 
                                                (libro.autores.filter(autor => autor.nombre.toLowerCase().includes(query)).length != 0));
    }

    librosFiltrados.forEach(libro => {
        bodyTable.innerHTML += `
                <tr>
                    <td>${libro.isbn}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autores.map(au => au.nombre)}</td>
                    <td>${libro.genero}</td>
                    <td>${libro.precio} €</td>
                    <td>${(libro instanceof Ebook) ? "Ebook" : "Libro en Papel"}</td>
                    <td>${libro.stock ?? "Ilimitado (digital)"}</td>
                    <td>
                        <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#detalle"><i class="bi bi-eye-fill"></i><p class="d-none">${libro.isbn}</p></button>
                    </td>
                </tr>
        `;
    });
}

function actualizarDatosModal(modal, isbn, miTienda) {
    const libro = miTienda.pedirLibroPorISBN(Number(isbn));
    modal.querySelector(".modal-title").innerHTML = libro.titulo;
    modal.querySelector(".modal-body").innerHTML = libro.mostrarDatosLibro();
}