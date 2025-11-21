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

class LeerDatosPrompt extends LeerDatos { // TODO: limpiar todos los datos desde aqui
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

    leerCadena(mensaje_o_id, longitud = 1, patron = /^[\s\S]*$/) {
        let entrada = prompt(mensaje_o_id).trim();
        const pattern = new RegExp(patron);

        if (Util.comprobarCadenaVacia(entrada) || entrada.length < longitud || !pattern.test(entrada)) throw new Error("La cadena ingresada no es valida.");

        return entrada;
    }
    leerCadenaHasta(mensaje_o_id, longitud = 1, patron = /^[\s\S]*$/) {
        let valido = false;
        let valor;
        do {
            try {
                valor = this.leerCadena(mensaje_o_id, longitud, patron);
                valido = true;
            } catch (error) {
                valido = false;
            }
        } while (!valido);
        return valor;
    }

    // TODO: crear los leer Real
}