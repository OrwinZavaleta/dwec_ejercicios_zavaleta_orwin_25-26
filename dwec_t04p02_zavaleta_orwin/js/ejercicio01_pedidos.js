console.log("T04P02 - Ejercicio 01");

class Pedidos {
    #listadoPedidos;

    constructor() {
        this.listadoPedidos = [];
    }

    get listadoPedidos() { return this.#listadoPedidos; }
    set listadoPedidos(listadoPedidos) { this.#listadoPedidos = listadoPedidos; }

    existePedidoPorID(idAbuscar) {
        return this.listadoPedidos.some(pedido => pedido.id === idAbuscar);
    }
    insertarPedido(pedidos) {
        return pedidos.reduce((acum, pedido) => {
            if (Pedido.validarPedido(pedido) && !this.existePedidoPorID(pedido.id)) {
                this.listadoPedidos.push(pedido);
                acum++;
            }
            return acum;
        }, 0);
    }
    buscarPedidoPorId(idAbuscar) {
        const aux = this.listadoPedidos.find(pedido => pedido.id === idAbuscar);
        if (aux === undefined) return null;
        return aux;
    }
    cerrarPedidoPorId(idAbuscar) {
        const aux = this.buscarPedidoPorId(idAbuscar);
        if (aux === null) return false;
        aux.abierto = false;
        return true;
    }
    borrarPedidos(pedidosAborrar) { // Recibe un array
        // TODO: borro todos los que se puedan y si alguno no se puede, se retorna false
    }
    // Mo se puede modificar los pedidos
}