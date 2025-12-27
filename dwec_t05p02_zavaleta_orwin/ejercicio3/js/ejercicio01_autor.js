console.log("T04P02 - Ejercicio 01 - Autor");

class Autor {
    static ultimoId=0;

    #id;
    #nombre;
    #libros;

    constructor(nombre) {
        this.id = Autor.obtenerSiguienteId();
        this.nombre = nombre;
        this.libros = [];
    }

    get id() { return this.#id; }
    set id(id) { this.#id = id; }

    get nombre() { return this.#nombre; }
    set nombre(nombre) {
        if (!Util.validarNombrePersona(nombre)) {
            throw new Error("El nombre del autor ingresado no es valido.");
        }
        this.#nombre = nombre;
    }

    get libros() { return this.#libros; }
    set libros(libros) { this.#libros = libros; }

    mostrarDatosAutor() {
        return `NOMBRE: ${this.nombre} ID: ${this.id} LIBROS: ${this.libros.map(libro => libro.titulo)}`;
    }

    insertarLibro(libro) {
        if (!Libro.validarLibro(libro)) {
            throw new Error("El valor enviado no es una instancia de Libro");
        }
        this.libros.push(libro);
    }

    tieneLibros() {
        return this.libros.length !== 0;
    }

    static obtenerSiguienteId() { return ++Autor.ultimoId; }

    static validarAutor(autor) {
        return typeof autor === "object" && autor instanceof Autor;
    }
}