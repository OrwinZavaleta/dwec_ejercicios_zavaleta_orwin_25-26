console.log("T04P01 - Ejercicio 03_alumno");


function Alumno(nombre) {
    this._nombre = nombre;
    this._notas = new Map();

    this.mostrarInformacion = function () {
        let res = `
        Nombre: ${this.nombre}
        NotaMedia: ${this.obtenerNotaMedia()}
        `;

        console.log(res);
    };


    this.asignarNota = function (asignatura, nota) {
        this.notas.set(asignatura.nombre, nota);
    };

    this.obtenerNotaMedia = function () {
        let suma = 0;

        this.notas.forEach(e => {
            suma += e;
        });

        return suma / this.notas.size;
    }

    /*     this.comparar = function (alumno) {
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
        } */
}

Object.defineProperty(Alumno.prototype, "nombre", {
    get: function () {
        return this._nombre;
    },
    set: function (nombre) {
        this._nombre = nombre;
    },
});
Object.defineProperty(Alumno.prototype, "notas", {
    get: function () {
        return this._notas;
    },
    set: function (notas) {
        this._notas = notas;
    },
});

/* Object.defineProperty(Alumno.prototype, "notaFinal", {
    get: function () {
        return this._notaFinal;
    },
}); */

/* Alumno.prototype.agregarAsignatura = function (asignatura) {
    if (this._asignaturasOptativas.length >= 2) {
        console.log("No puedes inscribirte a mas optativas.");
    } else {
        this._asignaturasOptativas.push(asignatura);
    }
}  */


// DONE: maximo matriculado en 6 asignaturas (4 obligatorias, 2 optativas)
// por defecto todos matriculado en las mismas 4 asignaturas obligatorias dependiendo del aula
// las 2 optativas se eligen de un listado de adignaturas (pueden ser de 1,2,3,4)
// DONE: esto se hace cuando se piden los alumnos