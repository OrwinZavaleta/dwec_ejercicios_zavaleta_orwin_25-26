console.log("T04P02 - Ejercicio 01");

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
    #autor;
    #precio;

    #descuento = 0;

    constructor(isbn, titulo, genero, autor, precio) { // TODO: hacer las validaciones de los datos que llegan en los setters
        this.isbn = isbn;
        this.titulo = titulo;
        this.genero = genero;
        this.autor = autor;
        this.precio = precio;
    }

    get isbn() { return this.#isbn; }
    set isbn(isbn) { this.#isbn = isbn; }

    get titulo() { return this.#titulo; }
    set titulo(titulo) { this.#titulo = titulo; }

    get genero() { return this.#genero; }
    set genero(genero) {
        if (!GENEROS_LITERARIOS.has(genero)) {
            throw new Error("El genero literario no es válido.");
        }
        this.#genero = genero;
    }

    get autor() { return this.#autor; }
    set autor(autor) { this.#autor = autor; }

    get precio() { return this.#precio; }
    set precio(precio) {
        if (!Util.validarPrecio(precio)) {
            throw new Error("El precio ingresado no es valido.");
        }
        this.#precio = precio;
    }


    get descuento() { return this.#descuento; }
    set descuento(descuento) { this.#descuento = descuento; }


    mostrarDatosLibro() {
        return `ISBN: ${this.isbn} - TITULO: ${this.titulo} - AUTOR: ${this.autor} - PRECIO: ${this.precio}`;
    }

    deshacerDescuentoLibro() {
        this.descuento = 0;
    }

    aplicarDescuentoLibro(descuento) { // se pasa como decimales (ej: 0.12)
        this.descuento = descuento;
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

    constructor(isbn, titulo, genero, autor, precio, tamanoArchivo, formato) {
        super(isbn, titulo, genero, autor, precio);
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
    set formato(formato) { this.#formato = formato; } // TODO: validarlo


    descargar() {
        return "Descargando...";
    }

    convertirFormato(formato) {
        this.formato = formato;
    }

    mostrarDatosLibro() {
        return super.mostrarDatosLibro + ` - FORMATO: ${this.formato} - TAMAÑO DEL ARCHIVO: ${this.tamanoArchivo}`; // Puedo llamar al metodo del padre
    }

    comprobarDisponibilidad() {
        return true;
    }

    modificarLibro(mapaInfo) {
        mapaInfo.forEach(value, key => {
            this[key] = value;
        });
    }
}

class LibroPapel extends Libro {
    static STOCK_MINIMO = 6;

    #peso;
    #dimensiones; // Cadena con el patron ("NNxNNxNN")
    #stock;

    constructor(isbn, titulo, genero, autor, precio, peso, dimensiones, stock) {
        super(isbn, titulo, genero, autor, precio);
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
        if (Util.validarDimensiones(dimensiones)) {
            throw new Error("Las dimensiones no son validas.");

        }
        this.#dimensiones = dimensiones;
    }

    get stock() { return this.#stock; }
    set stock(stock) {
        if (!Util.validarTamanoArchivo(stock)) { // TODO: Hacen lo mismo, para no crear otra funcion
            throw new Error("El stock debe de ser un entero");
        }
        this.#stock = stock;
    }


    embalar() {
        return "Embalando...";
    }

    reducirStock() {
        this.stock--;
    }

    amplicarStock(numUnididades) {
        this.stock += numUnididades;
    }

    mostrarDatosLibro() {
        return super.mostrarDatosLibro + ` - PESO: ${this.peso} - DIMENSIONES: ${this.dimensiones} - STOCK: ${this.stock}`;
    }

    comprobarDisponibilidad() {
        return this.stock > 0;
    }

    modificarLibro(mapaInfo) {
        mapaInfo.forEach(value, key => {
            this[key] = value;
        });
    }
}