console.log("T05 - Ejercicio 07");

document.addEventListener("DOMContentLoaded", () => {
    const listaSelect = document.querySelectorAll("#formulario select");
    listaSelect.forEach((select, index) => {
        select.addEventListener("change", (e) => activarSiguiente(e, listaSelect, index));
    });
});

function activarSiguiente(e, listaSelect, index) {
    if (listaSelect.length - 1 !== index) {
        if (e.target.value == "") {
            for (let i = index; i + 1 < listaSelect.length; i++) {
                listaSelect[i + 1].disabled = true;
                listaSelect[i + 1].value = "";
            }
        } else {
            listaSelect[index + 1].disabled = false;
            // TODO: llenarlos
        }
    }
}