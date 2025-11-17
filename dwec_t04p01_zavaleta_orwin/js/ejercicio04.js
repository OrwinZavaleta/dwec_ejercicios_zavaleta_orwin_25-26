console.log("T04P01 - Ejercicio 04");

const personajes = [
    {
        nombre: "Spider-Man",
        nombreReal: "Peter Parker",
        profesionReal: "Fotógrafo",
        editorial: "Marvel",
        superpoder: "Agilidad sobrehumana, sentido arácnido, fuerza mejorada",
        debilidad: "Familia, responsabilidades",
        heroe: "héroe",
        edad: 28,
        numeroApariciones: 2500,
        equipo: "Los Vengadores",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-616"
    },
    {
        nombre: "Batman",
        nombreReal: "Bruce Wayne",
        profesionReal: "Empresario",
        editorial: "DC",
        superpoder: "Inteligencia superior, combate cuerpo a cuerpo",
        debilidad: "Humanidad, miedo a perder seres queridos",
        heroe: "héroe",
        edad: 35,
        numeroApariciones: 3000,
        equipo: "Liga de la Justicia",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-1"
    },
    {
        nombre: "Iron Man",
        nombreReal: "Tony Stark",
        profesionReal: "Ingeniero, Empresario",
        editorial: "Marvel",
        superpoder: "Armadura tecnológica avanzada, inteligencia superior",
        debilidad: "Alcoholismo, ego",
        heroe: "héroe",
        edad: 40,
        numeroApariciones: 2200,
        equipo: "Los Vengadores",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-616"
    },
    {
        nombre: "Joker",
        nombreReal: "Desconocido",
        profesionReal: "Criminal",
        editorial: "DC",
        superpoder: "Ingenio criminal, inmunidad a toxinas",
        debilidad: "Insanidad",
        heroe: "villano",
        edad: 45,
        numeroApariciones: 1000,
        equipo: "Injusticia",
        nacionalidad: "Desconocido",
        especie: "Humano",
        universo: "Tierra-1"
    },
    {
        nombre: "Wonder Woman",
        nombreReal: "Diana Prince",
        profesionReal: "Embajadora, guerrera",
        editorial: "DC",
        superpoder: "Fuerza sobrehumana, vuelo, habilidades de combate",
        debilidad: "Cuerdas mágicas",
        heroe: "héroe",
        edad: 3000,
        numeroApariciones: 1200,
        equipo: "Liga de la Justicia",
        nacionalidad: "Themyscirana",
        especie: "Amazona",
        universo: "Tierra-1"
    },
    {
        nombre: "Thor",
        nombreReal: "Thor Odinson",
        profesionReal: "Dios del Trueno",
        editorial: "Marvel",
        superpoder: "Control del trueno, vuelo, fuerza sobrehumana",
        debilidad: "Humildad (cuando sin Mjolnir)",
        heroe: "héroe",
        edad: 1500,
        numeroApariciones: 1500,
        equipo: "Los Vengadores",
        nacionalidad: "Asgardiano",
        especie: "Dios",
        universo: "Tierra-616"
    },
    {
        nombre: "Loki",
        nombreReal: "Loki Laufeyson",
        profesionReal: "Dios de las mentiras",
        editorial: "Marvel",
        superpoder: "Ilusionismo, cambio de forma, magia",
        debilidad: "Celos hacia Thor",
        heroe: "antiheroe",
        edad: 1000,
        numeroApariciones: 900,
        equipo: "",
        nacionalidad: "Asgardiano",
        especie: "Gigante de Hielo",
        universo: "Tierra-616"
    },
    {
        nombre: "Flash",
        nombreReal: "Barry Allen",
        profesionReal: "Forense",
        editorial: "DC",
        superpoder: "Súper velocidad, viaje en el tiempo",
        debilidad: "Demasiada velocidad puede destruir el tiempo",
        heroe: "héroe",
        edad: 30,
        numeroApariciones: 1500,
        equipo: "Liga de la Justicia",
        nacionalidad: "Estadounidense",
        especie: "Humano",
        universo: "Tierra-1"
    },
    {
        nombre: "Thanos",
        nombreReal: "Thanos",
        profesionReal: "Tirano galáctico",
        editorial: "Marvel",
        superpoder: "Fuerza inmensa, inteligencia táctica, uso del Guantelete del Infinito",
        debilidad: "Arrogancia, obsesión con la muerte",
        heroe: "villano",
        edad: 1000,
        numeroApariciones: 500,
        equipo: "Orden Negra",
        nacionalidad: "Titán",
        especie: "Eterno-Deviant",
        universo: "Tierra-616"
    },
    {
        nombre: "Superman",
        nombreReal: "Clark Kent (Kal-El)",
        profesionReal: "Periodista",
        editorial: "DC",
        superpoder: "Fuerza sobrehumana, vuelo, visión de rayos X, invulnerabilidad",
        debilidad: "Kryptonita",
        heroe: "héroe",
        edad: 35,
        numeroApariciones: 3000,
        equipo: "Liga de la Justicia",
        nacionalidad: "Kryptoniano",
        especie: "Extraterrestre (Kryptoniano)",
        universo: "Tierra-1"
    }
];

// z. Usa el método "reduce" para conseguir la suma de todas las apariciones de todos los personajes.
console.log(personajes.reduce(function (acum, value) {
    return acum + value.numeroApariciones;
}, 0));


/* let acumulador = 0;
array.forEach(element => {
    acumulador += element.numeroApariciones;
});

for (let i = 0; i < array.length; i++) {
    acumulador += array[i].numeroApariciones;
} */

// aa. Usa el método "reduce" para conseguir la media de todas las apariciones de todos los personajes.
console.log(personajes.reduce(function (acum, value, index, array) {
    acum += value.numeroApariciones

    if (index == array.length - 1) {
        acum /= array.length;
    }
    return acum;
}, 0));

// bb. Usa el método "reduce" para calcular cuántos personajes hay de cada tipo ("héroe", "antiheroe", "villano", …)
console.log(personajes.reduce(function (acum, value) {
    if (!acum[value.heroe]) {
        acum[value.heroe] = 0;
    }

    ++acum[value.heroe];

    return acum;
}, {}));

//cc. Calcula la media de edad de los personajes agrupados por editorial. Utiliza el método 'reduce' para construir un objeto que acumule las edades totales y el número de personajes por editorial. Después, transforma ese resultado para obtener la media de edad por editorial (puedes ayudarte de Object.entries o map).

let aux = personajes.reduce(function (acum, value) {
    if (!acum["num" + value.editorial]) {
        acum["num" + value.editorial] = 0;
    }

    if (!acum[value.editorial]) {
        acum[value.editorial] = 0;
    }

    acum[value.editorial] += value.edad;

    ++acum["num" + value.editorial];

    return acum;
}, {});

console.log(aux);

let valores = Object.entries(aux);
console.log(valores);

let promedios = {
    [valores[1][0]]: valores[1][1] / valores[0][1],
    [valores[3][0]]: valores[3][1] / valores[2][1],
}

console.log(promedios);
