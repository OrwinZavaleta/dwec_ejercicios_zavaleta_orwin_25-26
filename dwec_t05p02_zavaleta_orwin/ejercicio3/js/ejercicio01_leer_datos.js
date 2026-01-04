console.log("T04P02 - Ejercicio 01 - Leer Datos");

class LeerDatos {
    leerEntero(mensaje_o_id) { throw new Error("Método no implementado."); }
    leerEnteroHasta(mensaje_o_id) { throw new Error("Método no implementado."); }
    leerReal(mensaje_o_id) { throw new Error("Método no implementado."); }
    leerEnteroEntre(mensaje_o_id, min, max) { throw new Error("Método no implementado."); }
    leerEnteroEntreHasta(mensaje_o_id, min, max) { throw new Error("Método no implementado."); }
    leerCadena(mensaje_o_id) { throw new Error("Método no implementado."); }
    leerCadenaHasta(mensaje_o_id) { throw new Error("Método no implementado."); }
}

class LeerDatosPrompt extends LeerDatos {
    static PATRON_VALIDAR_TODO = /^[\s\S]*$/;
    leerEntero(mensaje_o_id) {
        let entrada = prompt(mensaje_o_id);
        if (!Util.validarEntero(entrada)) throw new Error("El dato ingresado no es un entero.");
        return Number(entrada);
    }
    leerEnteroHasta(mensaje_o_id) {
        let valido = false;
        let valor;
        do {
            try {
                valor = this.leerEntero(mensaje_o_id);
                valido = true;
            } catch (error) {
                valido = false;
            }
        } while (!valido);
        return valor;
    }
    leerReal(mensaje_o_id) {
        let entrada = prompt(mensaje_o_id);
        if (!Util.validarReal(entrada)) throw new Error("El dato ingresado no es un real.");
        return Number(entrada);
    }
    leerEnteroEntre(mensaje_o_id, min, max, funcionValidacion = () => true) {
        let entrada = prompt(mensaje_o_id);
        if (!Util.validarEntero(entrada) || entrada < min || entrada > max || !funcionValidacion(entrada)) throw new Error("El dato ingresado no es valido o no esta en el rango.");
        return entrada;
    }
    leerEnteroEntreHasta(mensaje_o_id, min, max, funcionValidacion = () => true) {
        let valido = false;
        let valor;
        do {
            try {
                valor = this.leerEnteroEntre(mensaje_o_id, min, max, funcionValidacion);
                valido = true;
            } catch (error) {
                valido = false;
            }
        } while (!valido);
        return valor;
    }

    leerRealEntre(mensaje_o_id, min, max, funcionValidacion = () => true) {
        let entrada = prompt(mensaje_o_id);
        if (!Util.validarReal(entrada) || entrada < min || entrada > max || !funcionValidacion(entrada)) throw new Error("El dato ingresado no es valido o no esta en el rango.");
        return entrada;
    }
    leerRealEntreHasta(mensaje_o_id, min, max, funcionValidacion = () => true) {
        let valido = false;
        let valor;
        do {
            try {
                valor = this.leerRealEntre(mensaje_o_id, min, max, funcionValidacion);
                valido = true;
            } catch (error) {
                valido = false;
            }
        } while (!valido);
        return valor;
    }

    leerCadena(mensaje_o_id, funcionValidacion = () => true, longitud = 1, patron = LeerDatosPrompt.PATRON_VALIDAR_TODO) {
        let entrada = prompt(mensaje_o_id).trim();
        const pattern = new RegExp(patron);

        if (Util.comprobarCadenaVacia(entrada) || entrada.length < longitud || !pattern.test(entrada) || !funcionValidacion(entrada)) throw new Error("La cadena ingresada no es valida.");

        return entrada;
    }
    leerCadenaHasta(mensaje_o_id, funcionValidacion = () => true, longitud = 1, patron = LeerDatosPrompt.PATRON_VALIDAR_TODO) {
        let valido = false;
        let valor;
        do {
            try {
                valor = this.leerCadena(mensaje_o_id, funcionValidacion, longitud, patron);
                valido = true;
            } catch (error) {
                valido = false;
            }
        } while (!valido);
        return valor;
    }
}

class LeerDatosForm extends LeerDatos {
    leerEntero(form, name) {
        let entrada = form[name].value;
        if (!Util.validarEntero(entrada)) throw new Error("El dato ingresado no es un entero.");
        return Number(entrada);
    }
    // leerEnteroHasta(form, name) {
    // }
    leerReal(form, name) {
        let entrada = form[name].value;
        if (!Util.validarReal(entrada)) throw new Error("El dato ingresado no es un real.");
        return Number(entrada);
    }
    leerEnteroEntre(form, name, min, max, funcionValidacion = () => true) {
        let entrada = form[name].value;
        if (!Util.validarEntero(entrada) || entrada < min || entrada > max || !funcionValidacion(entrada)) throw new Error("El dato ingresado no es valido o no esta en el rango.");
        return entrada;
    }
    // leerEnteroEntreHasta(form, name, min, max) {
    // }
    leerRealEntre(form, name, min, max, funcionValidacion = () => true) {
        let entrada = form[name].value;
        if (!Util.validarReal(entrada) || entrada < min || entrada > max || !funcionValidacion(entrada)) throw new Error("El dato ingresado no es valido o no esta en el rango.");
        return entrada;
    }
    // leerRealEntreHasta(form, name, min, max) {
    // }
    leerCadena(form, name, funcionValidacion = () => true, longitud = 1, patron = LeerDatosPrompt.PATRON_VALIDAR_TODO) {
        let entrada = form[name].value.trim();
        const pattern = new RegExp(patron);

        if (Util.comprobarCadenaVacia(entrada) || entrada.length < longitud || !pattern.test(entrada) || !funcionValidacion(entrada)) throw new Error("La cadena ingresada no es valida.");

        return entrada;
    }
    // leerCadenaHasta(form, name) {
    // }
}