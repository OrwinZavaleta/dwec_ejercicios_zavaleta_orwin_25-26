console.log("T04P01 - Ejercicio 03_asignaturas");

const asignaturas = [
    // otras asignaturas obligatorias
    {
        _curso: 2,
        _nombre: "Algebra",
        _tipo: "Obligatoria",
        _matriculados: [],
        consultarAlumnos: function () {
            return this.matriculados;
        }
    },
    {
        _curso: 2,
        _nombre: "Geometría",
        _tipo: "Obligatoria",
        _matriculados: [],
    },
    {
        _curso: 1,
        _nombre: "Literatura",
        _tipo: "Obligatoria",
        _matriculados: [],
    },
    {
        _curso: 1,
        _nombre: "Química",
        _tipo: "Obligatoria",
        _matriculados: [],
    },
    // aqui van las optativas
    {
        _curso: 2,
        _nombre: "Dibujo Técnico",
        _tipo: "Optativa",
        _matriculados: [],
    },
    {
        _curso: 2,
        _nombre: "Filosofia",
        _tipo: "Optativa",
        _matriculados: [],
    },
    {
        _curso: 1,
        _nombre: "Introducción a la Programación",
        _tipo: "Optativa",
        _matriculados: [],
    },
    {
        _curso: 3,
        _nombre: "Historia del Arte",
        _tipo: "Optativa",
        _matriculados: [],
    }
];

function addGetSetCurso(obj) {
    Object.defineProperty(obj, "curso", {
        get: function () {
            return this._curso;
        },
        set: function (curso) {
            this._curso = curso;
        }
    });
}
function addGetSetNombre(obj) {
    Object.defineProperty(obj, "nombre", {
        get: function () {
            return this._nombre;
        },
        set: function (nombre) {
            this._nombre = nombre;
        }
    });
}
function addGetSetTipo(obj) {
    Object.defineProperty(obj, "tipo", {
        get: function () {
            return this._tipo;
        },
        set: function (tipo) {
            this._tipo = tipo;
        }
    });
}
function addGetSetMatriculados(obj) {
    Object.defineProperty(obj, "matriculados", {
        get: function () {
            return this._matriculados;
        },
        set: function (matriculados) {
            this._matriculados = matriculados;
        }
    });
}
function asignarAlumno(obj) {
    obj.asignarAlumno = function (alumno) {
        this.matriculados.push(alumno);
    }
}
function consultarAlumnos(obj) { // Se trasladara a un solo objeto para usarlo con call()
    obj.consultarAlumnos = function () {
        return this.matriculados;
    }
}

asignaturas.forEach(e => {
    addGetSetCurso(e);
    addGetSetNombre(e);
    addGetSetTipo(e);
    addGetSetMatriculados(e);
    asignarAlumno(e);
    // consultarAlumnos(e);
});


/* Truco para que cada objeto del array tenga el call */
for (let i = 1; i < asignaturas.length; i++) {
    const e = asignaturas[i];
    e.consultarAlumnos = function () {
        return asignaturas[0].consultarAlumnos.call(e);
    }
}
