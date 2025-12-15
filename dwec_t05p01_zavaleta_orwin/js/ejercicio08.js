console.log("T05 - Ejercicio 08");

document.addEventListener("DOMContentLoaded", () => {
    const formCookie = document.querySelector("#formCookie");
    document.querySelector("#crear").addEventListener("click", (e) => crearCookie(e, formCookie));
    document.querySelector("#leer").addEventListener("click", (e) => leerCookie(e, formCookie));
    document.querySelector("#borrar").addEventListener("click", (e) => borrarCookie(e, formCookie));
    document.querySelector("#guardar").addEventListener("click", (e) => guardarURL(e, document.querySelector("#url").value));
    document.querySelector("#ira").addEventListener("click", (e) => iraURL(e));
});

function crearCookie(e, form) {
    e.preventDefault();

    document.cookie = `${form.nombre.value}=${form.valor.value}; expires=${new Date(form.expiracion.value)}; path=/`;
}

function leerCookie(e, form) {
    e.preventDefault();
    const resul = document.querySelector("#resultado");

    const cookieSeleccionada = obtenerCookie(form.nombre.value);

    resul.innerHTML = "";
    if (cookieSeleccionada !== null) {

        const [name, value] = cookieSeleccionada.split("=");

        resul.innerHTML += `Cookie: ${name} => Valor: ${value} <br>`;
    }
    resul.innerHTML += `Todas las cookies: ${document.cookie}`
}

function borrarCookie(e, form) {
    e.preventDefault();
    console.log(new Date() - 3600);


    document.cookie = `${form.nombre.value}=; expires=${new Date(new Date() - 3600000)}; path=/`;
}

function obtenerCookie(nombre) {
    const cookies = document.cookie;

    const cookiesSeparadas = cookies.split(";");
    cookiesSeparadas.forEach(co => co = co.trim()); // no funciona

    let cookieSeleccionada = null;

    for (const cookie of cookiesSeparadas) {
        if (!nombre || nombre == "") {
            cookieSeleccionada = null;
            break;
        }

        if (cookie.search(new RegExp("\\b" + nombre + "\\b")) !== -1) {
            cookieSeleccionada = cookie;
            break;
        } else {
            cookieSeleccionada = null;
        }
    }

    return cookieSeleccionada;
}

function guardarURL(e, url) {
    e.preventDefault();
    document.cookie = `urlFavorita=${url}; expires=${new Date(new Date + 3600)}; path=/`;

    
}

function iraURL(e) {
    e.preventDefault();

    let url = obtenerCookie("urlFavorita");

    if (url === null) {
        document.querySelector("#urlfavorita").innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        Aun no ha puesto ninguna URL como favorita
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    } else {
        const [name, value] = url.split("=");

        location.assign(value);
    }
}