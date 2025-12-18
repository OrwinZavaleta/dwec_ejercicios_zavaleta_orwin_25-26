console.log("T04P02 - Ejercicio 01 - Libros");

class Libros {

    #listadoLibros;

    constructor() {
        this.listadoLibros = [];
    }

    get listadoLibros() { return this.#listadoLibros; }
    set listadoLibros(listadoLibros) { this.#listadoLibros = listadoLibros; }

    existeLibroPorIsbn(isbnAbuscar) {
        return this.listadoLibros.some(libro => libro.isbn === isbnAbuscar);
    }
    existeLibroPorTitulo(tituloAbuscar) {
        return this.listadoLibros.some(libro => libro.titulo === tituloAbuscar);
    }

    insertarLibros(libros) {
        return libros.reduce((acum, libro) => {
            if (Libro.validarLibro(libro) && !this.existeLibroPorIsbn(libro.isbn)) {
                this.listadoLibros.push(libro);
                acum++
            }
            return acum
        }, 0);
    }
    buscarLibroPorIsbn(isbnAbuscar) {
        const aux = this.listadoLibros.find(libro => libro.isbn === isbnAbuscar);
        if (aux === undefined) return null;
        return aux;
    }
    buscarLibroPorTitulo(tituloAbuscar) {
        return this.listadoLibros.filter(libro => libro.titulo === tituloAbuscar);
    }
    modificarLibroPorIsbn(isbnAmodificar, mapaConInfo) {
        const libro = this.buscarLibroPorIsbn(isbnAmodificar);
        if (libro === null) {
            throw new Error("El libro con ese isbn no existe.");
        }
        libro.modificarLibro(mapaConInfo);
    }

    // No se puede borrar libros

    obtenerCadenaLibrosMenu() {
        let listado = "";

        const ordenado = this.listadoLibros.sort((a, b) => a.titulo.localeCompare(b.titulo));

        ordenado.forEach((element, index) => {
            listado += `${(index + 1)}. ${element.mostrarDatosLibro()}\n`;
        });
        return listado;
    }

    obtenerCatalogo() {
        return this.listadoLibros;
    }
}