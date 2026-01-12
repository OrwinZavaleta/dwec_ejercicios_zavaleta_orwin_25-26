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
    setTimeout(() => { cargarCardsBienvenida() }, 1000);
    cargarCookies();
    cargarMapa();
    setTimeout(() => { actualizarFavoritos() }, 1000);
});

async function pedirTodosPersonajes() {
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
async function pedirPersonajesCasa(casa) {
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
        await pedirTodosPersonajes();
    }

    actualizarTablaPersonajes(nombre);
}

async function actualizarFavoritos() {
    const fav = obtenerFavoritosStorage();
    const favElement = document.querySelector("#cardsFavoritos");
    favElement.innerHTML = "";
    console.log(fav);

    if (fav.length === 0) document.querySelector("#cardsFavoritos").innerHTML = "<p class='fs-5'>No tiene favoritos.</p>";

    for (let i = 0; i < fav.length; i++) {
        const personaje = fav[i];

        const personajeFav = await pedirUnPersonaje(personaje);

        favElement.innerHTML += `
        <div class="list-group-item list-group-item-action d-flex justify-content-around align-items-center fs-5">
            <div><img src="${returnImg(personajeFav)}" alt="${personajeFav.name}" class="rounded img-square-6">
            </div>
            <div>${personajeFav.name}</div>
            <div>${personajeFav.house ?? "Unknown"}</div>
            <div class="fs-3" id="per${personajeFav.id}"><i class="bi ${returnCorrectFavIcon(personaje)}" data-per-id="${personajeFav.id}"></i></div>
        </div>
        `;

        asignarEventoFavoritos(favElement.querySelector("#per" + personajeFav.id));
    }
}

async function pedirUnPersonaje(id) {
    try {
        const response = await fetch(BASE_URL + "/character/" + id);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        return data[0];
    } catch (error) {
        console.error("Error al pedir los datos: " + error);
    }
    return null;
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
        for (let i = 0; i < Math.min(PERSONAJES_TABLA_LIMITE, personajesBuscados.length); i++) {
            const personaje = personajesBuscados[i];
            const tr = document.createElement("tr");

            const tdImagen = document.createElement("td");
            const tdNombre = document.createElement("td");
            const tdCasa = document.createElement("td");
            const tdFav = document.createElement("td");

            tdFav.classList.add("fs-3")

            const imgImagen = document.createElement("img");
            const textoNombre = document.createTextNode(personaje.name);
            const textoCasa = document.createTextNode(personaje.house ?? "Unknown");
            const iFav = document.createElement("i");

            imgImagen.src = returnImg(personaje);
            imgImagen.alt = personaje.name
            imgImagen.classList.add("rounded", "img-square-10");

            iFav.classList.add("bi", returnCorrectFavIcon(personaje.id));

            asignarEventoFavoritos(iFav);
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

function returnImg(personaje) {
    return (personaje.image && personaje.image !== "" && personaje.image !== null) ? personaje.image : IMAGEN_POR_DEFECTO;
}

function returnCorrectFavIcon(id) {
    return ((verificarFavorito(id)) ? "bi-heart-fill" : "bi-heart");
}

function handleFavoritos(event) {
    event.target.classList.toggle("bi-heart");
    event.target.classList.toggle("bi-heart-fill");

    const favoritos = obtenerFavoritosStorage();

    if (event.target.classList.contains("bi-heart-fill")) {
        favoritos.push(event.target.dataset.perId);

        guardarFavoritosStorage(favoritos);
    } else if (event.target.classList.contains("bi-heart")) {
        let indice = favoritos.indexOf(event.target.dataset.perId);
        if (indice !== -1) favoritos.splice(indice, 1);
        guardarFavoritosStorage(favoritos);
    }
    actualizarFavoritos();
}

function obtenerFavoritosStorage() {
    return JSON.parse(localStorage.getItem("favoritos") ?? "[]");
}

function guardarFavoritosStorage(json) {
    localStorage.setItem("favoritos", JSON.stringify(json));
}

function verificarFavorito(id) {
    const fav = obtenerFavoritosStorage();
    return fav.includes(id);
}

async function cargarCardsBienvenida() {
    const personajesAleatorios = [];
    console.log("hols");
    

    for (let i = 0; i < HOUSES.length; i++) {
        const casa = HOUSES[i];

        const houseCargada = await pedirPersonajesCasa(casa);

        const aleatorios = pedirNaleatoriosCasa(houseCargada.length);

        for (let i = 0; i < aleatorios.length; i++) {
            const personaje = houseCargada[aleatorios[i]];

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

function pedirNaleatoriosCasa(lengthCasa) {
    const aleatorios = [];
    for (let i = 0; i < PERSONAJES_POR_CASA; i++) {
        let ale = numeroAleatorio(lengthCasa);
        while (aleatorios.includes(ale)) {
            ale = numeroAleatorio(lengthCasa);
        }

        aleatorios.push(ale);
    }
    return aleatorios;
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
    if (sessionStorage.getItem("cookie")) {
        document.querySelector("#cookie-banner").classList.add("d-none");
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

function asignarEventoFavoritos(domElement) {
    domElement.addEventListener("click", handleFavoritos);
}