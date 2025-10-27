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
    7. salir
    `;

    let maxNumAlum = prompt("Ingrese el maximo numero de alumnos para esta aula: ");

    const aula1 = new Aula(maxNumAlum, 2345, "un curso muy complicado", 3);

    let entrada = -1;

    do {
        entrada = mostrarMenu(menu, 7);
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
                console.log("Saliendo...");
                break;
            default:
                console.log("No entro a nada... extraño");

        }

    } while (entrada != 7);
}

function mostrarMenu(menu, min = -Infinity) {
    let entrada = null;
    do {
        entrada = prompt(menu);

        if (isNaN(entrada) || entrada < 1 || entrada > min) entrada = null;
    } while (entrada == null);

    return entrada;
}

funcionPrueba2();