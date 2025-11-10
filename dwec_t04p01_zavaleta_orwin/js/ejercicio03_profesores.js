console.log("T04P01 - Ejercicio 03_profesores");


const profesores = [
    {
        _nombre: "Juan Jimenez",
        _correo: "juanJ@gmail.com",
        _asignaturas: [],
        agregarAsignatura: function (asignatura) {
            if (this.asignaturas.length == 0) {
                this.asignaturas.push(asignatura);
            } else {
                if (this.asignaturas.find(e => e.curso == asignatura.curso) !== undefined) {
                    console.log("No puede tener dos asignaturas en el mismo curso.");
                } else {
                    this.asignaturas.push(asignatura);
                }
            }
        }
    },
    {
        _nombre: "Ana Pérez",
        _correo: "ana.perez@academia.es",
        _asignaturas: []
    },
    {
        _nombre: "Ricardo Soto",
        _correo: "rsoto@colegio.com",
        _asignaturas: []
    },
    {
        _nombre: "Elena Torres",
        _correo: "elenaT@mail.com",
        _asignaturas: []
    }
];

function addProps(obj) {
    Object.defineProperties(obj, {
        nombre: {
            get: function () {
                return this._nombre;
            },
            set: function (nombre) {
                this._nombre = nombre;
            }
        },
        correo: {
            get: function () {
                return this._correo;
            },
            set: function (correo) {
                this._correo = correo;
            }
        },
        asignaturas: {
            get: function () {
                return this._asignaturas;
            },
            set: function (asignaturas) {
                this._asignaturas = asignaturas;
            }
        },
        /* agregarAsignatura: {
            value: function (asignatura) {
                if (this.asignaturas.length == 0) {
                    this.asignaturas.push(asignatura);
                } else {
                    if (this.asignaturas.find(e => e.curso == asignatura.curso) !== undefined) {
                        console.log("No puede tener dos asignaturas en el mismo curso.");
                    } else {
                        this.asignaturas.push(asignatura);
                    }
                }
            }
        } */
    });
}

profesores.forEach(e => addProps(e));

/* Truco para que cada objeto del array tenga el call */
for (let i = 1; i < profesores.length; i++) {
    const e = profesores[i];
    e.agregarAsignatura = function (asignatura) {
        const func = profesores[0].agregarAsignatura.bind(e, asignatura); // solo devuelve la funcion, pero no la ejecuta
        return func();
    }
}

function optenerAsignaturasTomadas() {
    const asignaturasTomadas = [];
    profesores.forEach(e => {
        asignaturasTomadas.push(...e.asignaturas);
    });
    return asignaturasTomadas;
}

/* function agregarAsignaturaProfesor(profesor, asignatura) {
    if (profesor.asignaturas.length == 0) {
        profesor.asignaturas.push(asignatura);
    } else {
        if (profesor.asignaturas.find(e => e.curso == asignatura.curso) !== undefined) {
            console.log("No puede tener dos asignaturas en el mismo curso.");
        } else {
            profesor.asignaturas.push(asignatura);
        }
    }
} */