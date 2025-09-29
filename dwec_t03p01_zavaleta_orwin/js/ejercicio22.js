console.log("T03P01 - Ejercicio 22");


function validarDNIyCIF(entrada) {
    let patronDni = new RegExp("^[0-9]{8}[A-Z]$");
    let patronCif = new RegExp("^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$");
    let referencia = "TRWAGMYFPDXBNJZSQVHLCKE";
    let esValido = false;
    entrada = entrada.toUpperCase();

    if (patronDni.test(entrada)) { // =========================Calculo del DNI =================
        let numeros = entrada.substring(0, 8);
        console.log(numeros);
        let resto = Number(numeros) % 23;

        // return numeros[7] == referencia.substring(resto-1, resto);
        esValido = entrada[8] == referencia[resto-1];

    } else if (patronCif.test(entrada)) { // ========== Calculo del CIF ================
        // Aqui falta el codigo de calculo de cif

        let letraInicial = entrada[0];
        let numeros = entrada.substring(1, 8);
        let letraFinal = entrada[8];

        let sumaPar = numeros[1] + numeros[3] + numeros[5];
        let sumaImpar = 0;

        for (let i = 0; i < numeros.legth; i += 2) {
            doble = i * 2;
            // Si es de una cifra la operación de abajo devolverá la misma cifra.
            sumaImpar += Math.floor(doble / 10) + doble % 10;
        }

        let sumaTotal = sumaImpar + sumaPar;

        let codeControl = (10 - sumaTotal % 10) % 10;

        if (letraInicial == 'X' || letraInicial == 'P') {
            let letra = String.fromCharCode(64 + codeControl);

            esValido = letraFinal == letra;
        } else if (!isNaN(letraFinal)) {
            esValido = letraFinal == codeControl;
        } else {
            let letrasTabla = "ABCDEFGHIJ";

            esValido = letraFinal == letrasTabla[codeControl - 1];
        }
    }
    return esValido;
}

console.log(validarDNIyCIF("A58818501"));