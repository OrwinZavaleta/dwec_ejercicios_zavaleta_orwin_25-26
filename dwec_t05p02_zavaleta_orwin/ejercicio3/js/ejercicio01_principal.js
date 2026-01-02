console.log("T04P02 - Ejercicio 01 - Principal");

//TODO: separar el codigo en funciones
//TODO: usar las funciones de leerDatos

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
                    } else if (currentUrl.search("03nuevoLibro") !== -1) {
                        //======================
                        //==== Nuevo Libro =====
                        //======================

                        // TODO: crear el libro
                    } else if (currentUrl.search("04crearPedido") !== -1) {
                        //==========================
                        //==== Crear un pedido =====
                        //==========================

                        if (form.id === "seleccionarCliente") {
                            document.querySelector("#dniPedido").value = form.dni.value;
                            console.log(form.dni.value);
                            form.dni.disabled = true;
                            form.querySelector("#buscarCliente").disabled = true;
                            form.querySelector("#clienteSeleccionado").textContent = miTienda.pedirClientePorDni(Number(form.dni.value)).nombreCompleto;


                        } else if (form.id === "buscarLibros") {
                            console.log(form.isbn.value);
                            form.isbn.disabled = true;
                            form.querySelector("#buscarLibro").disabled = true;

                            document.querySelector("#isbnLibroSeleccionado").value = form.isbn.value;
                            document.querySelector("#libroSeleccionado").textContent = miTienda.pedirLibroPorISBN(Number(form.isbn.value)).titulo;
                            document.querySelector("#cantidadLibros").disabled = false;
                            document.querySelector("#deseleccionarLibro").disabled = false;
                        } else if (form.id === "seleccionarLibros") {
                            const librosEnPedido = JSON.parse(sessionStorage.getItem("librosPedidos")) ?? [];
                            librosEnPedido.push({ isbn: form.isbnLibroSeleccionado.value, cantidad: form.cantidadLibros.value });
                            sessionStorage.setItem("librosPedidos", JSON.stringify(librosEnPedido));

                            document.querySelector("#isbn").disabled = false;
                            document.querySelector("#buscarLibro").disabled = false;

                            document.querySelector("#isbnLibroSeleccionado").value = "";
                            document.querySelector("#libroSeleccionado").textContent = "NNNNNN";
                            document.querySelector("#cantidadLibros").disabled = true;
                            document.querySelector("#deseleccionarLibro").disabled = true;

                        }
                    }

                    form.reset();
                    form.classList.remove("was-validated");
                } else {
                    console.log("NO ES valido");
                    form.classList.add("was-validated");
                    const invalidFields = form.querySelectorAll(':invalid');

                    invalidFields.forEach(field => {
                        console.log('Campo inválido detectado:');
                        console.log('- Nombre/ID:', field.name || field.id);
                        console.log('- Tipo:', field.type);
                        console.log('- Razón del error:', field.validationMessage);
                        console.log('- Elemento completo:', field);
                    });
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
        // document.querySelector("#cerrarCardDetalle").addEventListener("click", () => {
        //     document.querySelector("#detalleCard").classList.add("d-none")
        // });
        // document.querySelector("#agregarClienteForm").addEventListener("submit", function (e) { agregarCliente(this, miTienda, e) });
    } else if (currentUrl.search("03nuevoLibro") !== -1) {
        //======================
        //==== Nuevo Libro =====
        //======================
        const selectGeneros = document.querySelector("#genero");
        selectGeneros.innerHTML = "<option selected disabled value=''>Selecciona un genero</option>";
        Libro.GENEROS_LITERARIOS.forEach(genero => {
            selectGeneros.innerHTML += `<option value="${genero}">${genero}</option>`;
        });

        const tiposLibros = document.querySelectorAll("input[name='tipo']");
        tiposLibros.forEach(tipo => tipo.addEventListener("change", (e) => {
            const ebookDetalles = document.querySelector("#ebookDetalles");
            const papelDetalles = document.querySelector("#papelDetalles");
            if (e.target.value === "ebook") {
                ebookDetalles.classList.remove("d-none");
                papelDetalles.classList.add("d-none");

                ebookDetalles.querySelectorAll("input").forEach(input => input.disabled = false);
                ebookDetalles.querySelectorAll("select").forEach(select => select.disabled = false);
                papelDetalles.querySelectorAll("input").forEach(input => input.disabled = true);

            } else if (e.target.value === "papel") {
                papelDetalles.classList.remove("d-none");
                ebookDetalles.classList.add("d-none");

                ebookDetalles.querySelectorAll("input").forEach(input => input.disabled = true);
                ebookDetalles.querySelectorAll("select").forEach(select => select.disabled = true);
                papelDetalles.querySelectorAll("input").forEach(input => input.disabled = false);
            }
        }));

        const selectFormato = document.querySelector("#formato");
        selectFormato.innerHTML = "<option selected disabled value=''>Selecciona un Formato</option>";
        Ebook.FORMATOS.forEach(formato => {
            selectFormato.innerHTML += `<option value="${formato}">${formato}</option>`;
        })
        const selectAutores = document.querySelector("#autor");
        selectAutores.innerHTML = "<option selected disabled value=''>Selecciona un Autor</option>";
        miTienda.mostrarAutores().sort((a, b) => a.nombre.localeCompare(b.nombre)).forEach(autor => {
            selectAutores.innerHTML += `<option value="${autor.id}">${autor.nombre}</option>`;
        })

    } else if (currentUrl.search("04crearPedido") !== -1) {
        //==========================
        //==== Crear un pedido =====
        //==========================

        const tipoEnvio = document.querySelector("#tipoEnvio");
        tipoEnvio.innerHTML = "<option selected disabled value=''>Selecciona un tipo de envio</option>";;
        miTienda.mostrarTiposEnvios().forEach(tipo => {
            tipoEnvio.innerHTML += `<option value="${tipo.nombre}">${tipo.nombre}</option>`;
        });

        document.querySelector("#deseleccionarCliente").addEventListener("click", () => {
            document.querySelector("#dni").disabled = false;
            document.querySelector("#buscarCliente").disabled = false;
            document.querySelector("#clienteSeleccionado").textContent = "NNNNNN";
            //TODO: limpiar todo los formularios
        });

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

    clientes.toReversed().forEach(cliente => {
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
        detalle.addEventListener("click", () => mostrarDetalle(detalle.querySelector("p").textContent, tienda));
    });
}

function mostrarDetalle(dni, miTienda) {
    const cartDetalle = document.querySelector("#detalleCard");
    cartDetalle.classList.remove("d-none");
    cartDetalle.innerHTML = "";
    const cliente = miTienda.pedirClientePorDni(Number(dni));

    cliente.mostrarPedidosCliente().forEach(pedido => {
        cartDetalle.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${pedido.id + " - " + pedido.fecha}</h5>
                    ${pedido.obtenerLibrosPedidos(miTienda.libros).map(libro => `<p class="card-text"> • ${libro.titulo}</p>`).join('')}
                </div>
            </div>`;
    })
    // cartDetalle.querySelector(".card-title").textContent = cliente.dni + " - " +cliente.nombreCompleto
    // cartDetalle.querySelector(".card-text").innerHTML = cliente.mostrarPedidosCliente();
}

function agregarCliente(form, miTienda) {
    const cliente = new Cliente(Number(form.dni.value), form.nombreCompleto.value, form.direccion.value);

    try {
        miTienda.agregarCliente(cliente);
    } catch (error) {
        console.error(error);
    }
}

function actualizarDatosModal(modal, isbn, miTienda) {
    const libro = miTienda.pedirLibroPorISBN(Number(isbn));
    modal.querySelector(".modal-title").innerHTML = libro.titulo;
    modal.querySelector(".modal-body").innerHTML = libro.mostrarDatosLibro();
}

//========================
//==== Mi Validacion =====
//========================
function realizarMiValidacion(form, miTienda) {
    let esValido = true;
    const currentUrl = location.pathname;

    if (currentUrl.search("02cliente") !== -1) {
        //==================
        //==== Cliente =====
        //==================
        if (miTienda.clientes.existeClientePorDNI(Number(form.dni.value))) {
            esValido &= false;
            form.dni.setCustomValidity("El dni ya existe"); // Para marcar como invalido un campo usando bootstrap
        } else {
            esValido &= true;
            form.dni.setCustomValidity("");
        }
    } else if (currentUrl.search("03nuevoLibro") !== -1) {
        //======================
        //==== Nuevo Libro =====
        //======================

        if (miTienda.libros.existeLibroPorIsbn(Number(form.isbn.value))) {
            esValido &= false;
            form.isbn.setCustomValidity("El isbn ya existe");
        } else {
            esValido &= true;
            form.isbn.setCustomValidity("");
        }

        if (!Libro.validarGenero(form.genero.value)) {
            esValido &= false;
            form.genero.setCustomValidity("El genero ya existe");
        } else {
            esValido &= true;
            form.genero.setCustomValidity("");
        }

        if (miTienda.autores.existeAutorPorNombre(form.nombreAutor.value)) {
            esValido &= false;
            form.nombreAutor.setCustomValidity("El autor ya existe");
        } else {
            esValido &= true;
            form.nombreAutor.setCustomValidity("");
        }

    } else if (currentUrl.search("04crearPedido") !== -1) {
        //==========================
        //==== Crear un pedido =====
        //==========================
        if (form.id === "seleccionarCliente") {
            if (!miTienda.clientes.existeClientePorDNI(Number(form.dni.value))) {
                esValido &= false;
                form.dni.setCustomValidity("El dni ya existe");
            } else {
                esValido &= true;
                form.dni.setCustomValidity("");
            }
        } else if (form.id === "buscarLibros") {
            if (!miTienda.libros.existeLibroPorIsbn(Number(form.isbn.value))) {
                esValido &= false;
                form.isbn.setCustomValidity("El isbn no existe");
            } else {
                esValido &= true;
                form.isbn.setCustomValidity("");
            }
        }

    } else {
        //===========================
        //==== Web no existente =====
        //===========================
    }

    return esValido;
}
