console.log("T03P01 - Ejercicio 21");

// fijos empiezan por 8 o 9
// moviles por 6 o 7
function validaTelefono(telefono) {
    let patron = new RegExp("^(8\|9\|6\|7)\\d{8}$");

    return patron.test(telefono);
}

function validarPrefijoTelefonoEsp(telefono) {
    let telefonoSeparado = telefono.split(" ");

    return telefonoSeparado[0] === "+34";
}

function validarTelefonoConSin(telefono){
    if (telefono.length == 9) {
        return validaTelefono(telefono);
    } else if (telefono.length == 13 ){
        return validarPrefijoTelefonoEsp(telefono);
    }
}

let entrada = prompt("ingrese su numero de telefono");


if (validarTelefonoConSin(entrada)) {
    console.log("Numero valido");
} else {
    console.log("Numero INVALIDO");
    
}