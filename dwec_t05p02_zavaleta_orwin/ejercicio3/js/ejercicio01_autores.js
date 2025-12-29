console.log("T04P02 - Ejercicio 01 - Autores");

class Autores {
    #listadoAutores

    constructor() {
        this.listadoAutores = [];
    }

    get listadoAutores() { return this.#listadoAutores; }
    set listadoAutores(listadoAutores) { this.#listadoAutores = listadoAutores; }

    existeAutorPorNombre(nombreAbuscar) {
        return this.listadoAutores.some(autor => autor.nombre === nombreAbuscar);
    }

    insertarAutores(autores) {
        return autores.reduce((acum, autor) => {
            if (Autor.validarAutor(autor) || !this.buscarAutoresPorId(autor.id)) {
                this.listadoAutores.push(autor);
                acum++
            }
            return acum
        }, 0);
    }

    buscarAutoresPorId(idAbuscar) {
        const aux = this.listadoAutores.find(autor => autor.id === idAbuscar);
        if (aux === undefined) return null;
        return aux;
    }

    buscarAutoresPorNombre(nombreAbuscar) {
        const aux = this.listadoAutores.find(autor => autor.nombre === nombreAbuscar);
        if (aux === undefined) return null;
        return aux;
    }

    // no se modifican ni eliminan autores

    obtenerCadenaAutoresMenu() {
        let listado = "";

        const ordenado = this.listadoAutores.sort((a, b) => a.nombre.localeCompare(b.nombre));

        ordenado.forEach((element, index) => {
            listado += `${(index + 1)}. ${element.mostrarDatosAutor()}\n (${element.libros.map(libro => libro.titulo)})`;
        });
        return listado;
    }

    obtenerAutores(){
        return this.listadoAutores;
    }

}