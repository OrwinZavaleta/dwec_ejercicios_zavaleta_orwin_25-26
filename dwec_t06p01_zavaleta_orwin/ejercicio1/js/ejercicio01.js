console.log("T06P01 - Ejercicio 01");

const BASE_URL = "https://hp-api.onrender.com/api";
const PERSONAJES_TABLA_LIMITE = 10;
const PERSONAJES_POR_CASA=2;
const HOUSES = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];
let ALL_CHARACTERS = null;


document.addEventListener("DOMContentLoaded", () => {
    (() => {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault()
                event.stopPropagation()

                if (form.checkValidity()) {
                    /* Si es valido */
                    // if (form.id === "formBuscarPersonaje") buscarPersonajePorNombre(form.nombreQuery.value);
                }
                form.classList.add('was-validated')
            }, false)
        })
    })();
    document.querySelector("#nombreQuery").addEventListener("input", (e) => buscarPersonajePorNombre(e.target.value));
    cargarCardsBienvenida();
});

async function cargarTodosPersonajes() {
    try {
        const responese = await fetch(BASE_URL + "/characters");
        const data = await responese.json();

        ALL_CHARACTERS = data;
        console.log(data);

    } catch (error) {
        console.error("Error al pedir los datos: " + error);
    }
}
async function cargarPersonajesCasa(casa) {
    try {
        const responese = await fetch(BASE_URL + "/characters/house/" + casa);
        const data = await responese.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error al pedir los datos: " + error);
    }
    return null;
}

async function buscarPersonajePorNombre(nombre) {
    if (ALL_CHARACTERS === null) {
        await cargarTodosPersonajes();
    }

    actualizarTablaPersonajes(nombre);
}

function actualizarTablaPersonajes(query = "") {
    let personajesBuscados = null;
    if (query === "" || !query) {
        personajesBuscados = [];
    } else {
        personajesBuscados = ALL_CHARACTERS.filter(ch => ch.name.toLowerCase().includes(query.toLowerCase()));
    }

    const tablaBodyPersonajes = document.querySelector("#bodyPersonajes");
    tablaBodyPersonajes.innerHTML = "";

    if (personajesBuscados.length === 0 && !query) {
        tablaBodyPersonajes.innerHTML = `<td colspan="4" class="text-center">Realize su busqueda</td>`;
    } if (personajesBuscados.length === 0 && query) {
        tablaBodyPersonajes.innerHTML = `<td colspan="4" class="text-center">No hay personajes que coincidan con la busqueda</td>`;
    } else {
        for (let i = 0; i < PERSONAJES_TABLA_LIMITE; i++) {
            const personaje = personajesBuscados[i];
            const tr = document.createElement("tr");

            const tdImagen = document.createElement("td");
            const tdNombre = document.createElement("td");
            const tdCasa = document.createElement("td");
            const tdFav = document.createElement("td");

            tdFav.classList.add("fs-3")

            const imgImagen = document.createElement("img");
            const textoNombre = document.createTextNode(personaje.name);
            const textoCasa = document.createTextNode(personaje.house);
            const iFav = document.createElement("i");

            imgImagen.src = personaje.image;
            imgImagen.alt = personaje.name
            imgImagen.classList.add("rounded", "img-square");

            iFav.classList.add("bi", "bi-heart");

            tdImagen.appendChild(imgImagen);
            tdNombre.appendChild(textoNombre);
            tdCasa.appendChild(textoCasa);
            tdFav.appendChild(iFav);

            tr.appendChild(tdImagen);
            tr.appendChild(tdNombre);
            tr.appendChild(tdCasa);
            tr.appendChild(tdFav);

            tablaBodyPersonajes.appendChild(tr);
        }
    }
}

async function cargarCardsBienvenida() {

    const personajesAleatorios = [];

    HOUSES.forEach(casa => {
        const houseCargada = cargarPersonajesCasa(casa);

        for (let i = 0; i < PERSONAJES_POR_CASA; i++) {
            const personaje = houseCargada[numeroAleatorio(houseCargada.length)];
            
            personajesAleatorios.push();
        }
        
    })

        `
    <div class="row row-cols-2 row-cols-md-4 g-4">
        //
        <div class="col">
            <div class="card">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
        //
    </div>
    `
}

function numeroAleatorio(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}