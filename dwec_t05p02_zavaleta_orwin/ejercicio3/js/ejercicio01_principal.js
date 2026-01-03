console.log("T04P02 - Ejercicio 01 - Principal");
//TODO: mudar todas las funciones necesarias a pedido y pedidos

// =======================================
// ====== ASIGNACION DE LOS EVENTOS ======
// =======================================
document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = location.pathname;
    const miTienda = main();

    if (currentUrl.includes("01catalogo")) initPaginaCalogo(miTienda);
    else if (currentUrl.includes("02cliente")) initPaginaCliente(miTienda);
    else if (currentUrl.includes("03nuevoLibro")) initPaginaNuevoLibro(miTienda);
    else if (currentUrl.includes("04crearPedido")) initPaginaCrearPedido(miTienda);

    // ==========================================
    // ====== VALIDACION DE LOS FORMULARIO ======
    // ==========================================
    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener("submit", function (event) { handleFormSubmit(event, form, miTienda) }, false);
        })
    })();
});

//===================
//==== Catalogo =====
//===================
function handleFormSubmit(event, form, miTienda) {
    event.preventDefault();
    event.stopPropagation();

    const currentUrl = location.pathname;
    let esValido = realizarMiValidacion(form, miTienda);

    if (form.checkValidity() && esValido) {
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
            crearNuevoLibro(form, miTienda);
        } else if (currentUrl.search("04crearPedido") !== -1) {
            //==========================
            //==== Crear un pedido =====
            //==========================
            if (form.id === "seleccionarCliente") seleccionarCliente(form, miTienda);
            else if (form.id === "buscarLibros") buscarLibro(form, miTienda);
            else if (form.id === "seleccionarLibros") seleccionarLibro(form, miTienda);
            else if (form.id === "seleccionarTipoEnvio") seleccionarTipoEnvio(form, miTienda);
        }
        form.reset();
        form.classList.remove("was-validated");
    } else {
        console.log("NO ES valido");
        form.classList.add("was-validated");
    }
}

function crearNuevoLibro(form, miTienda) {
    // TODO: crear el libro
}

function seleccionarCliente(form, miTienda) {
    try {
        const dniCliente = miTienda.lector.leerEntero(form, "dni");

        document.querySelector("#dniPedido").value = dniCliente;
        // console.log(dniCliente);
        form.dni.disabled = true;
        form.querySelector("#buscarCliente").disabled = true;
        document.querySelector("#deseleccionarCliente").disabled = false;
        form.querySelector("#clienteSeleccionado").textContent = miTienda.pedirClientePorDni(Number(dniCliente)).nombreCompleto;

        habilitarCamposPedido();
    } catch (error) {
        activarAlert("Error en busqueda de el cliente: " + error.message);
    }
}

function buscarLibro(form, miTienda) {
    try {
        const isbnLibroPedido = miTienda.lector.leerEntero(form, "isbn");
        console.log(isbnLibroPedido);
        form.isbn.disabled = true;
        form.querySelector("#buscarLibro").disabled = true;

        const libroAux = miTienda.pedirLibroPorISBN(Number(isbnLibroPedido));

        document.querySelector("#isbnLibroSeleccionado").value = isbnLibroPedido;
        if (libroAux instanceof Ebook) {
            document.querySelector("#cantidadLibros").value = 1;
            document.querySelector("#cantidadLibros").disabled = true;
            document.querySelector("#libroSeleccionado").textContent = libroAux.titulo + "(Ebook)";
        } else {
            document.querySelector("#cantidadLibros").disabled = false;
            document.querySelector("#libroSeleccionado").textContent = libroAux.titulo + "(Papel)";
        }
        document.querySelector("#agregarLibro").disabled = false;
    } catch (error) {
        activarAlert("Error en busqueda de el libro: " + error.message);
    }
}

function seleccionarLibro(form, miTienda) {
    try {
        const isbnLibroSeleccionado = miTienda.lector.leerEntero(form, "isbnLibroSeleccionado");
        const cantidadLibrosSeleccionado = miTienda.lector.leerEntero(form, "cantidadLibros");
        const librosEnPedido = optenerLibrosEnPedido()
        librosEnPedido.push({ isbn: isbnLibroSeleccionado, cantidad: cantidadLibrosSeleccionado });
        sessionStorage.setItem("librosPedidos", JSON.stringify(librosEnPedido));

        document.querySelector("#isbn").disabled = false;
        document.querySelector("#buscarLibro").disabled = false;

        document.querySelector("#isbnLibroSeleccionado").value = "";
        document.querySelector("#libroSeleccionado").textContent = "NNNNNN";
        document.querySelector("#cantidadLibros").disabled = true;
        document.querySelector("#agregarLibro").disabled = true;

        cargarActualizarLibrosPedido(document.querySelector("#tbodyResumen"), document.querySelector("#precioFinalTotal"), miTienda);
    } catch (error) {
        activarAlert("Error al guardar el Libro: " + error.message);
    }
}

function seleccionarTipoEnvio(form, miTienda) {
    try {
        const tipoEnvioSeleccionado = miTienda.lector.leerEntero(form, "tipoEnvio");
        document.querySelector("#tipoFinalEnvio").textContent = tipoEnvioSeleccionado;
        document.querySelector("#precioFinalEnvio").textContent = miTienda.pedirTipoEnvioPorNombre(tipoEnvioSeleccionado).precioSinIVA;
    } catch (error) {
        activarAlert("Error al seleccionar el Tipo de Envio: " + error.message);
    }
}

//===================
//==== Catalogo =====
//===================
function initPaginaCalogo(miTienda) {
    cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"));
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(modal => {
        modal.addEventListener("click", () => actualizarDatosModal(document.querySelector(".modal"), modal.querySelector("p").textContent, miTienda));
    });
    document.querySelector("#filterForm").addEventListener("submit", (e) => cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"), miTienda.lector.leerCadena(this, "buscador"), e));
}
//==================
//==== Cliente =====
//==================
function initPaginaCliente(miTienda) {
    cargarActualizarClientes(miTienda, document.querySelector("#bodyClientes"));
}
//======================
//==== Nuevo Libro =====
//======================
function initPaginaNuevoLibro(miTienda) {
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
}
//==========================
//==== Crear un pedido =====
//==========================
function initPaginaCrearPedido(miTienda) {
    const tipoEnvio = document.querySelector("#tipoEnvio");
    tipoEnvio.innerHTML = "<option selected disabled value=''>Selecciona un tipo de envio</option>";;
    miTienda.mostrarTiposEnvios().forEach(tipo => {
        tipoEnvio.innerHTML += `<option value="${tipo.nombre}">${tipo.nombre}</option>`;
    });

    document.querySelector("#deseleccionarCliente").addEventListener("click", reiniciarPedido);
    document.querySelector("#cancelarPedido").addEventListener("click", reiniciarPedido);


}

// =============================================
// ====== FUNCION QUE CARGA LA APLICACION ======
// =============================================
function main() {
    //TODO: main es quien debe de quedarse ejecutando
    try {
        const miTienda = Tienda.gerInstancia("Vivanco Ordemar");
        // miTienda.iniciar();
        miTienda.cargarDatosPrueba();

        return miTienda;
    } catch (error) {
        console.log("Error en la ejecución: " + error.message);
        activarAlert("Error en la ejecución: " + error.message);
    }
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

function activarAlert(mensaje) {
    const alert = document.querySelector(".alert");

    alert.classList.remove("d-none");
    alert.textContent = mensaje;

    setTimeout(() => {
        alert.classList.add("d-none");
    }, 3000);
}

function reiniciarPedido() {
    document.querySelector("#dni").disabled = false;
    document.querySelector("#deseleccionarCliente").disabled = true;
    document.querySelector("#buscarCliente").disabled = false;
    document.querySelector("#clienteSeleccionado").textContent = "NNNNNN";
    document.querySelector("#tipoFinalEnvio").textContent = "--";
    document.querySelector("#precioFinalEnvio").textContent = "0";

    const elementos1 = document.querySelector("#buscarLibros").elements;

    for (let i = 0; i < elementos1.length; i++) {
        elementos1[i].disabled = true;
    }
    const elementos2 = document.querySelector("#seleccionarTipoEnvio").elements;

    for (let i = 0; i < elementos2.length; i++) {
        elementos2[i].disabled = true;
    }

    sessionStorage.setItem("librosPedidos", "[]");

    cargarActualizarLibrosPedido(document.querySelector("#tbodyResumen"), document.querySelector("#precioFinalTotal"));
}

function habilitarCamposPedido() {
    const elementos1 = document.querySelector("#buscarLibros").elements;

    for (let i = 0; i < elementos1.length; i++) {
        elementos1[i].disabled = false;
    }
    const elementos2 = document.querySelector("#seleccionarTipoEnvio").elements;

    for (let i = 0; i < elementos2.length; i++) {
        elementos2[i].disabled = false;
    }
}


function cargarActualizarLibrosPedido(tbody, totalSpan, miTienda = null) {
    const librosEnPedido = optenerLibrosEnPedido()
    let acumPrecioTotal = 0;
    tbody.innerHTML = "";
    if (miTienda) {
        librosEnPedido.forEach(libroPed => {
            const libro = miTienda.pedirLibroPorISBN(Number(libroPed.isbn));
            acumPrecioTotal += libroPed.cantidad * libro.precio;
            tbody.innerHTML += `
                <tr>
                    <th scope="row">${libroPed.isbn}</th>
                    <td>${libro.titulo}</td>
                    <td>${libroPed.cantidad}</td>
                    <td>${libro.precio}</td>
                    <td>${(libroPed.cantidad * libro.precio)}</td>
                </tr>
            `;
        });
    }
    actualizarTotal(totalSpan, acumPrecioTotal);
}

function actualizarTotal(totalSpan, total) {
    totalSpan.textContent = total;
}

function comprobarSiTodosLibrosEbook(miTienda) {
    const librosEnPedido = optenerLibrosEnPedido()

    let todosEbook = true;

    for (let i = 0; i < librosEnPedido.length; i++) {
        if (miTienda.pedirLibroPorISBN(Number(librosEnPedido[i].isbn)) instanceof LibroPapel) {
            todosEbook = false;
            break;
        }
    }

    return todosEbook;
}

function optenerLibrosEnPedido() {
    return JSON.parse(sessionStorage.getItem("librosPedidos")) ?? [];
}

//========================
//==== Mi Validacion =====
//========================
function realizarMiValidacion(form, miTienda) {
    let esValido = true;
    const currentUrl = location.pathname;

    if (currentUrl.includes("02cliente")) {
        //==================
        //==== Cliente =====
        //==================
        try {
            const dni = miTienda.lector.leerEntero(form, "dni");

            if (miTienda.clientes.existeClientePorDNI(dni)) {
                esValido &= false;
                form.dni.setCustomValidity("El dni ya existe"); // Para marcar como invalido un campo usando bootstrap
            } else {
                esValido &= true;
                form.dni.setCustomValidity("");
            }
        } catch (error) {
            activarAlert("Error la validacion del dni: " + error.message);
            esValido &= false;
        }
    } else if (currentUrl.includes("03nuevoLibro")) {
        //======================
        //==== Nuevo Libro =====
        //======================
        try {
            const isbn = miTienda.lector.leerEntero(form, "isbn");
            const genero = miTienda.lector.leerEntero(form, "genero");
            const nombreAutor = miTienda.lector.leerEntero(form, "nombreAutor");

            if (miTienda.libros.existeLibroPorIsbn(isbn)) {
                esValido &= false;
                form.isbn.setCustomValidity("El isbn ya existe");
            } else {
                esValido &= true;
                form.isbn.setCustomValidity("");
            }

            if (!Libro.validarGenero(genero)) {
                esValido &= false;
                form.genero.setCustomValidity("El genero ya existe");
            } else {
                esValido &= true;
                form.genero.setCustomValidity("");
            }

            if (miTienda.autores.existeAutorPorNombre(nombreAutor)) {
                esValido &= false;
                form.nombreAutor.setCustomValidity("El autor ya existe");
            } else {
                esValido &= true;
                form.nombreAutor.setCustomValidity("");
            }
        } catch (error) {
            activarAlert("Error la validacion del nuevo libro: " + error.message);
            esValido &= false;
        }
    } else if (currentUrl.includes("04crearPedido")) {
        //==========================
        //==== Crear un pedido =====
        //==========================
        try {
            if (form.id === "seleccionarCliente") {
                const dni = miTienda.lector.leerEntero(form, "dni");
                if (!miTienda.clientes.existeClientePorDNI(dni)) {
                    esValido &= false;
                    form.dni.setCustomValidity("El dni ya existe");
                } else {
                    esValido &= true;
                    form.dni.setCustomValidity("");
                }
            } else if (form.id === "buscarLibros") {
                const isbn = miTienda.lector.leerEntero(form, "isbn");
                if (!miTienda.libros.existeLibroPorIsbn(isbn)) {
                    esValido &= false;
                    form.isbn.setCustomValidity("El isbn no existe");
                } else {
                    esValido &= true;
                    form.isbn.setCustomValidity("");
                }
            } else if (form.id === "seleccionarTipoEnvio") {
                const tipoEnvio = miTienda.lector.leerEntero(form, "tipoEnvio");
                if (!miTienda.tiposEnvio.existeTipoPorNombre(tipoEnvio)) {
                    esValido &= false;
                    form.tipoEnvio.setCustomValidity("El tipo de envio seleccionado no existe");
                } else {
                    esValido &= true;
                    form.tipoEnvio.setCustomValidity("");
                }
                if (comprobarSiTodosLibrosEbook(miTienda)) {
                    esValido &= false;
                    form.tipoEnvio.setCustomValidity("Todos son ebooks");
                } else {
                    esValido &= true;
                    form.tipoEnvio.setCustomValidity("");
                }
            }
        } catch (error) {
            activarAlert("Error la validacion del dni: " + error.message);
            esValido &= false;
        }
    }
    return esValido;
}
