console.log("T04P01 - Ejercicio 03_aula");

function mostrarMenu(menu, max = Infinity, min = 1) {
    let entrada = null;
    do {
        entrada = prompt(menu);

        if (isNaN(entrada) || Number(entrada) < min || Number(entrada) > max) entrada = null;
    } while (entrada == null);

    return entrada;
}

function recibirEntrada(mensaje, max, min, muchos = false) {// Si muchos es true se devuelve un array, si es false se devuelve un numero
    let entrada = null
    if (!muchos) {
        do {
            entrada = Number(prompt(mensaje));

        } while (validarNumero(entrada, max, min));
    } else {
        let esValido = true;
        do {
            entrada = prompt(mensaje);
            if (entrada.includes(",")) {
                entrada = entrada.split(",");
                entrada.map((e) => e.trim());
                entrada.forEach(element => {
                    if (validarNumero(element, max)) esValido = false;
                });

            } else {
                entrada = Number(entrada);
                if (validarNumero(entrada, max, min)) esValido = false;
            }
        } while (!esValido);
    }
    return entrada;
}

function validarNumero(numero, max, min = 1) {
    return (numero == null || isNaN(numero) || Number(numero) <= min || Number(numero) > max);
}

function Aula(id, descripcion, maxAlumnos, curso) {
    this._id = id;
    this._descripcion = descripcion;
    this._maxAlumnos = maxAlumnos;
    this._numAlumnos = 0;
    this._curso = curso; // solo puede tenre los valores 1, 2, 3 y 4
    this._alumnos = [];
    this._grupos = {
        grupo0: [],
        // grupo1: ["123sda", "asdsda3"],
        // grupo2 : ["123sda", "asdsda3"]
    };

    this.haySitioAlumnos = function (cant = 1) {
        return ((this.numAlumnos + Number(cant)) <= this.maxAlumnos);
    }

    this.hayAlumnos = function () {
        return this.numAlumnos != 0;
    }

    this.insertarAlumnos = function (alumnos) {
        this.alumnos.push(...alumnos);

        this.alumnos.forEach(e => this.grupos.grupo0.push(e.dni));

        this.numAlumnos += alumnos.length;

        // para asignarselos a las asignaturas 

        asignaturas.filter(e => e.curso == this.curso && e.tipo == "Obligatoria").forEach(e => e.matriculados.push(...alumnos)); // para este ejercicio llegan de 1 en 1
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
        console.log(this.id);

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
            if (element.obtenerNotaMedia() >= 5) cont++;
        }

        return cont * 100 / this.numAlumnos;
    }

    this.mostrarSuspensosAprobados = function () {
        let suspensos = this.porcentajeSuspensos();

        let aprobados = 100 - suspensos;

        console.log(`Suspensos: ${suspensos}% - Aprobados: ${aprobados}%`);
    }

    this.comprobarAlumnosNotasCompletas = function () { // Por optimizar
        let completo = true;
        for (const element of this.alumnos) {
            completo &= element.comprobarNotasCompletas()
        }
        if (this.alumnos.length === 0) completo = false;
        return completo;
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