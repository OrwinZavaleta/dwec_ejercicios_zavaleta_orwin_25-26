console.log("T04P02 - Ejercicio 01 - Tipo de Envio");

class TipoEnvio {
    #nombre; // No puede haber 2 con el mismo nombre
    #diasMaxEntrega;
    #pesoMax;
    #precioSinIVA; // Solo gasto por envio

    constructor(parameters) {

    }

    get nombre() { return this.#nombre; }
    set nombre(nombre) { this.#nombre = nombre; }

    get diasMaxEntrega() { return this.#diasMaxEntrega; }
    set diasMaxEntrega(diasMaxEntrega) { this.#diasMaxEntrega = diasMaxEntrega; }

    get pesoMax() { return this.#pesoMax; }
    set pesoMax(pesoMax) { this.#pesoMax = pesoMax; }

    get precioSinIVA() { return this.#precioSinIVA; }
    set precioSinIVA(precioSinIVA) { this.#precioSinIVA = precioSinIVA; }

    mostrarDatosTipoEnvio() {
        
    }
}

