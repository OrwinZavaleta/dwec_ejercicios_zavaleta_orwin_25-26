console.log("T04P02 - Ejercicio 01");

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
    leerEntero(mensaje_o_id) {
        let entrada = prompt(mensaje_o_id);
        if (!Util.validarEntero(entrada)) throw new Error("El dato ingresado no es un entero.");
        return entrada;
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
        return entrada;
    }
    leerEnteroEntre(mensaje_o_id, min, max) {
        let entrada = prompt(mensaje_o_id);
        if (!Util.validarEntero(entrada) || entrada < min || entrada > max) throw new Error("El dato ingresado no es valido o no esta en el rango.");
        return entrada;
    }
    leerEnteroEntreHasta(mensaje_o_id, min, max) {
        let valido = false;
        let valor;
        do {
            try {
                valor = this.leerEnteroEntre(mensaje_o_id, min, max);
                valido = true;
            } catch (error) {
                valido = false;
            }
        } while (!valido);
        return valor;
    }
    leerCadena(mensaje_o_id, longitud, patron) { // TODO: terminar la parte de patron
        let entrada = prompt(mensaje_o_id).trim();

        if (entrada.length < longitud) throw new Error("La cadena ingresada tiene menos de 1 caracter.");

        return entrada;
    }
    leerCadenaHasta(mensaje_o_id, longitud, patron) {
        let valido = false;
        let valor;
        do {
            try {
                valor = this.leerCadena(mensaje_o_id, longitud);
                valido = true;
            } catch (error) {
                valido = false;
            }
        } while (!valido);
        return valor;
    }
}