console.log("T05 - Ejercicio 06");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("p").forEach(p => {
        p.addEventListener("click", textoAmayusculas);
        p.addEventListener("dblclick", textoAminusculas);
    });
});

function textoAmayusculas(e) {
    if (e.target.tagName === "P") { // Para comprobar que quien lo llama es una etiqueta p (con mayusculas)
        this.textContent = this.textContent.toUpperCase();
        resaltarTexto(this);
    }
}

function textoAminusculas(e) {
    if (e.target.tagName === "P") {
        this.textContent = this.textContent.toLowerCase();
        resaltarTexto(this);
    }
}

function resaltarTexto(elemento) {
    elemento.classList.add("bg-warning");
    setTimeout(() => {
        elemento.classList.remove("bg-warning");
    }, 500);
}