console.log("T04P01 - Ejercicio 02_aula");

function validarFecha(fecha) { // la fecha como string
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

    return [esValida, anyo, mes, dia];
}

function calcularEdadFuera(dia, mes, anyo) {
    const fecha = new Date(anyo, mes - 1, dia);

    let edad = new Date() - fecha;

    return edad / (1000 * 60 * 60 * 24 * 365);
}

function Aula(maxAlumnos, id, descripcion, curso) {
    this._id = id;
    this._descripcion = descripcion;
    this._maxAlumnos = maxAlumnos;
    this._numAlumnos = 0;
    this._curso = curso; // solo puede tenre los valores 1, 2, 3 y 4
    this._alumnos = [];

    this.haySitioAlumnos = function (cant = 1) {
        return ((this.numAlumnos + Number(cant)) <= this.maxAlumnos);
    }

    this.hayAlumnos = function () {
        return this.numAlumnos != 0;
    }

    this.pedirDatosUnAlumno = function () {
        // crea un alumno y lo devuelve
        let nombre = prompt("Ingrese el nombre del alumno");
        let dni = prompt("Ingrese el dni del alumno");
        let fechaNacimiento = prompt("Ingrese la fecha de nacimiento del alumno");
        let sexo = prompt("Ingrese el sexo del alumno");
        const alumno = new Alumno(dni, nombre, fechaNacimiento, sexo);

        let n1 = prompt("Ingrese la nota 1");
        let n2 = prompt("Ingrese la nota 2");
        let n3 = prompt("Ingrese la nota 3");
        alumno.cambiarNotas(n1, n2, n3);

        return alumno;
    }

    this.insertarAlumnos = function (alumnos) {
        this.alumnos.push(...alumnos);
        this.numAlumnos += alumnos.length;
    }

    this.pedirDatos = function () {
        // matricular alumnos en el aula
        // si hay sitio en el aula, pide los alumnos uno por uno, los crea y guarda enun array temporal
        // si no hay suficiente espacio, devuelve un array vacio

        let alumAgregar = prompt("Cuandos alumnos va a agregar: ");
        let alumnos = [];

        if (this.haySitioAlumnos(alumAgregar)) {
            for (let i = 0; i < alumAgregar; i++) {
                const alumno = this.pedirDatosUnAlumno();
                alumnos.push(alumno);
            }
        } else {
            console.log("No hay sitio para tantos alumnos");

        }

        return alumnos;
    }

    this.mostrarDatos = function () {
        //  devuelve todos los datos de los alumnos en una cadena
        for (const alumno of this.alumnos) {
            alumno.mostrarInformacion();
        }
    }

    this.mediasNota = function () {
        let media = 0;

        for (const element of this.alumnos) {
            media += element.notaFinal;
        }

        media = media / this.numAlumnos;

        return media;
    }

    this.mejorNota = function () {
        let mejorAlum = this.alumnos[0];
        for (let i = 1; i < this.alumnos.length; i++) {
            const element = this.alumnos[i];

            if (element.notaFinal > mejorAlum.notaFinal) mejorAlum = element;
        }

        return mejorAlum;
    }

    this.porcentajeSuspensos = function () {
        let cont = 0;
        for (const element of this.alumnos) {
            if (!element.estaAprobado()) cont++;
        }

        return cont * 100 / this.numAlumnos;
    }

    this.mostrarSuspensosAprobados = function () {
        let suspensos = this.porcentajeSuspensos();

        let aprobados = 100 - suspensos;

        console.log(`Suspensos: ${suspensos}% - Aprobados: ${aprobados}%`);

    }
}

Object.defineProperty(Aula.prototype, "alumnos", {
    get: function () {
        return this._alumnos;
    }
});

Object.defineProperty(Aula.prototype, "id", {
    get: function () {
        return this._id;
    },
    set: function (id) {
        this._id = id;
    }
});
Object.defineProperty(Aula.prototype, "descripcion", {
    get: function () {
        return this._descripcion;
    },
    set: function (descripcion) {
        this._descripcion = descripcion;
    }
});
Object.defineProperty(Aula.prototype, "maxAlumnos", {
    get: function () {
        return this._maxAlumnos;
    },
    set: function (maxAlumnos) {
        this._maxAlumnos = maxAlumnos;
    }
});
Object.defineProperty(Aula.prototype, "numAlumnos", {
    get: function () {
        return this._numAlumnos;
    },
    set: function (numAlumnos) {
        this._numAlumnos = numAlumnos;
    }
});
Object.defineProperty(Aula.prototype, "curso", {
    get: function () {
        return this._curso;
    },
    set: function (curso) {
        this._curso = curso;
    }
});

