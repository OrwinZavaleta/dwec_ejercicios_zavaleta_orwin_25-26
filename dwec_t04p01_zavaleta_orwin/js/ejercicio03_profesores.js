console.log("T04P01 - Ejercicio 03_profesores");

// DONE: 4 profesores
// -todos imparten 2 asignaturas y en cursos distintos.
// se comprueba en el momento de la asignacion
// TODO: hay que hacerlo mediante un menu de asignacion

// TODO: consultar que alumnos estan en la asignatura que imparte el profesor
// TODO: optener un listado de los suspensos y aprobados con nota media. y con porcentajes

const profesores = [
    {
        nombre: "Juan Jimenez",
        correo: "juanJ@gmail.com",
        asignaturas: []
    },
    {
        nombre: "Ana Pérez",
        correo: "ana.perez@academia.es",
        asignaturas: []
    },
    {
        nombre: "Ricardo Soto",
        correo: "rsoto@colegio.com",
        asignaturas: []
    },
    {
        nombre: "Elena Torres",
        correo: "elenaT@mail.com",
        asignaturas: []
    }
];

function agregarAsignaturaProfesor(profesor, asignatura) {
    if (profesor.asignaturas.length == 0) {
        profesor.asignaturas.push(asignatura);
    } else {
        if (profesor.asignaturas.find(e => e.curso == asignatura.curso) !== undefined) {
            console.log("No puede tener dos asignaturas en el mismo curso.");
        } else {
            profesor.asignaturas.push(asignatura);
        }
    }
}