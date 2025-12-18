console.log("T04P02 - Ejercicio 01 - Tipo de Envio");

class TipoEnvio {
    #nombre; // No puede haber 2 con el mismo nombre
    #diasMaxEntrega;
    #pesoMax;
    #precioSinIVA; // Solo gasto por envio

    constructor(nombre, diasMaxEntrega, pesoMax, precioSinIVA) {
        this.nombre = nombre;
        this.diasMaxEntrega = diasMaxEntrega;
        this.pesoMax = pesoMax;
        this.precioSinIVA = precioSinIVA;
    }

    get nombre() { return this.#nombre; }
    set nombre(nombre) {
        if (!Util.validarNombreEnvio(nombre)) {
            throw new Error("El nombre del envio no es valido"); 
        }
        this.#nombre = nombre;
    }

    get diasMaxEntrega() { return this.#diasMaxEntrega; }
    set diasMaxEntrega(diasMaxEntrega) {
        if (!Util.validarDiasEnvio(diasMaxEntrega)) {
            throw new Error("Los dias de entrega no es valido.");

        }
        this.#diasMaxEntrega = diasMaxEntrega;
    }

    get pesoMax() { return this.#pesoMax; }
    set pesoMax(pesoMax) {
        if (!Util.validarPeso(pesoMax)) {
            throw new Error("El peso ingresado no es valido.");
        }
        this.#pesoMax = pesoMax;
    }

    get precioSinIVA() { return this.#precioSinIVA; }
    set precioSinIVA(precioSinIVA) {
        if (!Util.validarPrecio(precioSinIVA)) {
            throw new Error("El precio no es valido.");
        }
        this.#precioSinIVA = precioSinIVA;
    }

    mostrarDatosTipoEnvio() {
        return `ENVIO: NOMBRE: ${this.nombre} - DIAS MÁXIMO PARA ENTREGA: ${this.diasMaxEntrega} - PESO MÁXIMO: ${this.pesoMax} - PRECIO SIN IVA: ${this.precioSinIVA}`;
    }

    static validarTipoEnvio(tipoEnvio) {
        return typeof tipoEnvio === "object" && tipoEnvio instanceof TipoEnvio;
    }
}

