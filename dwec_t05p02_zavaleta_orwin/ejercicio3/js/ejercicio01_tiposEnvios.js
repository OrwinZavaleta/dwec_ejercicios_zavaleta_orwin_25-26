console.log("T04P02 - Ejercicio 01 - Tipos envios");

class TiposEnvios {
    #listadoTiposEnvios;

    constructor() {
        this.listadoTiposEnvios = [];
    }

    get listadoTiposEnvios() { return this.#listadoTiposEnvios; }
    set listadoTiposEnvios(listadoTiposEnvios) { this.#listadoTiposEnvios = listadoTiposEnvios; }

    existeTipoPorNombre(nombreAbuscar) {
        return this.listadoTiposEnvios.some(tipoEnvio => tipoEnvio.nombre === nombreAbuscar);
    }
    insertarTipos(tiposEnvios) { // Recibe un array
        return tiposEnvios.reduce((acum, tipoEnvio) => {
            if (TipoEnvio.validarTipoEnvio(tipoEnvio) && !this.existeTipoPorNombre(tipoEnvio.nombre)) {
                this.listadoTiposEnvios.push(tipoEnvio);
                acum++;
            }
            return acum
        }, 0);
    }
    buscarTiposPorNombre(nombreAbuscar) {
        const aux = this.listadoTiposEnvios.find(tipoEnvio => tipoEnvio.nombre === nombreAbuscar);
        if (aux === undefined) return null;
        return aux;
    }

    // No se pueden modificar los tipos
    // No se pueden borrar los tipos

    obtenerCadenaTiposMenu() {
        let cadena = "";
        this.listadoTiposEnvios.forEach(tipoEnvio => {
            cadena += tipoEnvio.mostrarDatosTipoEnvio() + "\n";
        });
        return cadena;
    }
}

