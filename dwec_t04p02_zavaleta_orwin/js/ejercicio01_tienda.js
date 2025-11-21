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

        this.libros.listadoLibros[0].modificarLibro(new Map([
            ["nombre", "juanma"],
            ["genero", "Ensayo"]
        ]));
    }

    iniciar() {
        this.cargarDatosPrueba();
        // Lo que falte agregar
    }
    mostrarMenu() { }
    pedirOpcionMenu() { }
    pedirYcrearLibro() { }
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