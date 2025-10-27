console.log("T04P01 - Ejercicio 0X");



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


funcionPrueba1();