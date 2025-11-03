console.log("T04P01 - Ejercicio 02_principal");

function funcionPrueba1() {
    const alum1 = new Alumno(123, "pepe", "2007-02-23", "m");
    const alum2 = new Alumno(345, "ana", "2003-01-13", "f");


    alum1.mostrarInformacion();
    alum2.mostrarInformacion();

    console.log(alum2.cambiarNotas(3, 5, 9));
    alum1.mostrarInformacion();
    console.log(alum1.cambiarNotas(4, 7, 9));
    alum2.mostrarInformacion();
    console.log(alum1.comparar(alum2));
    console.log(alum1.estaAprobado());
    console.log(alum2.estaAprobado());
}

function funcionPrueba2() {

    let menu = `
    Menu
    1. Agregar alumnos
    2. Calcular la nota media
    3. Calcular la mejor nota
    4. Calcular el porcentaje de suspensos
    5. Mostrar el porcentaje de suspensos y aprobados
    6. Mostrar los alumnos en esta aula
    7. Gestionar grupos
    8. salir
    `;

    let maxNumAlum = mostrarMenu("Ingrese el maximo numero de alumnos para esta aula: ");

    const aula1 = new Aula(maxNumAlum, 2345, "un curso muy complicado", 3);

    let entrada = -1;

    do {
        entrada = mostrarMenu(menu, 8);
        switch (Number(entrada)) {
            case 1:
                let alumnos = aula1.pedirDatos();
                aula1.insertarAlumnos(alumnos);
                break;
            case 2:
                console.log(`La nota media es ${aula1.mediasNota()}`);
                break;
            case 3:
                let alum = aula1.mejorNota();
                console.log(`La mejor nota es: ${alum.notaFinal} del alumno ${alum.nombre}`);
                break;
            case 4:
                console.log(`El porcentaje de suspensos es: ${aula1.porcentajeSuspensos()}%`);
                break;
            case 5:
                aula1.mostrarSuspensosAprobados();
                break;
            case 6:
                aula1.mostrarDatos();
                break;
            case 7:
                funcionPrueba2ampliado(aula1);
                break;
            case 8:
                console.log("Saliendo...");
                break;
            default:
                console.log("No entro a nada... extraño");

        }

    } while (entrada != 8);
}

function mostrarMenu(menu, max = Infinity, min = 1) {
    let entrada = null;
    do {
        entrada = prompt(menu);

        if (isNaN(entrada) || Number(entrada) < min || Number(entrada) > max) entrada = null;
    } while (entrada == null);

    return entrada;
}

funcionPrueba2();


function funcionPrueba2ampliado(aula1) {
    let menu2 = `
    Menu 2
    1. Mostrar todos los alumnos
    2. Mostrar alumnos por grupo
    3. Agregar alumno a un grupo (si ya pertenece a otro grupo se cambia)
    4. Eliminar un grupo
    5. Mostrar resumen de grupos
    6. Calcular media de un grupo
    7. Mostrar alumno con mejor nota de un grupo
    8. Porcentaje de suspensos en un grupo
    0. Salir
    `;
    let entrada = -1;
    do {
        let grupo;
        entrada = mostrarMenu(menu2, 8, 0);
        switch (Number(entrada)) {
            case 1:
                aula1.mostrarDatos();
                break;
            case 2:
                aula1.mostrarAlumosGrupo();
                break;
            case 3:
                [alumno, grupo] = agregarAlumnoGrupo(aula1);
                aula1.agregarAlumnoGrupo(alumno, grupo);
                break;
            case 4:
                grupo = optenerGrupo(aula1);
                aula1.eliminarGrupo(grupo); // una funcion que sea seleccionar grupoy otra de alumno;
                break;
            case 5:
                aula1.resumenGrupos();
                break;
            case 6:
                grupo = optenerGrupo(aula1);
                console.log(aula1.calcularMediaGrupo(grupo));
                break;
            case 7:
                grupo = optenerGrupo(aula1);
                console.log(aula1.mayorNotaGrupo(grupo).nombre);
                break;
            case 8:
                grupo = optenerGrupo(aula1);
                console.log(aula1.procentajeSuspensosGrupo(grupo) + "%");
                break;
            case 0:
                console.log("Saliendo...");
                break;
            default:
                console.log("No entro a nada... extraño");

        }
    } while (entrada != 0);

}

function optenerGrupo(aula1) {
    let grupos = aula1.optenerNombresGrupos();

    let menu = `Seleccione Grupo:\n`;

    grupos.forEach((grupo, index) => {
        menu += `\t${index + 1}. ${grupo} \n`;
    });

    let entrada = mostrarMenu(menu, grupos.length);

    return grupos[entrada - 1];
}

function agregarAlumnoGrupo(aula1) {
    let nuevo = confirm("Quiere crear un nuevo grupo para el alumno?");
    let grupo;
    if (nuevo) {
        grupo = prompt("Ingrese el nombre del nuevo grupo:");
    } else {
        grupo = optenerGrupo(aula1);
    }

    let alumno = optenerAlumno(aula1);

    return [alumno, grupo];
}

function optenerAlumno(aula1) {
    let alumnos = aula1.optenerNombresAlumnos();

    let menu = `Seleccione el Alumnno:\n`;

    alumnos.forEach((alumno, index) => {
        menu += `\t${index + 1}. ${alumno[1]} \n`;
    });

    let entrada = mostrarMenu(menu, alumnos.length);

    return alumnos[entrada - 1][0];
}