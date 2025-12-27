console.log("T04P02 - Ejercicio 01 - Principal");

// =======================================
// ====== ASIGNACION DE LOS EVENTOS ======
// =======================================
document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = location.pathname;
    const miTienda = main();

    // ==========================================
    // ====== VALIDACION DE LOS FORMULARIO ======
    // ==========================================
    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                event.stopPropagation();

                let esValido = realizarMiValidacion(form, miTienda);

                if (form.checkValidity() && esValido) {
                    // form.submit();
                    console.log("Es valido");

                    //===================================================
                    //==== Funciones que necesitan de la validacion =====
                    //===================================================
                    if (currentUrl.search("02cliente") !== -1) {
                        //==================
                        //==== Cliente =====
                        //==================
                        agregarCliente(form, miTienda);
                        cargarActualizarClientes(miTienda, document.querySelector("#bodyClientes"));
                    }

                    form.reset();
                    form.classList.remove("was-validated");
                } else {
                    console.log("NO ES valido");
                    form.classList.add("was-validated");
                }
            }, false);
        })
    })();

    if (currentUrl.search("01catalogo") !== -1) {
        //===================
        //==== Catalogo =====
        //===================
        cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"));
        document.querySelectorAll('[data-bs-toggle="modal"]').forEach(modal => {
            modal.addEventListener("click", () => actualizarDatosModal(document.querySelector(".modal"), modal.querySelector("p").textContent, miTienda));
        });
        document.querySelector("#filterForm").addEventListener("submit", (e) => cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"), miTienda.lector.leerCadena(this, "buscador"), e));
    } else if (currentUrl.search("02cliente") !== -1) {
        //==================
        //==== Cliente =====
        //==================
        cargarActualizarClientes(miTienda, document.querySelector("#bodyClientes"));
        // document.querySelector("#agregarClienteForm").addEventListener("submit", function (e) { agregarCliente(this, miTienda, e) });
    } else if (currentUrl.search("03nuevoLibro") !== -1) {
        //======================
        //==== Nuevo Libro =====
        //======================
    } else if (currentUrl.search("04crearPedido") !== -1) {
        //==========================
        //==== Crear un pedido =====
        //==========================
    } else {
        //===========================
        //==== Web no existente =====
        //===========================
    }
});

// =============================================
// ====== FUNCION QUE CARGA LA APLICACION ======
// =============================================
function main() {
    // try {
    const miTienda = Tienda.gerInstancia("Vivanco Ordemar");
    // miTienda.iniciar();
    miTienda.cargarDatosPrueba();

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

function cargarActualizarClientes(tienda, bodyTable) {
    bodyTable.innerHTML = "";

    const clientes = tienda.mostrarClientes();

    clientes.forEach(cliente => {
        bodyTable.innerHTML += `
                <tr>
                    <td>${cliente.dni}</td>
                    <td>${cliente.nombreCompleto}</td>
                    <td>${cliente.direccion ?? "Ilimitado (digital)"}</td>
                    <td>
                        <button class="btn btn-warning btn-detalle" type="button" ><i class="bi bi-eye-fill"></i><p class="d-none">${cliente.dni}</p></button>
                    </td>
                </tr>
        `;
    });

    // Darle el listener a los botones para que abran la ventana de informacion lateral
    document.querySelectorAll(".btn-detalle").forEach(detalle => {
        detalle.addEventListener("click", mostrarDetalle);
    });
}

function mostrarDetalle() {
    document.querySelector("#detalleCard").classList.toggle("d-none");
    
}

function agregarCliente(form, miTienda) {

    // console.log(form.dni.value);
    // console.log(form.nombreCompleto.value);
    // console.log(form.direccion.value);

    const cliente = new Cliente(Number(form.dni.value), form.nombreCompleto.value, form.direccion.value);


    try {
        miTienda.agregarCliente(cliente);
        console.error("Paso");
    } catch (error) {
        console.error(error);
    }
}

function actualizarDatosModal(modal, isbn, miTienda) {
    const libro = miTienda.pedirLibroPorISBN(Number(isbn));
    modal.querySelector(".modal-title").innerHTML = libro.titulo;
    modal.querySelector(".modal-body").innerHTML = libro.mostrarDatosLibro();
}

function realizarMiValidacion(form, miTienda) {
    let esValido = true;
    const currentUrl = location.pathname;

    if (currentUrl.search("01catalogo") !== -1) {
        //===================
        //==== Catalogo =====
        //===================
    } else if (currentUrl.search("02cliente") !== -1) {
        //==================
        //==== Cliente =====
        //==================
        if (miTienda.clientes.existeClientePorDNI(Number(form.dni.value))) {
            esValido = false;
            form.dni.setCustomValidity("El dni ya existe"); // Para marcar como invalido un campo usando bootstrap
        } else {
            esValido = true;
            form.dni.setCustomValidity("");
        }

    } else if (currentUrl.search("03nuevoLibro") !== -1) {
        //======================
        //==== Nuevo Libro =====
        //======================
    } else if (currentUrl.search("04crearPedido") !== -1) {
        //==========================
        //==== Crear un pedido =====
        //==========================
    } else {
        //===========================
        //==== Web no existente =====
        //===========================
    }

    // const passwordInput = form.querySelector("#password");
    // const repasswordInput = form.querySelector("#repassword");

    // if (!passwordInput || !repasswordInput) {
    //     throw new Error("Campos de contraseña no encontrados");
    // }

    // const contrasenasValidas = mismaPwd(passwordInput,
    //     repasswordInput);
    // //Lo hacemos así porque luego vamos a añadir más validaciones.
    // esValido = contrasenasValidas && esValido;

    // ... otras validaciones ...

    return esValido;
}
