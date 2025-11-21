console.log("T04P02 - Ejercicio 01 - Utilidades");

class Util {
    static validarEntero(valor) {
        if (
            valor === null ||
            valor === undefined ||
            typeof valor === "boolean" ||
            String(valor).trim() === ""
        ) {
            return false;
        }

        return Number.isInteger(Number(valor));
    }

    static validarReal(valor) {
        if (
            valor === null ||
            valor === undefined ||
            typeof valor === "boolean" ||
            String(valor).trim() === ""
        ) {
            return false;
        }
        return Number.isFinite(Number(valor));
    }

    static validarCadenaFecha(valor) { // formatos validos (D-M-YYYY , DD-MM-YYYY, YYYY-M-D , YYYY-MM-DD)
        // Solo valida que la cadena cumpla el formato
        const pattern = /^((0?[1-9]|[12]\d|3[01])-(0?[1-9]|1[0-2])-\d{4}|\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01]))$/;

        return pattern.test(valor);
    }

    static validarFecha(valor) { // Valida que la fecha como tal sea valida
        let valido = false;
        if (this.validarCadenaFecha(valor)) {
            const [dia, mes, anyo] = [NaN, NaN, NaN];
            const fechaSeparada = valor.split("-");

            if (fechaSeparada[0].length === 4) {
                [anyo, mes, dia] = fechaSeparada;
            } else {
                [dia, mes, anyo] = fechaSeparada;
            }
            const fecha = new Date(anyo, mes - 1, dia);


            if (fecha.getMonth() === mes - 1 && fecha.getFullYear === anyo && fecha.getDate() === dia) {
                valido = true;
            }
        }

        return valido;
    }

    static validarTitulo(titulo) {
        return typeof titulo === "string" && titulo.length >= 1;
    }

    static validarNombrePersona(nombre) {
        const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
        return typeof nombre === "string" && nombre.length >= 3 && pattern.test(nombre);
    }

    static validarDireccion(direccion) {
        return typeof nombre === "string" && nombre.length >= 3;
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

    static validarStock(stock) {
        return this.validarEntero(stock) && stock >= 0;
    }

    static validarDimensiones(dimensiones) { // formatos aceptados("NNxNNxNN")
        const pattern = /^\d{1,2}x\d{1,2}x\d{1,2}$/;

        return pattern.test(dimensiones);
    }

    static esMesPromocion(fecha, array_mes_promocion) { // TODO: como se pasara la fecha
        array_mes_promocion.includes();
    }

    static validarFormato(formatoLeido, setFormatosValidos) {
        return setFormatosValidos.has(formatoLeido);
    }

    static validarGenero(generoLeido, setGenerosValidos) {
        return setGenerosValidos.has(generoLeido);
    }

    static validarDiasEnvio(dias) {
        return this.validarEntero(dias) && dias > 0;
    }

    /* Añadidas */
    static comprobarCadenaVacia(entrada) {
        return entrada === null || entrada === "";
    }

}