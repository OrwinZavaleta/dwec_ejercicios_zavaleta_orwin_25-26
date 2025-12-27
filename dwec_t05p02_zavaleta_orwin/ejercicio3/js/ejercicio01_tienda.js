console.log("T04P02 - Ejercicio 01 - Tienda");

class Tienda {
    static IVA;
    // ===== Propiedad statica ====
    static instancia = null;

    #nombre;
    #libros;
    #autores;
    #tiposEnvio;
    #clientes;
    #pedidos;
    #lector;

    // ==== Metodo estatico singleton ====
    static gerInstancia(nombreTienda) {
        if (Tienda.instancia === null) {
            Tienda.instancia = new Tienda(nombreTienda);
        }
        return Tienda.instancia;
    }

    constructor(nombre) {
        this.nombre = nombre;

        // ==== Metodo alternativo ====
        /*       if (Tienda.instancia) {
                  return Tienda.instancia;
              } */

        if (Tienda.instancia !== null) {
            throw new Error("Use Tienda.getInstancia() en lugar de new Tienda()");
        }
        this.lector = new LeerDatosForm();
        this.libros = new Libros();
        this.autores = new Autores();
        this.tiposEnvio = new TiposEnvios();
        this.clientes = new Clientes();
        this.pedidos = new Pedidos();

        // ==== Metodo alternativo =====
        // Tienda.instancia = this;
    }

    get nombre() { return this.#nombre; }
    set nombre(nombre) { this.#nombre = nombre; }

    get libros() { return this.#libros; }
    set libros(libros) { this.#libros = libros; }

    get lector() { return this.#lector; }
    set lector(lector) { this.#lector = lector; }

    get autores() { return this.#autores; }
    set autores(autores) { this.#autores = autores; }

    get tiposEnvio() { return this.#tiposEnvio; }
    set tiposEnvio(tiposEnvio) { this.#tiposEnvio = tiposEnvio; }

    get clientes() { return this.#clientes; }
    set clientes(clientes) { this.#clientes = clientes; }

    get pedidos() { return this.#pedidos; }
    set pedidos(pedidos) { this.#pedidos = pedidos; }

    cargarDatosPrueba() {
        const autoresPrueba = [
            new Autor("Adoni"),
            new Autor("Chun"),
            new Autor("Marco Aurelio"),
            new Autor("Frank"),
        ]

        this.autores.insertarAutores(autoresPrueba);

        const librosPruebas = [
            new Ebook(1, "Hadrosauropolis", "Ciencia Ficción", [this.autores.listadoAutores[0], this.autores.listadoAutores[1]], 13, 123, "epub", "https://imgs.search.brave.com/N6sA_NUo4fv_1VOTeZJLcYI7Z7p2eY5STJBXGXbktWo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxTlAyVGI4RG9M/LmpwZw"),
            new LibroPapel(2, "El problema de los 3 cuerpos", "Ciencia Ficción", [this.autores.listadoAutores[1]], 23, 34, "23x43x5", 5, "https://imgs.search.brave.com/DqUZEhIwDKI9ulwkYKtXtzaYpheye_mtwYB5pio-q4U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYm9va3NlbnNl/LmNvbS9pbWFnZXMv/NzM0LzY1OS85Nzg4/NDY2NjU5NzM0Lmpw/Zw"),
            new Ebook(3, "Meditaciones", "Ensayo", [this.autores.listadoAutores[2]], 9, 23, "mobi", "https://imgs.search.brave.com/AlhExVTE0i3XPMWdqds87hhWs0mMpm374FnNZTZTo8I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDErZ2l3blI3aUwu/anBn"),
            new LibroPapel(4, "Dune", "Fantasía", [this.autores.listadoAutores[3]], 25, 4, "21x13x5", 8, "https://imgs.search.brave.com/0ngBt9l5A4fPiXEWsKCyOYqgVBwv3dNXd0ALR-sOk7c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzYw/MzMyMjc5MzIxYzZm/NmNjODdjZjhmZS80/OWRkMjViYy0yMGI5/LTRkNzQtYjdhZC1h/ZGY1MjE5ZDQxNDkv/ZHVuZS5qcGc"),
            new LibroPapel(5, "La rueda del tiempo", "Fantasía", [this.autores.listadoAutores[3], this.autores.listadoAutores[0]], 25, 4, "21x13x5", 0, "https://imgs.search.brave.com/FzulC8mngh0kk48h0Z-taduJjaeSm8ACYO8vA3CagBM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWRhemluZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDEvd2hlZWwtb2Yt/dGltZS1ib29rLWNv/dmVycy1hLW1lbW9y/eS1vZi1saWdodC11/ay0xLmpwZw"),
        ];

        this.libros.insertarLibros(librosPruebas);

        // Asignar tambien los libros a los autores
        autoresPrueba[0].insertarLibro(librosPruebas[0]);
        autoresPrueba[1].insertarLibro(librosPruebas[1]);
        autoresPrueba[2].insertarLibro(librosPruebas[2]);
        autoresPrueba[3].insertarLibro(librosPruebas[3]);

        const clientesPrueba = [
            new Cliente(1, "Juan Guillermo", "Av. los alamos"),
            new Cliente(2, "Juan Rulfo", "Av. madrid"),
            new Cliente(3, "Paco Jimenez", "Av. los reyes"),
            new Cliente(4, "Rocio Gutierrez", "Av. los alamos")
        ];

        this.clientes.insertarClientes(clientesPrueba);
    }

    iniciar() {
        // this.cargarDatosPrueba();
        let terminar;
        do {
            terminar = this.pedirOpcionMenu();
        } while (!terminar);
        // Lo que falte agregar
    }
    mostrarMenu() {
        return `
        Tienda ${this.nombre}
        1. Mostrar Catálogo de Libros Disponibles.
        2. Insertar Libros o modificar los datos de un libro existente. 
        3. Actualizar stock libros.
        4. Ver notificaciones stock libros bajo mínimo. 
        5. Insertar nuevo cliente. 
        6. Mostrar pedidos abiertos de un cliente por DNI.
        7. Borrar cliente cliente por DNI.
        8. Hacer pedido por cliente identificado por DNI. 
        9. Mostrar pedido por ID de pedido.
        10. Mostrar estadísticas:
        11. Salir
        `;
    }
    pedirOpcionMenu() {
        let entrada = this.lector.leerEnteroEntreHasta(this.mostrarMenu(), 1, 11);
        let terminar = false;

        switch (Number(entrada)) {
            case 1:
                console.log(this.mostrarCatalogoLibrosDisponibles());
                break;
            case 2:
                this.pedirYcrearVariosLibros();
                break;
            case 3:
                this.actualizarStockLibros();
                break;
            case 4:
                console.log(this.notificacionesStockLibrosMinimo());
                break;
            case 5:
                this.pedirYcrearClientes();
                break;
            case 6:
                this.mostrarPedidosAbiertoCliente(); // TODO: falta completar pedidos
                break;
            case 7:
                this.borrarCliente();
                break;
            case 8:
                this.hacerPedidoPorCliente();
                break;
            case 9:
                this.mostrarPedidoPorID();
                break;
            case 10:
                //TODO: esta cual es
                break;
            case 11:
                terminar = true;
                break;
            default:
                throw new Error("La entrada de menu no es valida, no deberias haber lelgado a aqui...");
        }

        return terminar;
    }
    pedirYcrearLibro() {
        let libro;

        let isbn;
        do {
            isbn = this.lector.leerEnteroHasta("Ingrese el ISBN del libro");
            if (this.libros.existeLibroPorIsbn(isbn)) {
                isbn = null;
                // throw new Error("El isbn ya existe, ingrese otro diferente.");
            }
        } while (isbn === null);

        let titulo = this.lector.leerCadenaHasta("Ingrese el Titulo del libro", Util.validarTitulo);
        const autorAux = this.pedirYcrearAutor();

        let precio = this.lector.leerEnteroHasta("Ingrese el Precio del libro", Util.validarPrecio);

        let genero;
        do {
            genero = this.lector.leerCadenaHasta("Ingrese el Genero del libro");
            if (!Util.validarGenero(genero, Libro.GENEROS_LITERARIOS)) {
                genero = null;
                // throw new Error("El genero literario no es valido.");
            }
        } while (genero === null);

        /* Pedir que tipo de libro es */
        let tipoLibro = this.lector.leerCadenaHasta("Ingrese P si el libro es a papel o D si es digital.", () => true, 1, /^[pdPD]$/);

        if (tipoLibro === "p" || tipoLibro === "P") {
            let peso = this.lector.leerEnteroHasta("Ingrese el peso de el libro en gramos.", Util.validarPeso);
            let dimensiones = this.lector.leerCadenaHasta("Ingrese las dimensiones en este formato (ddxddxdd)", Util.validarDimensiones);
            let stock = this.lector.leerEnteroHasta("Ingrese el stock del libro.", Util.validarStock);

            libro = new LibroPapel(isbn, titulo, genero, autorAux, precio, peso, dimensiones, stock);
        } else if (tipoLibro === "d" || tipoLibro === "D") {
            let tamanoArchivo = this.lector.leerEnteroHasta("Ingrese el tamaño del archivo en MB.", Util.validarTamanoArchivo);
            let formato
            do {
                formato = this.lector.leerCadenaHasta("Ingrese el formato del ebook.");
                if (!Util.validarFormato(formato, Ebook.FORMATOS)) {
                    formato = null;
                }
            } while (formato === null);

            libro = new Ebook(isbn, titulo, genero, [autorAux], precio, tamanoArchivo, formato);
        }

        this.libros.insertarLibros([libro]);
    }
    pedirYcrearVariosLibros() {
        let confirmacion;
        do {
            this.pedirYcrearLibro();

            confirmacion = this.lector.leerCadenaHasta("¿Desea crear otro libro? (s/n)", () => true, 1, /^[snSN]$/);
        } while (confirmacion === "s" || confirmacion === "S");
    }

    pedirYcrearAutor() {
        let autorAux;
        let autorNombre = this.lector.leerCadenaHasta("Ingrese el Nombre del autor", Util.validarNombrePersona);
        if (!this.autores.existeAutorPorNombre(autorNombre)) {
            autorAux = new Autor(autorNombre);

            this.autores.insertarAutores([autorAux]);
        } else {
            autorAux = this.autores.buscarAutoresPorNombre(autorNombre);
        }

        return autorAux;
    }
    pedirYcrearVariosAutores() {
        let confirmacion;

        do {
            this.pedirYcrearAutor();

            confirmacion = this.lector.leerCadenaHasta("¿Desea crear otro autor? (s/n)", () => true, 1, /^[snSN]$/);
        } while (confirmacion === "s" || confirmacion === "S");
    }
    pedirYcrearClientes() {
        let dni;
        do {
            dni = this.lector.leerCadenaHasta("Ingrese el dni del cliente", Util.validarEntero);
            if (this.clientes.existeClientePorDNI(dni)) {
                dni = null;
                console.log("Ese cliente ya existe.");
            };
        } while (dni === null);
        let nombreCompleto = this.lector.leerCadenaHasta("Ingrese el nombre completo del cliente", Util.validarNombrePersona);
        let direccion = this.lector.leerCadenaHasta("Ingrese la direccion del cliente", Util.validarDireccion);

        const cliente = new Cliente(dni, nombreCompleto, direccion);

        this.clientes.insertarClientes([cliente]);
    }
    pedirYcrearVariosClientes() { }
    // pedirYcrearAutor(), pedirYcrearVariosAutores(), pedirYcrearClientes(), pedirYcrearVariosClientes(), …
    actualizarStockLibros() { // TODO: que pueda actualizar varios
        let titulo;
        let libro;
        let libroValido = false;
        do {
            titulo = this.lector.leerCadenaHasta("Ingrese el Titulo del libro", Util.validarTitulo);
            libro = this.libros.buscarLibroPorTitulo(titulo)[0];
            if (libro instanceof LibroPapel && this.libros.existeLibroPorTitulo(titulo)) {
                libroValido = true;
            } else {
                console.log("El libro no es valido");
            }
        } while (!libroValido);


        let nuevoStock = this.lector.leerEnteroHasta("Cuantos libros ha llegado");
        libro.ampliarStock(nuevoStock);
    }
    notificacionesStockLibrosMinimo() { // TODO: revisar para que no aplique reduce 
        return this.libros.listadoLibros.reduce((acum, libro) => { // TODO: mover a un metodo dentro de libros que retorne la disponibilidad
            if (libro instanceof LibroPapel) {
                if (!libro.comprobarDisponibilidad()) acum += `${libro.titulo} tiene ${libro.stock} unidades.\n`;
            } else {
                console.log("El libro no es de papel.");
            }
            return acum;
        }, "");

    }
    mostrarPedidosAbiertoCliente() { }
    borrarCliente() { // TODO: por probar
        let dni;
        let cliente;
        let clienteValido = false;
        do {
            dni = this.lector.leerCadenaHasta("Ingrese el dni del cliente", Util.validarEntero);
            cliente = this.clientes.buscarClientePorDNI(dni);
            if (cliente instanceof Cliente && this.clientes.existeClientePorDNI(dni)) {
                clienteValido = true;
            }
        } while (!clienteValido);


        if (this.pedidos.borrarPedidos(cliente.listaPedidosHechos)) {
            console.log("Pedidos borrados con exito");
            this.clientes.borrarClientePorDNI(dni);
            console.log("Clientes borrados con exito");
        } else {
            console.log("Hubo un error al borrar los pedidos del cliente. El cliente no se ha borrado.");
        }

    }
    hacerPedidoPorCliente() { }
    mostrarPedidoPorID() { }

    pedirLibroPorISBN(isbn) {
        return this.libros.buscarLibroPorIsbn(isbn);
    }


    mostrarCatalogoLibrosDisponibles() {
        // return this.libros.obtenerCadenaLibrosMenu();
        return this.libros.obtenerCatalogo();
    }

    mostrarClientes() {
        return this.clientes.obtenerClientes();
    }

    agregarCliente(cliente) {
        if (this.clientes.existeClientePorDNI(cliente.dni)) {
            throw new Error("Un cliente con ese dni ya existe");
        };

        this.clientes.insertarClientes([cliente]);
    }

    pedirClientePorDni(dni){
        return this.clientes.buscarClientePorDNI(dni);
    }
}