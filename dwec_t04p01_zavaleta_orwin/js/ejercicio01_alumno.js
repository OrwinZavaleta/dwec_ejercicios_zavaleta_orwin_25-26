console.log("T04P01 - Ejercicio 0X");

/* function validarFecha(fecha) { // la fecha como string
    let fechaSeparda;
    let esValida = true;

    if (fecha.length == 10) {

        if (fecha.match("-")) {
            fechaSeparda = fecha.split("-");
        } else if (fecha.match("/")) {
            fechaSeparda = fecha.split("/");
        } else if (fecha.match(" ")) {
            fechaSeparda = fecha.split(" ");
        } else {
            esValida &= false;
        }
    } else {
        esValida &= false;
    }

    console.log(fechaSeparda);
    let dia;
    let mes;
    let anyo;

    if (fechaSeparda && esValida) {

        dia = (fechaSeparda[0]);
        mes = (fechaSeparda[1]);
        anyo = (fechaSeparda[2]);

        if (dia.length == 2 && mes.length == 2 && anyo.length == 4) {
            dia = Number(dia);
            mes = Number(mes);
            anyo = Number(anyo);

            const fechaOb = new Date(anyo, mes - 1, dia);

            if (fechaOb.getMonth() === mes - 1 && fechaOb.getDate() === dia && fechaOb.getFullYear() === anyo) {
                esValida &= true;
            } else {
                esValida &= false;
            }
        } else {
            esValida &= false;
        }
    }

    return esValida;
}

function calcularEdadFuera(dia, mes, anyo) {
    const fecha = new Date(anyo, mes - 1, dia);

    let edad = new Date() - fecha;

    return edad / (1000 * 60 * 60 * 24 * 365);
}
 */
function Alumno(dni, nombre, fechaNacimiento, sexo) {
    this._dni = dni;
    this._nombre = nombre;
    this._notaFinal = null;
    this._fechaNacimiento = fechaNacimiento;
    this._sexo = sexo;

    this.mostrarInformacion = function () {
        console.log(`Dni: ${this._dni},
                 Nombre: ${this._nombre}, 
                 edad: ${this._edad}, 
                 fechaNacimiento: ${this._fechaNacimiento}, 
                 notaFinal: ${this._notaFinal},
                 sexo: ${this._sexo}`);

    };

    this.calcularEdad = function () { // me llega bien hecho (2025-12-31)
        let fechaNac = new Date(this._fechaNacimiento);

        let fechaAct = new Date();
        let aux = Math.floor((fechaAct - fechaNac) / (1000 * 60 * 60 * 24 * 365));
        return aux;
    }

    this._edad = this.calcularEdad();

    this.calcularNota = function () {
        return (this.tri1 + this.tri2 + this.tri3) / 3;
    }

    this.cambiarNotas = function (tri1, tri2, tri3) {
        this.tri1 = tri1;
        this.tri2 = tri2;
        this.tri3 = tri3;

        this._notaFinal = this.calcularNota();
    };

    this.comparar = function (alumno) {
        // 1 si el this es mayor, -1 si el parametro es mayr, y 0 si es igual
        if (alumno.notaFinal < this.notaFinal) {
            return 1;
        } else if (alumno.notaFinal == this.notaFinal) {
            return 0;
        } else {
            return -1;
        }
    }

    this.estaAprobado = function () {
        return (this.notaFinal >= 5);
    }
}

Object.defineProperty(Alumno.prototype, "dni", {
    get: function () {
        return this._dni;
    },
    set: function (dni) {
        const dniRegex = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        if (dniRegex.test(dni)) {
            this._dni = dni;
        } else {
            this._dni = null;
        }
    },
});
Object.defineProperty(Alumno.prototype, "nombre", {
    get: function () {
        return this._nombre;
    },
    set: function (nombre) {
        this._nombre = nombre;
    },
});
Object.defineProperty(Alumno.prototype, "edad", {
    get: function () {
        return this._edad;
    },
});
Object.defineProperty(Alumno.prototype, "fechaNacimiento", { // validar la fecha de nacimiento
    get: function () {
        return this._fechaNacimiento;
    },
    set: function (fechaNacimiento) {
        const fechaAux = new Date(fechaNacimiento);

        this._fechaNacimiento = fechaNacimiento;
    },
});
Object.defineProperty(Alumno.prototype, "tri1", {
    get: function () {
        return this._tri1;
    },
    set: function (tri1) {
        this._tri1 = tri1;
    },
});
Object.defineProperty(Alumno.prototype, "tri2", {
    get: function () {
        return this._tri2;
    },
    set: function (tri2) {
        this._tri2 = tri2;
    },
});
Object.defineProperty(Alumno.prototype, "tri3", {
    get: function () {
        return this._tri3;
    },
    set: function (tri3) {
        this._tri3 = tri3;
    },
});
Object.defineProperty(Alumno.prototype, "notaFinal", {
    get: function () {
        return this._notaFinal;
    },
});
Object.defineProperty(Alumno.prototype, "sexo", { // ya hace la validacion
    get: function () {
        return this._sexo;
    },
    set: function (sexo) {
        sexo = sexo.toLowerCase();
        if (sexo == "h" || sexo == "m" || sexo == "o") {
            this._sexo = sexo;
        } else {
            this._sexo = null;
        }
    },
});
