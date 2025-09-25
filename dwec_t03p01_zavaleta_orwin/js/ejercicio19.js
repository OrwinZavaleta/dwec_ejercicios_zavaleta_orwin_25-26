console.log("T03P01 - Ejercicio 19");

let a = ["Sung", "Luffy", "Goku", "Sakura", "Asta", "Kenshin", "Meliodas"];
// fecha actual
let b = new Date();
// devuelve del 0 al 6  segun el resto de la fecha y 7
// devuelve el mismo numero b y esa posicion del array
let c = a[b.getDay() % a.length];
let d = 0;

// repetira la cantidad de veces de caracteres de la palabra
for (let i = 0; i < c.length; i++) {
    // aleatorio entre 0 a la longitud de la cadena 
    let e = Math.floor(Math.random() * c.length);
    // obtiene el caracter e de la cadena
    let f = c.charAt(e); 

    // si estoy en la posicion par de la cadena, f a mayusculas
    if (i % 2 === 0) {
        f = f.toUpperCase();
        // desde el inicio hasta i, le agrega el caracter f, y le agrega la cadena desde i+1
        c = c.slice(0, i) + f + c.slice(i + 1);
    }
    if ("aeiou".includes(f.toLowerCase())) { // si f es vocal
        d += Math.pow(2, i); // d = 2 a la i
    }
    console.log(f);
}
console.log(d.toFixed(0)); // mostrar d sin decimales
console.log(c); // mostrar la palabra elegida
console.log(e); // casca