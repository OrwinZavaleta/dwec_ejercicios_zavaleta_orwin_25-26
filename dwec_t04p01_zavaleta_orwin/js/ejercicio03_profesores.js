console.log("T04P01 - Ejercicio 03_profesores");


const profesores = [ // TODO: usar los metodos para usar los getter y setter
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