console.log("T04P02 - Ejercicio 01");

class Libros {

    #listadoLibros;

    constructor() {
        this.listadoLibros = []; // TODO: las instancias de objetos van en try catch
    }

    get listadoLibros() { return this.#listadoLibros; }
    set listadoLibros(listadoLibros) { this.#listadoLibros = listadoLibros; }

    existeLibroPorIsbn(isbnAbuscar) { }
    insertarLibros(libros) { // TODO: que valide por isbn
        this.listadoLibros.push(...libros);
    }
    buscarLibroPorIsbn(isbnAbuscar) { }
    buscarLibroPorTitulo(tituloAbuscar) { }
    modificarLibroPorIsbn(isbnAmodificar, mapaConInfo) { }
    obtenerCadenaLibrosMenu() { // TODO: tiene que ser en orden alfabetico
        let listado = "";

        this.listadoLibros.forEach(element => {
            listado += element.mostrarDatosLibro() + "\n";
        });
        return listado;
    }

}