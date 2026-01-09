console.log("T06P01 - Ejercicio 01");

const BASE_URL = "https://hp-api.onrender.com/api";
const PERSONAJES_TABLA_LIMITE = 5;
const PERSONAJES_POR_CASA = 2;
const HOUSES = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];
const IMAGEN_POR_DEFECTO = "img/dementor.jpg";
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
    document.querySelector("#aceptarCookies").addEventListener("click", aceptarCookies);
    cargarCardsBienvenida();
    cargarCookies();
    cargarMapa();
});

async function cargarTodosPersonajes() {
    try {
        const response = await fetch(BASE_URL + "/characters");
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();


        ALL_CHARACTERS = data;
        // console.log(data);

    } catch (error) {
        console.error("Error al pedir los datos: " + error);
    }
}
async function cargarPersonajesCasa(casa) {
    try {
        const response = await fetch(BASE_URL + "/characters/house/" + casa);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(data);

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
    } else if (personajesBuscados.length === 0 && query) {
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

            imgImagen.src = (personaje.image && personaje.image !== "" && personaje.image !== null) ? personaje.image : IMAGEN_POR_DEFECTO;
            imgImagen.alt = personaje.name
            imgImagen.classList.add("rounded", "img-square-10");

            iFav.classList.add("bi", "bi-heart"); // TODO: si el id esta en favoritos poner el corazon rellenado

            iFav.addEventListener("click", handleFavoritos);
            iFav.dataset.perId = personaje.id;

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

function handleFavoritos(event) {
    event.target.classList.toggle("bi-heart");
    event.target.classList.toggle("bi-heart-fill");

    const favoritos = JSON.parse(localStorage.getItem("favoritos") ?? "[]");

    if (event.target.classList.contains("bi-heart-fill")) {
        favoritos.push(event.target.dataset.perId);

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    } else if (event.target.classList.contains("bi-heart")) {
        let indice = favoritos.indexOf(event.target.dataset.perId);
        if (indice !== -1) favoritos.splice(indice, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
}

async function cargarCardsBienvenida() {
    const personajesAleatorios = [];

    for (let i = 0; i < HOUSES.length; i++) {
        const casa = HOUSES[i];

        const houseCargada = await cargarPersonajesCasa(casa);

        for (let i = 0; i < PERSONAJES_POR_CASA; i++) {
            const personaje = houseCargada[numeroAleatorio(houseCargada.length)];

            personajesAleatorios.push(personaje);
        }
    }
    // console.log(personajesAleatorios);

    document.querySelector("#cardsBienvenida").innerHTML = "";
    personajesAleatorios.forEach(personaje => crearCardPersonaje(personaje, document.querySelector("#cardsBienvenida")));
}

function crearCardPersonaje(personaje, domElement) {
    domElement.innerHTML += `
            <div class="col">
                <div class="card border-${colorCasa(personaje.house)} border-2">
                    <img src="${(personaje.image && personaje.image !== "" && personaje.image !== null) ? personaje.image : IMAGEN_POR_DEFECTO}" class="card-img-top img-square" alt="${personaje.name}">
                    <div class="card-body">
                        <h5 class="card-title">${personaje.name ?? "Unknown"}</h5>
                        <p class="card-text">Casa: ${personaje.house ?? "Unknown"}</p>
                        <p class="card-text">Patronus: ${personaje.patronus ?? "Unknown"}</p>
                        <p class="card-text">Especie: ${personaje.species ?? "Unknown"}</p>
                        <p class="card-text">Nacimiento: ${personaje.yearOfBirth ?? "Unknown"}</p>
                    </div>
                </div>
            </div>
            `;
}

function numeroAleatorio(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

function colorCasa(casa) {
    switch (casa.toLowerCase()) {
        case HOUSES[0]:
            return "danger";
        case HOUSES[1]:
            return "success";
        case HOUSES[2]:
            return "primary";
        case HOUSES[3]:
            return "warning";
    }
}

function cargarCookies() {
    if (!sessionStorage.getItem("cookie")) {
        document.querySelector("#cookie-banner").classList.remove("d-none");
    }

}

function aceptarCookies() {
    let cookie = sessionStorage.getItem("cookie");
    document.querySelector("#cookie-banner").classList.add("d-none");
    if (!cookie) {
        sessionStorage.setItem("cookie", true);
    }
}

function cargarMapa() {
    const map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'OpenStreetMap'
    }).addTo(map);
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                map.setView([lat, lng], 13);
                L.marker([lat, lng]).addTo(map)
                    .bindPopup('Te encuentras aquí')
                    .openPopup();
            },
            (error) => {
                console.error("Error al obtener la ubicación:", error.message);
                map.setView([40.4167, -3.7033], 13);
            });
    } else {
        console.log("No se puede usar la ubicacion");
        map.setView([40.4167, -3.7033], 13);
    }
}
