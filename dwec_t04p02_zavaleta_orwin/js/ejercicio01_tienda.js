console.log("T04P02 - Ejercicio 01");

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
    }

    get nombre() { return this.#nombre; }
    set nombre(nombre) { this.#nombre = nombre; }

    get libros() { return this.#libros; }
    set libros(libros) { this.#libros = libros; }

    get lector() { return this.#lector; }
    set lector(lector) { this.#lector = lector; }

    cargarDatosPrueba() {
        const pruebas = [
            new Libro(1, "Hadrosauropolis", "Ciencia Ficción", "Adoni", 13),
            new Libro(2, "El problema de los 3 cuerpos", "Ciencia Ficción", "Chun", 23),
            new Libro(3, "Meditaciones", "Ensayo", "Marco Aurelio", 9),
            new Libro(4, "Dune", "Fantasía", "Frank", 25),
        ];

        this.libros.insertarLibros(pruebas);
    }

    mostrarCatalogoLibrosDisponibles(){ // TODO: arreglar
        return this.libros.obtenerCadenaLibrosMenu();
    }
}