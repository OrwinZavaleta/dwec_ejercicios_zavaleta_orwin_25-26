console.log("T04P02 - Ejercicio 01 - Cliente");

class Cliente {
    #dni;
    #nombreCompleto;
    #direccion;
    #listaPedidosHechos; // Array que hace referenia a objetos pedidos

    constructor(dni, nombreCompleto, direccion) {
        this.dni = dni;
        this.nombreCompleto = nombreCompleto;
        this.direccion = direccion;
        this.listaPedidosHechos = [];
    }

    get dni() { return this.#dni; }
    set dni(dni) {
        if (!Util.validarEntero(dni)) {
            throw new Error("El dni no es valido.");
        }
        this.#dni = dni;
    }

    get nombreCompleto() { return this.#nombreCompleto; }
    set nombreCompleto(nombreCompleto) {
        if (!Util.validarNombrePersona(nombreCompleto)) {
            throw new Error("El nombre de la persona no es valido.");
        }
        this.#nombreCompleto = nombreCompleto;
    }

    get direccion() { return this.#direccion; }
    set direccion(direccion) {
        if (!Util.validarDireccion(direccion)) {
            throw new Error("La direccion ingresada no es valida.");
        }
        this.#direccion = direccion;
    }

    get listaPedidosHechos() { return this.#listaPedidosHechos; }
    set listaPedidosHechos(listaPedidosHechos) { this.#listaPedidosHechos = listaPedidosHechos; }

    mostrarDatosCliente() {
        return `CLIENTE: DNI: ${this.dni} NOMBRE COMPLETO: ${this.nombreCompleto} DIRECCION: ${this.direccion}`;
    }

    mostrarPedidosClienteAbierto() {
        let aux = "";

        this.listaPedidosHechos.forEach(pedido => {
            if (pedido.abierto) {
                aux += pedido.mostrarDatosPedido() + "\n";
            }
        });
        return aux;
    }

    static validarCliente(cliente) {
        return typeof cliente === "object" && cliente instanceof Cliente;
    }
}