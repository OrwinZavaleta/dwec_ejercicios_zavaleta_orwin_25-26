console.log("T04P02 - Ejercicio 01 - Libro");

class Libro {
    static GENEROS_LITERARIOS = new Set([
        "Novela",
        "Poesía",
        "Ensayo",
        "Teatro",
        "Ciencia Ficción",
        "Fantasía",
        "Histórico",
        "Biografía",
        "Terror",
        "Infantil",
    ]);

    #isbn;
    #titulo;
    #genero;
    #autores;
    #precio;
    #imgUrl;

    #descuento = 0;

    constructor(isbn, titulo, genero, autores, precio, imgUrl) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.genero = genero;
        this.autores = autores;
        this.precio = precio;
        this.imgUrl = imgUrl;
    }

    get isbn() { return this.#isbn; }
    set isbn(isbn) {
        if (!Util.validarEntero(isbn)) {
            throw new Error("El isbn no es un entero");
        }
        this.#isbn = isbn;
    }

    get titulo() { return this.#titulo; }
    set titulo(titulo) {
        if (!Util.validarTitulo(titulo)) {
            throw new Error("El titulo no es valido");
        }
        this.#titulo = titulo;
    }

    get genero() { return this.#genero; }
    set genero(genero) {
        // if (!Libro.GENEROS_LITERARIOS.has(genero)) { 
        if (!Util.validarGenero(genero, Libro.GENEROS_LITERARIOS)) {
            throw new Error("El genero literario no es válido.");
        }
        this.#genero = genero;
    }

    get autores() { return this.#autores; }
    set autores(autores) {
        if (typeof autores === "object" && autores instanceof Array) {
            autores.forEach(autor => {
                if (!Autor.validarAutor(autor)) {
                    throw new Error("El parametro enviado no es un Autor");
                }
            });
        } else {
            throw new Error("El parametro enviado No es un array");
        }
        this.#autores = autores;
    }

    get precio() { return this.#precio * (1 - this.descuento); }
    set precio(precio) {
        if (!Util.validarPrecio(precio)) {
            throw new Error("El precio ingresado no es valido.");
        }
        this.#precio = precio;
    }


    get descuento() { return this.#descuento; }
    set descuento(descuento) {
        if (!Util.validarDescuento(descuento)) {
            throw new Error("El descuento ingresado no es valido.");
        }
        this.#descuento = descuento;
    }

    get imgUrl() { return this.#imgUrl; }
    set imgUrl(imgUrl) { this.#imgUrl = imgUrl; }

    mostrarDatosLibro() {
        return `ISBN: ${this.isbn} - TITULO: ${this.titulo} - GENERO: ${this.genero} - AUTOR: ${this.autores.map(au => au.nombre)} - PRECIO: ${this.precio}`;
    }

    deshacerDescuentoLibro() {
        this.descuento = 0;
    }

    aplicarDescuentoLibro(descuento) { // se pasa como decimales (ej: 0.12)
        this.descuento = descuento;
    }

    static validarLibro(libro) {
        return typeof libro === "object" && libro instanceof Libro;
    }
}


class Ebook extends Libro {
    static FORMATOS = new Set([
        "pdf",
        "epub",
        "mobi",
    ]);

    #tamanoArchivo; // En MB
    #formato;

    constructor(isbn, titulo, genero, autores, precio, tamanoArchivo, formato, imgUrl) {
        super(isbn, titulo, genero, autores, precio, imgUrl);
        this.tamanoArchivo = tamanoArchivo;
        this.formato = formato;
    }

    get tamanoArchivo() { return this.#tamanoArchivo; }
    set tamanoArchivo(tamanoArchivo) {
        if (!Util.validarTamanoArchivo(tamanoArchivo)) {
            throw new Error("El tamaño del archivo no es valido");
        }
        this.#tamanoArchivo = tamanoArchivo;
    }

    get formato() { return this.#formato; }
    set formato(formato) {
        if (!Util.validarFormato(formato, Ebook.FORMATOS)) {
            throw new Error("El formato no es valido");
        }
        this.#formato = formato;
    }


    descargar() {
        return "Descargando...";
    }

    convertirFormato(formato) {
        this.formato = formato;
    }

    mostrarDatosLibro() {
        return super.mostrarDatosLibro() + ` - FORMATO: ${this.formato} - TAMAÑO DEL ARCHIVO: ${this.tamanoArchivo}`; // Puedo llamar al metodo del padre
    }

    comprobarDisponibilidad() {
        return true;
    }

    modificarLibro(mapaInfo) {
        for (const [key, value] of mapaInfo) {
            if (key === "isbn") {
                continue;
            }

            if (this[key] !== undefined) {
                this[key] = value;
            } else {
                throw new Error(`Clave ${key} no es valida`);

            }
        }
    }

    static validarEbook(ebook) {
        return typeof ebook === "object" && ebook instanceof Ebook;
    }
}

class LibroPapel extends Libro {
    static STOCK_MINIMO = 6;

    #peso;
    #dimensiones; // Cadena con el patron ("NNxNNxNN")
    #stock;

    constructor(isbn, titulo, genero, autores, precio, peso, dimensiones, stock, imgUrl) {
        super(isbn, titulo, genero, autores, precio, imgUrl);
        this.peso = peso;
        this.dimensiones = dimensiones;
        this.stock = stock;
    }

    get peso() { return this.#peso; }
    set peso(peso) {
        if (!Util.validarPeso(peso)) {
            throw new Error("El peso no es valido");
        }
        this.#peso = peso;
    }

    get dimensiones() { return this.#dimensiones; }
    set dimensiones(dimensiones) {
        if (!Util.validarDimensiones(dimensiones)) {
            throw new Error("Las dimensiones no son validas.");

        }
        this.#dimensiones = dimensiones;
    }

    get stock() { return this.#stock; }
    set stock(stock) {
        if (!Util.validarStock(stock)) {
            throw new Error("El stock debe de ser un entero");
        }
        this.#stock = stock;
    }


    embalar() {
        return "Embalando...";
    }

    reducirStock() {
        if (this.stock <= 0) {
            throw new Error("No existen mas unidades");
        }
        this.stock--;
    }

    ampliarStock(numUnididades) {
        this.stock += numUnididades;
    }

    mostrarDatosLibro() {
        return super.mostrarDatosLibro() + ` - PESO: ${this.peso} - DIMENSIONES: ${this.dimensiones} - STOCK: ${this.stock}`;
    }

    comprobarDisponibilidad() {
        return this.stock > LibroPapel.STOCK_MINIMO;
    }

    modificarLibro(mapaInfo) {
        for (const [key, value] of mapaInfo) {

            if (key === "isbn") {
                continue;
            }

            if (this[key] !== undefined) {
                this[key] = value;
            } else {
                throw new Error(`Clave ${key} no es valida`);
            }
        }
    }
    static validarLibroPapel(libroPapel) {
        return typeof libroPapel === "object" && libroPapel instanceof LibroPapel;
    }
}