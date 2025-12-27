console.log("T04P02 - Ejercicio 01 - Clientes");

class Clientes {
    #listadoClientes;

    constructor() {
        this.listadoClientes = [];
    }

    get listadoClientes() { return this.#listadoClientes; }
    set listadoClientes(listadoClientes) { this.#listadoClientes = listadoClientes; }

    existeClientePorDNI(dniAbuscar) {
        return this.listadoClientes.some(cliente => cliente.dni === dniAbuscar);
    }
    insertarClientes(clientes) {
        return clientes.reduce((acum, cliente) => {
            if (Cliente.validarCliente(cliente) && !this.existeClientePorDNI(cliente.dni)) {
                this.listadoClientes.push(cliente);
                acum++;
            }
            return acum;
        }, 0);
    }
    buscarClientePorDNI(dniAbuscar) {
        const aux = this.listadoClientes.find(cliente => cliente.dni === dniAbuscar);
        if (aux === undefined) return null;
        return aux;
    }
    borrarClientePorDNI(dniAborrar) {
        let indice = this.listadoClientes.findIndex(cliente => cliente.dni === dniAborrar);

        if (indice !== -1) {
            this.listadoClientes.splice(indice, 1);
        }
    }

    // No se pueden modificar los clientes

    obtenerClientes(){
        return this.listadoClientes;
    }
}