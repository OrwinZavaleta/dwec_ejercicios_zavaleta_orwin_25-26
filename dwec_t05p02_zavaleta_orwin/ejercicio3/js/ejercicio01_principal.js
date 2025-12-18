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

    if (currentUrl.search("01catalogo") !== -1) {
        //==== Catalogo =====
        
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
    main();

    console.log(currentUrl);


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
}

function cargarActualizarLibros(tienda, bodyTable) {
    bodyTable.innerHTML = "";

    const libros = tienda.mostrarCatalogoLibrosDisponibles();

    libros.forEach(libro => {
        bodyTable.innerHTML += `
                <tr>
                    <td>${libro.isbn}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autores.map(au => au.nombre)}</td>
                    <td>${libro.genero}</td>
                    <td>${libro.precio}</td>
                    <td>${(libro instanceof Ebook) ? "Ebook" : "Libro en Papel"}</td>
                    <td>${libro.stock ?? "Ilimitado (digital)"}</td>
                    <td>
                        <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#detalle"><i class="bi bi-eye-fill"></i></button>
                    </td>
                </tr>
        `;
    });
}

function actualizarDatosModal(modal, libro) {
    modal.querySelector(".modal-title").innerHTML = libro.titulo.toUpperCase();
}