console.log("T04P01 - Ejercicio 03_aula");

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

        anyo = (fechaSeparda[0]);
        mes = (fechaSeparda[1]);
        dia = (fechaSeparda[2]);

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

function mostrarMenu(menu, max = Infinity, min = 1) {
    let entrada = null;
    do {
        entrada = prompt(menu);

        if (isNaN(entrada) || Number(entrada) < min || Number(entrada) > max) entrada = null;
    } while (entrada == null);

    return entrada;
}

function Aula(maxAlumnos, id, descripcion, curso) {
    this._id = id;
    this._descripcion = descripcion;
    this._maxAlumnos = maxAlumnos;
    this._numAlumnos = 0;
    this._curso = curso; // solo puede tenre los valores 1, 2, 3 y 4
    this._alumnos = [];
    this._grupos = {
        grupo0: [],
        grupo1: [],
        // grupo1: ["123sda", "asdsda3"],
        // grupo2 : ["123sda", "asdsda3"]
    };

    this.haySitioAlumnos = function (cant = 1) {
        return ((this.numAlumnos + Number(cant)) <= this.maxAlumnos);
    }

    this.hayAlumnos = function () {
        return this.numAlumnos != 0;
    }

    this.pedirDatosUnAlumno = function () {
        // crea un alumno y lo devuelve
        let nombre = prompt("Ingrese el nombre del alumno");
        let dni = this.validarDni();
        let fechaNacimiento = this.validarFechaIngresada();
        let sexo = this.validarSexo();
        const alumno = new Alumno(dni, nombre, fechaNacimiento, sexo);

        let n1 = mostrarMenu("Ingrese la nota 1");
        let n2 = mostrarMenu("Ingrese la nota 2");
        let n3 = mostrarMenu("Ingrese la nota 3");
        alumno.cambiarNotas(n1, n2, n3);

        return alumno;
    }

    this.insertarAlumnos = function (alumnos) {
        this.alumnos.push(...alumnos);

        this.alumnos.forEach(e => this.grupos.grupo0.push(e.dni));

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

Object.defineProperty(Aula.prototype, "grupos", {
    get: function () {
        return this._grupos;
    },
    set: function (grupos) {
        this._grupos = grupos;
    }
});

// Apliacion 1

Aula.prototype.mostrarAlumosGrupo = function () {
    for (const name in this.grupos) {
        const value = this.grupos[name];

        console.log(`${name} : `);

        // Guardos los dni, y luego busco por el dni y los imprimo
        value.forEach(dni => {
            const alum = this.alumnos.find(o => o.dni === dni);

            alum.mostrarInformacion();
        });
    }
}

Aula.prototype.agregarAlumnoGrupo = function (alumno, nameGrupo) {
    for (const name in this.grupos) {
        const element = this.grupos[name];

        if ((indice = element.indexOf(alumno)) != -1) element.splice(indice, 1);
    }
    if (this.grupos.hasOwnProperty(nameGrupo)) {
        this.grupos[nameGrupo].push(alumno);
    } else {
        this.grupos[nameGrupo] = [alumno]
    }
}

Aula.prototype.eliminarGrupo = function (nameGrupo) {
    delete this.grupos[nameGrupo]; // borra una clave y sus valores de un objeto
}

Aula.prototype.resumenGrupos = function () {
    for (const name in this.grupos) {
        if (!Object.hasOwn(this.grupos, name)) continue;

        const values = this.grupos[name];

        console.log(`${name}: ${values.length} alumnos`);
    }
}

Aula.prototype.calcularMediaGrupo = function (name) {
    let media = 0;
    const value = this.grupos[name];

    value.forEach(dni => {
        const alum = this.alumnos.find(o => o.dni === dni);
        media += alum.notaFinal;
    });

    media = media / value.length;

    return media;
}
Aula.prototype.mayorNotaGrupo = function (name) {
    const value = this.grupos[name];
    let mayor = this.alumnos.find(o => o.dni === value[0]);

    value.forEach(dni => {
        const alum = this.alumnos.find(o => o.dni === dni);
        if (mayor.notaFinal < alum.notaFinal) mayor = alum;
    });

    return mayor;
}

Aula.prototype.procentajeSuspensosGrupo = function (name) {
    let cantidadDesaprobados = 0;
    const value = this.grupos[name];

    value.forEach(dni => {
        const alum = this.alumnos.find(o => o.dni === dni);
        if (!alum.estaAprobado()) cantidadDesaprobados++;
    });

    return (cantidadDesaprobados * 100) / value.length;
}

Aula.prototype.optenerNombresGrupos = function () {
    return Object.keys(this.grupos);
}

Aula.prototype.optenerNombresAlumnos = function () {
    let alumnos = [];
    this.alumnos.forEach(e => {
        alumnos.push([e.dni, e.nombre]);
    });

    return alumnos;
}

Aula.prototype.validarDni = function () {
    let dni = null;
    do {
        dni = prompt("Ingrese el dni del alumno");

        const dniRegex = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        if (!dniRegex.test(dni)) {
            dni = null;
        }
    } while (dni == null);

    return dni;
}
Aula.prototype.validarFechaIngresada = function () {
    let fecha = null;
    do {
        fecha = prompt("Ingrese la fecha de nacimiento del alumno");

        if (!validarFecha(fecha)[0]) {
            fecha = null;
        }
    } while (fecha == null);

    return fecha;
}

Aula.prototype.validarSexo = function () {
    let sexo = null;
    do {
        sexo = prompt("Ingrese el sexo del alumno");

        if (sexo != "h" && sexo != "m" && sexo != "o") {
            sexo = null;
        }
    } while (sexo == null);

    return sexo;
}

// TODO: crear las 4 aulas con objetos literales