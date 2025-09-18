console.log("T02 - Ejercicio 15");

// Constantes
const salarioManana = 45;
const salarioTarde = 47;
const salarioNoche = 50;

// Funciones
function calcularSalarioTurno(turno) {
    switch (turno) {
        case 'm':
        case 'M':
            return salarioManana;
        case 't':
        case 'T':
            return salarioTarde;
        case 'n':
        case 'N':
            return salarioNoche;
        default:
            return 0;
    }
}

// validaciones
function validarHoras(horas) { // true si la hora es valida
    return !isNaN(horas) && Number.isInteger(horas) && horas > 0;
}

function validarTurno(turno) { //  true si tiene alguno de los valores
    return turno === 'm' || turno === 'M' || turno === 't' || turno === 'T' || turno === 'n' || turno === 'N';
}

// calculos
function rellenarSalarioBruto(horasTrabajadas, turnos) {
    let salarioBruto = [];
    for (let i = 0; i < horasTrabajadas.length; i++) {
        const hora = horasTrabajadas[i];
        const turno = turnos[i];

        salarioBruto.push(hora * calcularSalarioTurno(turno));
    }
    return salarioBruto;
}

function calcularNetoIndividual(brutoIndividual) {
    switch (true) {
        case (brutoIndividual < 600):
            return (brutoIndividual * 0.92);
        case (brutoIndividual < 1000):
            return (brutoIndividual * 0.90);
        default:
            return (brutoIndividual * 0.88);
    }
}

function calcularSalarioNeto(salarioBruto) {
    let salarioNeto = [];
    for (const brutoIndividual of salarioBruto) {
        salarioNeto.push(calcularNetoIndividual(brutoIndividual));
    }
    return salarioNeto;
}

// utilidades
function sumarArray(array) {
    let sumatoria = 0;
    for (const element of array) {
        sumatoria += element;
    }
    return sumatoria;
}

// ===================================================
// ================ Inicio del codigo ================
// ===================================================

// Variables
let horasTrabajadas = [];
let turnos = []; // Mañanas (m o M), Tardes (t o T) o Noches (n o N).
let salarioBruto = [];
let salarioNeto = [];
let importeTotal = 0;
let salir = 's';

// Pedir numeros
while (salir == 's' || salir == 'S') {
    // Pedir horas trabajadas
    let horasTrabajadasD = Number(prompt("Ingrese las horas trabajadas: "));
    console.log(horasTrabajadasD);
    if (!validarHoras(horasTrabajadasD)) {
        alert("Hora no valida");
        continue;
    }

    // Pedir turnos
    let turnoD = prompt("Ingrese el turno (Mañanas (m o M), Tardes (t o T) o Noches (n o N)): ");
    console.log(turnoD);
    if (!validarTurno(turnoD)) {
        alert("Turno no valido");
        continue;
    }

    salir = prompt("Desea seguir añadiendo mas trabajadores: (s o S, otra entrada es salir)");

    // Solo se guarda si nada salio mal
    horasTrabajadas.push(horasTrabajadasD);
    turnos.push(turnoD);
}

console.log(horasTrabajadas);
console.log(turnos);

// rellenar el salario bruto
salarioBruto = rellenarSalarioBruto(horasTrabajadas, turnos).slice();

// calcular el salario neto
salarioNeto = calcularSalarioNeto(salarioBruto).slice();

//Mostrar los resultados de los trabajadores y empresa
importeTotal = sumarArray(salarioBruto);

console.log("-- El total pagado en salarios fue: " + importeTotal.toFixed(2));

console.log(salarioBruto);
console.log(salarioNeto);
