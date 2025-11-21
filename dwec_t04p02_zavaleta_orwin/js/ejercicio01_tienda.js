console.log("T04P02 - Ejercicio 01 - Tienda");

class Tienda {
    static IVA;

    #nombre;
    #libros;
    #autores;
    #tiposEnvio;
    #clientes;
    #pedidos;
    #lector;

    constructor(nombre) {
        this.lector = new LeerDatosPrompt();
        this.libros = new Libros();
        this.autores = new Autores();
    }

    get nombre() { return this.#nombre; }
    set nombre(nombre) { this.#nombre = nombre; }

    get libros() { return this.#libros; }
    set libros(libros) { this.#libros = libros; }

    get lector() { return this.#lector; }
    set lector(lector) { this.#lector = lector; }

    get autores() { return this.#autores; }
    set autores(autores) { this.#autores = autores; }

    cargarDatosPrueba() {
        const autoresPrueba = [
            new Autor("Adoni"),
            new Autor("Chun"),
            new Autor("Marco Aurelio"),
            new Autor("Frank"),
        ]

        this.autores.insertarAutores(autoresPrueba);

        const pruebas = [
            new Ebook(1, "Hadrosauropolis", "Ciencia Ficción", [this.autores.listadoAutores[0]], 13, 123, "epub"),
            new LibroPapel(2, "El problema de los 3 cuerpos", "Ciencia Ficción", [this.autores.listadoAutores[1]], 23, 34, "23x43x5", 6),
            new Ebook(3, "Meditaciones", "Ensayo", [this.autores.listadoAutores[2]], 9, 23, "mobi"),
            new LibroPapel(4, "Dune", "Fantasía", [this.autores.listadoAutores[3]], 25, 4, "21x13x5", 8),
        ];

        this.libros.insertarLibros(pruebas);

        // Asignar tambien los libros a los autores
        autoresPrueba[0].insertarLibros([pruebas[0]]);
        autoresPrueba[1].insertarLibros([pruebas[1]]);
        autoresPrueba[2].insertarLibros([pruebas[2]]);
        autoresPrueba[3].insertarLibros([pruebas[3]]);


        this.libros.listadoLibros[0].modificarLibro(new Map([
            ["titulo", "juanma"],
            ["genero", "Ensayo"]
        ]));
    }

    iniciar() {
        this.cargarDatosPrueba();
        // Lo que falte agregar
    }
    mostrarMenu() { }
    pedirOpcionMenu() { }
    pedirYcrearLibro() {
        let isbn = this.lector.leerEnteroHasta("Ingrese el ISBN del libro");
        let titulo = this.lector.leerCadenaHasta("Ingrese el Titulo del libro");
        let autor = this.lector.leerCadenaHasta("Ingrese el Autor del libro"); // TODO: Esto se hace por separado

        let precio = this.lector.leerEnteroHasta("Ingrese el Precio del libro"); // TODO: preguntar si el precio es real
        let genero = this.lector.leerCadenaHasta("Ingrese el Genero del libro");
        // TODO: libro fisico o digital

        if (!Util.validarEntero(isbn) || this.libros.existeLibroPorIsbn(isbn)) throw new Error("El isbn no es valido o ya esta registrado.");


        if (!Util.validarTitulo(titulo)) throw new Error("Titulo no valido");
        if (!Util.validarNombrePersona(autor)) throw new Error("El nombre del autor no es valido");
        if (!Util.validarPrecio(precio)) throw new Error("El precio no es valido");
        if (!Util.validarGenero(genero, Libro.GENEROS_LITERARIOS));

        // TODO: completar

    }
    pedirYcrearVariosLibros() { }
    // pedirYcrearAutor(), pedirYcrearVariosAutores(), pedirYcrearClientes(), pedirYcrearVariosClientes(), …
    mostrarCatálogoLibrosDisponibles() { }
    actualizarStockLibros() { }
    notificacionesStockLibrosMinimo() { }
    mostrarPedidosAbiertoCliente() { }
    borrarCliente() { }
    hacerPedidoPorCliente() { }
    mostrarPedidoPorID() { }


    mostrarCatalogoLibrosDisponibles() { // TODO: arreglar
        return this.libros.obtenerCadenaLibrosMenu();
    }
}