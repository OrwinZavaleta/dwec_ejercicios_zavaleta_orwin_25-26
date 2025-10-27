console.log("T03P03 - Ejercicio 12");

// Primer ampliacion.

const pilaDeshacer = [];
const tareasCategorias = []; //Es la solucion que tengo al poder saber cuales tienen mas de una categoria y poder mostrarlas en la ampliacion 4 y 5
/* 
    [      //es referencia
        [[tarea1, estado], [cat1, cat2]],
    ]                       //son cadenas
*/

function actualizarTareasCategoria(categoria, tarea = null, borrado = false) { 
    let encontrado = false;
    let indiceTareaEliminada = null;
    let indiceTareaCategoriaPorAgregar = null;
    if (tareasCategorias.length == 0 && tarea != null) {
        tareasCategorias.push([tarea, [categoria]]); // Creo que no se puede eliminar de una categoria
        encontrado = true;
    } else if (tarea == null) {
        for (let i = 0; i < tareasCategorias.length; i++) {
            const element = tareasCategorias[i];
            if (element.length == 1) {
                indiceTareaEliminada = i;
            }
        }
    } else {
        for (let i = 0; i < tareasCategorias.length && encontrado == false; i++) {
            const element = tareasCategorias[i];
            if (element[0][0] == tarea[0]) {
                indiceTareaCategoriaPorAgregar = i;
                // element[1].push(categoria);
                encontrado = true;
            }

            /* if (element.length == 1) {
                indiceTareaEliminada = i;
            } */
        }
        if (indiceTareaCategoriaPorAgregar != null) tareasCategorias[indiceTareaCategoriaPorAgregar][1].push(categoria);
        if (indiceTareaEliminada != null) tareasCategorias.splice(indiceTareaEliminada, 1);
    }

    // if (borrado && tarea != null) tareasCategorias[];

    if (!encontrado && tarea != null) tareasCategorias.push([tarea, [categoria]]);

    console.log(tareasCategorias);

}

function agregarDeshacerPila(tarea) {
    if (pilaDeshacer.length == 5) {
        console.log("Elementos en el limite, se pierde el ultimo deshacer.");
        pilaDeshacer.shift();
    } else {
        pilaDeshacer.push(tarea);
        console.log(pilaDeshacer);
    }

}

function deshacerPila(pila) {
    pila.forEach(element => {
        if (typeof element[0] == "object" && element[0] instanceof Array) {
            deshacerPila(element);
        } else {
            element[1] = "toDo";
        }
    });
    pilaDeshacer.length = 0;
}

function comprobarCategoriaExiste(categorias, categoria) { // categoria es un string
    let existe = false;
    for (let i = 0; i < categorias.length && existe == false; i++) {
        const element = categorias[i];

        if (element[0] == categoria) existe = true;
    }

    return existe;
}


function agregarNuevaCategoria(categorias) { // retorna el indice
    let categoria;

    do {
        categoria = prompt("Ingrese el nombre de esta categoria");
    } while (comprobarCategoriaExiste(categorias, categoria));

    let aux = [categoria, []];

    categorias.push(aux);

    return devolverIndiceCategoria(categorias, categoria); // devuelve un indice
}
function agregarTarea(categorias, categoriaId = null, tarea) {
    if (categoriaId != null) {
        categorias[categoriaId][1].push(tarea);
        actualizarTareasCategoria(categorias[categoriaId][0], tarea); // para la ampliacion 3
    }
}

function pedirTarea(categorias, categoriaId = null) {
    let entrada = null;
    do {

        entrada = prompt("Ingrese el nombre de la tarea.(S para dejar de añadir.)");
        if (entrada.toLocaleLowerCase() == "s") entrada = null;

        if (categoriaId != null && entrada != null) {
            let tarea = [];
            tarea.push(entrada);
            tarea.push("toDo");

            agregarTarea(categorias, categoriaId, tarea);
        } else {
            console.log("no se puede agregar la tarea, error.");
        }
    } while (entrada != null);
}

function cambiarEstadoTarea(tarea) {
    if (tarea[1] == "Done") {
        console.log("La tarea ya esta hecha.");
    } else {
        tarea[1] = "Done";
    }
}

function devolverIndiceCategoria(categorias, categoria) {
    let val = null;
    for (let i = 0; i < categorias.length && val == null; i++) {
        if (categorias[i][0] == categoria) val = i;
    }
    return val;
}

function listarTodosToDo(categorias) {
    let lista = "Lista (No se puede hacer nada, cualquier tecla para salir.)\n";
    let contador = 1;
    // categorias.forEach(categoria => {
    //     categoria[1].forEach(tarea => {
    //         if (tarea[1] == "toDo") {
    //             lista += `\t${contador}. ${tarea[0]} (${categoria[0]}).\n`;
    //             contador++;
    //         }
    //     });
    // });

    tareasCategorias.forEach(tarea => {

        lista += `\t${contador}. ${tarea[0][0]} (${tarea[1]})\n`;
        contador++;

    });


    prompt(lista);

    mostrarMenuCategorias(categorias);
}

function mostrarMenuCategorias(categorias) {
    let entrada = mostrarCategorias(categorias, true);
    if (entrada > 0 && entrada <= categorias.length) {
        // Lo que se tenga que hacer con las caategorias.
        mostrarMenuTareas(categorias, (entrada - 1));
    } else if (entrada == categorias.length + 1) {
        return;
    } else if (entrada == categorias.length + 2) {
        listarTodosToDo(categorias);
    } else {
        console.log("Esa categoria no existe");
    }
}

function mostrarCategorias(categorias, listar = false) {
    // Para generar el menu en funcion de cuantas tareas haya
    let menu = `
    Menú 2
    ======\n`;

    categorias.forEach((element, i) => {
        menu += `\t${i + 1}. ${element[0]}\n`;
    });

    menu += "\t" + (categorias.length + 1) + ". Atrás\n";

    if (listar) menu += "\t" + (categorias.length + 2) + ". Listar las tareas toDo.";

    // recibir entrada
    let entrada = recibirEntrada(menu, (categorias.length + 2), false);
    console.log(entrada);

    return entrada;
}

function comprobarTodosCategoriaDone(tareasArray) {
    let enc = false;
    for (let i = 0; i < tareasArray.length && enc == false; i++) {
        const element = tareasArray[i];
        if (element[1] == "toDo") enc = true;

    }
    return !enc;
}

function borrarCategoria(categorias) {
    let entradaId = mostrarCategorias(categorias) - 1;

    let confirmacion = prompt("desea borrar la categoria? (s)");
    if (confirmacion.toLocaleLowerCase() == "s") {
        if (categorias[entradaId][1].length == 0 || comprobarTodosCategoriaDone(categorias[entradaId][1])) {
            categorias.splice(entradaId, 1);
        } else {
            console.log("No se pudo borrar la categoria. No cumple los requisitos.");
        }
    }
}

function borrarTarea(categorias, categoriaId) {
    let entrada = mostrarTareas(categorias, categoriaId, false) - 1;

    let confirmacion = prompt("desea borrar la tarea? (s)");
    if (confirmacion.toLocaleLowerCase() == "s") {
        categorias[categoriaId][1].splice(entrada, 1);
    }

    actualizarTareasCategoria(categorias[categoriaId][0]); // parte de la ampliacion 2
}

function mostrarTareas(categorias, categoriaId, mostrarBorrar = true) {
    let tareas = categorias[categoriaId][1];

    let mostrar = `Menu 3. ${categorias[categoriaId][0]}(Puede seleccionar muchas tareas separadas por comas).\n=====\n`;
    tareas.forEach((element, i) => {
        mostrar += `\t${i + 1}. ${element[0]} (${element[1]})\n`;
    });

    if (mostrarBorrar) {
        mostrar += `\t${tareas.length + 1}. Añadir nueva tarea.\n`;
        mostrar += `\t${tareas.length + 2}. Borrar tarea.\n`;
        mostrar += `\t${tareas.length + 3}. Atras.\n`;
        mostrar += `\t${tareas.length + 4}. Deshacer ultimos Done realizados.\n`;
    } else {
        mostrar += `\t${tareas.length + 1}. Atras.\n`;
    }
    let entrada = recibirEntrada(mostrar, (tareas.length + 4), true);

    return entrada;
}

function mostrarMenuTareas(categorias, categoriaId) { // la categoria es un indice
    let tareas = categorias[categoriaId][1];
    let entrada = mostrarTareas(categorias, categoriaId);

    if (typeof entrada == "object" && entrada instanceof Array) {
        let aux = []
        entrada.forEach((e) => {
            //     cambiarEstadoTarea(tareas[e - 1]);
            aux.push(tareas[e - 1]);
        });

        administrarTarea(categorias, aux);

        // agregarDeshacerPila(aux); 
        mostrarMenuTareas(categorias, categoriaId);

    } else if (entrada > 0 && entrada <= tareas.length) {

        // cambiarEstadoTarea(tareas[entrada - 1]);
        // agregarDeshacerPila(tareas[entrada - 1]); 

        administrarTarea(categorias, tareas[entrada - 1]);
        mostrarMenuTareas(categorias, categoriaId);

    } else if (entrada == tareas.length + 1) {

        pedirTarea(categorias, categoriaId);
        mostrarMenuTareas(categorias, categoriaId);

    } else if (entrada == tareas.length + 2) {

        borrarTarea(categorias, categoriaId);
        mostrarMenuTareas(categorias, categoriaId);

    } else if (entrada == tareas.length + 3) {

        mostrarMenuCategorias(categorias);
    } else if (entrada == tareas.length + 4) {
        console.log("entra");

        deshacerPila(pilaDeshacer);
        mostrarMenuTareas(categorias, categoriaId);
    } else {
        console.log("Esa tarea no existe");
    }

    //console.log(mostrar);
}

function validarNumero(numero, max) {
    return (numero == null || isNaN(numero) || numero <= 0 || numero > max);
}

function recibirEntrada(mensaje, max, muchos = false) {// Si muchos es true se devuelve un array, si es false se devuelve un numero
    let entrada = null
    if (!muchos) {

        do {
            entrada = Number(prompt(mensaje));

        } while (validarNumero(entrada, max));
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
                if (validarNumero(entrada, max)) esValido = false;
            }
        } while (!esValido);

    }

    return entrada;
}

function comprobarTareaExisteCategoria(tareas, categoriaId, categorias) {
    let existe = false;
    for (let i = 0; i < categorias[categoriaId][1].length && existe == false; i++) {
        const element = categorias[categoriaId][1][i];

        if (element[0] == tareas[0]) existe = true;
    }

    return existe;
}

function asignarTareaCategoria(tareas, categoriaId, categorias) {
    const arrayTareas = categorias[categoriaId][1];
    if (typeof tareas[0] == "object" && tareas[0] instanceof Array) {
        tareas.forEach(element => {
            if (!comprobarTareaExisteCategoria(element, categoriaId, categorias)) {
                arrayTareas.push(element);
                actualizarTareasCategoria(categorias[categoriaId][0], element); // para la ampliacion 3
            } else {
                console.log(`LA tarea ${element[0]} ya existe en esta categoria.`);
            }
        });
    } else {
        if (!comprobarTareaExisteCategoria(tareas, categoriaId, categorias)) {
            arrayTareas.push(tareas);
            actualizarTareasCategoria(categorias[categoriaId][0], tareas); // para la ampliacion 3
        } else {
            console.log(`LA tarea ${tareas[0]} ya existe en esta categoria.`);
        }
    }
}

function mostrarAdministrarTarea(tareas) { //Hecho

    let texto = "";

    if (typeof tareas[0] == "object" && tareas[0] instanceof Array) {
        tareas.forEach(element => {
            texto += element[0] + ",";
        });
    } else {
        texto += tareas[0];
    }

    let entrada = recibirEntrada(`Menú 4. Tareas seleccionadas: ${texto}
    ======
    1. Pasar a 'done'
    2. Asignar otras categorías.
    3. Atrás
    `, 3, false);

    return entrada;
}

function administrarTarea(categorias, tareas) {
    let entrada = mostrarAdministrarTarea(tareas);

    switch (entrada) {
        case 1: // Hecho
            if (typeof tareas[0] == "object" && tareas[0] instanceof Array) {
                tareas.forEach((e) => {
                    cambiarEstadoTarea(e);
                });
                agregarDeshacerPila(tareas);
            } else {
                cambiarEstadoTarea(tareas);
                agregarDeshacerPila(tareas);
            }
            break;
        case 2:
            let categoriaId = mostrarCategorias(categorias);
            if (categoriaId != 3) {
                asignarTareaCategoria(tareas, categoriaId - 1, categorias);
            }
            break;
        case 3:
            break;
    }
}

// =========================================================
// ================== Inicio del programa ==================
// =========================================================

const categorias = [
    ["cata1", [["tar1", "toDo"], ["tar2", "toDo"]]],
    ["cata2", [["p1", "toDo"], ["p2", "toDo"]]]
];

(function () { // solo actuara cuando ya haya elementos en la categia desde el inicio del programa
    categorias.forEach(categoria => {
        categoria[1].forEach(tarea => {
            actualizarTareasCategoria(categoria[0], tarea);
        });
    });
})()

let entrada = null;
do {
    if (categorias.length == 0) {
        console.log("No hay categorias. Por favor ingrese la primera.");
        let categoriaId = agregarNuevaCategoria(categorias);
        let peticion = recibirEntrada(`Menú 0
            ======
            1. Crear una nueva categoria.
            2. Añadir nueva tarea a esta categoria creada.
            3. Ir al menu principal.
            `, 3);

        switch (peticion) {
            case 1:
                agregarNuevaCategoria(categorias);
                break;
            case 2:
                pedirTarea(categorias, categoriaId);
                break;
            case 3:
                console.log("Regresando al menu principal.");
                break;
        }

    } else {
        entrada = recibirEntrada(`
            Menú 1
            ======
            1. Listar categorías
            2. Añadir nueva Categoría
            3. Borrar categoría (Solo si todo es toDo o esta vacia)
            4. Salir.
            `, 4)

        switch (entrada) {
            case 1:
                mostrarMenuCategorias(categorias);
                break;
            case 2:
                agregarNuevaCategoria(categorias);
                break;
            case 3:
                borrarCategoria(categorias);
                break;
            case 4:
                console.log("Saliendo del programa.");
                break;
        }
    }
} while (entrada != 4);
