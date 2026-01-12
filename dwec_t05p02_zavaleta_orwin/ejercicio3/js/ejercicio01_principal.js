console.log("T04P02 - Ejercicio 01 - Principal");
//TODO: mudar todas las funciones necesarias a pedido y pedidos

// =======================================
// ====== ASIGNACION DE LOS EVENTOS ======
// =======================================
document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = location.pathname;
    const miTienda = main();

    if (currentUrl.includes("01catalogo")) initPaginaCatalogo(miTienda);
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

        // const invalidFields = form.querySelectorAll(':invalid');

        // invalidFields.forEach(field => {
        //     console.log('Campo inválido detectado:');
        //     console.log('- Nombre/ID:', field.name || field.id);
        //     console.log('- Tipo:', field.type);
        //     console.log('- Razón del error:', field.validationMessage);
        //     console.log('- Elemento completo:', field);
        // });
    }
}

function crearNuevoLibro(form, miTienda) {
    try {
        let isbn = miTienda.lector.leerEntero(form, "isbn");
        let titulo = miTienda.lector.leerCadena(form, "titulo", Util.validarTitulo);
        let genero = miTienda.lector.leerCadena(form, "genero", (b) => Util.validarGenero(b, Libro.GENEROS_LITERARIOS));
        let precio = miTienda.lector.leerReal(form, "precio", Util.validarPrecio);
        let tipo = miTienda.lector.leerCadena(form, "tipo");
        const autores = [];

        try {
            const aux = new Autor(miTienda.lector.leerCadena(form, "nombreAutor"));
            miTienda.agregarAutor([aux]);
            autores.push(aux);
        } catch (error) {
            Array.from(form.autor.selectedOptions).forEach(op => {
                const autorEncontrado = miTienda.pedirAutorPorId(Number(op.value));
                autores.push(autorEncontrado);
            });
        }

        let libroCreado = null;

        if (tipo === "ebook") {
            let tamanoArchivo = miTienda.lector.leerEntero(form, "tamanoArchivo");
            let formato = miTienda.lector.leerCadena(form, "formato");

            libroCreado = new Ebook(isbn, titulo, genero, autores, precio, tamanoArchivo, formato);

        } else if (tipo === "papel") {
            let peso = miTienda.lector.leerEntero(form, "peso");
            let dimensiones = miTienda.lector.leerCadena(form, "dimensiones");
            let stock = miTienda.lector.leerEntero(form, "stock");

            libroCreado = new LibroPapel(isbn, titulo, genero, autores, precio, peso, dimensiones, stock);
        }
        // console.log(autores);
        // console.log(libroCreado);

        autores.forEach(a => a.insertarLibro(libroCreado));

        miTienda.agregarLibro(libroCreado);

        console.log("Libro creado con exito");

        activarAlert("LIBRO CREADO CON EXITO", true);
        console.log(libroCreado);


    } catch (error) {
        activarAlert("Error en la creacion del libro: " + error.message);
    }
}

function seleccionarCliente(form, miTienda) {
    try {
        const dniCliente = miTienda.lector.leerEntero(form, "dni");
        const cliente = miTienda.pedirClientePorDni(dniCliente);

        // Uso miTienda para almacenar el pedido actual
        miTienda.pedidoActual = new Pedido(cliente)

        document.querySelector("#dniPedido").value = dniCliente;
        // console.log(dniCliente);
        form.dni.disabled = true;
        form.querySelector("#buscarCliente").disabled = true;
        document.querySelector("#deseleccionarCliente").disabled = false;
        form.querySelector("#clienteSeleccionado").textContent = cliente.nombreCompleto;

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

        const libroAux = miTienda.pedirLibroPorISBN(isbnLibroPedido);

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

        const libroAux = miTienda.pedirLibroPorISBN(isbnLibroSeleccionado);
        miTienda.pedidoActual.insertarLibro(libroAux, cantidadLibrosSeleccionado)

        document.querySelector("#isbn").disabled = false;
        document.querySelector("#buscarLibro").disabled = false;

        document.querySelector("#isbnLibroSeleccionado").value = "";
        document.querySelector("#libroSeleccionado").textContent = "NNNNNN";
        document.querySelector("#cantidadLibros").disabled = true;
        document.querySelector("#agregarLibro").disabled = true;

        cargarActualizarLibrosPedido(document.querySelector("#tbodyResumen"), document.querySelector("#precioFinalTotalSinIVA"), document.querySelector("#precioFinalTotalConIVA"), miTienda);
    } catch (error) {
        activarAlert("Error al guardar el Libro: " + error.message);
    }
}

function seleccionarTipoEnvio(form, miTienda) {
    try {
        const tipoEnvioSeleccionado = miTienda.lector.leerCadena(form, "tipoEnvio");
        const tipoEnvio = miTienda.pedirTipoEnvioPorNombre(tipoEnvioSeleccionado)

        miTienda.pedidoActual.establecerTipoEnvio(tipoEnvio, miTienda.libros)
        actualizarTotal(document.querySelector("#precioFinalTotalSinIVA"), document.querySelector("#precioFinalTotalConIVA"));

        document.querySelector("#tipoFinalEnvio").textContent = tipoEnvioSeleccionado;
        document.querySelector("#precioFinalEnvio").textContent = tipoEnvio.precioSinIVA;
    } catch (error) {
        activarAlert("Error al seleccionar el Tipo de Envio: " + error.message);
    }
}

//===================
//==== Catalogo =====
//===================
function initPaginaCatalogo(miTienda) {
    cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"));
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(modal => {
        modal.addEventListener("click", () => actualizarDatosModal(document.querySelector(".modal"), modal.querySelector("p").textContent, miTienda));
    });
    document.querySelector("#filterForm").addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"), miTienda.lector.leerCadena(this, "buscador"));
        } catch (error) {
            cargarActualizarLibros(miTienda, document.querySelector("#bodyCatalogo"));
            // activarAlert("Error al leer los datos de buscador: " + error.message);
        }
    });
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
    selectAutores.innerHTML = "";
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
    document.querySelector("#pagarPedido").addEventListener("click", pagarPedido);


}

function pagarPedido() {
    const miTienda = Tienda.getInstancia();
    const pedidoActual = miTienda.pedidoActual;

    try {

        if (!pedidoActual.comprobarTodosEbook(miTienda.libros) && !pedidoActual.tipoEnvioPedido) {
            document.querySelector("#tipoEnvio").setCustomValidity("debe elegir uno");
            document.querySelector("#seleccionarTipoEnvio").classList.add("was-validated");
            activarAlert("Debe elegir un tipo de envio");
        } else {
            console.log(pedidoActual.librosPedido.size);
            console.log(pedidoActual.librosPedido.size < 1);

            if (pedidoActual.librosPedido.size < 1) {
                activarAlert("Debe seleccionar al menos un libro");
            } else {
                try {
                    miTienda.agregarNuevoPedido(pedidoActual);
                    console.log("Pedido insertado con exito");
                    activarAlert("PEDIDO INSERTADO CON EXITO", true);
                    console.log(pedidoActual);
                    reiniciarPedido();
                } catch (error) {
                    activarAlert("Error al agregar el pedido: " + error.message);
                }
            }
        }
    } catch (error) {
        activarAlert("No hay pedido activo");
    }
}

// =============================================
// ====== FUNCION QUE CARGA LA APLICACION ======
// =============================================
function main() {
    try {
        const miTienda = Tienda.getInstancia("Vivanco Ordemar");
        miTienda.pedidoActual = null;
        // miTienda.iniciar();
        miTienda.cargarDatosPrueba();

        return miTienda;
    } catch (error) {
        console.log("Error en la ejecución: " + error.message);
        activarAlert("Error en la ejecución: " + error.message);
    }
}

function cargarActualizarLibros(tienda, bodyTable, query = "") {
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

    const pedidosCliente = cliente.mostrarPedidosCliente();
    pedidosCliente.forEach(pedido => {
        cartDetalle.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${pedido.id + " - " + pedido.fecha}</h5>
                    ${pedido.obtenerLibrosPedidos(miTienda.libros).map(libro => `<p class="card-text"> • ${libro.titulo}</p>`).join('')}
                </div>
            </div>`;
    });

    if (pedidosCliente.length === 0) {
        cartDetalle.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">No ha realizado ningun pedido</h5>
                </div>
            </div>`;
    }
    // cartDetalle.querySelector(".card-title").textContent = cliente.dni + " - " +cliente.nombreCompleto
    // cartDetalle.querySelector(".card-text").innerHTML = cliente.mostrarPedidosCliente();
}

function agregarCliente(form, miTienda) {
    try {
        const dni = miTienda.lector.leerEntero(form, "dni");
        const nombreCompleto = miTienda.lector.leerCadena(form, "nombreCompleto");
        const direccion = miTienda.lector.leerCadena(form, "direccion");
        const cliente = new Cliente(dni, nombreCompleto, direccion);

        miTienda.agregarCliente(cliente);
    } catch (error) {
        activarAlert("Error al agregar el cliente: " + error.message);
        console.error(error);
    }
}

function actualizarDatosModal(modal, isbn, miTienda) {
    const libro = miTienda.pedirLibroPorISBN(Number(isbn));
    modal.querySelector(".modal-title").innerHTML = libro.titulo;
    modal.querySelector(".modal-body").innerHTML = libro.mostrarDatosLibro();
}

function activarAlert(mensaje, success) {
    const alert = document.querySelector(".alert");

    if (success) {
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
    } else {
        alert.classList.add("alert-danger");
        alert.classList.remove("alert-success");

    }

    alert.classList.remove("d-none");
    alert.textContent = mensaje;

    setTimeout(() => {
        alert.classList.add("d-none");
    }, 3000);
}

function reiniciarPedido() {
    const miTienda = Tienda.getInstancia();
    miTienda.pedidoActual = null;

    document.querySelector("#dni").disabled = false;
    document.querySelector("#deseleccionarCliente").disabled = true;
    document.querySelector("#buscarCliente").disabled = false;
    document.querySelector("#clienteSeleccionado").textContent = "NNNNNN";
    document.querySelector("#tipoFinalEnvio").textContent = "--";
    document.querySelector("#precioFinalTotalSinIVA").textContent = "0";
    document.querySelector("#precioFinalEnvio").textContent = "0";
    document.querySelector("#precioFinalTotalConIVA").textContent = "0";

    const elementos1 = document.querySelector("#buscarLibros").elements;

    for (let i = 0; i < elementos1.length; i++) {
        elementos1[i].disabled = true;
    }
    const elementos2 = document.querySelector("#seleccionarTipoEnvio").elements;

    for (let i = 0; i < elementos2.length; i++) {
        elementos2[i].disabled = true;
    }

    cargarActualizarLibrosPedido(document.querySelector("#tbodyResumen"), document.querySelector("#precioFinalTotalSinIVA"), document.querySelector("#precioFinalTotalConIVA"), miTienda);
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


function cargarActualizarLibrosPedido(tbody, totalSpanSinIva, totalSpanConIva, miTienda) {
    const librosEnPedido = miTienda.pedidoActual?.librosPedido ?? new Map();

    tbody.innerHTML = "";
    librosEnPedido.forEach((cantidad, isbn) => {
        const libro = miTienda.pedirLibroPorISBN(Number(isbn));
        tbody.innerHTML += `
                <tr>
                    <th scope="row">${isbn}</th>
                    <td>${libro.titulo}</td>
                    <td>${cantidad}</td>
                    <td>${libro.precio}</td>
                    <td>${(cantidad * libro.precio)}</td>
                </tr>
            `;
    });
    console.log(librosEnPedido);

    if (librosEnPedido.size > 0) actualizarTotal(totalSpanSinIva, totalSpanConIva);
}

function actualizarTotal(totalSpanSinIva, totalSpanConIva) {
    const miTienda = Tienda.getInstancia();
    miTienda.pedidoActual.calcularTotal();

    totalSpanSinIva.textContent = miTienda.pedidoActual.precioTotalConEnvioSinIVA;
    totalSpanConIva.textContent = miTienda.pedidoActual.precioTotalConEnvioConIVA;
}

//========================
//==== Mi Validacion =====
//========================
function realizarMiValidacion(form, miTienda) {
    let esValido = true;
    const currentUrl = location.pathname;

    if (currentUrl.includes("02cliente")) esValido &= validarFormularioCliente(form, miTienda);
    else if (currentUrl.includes("03nuevoLibro")) esValido &= validarFormularioNuevoLibro(form, miTienda);
    else if (currentUrl.includes("04crearPedido")) esValido &= validarFormularioCrearPedido(form, miTienda);

    return esValido;
}

//==================
//==== Cliente =====
//==================
function validarFormularioCliente(form, miTienda) {
    let esValido = true;
    try {
        const dni = miTienda.lector.leerEntero(form, "dni");

        if (miTienda.existeClientePorDNI(dni)) {
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
    return esValido;
}

//======================
//==== Nuevo Libro =====
//======================
function validarFormularioNuevoLibro(form, miTienda) {
    let esValido = true;
    try {
        const isbn = miTienda.lector.leerEntero(form, "isbn");
        const genero = miTienda.lector.leerCadena(form, "genero");
        try {
            const nombreAutor = miTienda.lector.leerCadena(form, "nombreAutor");
            console.log("valida input text");

            if (miTienda.existeAutorPorNombre(nombreAutor)) {
                esValido &= false;
                form.nombreAutor.setCustomValidity("El autor ya existe");
            } else {
                esValido &= true;
                form.nombreAutor.setCustomValidity("");
            }
        } catch (error) {

            const autores = Array.from(form.autor.selectedOptions);
            console.log("valida select");
            console.log(autores);

            if (autores.length < 1) {
                esValido &= false;
                form.nombreAutor.setCustomValidity("Seleccione al menos un autor");
            } else {
                esValido &= true;
                form.nombreAutor.setCustomValidity("");
            }
        }

        if (miTienda.existeLibroPorIsbn(isbn)) {
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

    } catch (error) {
        // activarAlert("Error la validacion del nuevo libro: " + error.message);
        console.error("Error la validacion del nuevo libro: " + error.message)
        esValido &= false;
    }
    return esValido;
}

//==========================
//==== Crear un pedido =====
//==========================
function validarFormularioCrearPedido(form, miTienda) {
    let esValido = true;
    try {
        if (form.id === "seleccionarCliente") esValido &= validarFormularioSeleccionarCliente(form, miTienda);
        else if (form.id === "buscarLibros") esValido &= validarFormularioBuscarLibros(form, miTienda);
        else if (form.id === "seleccionarTipoEnvio") esValido &= validarFormularioSeleccionarTipoEnvio(form, miTienda);

    } catch (error) {
        activarAlert("Error la validacion del dni: " + error.message);
        esValido &= false;
    }
    return esValido;
}

function validarFormularioSeleccionarCliente(form, miTienda) {
    let esValido = true;
    const dni = miTienda.lector.leerEntero(form, "dni");
    if (!miTienda.existeClientePorDNI(dni)) {
        esValido &= false;
        form.dni.setCustomValidity("El dni ya existe");
    } else {
        esValido &= true;
        form.dni.setCustomValidity("");
    }
    return esValido;
}

function validarFormularioBuscarLibros(form, miTienda) {
    let esValido = true;
    const isbn = miTienda.lector.leerEntero(form, "isbn");
    if (!miTienda.existeLibroPorIsbn(isbn)) {
        esValido &= false;
        form.isbn.setCustomValidity("El isbn no existe");
    } else {
        esValido &= true;
        form.isbn.setCustomValidity("");
    }
    return esValido;
}
function validarFormularioSeleccionarTipoEnvio(form, miTienda) {
    let esValido = true;
    const tipoEnvio = miTienda.lector.leerCadena(form, "tipoEnvio");
    if (!miTienda.existeTipoPorNombre(tipoEnvio)) {
        esValido &= false;
        form.tipoEnvio.setCustomValidity("El tipo de envio seleccionado no existe");
    } else {
        esValido &= true;
        form.tipoEnvio.setCustomValidity("");
    }
    if (miTienda.pedidoActual.comprobarTodosEbook(miTienda.libros)) {
        esValido &= false;
        form.tipoEnvio.setCustomValidity("Todos son ebooks");
    } else {
        esValido &= true;
        form.tipoEnvio.setCustomValidity("");
    }
    return esValido;
}
