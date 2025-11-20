console.log("T04P02 - Ejercicio 01");

class Util {
    static validarEntero(valor) {
        return Number.isInteger(valor);
    }

    static validarReal(valor) {
        return Number.isFinite(valor);
    }

    static validarCadenaFecha(valor) {
        // TODO: la validacion de la fecha con distintos formatos (-recibe un string-)
    }

    static validarFecha(valor) { // formatos validos (D-M-YYYY , DD-MM-YYYY, YYYY-M-D , YYYY-MM-DD)
        // Se puede hacer con patrones
        // TODO: PREGUNTAR SI ESTE METODO NO HACE LO MISMO QUE EL ANTERIOR
    }

    static validarTitulo(titulo) {
        return typeof titulo === "string" && titulo.length >= 1;
    }

    static validarNombrePersona(nombre) {
        return typeof nombre === "string" && nombre.length >= 3; // TODO: validar que el nonbre tenga solo letras
    }

    static validarPrecio(precio) {
        return this.validarReal(precio) && precio >= 0;
    }

    static validarTamanoArchivo(tamanoArchivo) {
        return this.validarEntero(tamanoArchivo) && tamanoArchivo >= 0;
    }
    static validarPeso(peso) {
        return this.validarEntero(peso) && peso >= 0;
    }
    static validarDimensiones(dimensiones) {
        // TODO: validar las dimensiones con el patron ("NNxNNxNN")
    }

    static esMesPromocion(fecha, array_mes_promocion) { // TODO: como se pasara la fecha
        array_mes_promocion.includes();
    }
}