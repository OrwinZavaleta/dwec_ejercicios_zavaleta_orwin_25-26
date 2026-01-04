console.log("T04P02 - Ejercicio 01");

class Pedido { // TODO: solo un cliente puede hacer un pedido, una persona que no es cliente primero se le da de alta como cliente.
    static ultimoIdAsignado = 1;
    static DESCUENTO_FIN_ANYO = 0.10;

    #id; // TODO: MODIFICAR LOS MAPAS PARA QUE GUARDEN ISBN
    #cliente;
    #librosPedido; // Mapa con isbn del libro pedido y numero de unidades. Ebook solo puede ser 1
    #fecha;
    #tipoEnvioPedido; // Objeto tipo envio // Defecto null
    #precioTotalSinEnvioSinIVA; // Defecto 0
    #precioTotalConEnvioSinIVA; // Defecto 0
    #precioTotalConEnvioConIVA; // Defecto 0
    #descuento; // Defecto 0
    #abierto; // True

    constructor(cliente) {
        this.cliente = cliente;
        this.librosPedido = new Map();
        this.id = Pedido.obtenerSiguienteId()
        this.#fecha = new Date();
        this.precioTotalSinEnvioSinIVA = 0;
        this.precioTotalConEnvioSinIVA = 0;
        this.precioTotalConEnvioConIVA = 0;
        this.descuento = 0;
        this.abierto = true;
    }

    get id() { return this.#id; }
    set id(id) {
        if (!Util.validarEntero(id)) {
            throw new Error("El id ingresado no es valido.");
        }
        this.#id = id;
    }

    get cliente() { return this.#cliente; }
    set cliente(cliente) {
        if (!Cliente.validarCliente(cliente)) {
            throw new Error("El valor pasado no es un cliente.");
        }
        this.#cliente = cliente;
    }

    get librosPedido() { return this.#librosPedido; }
    set librosPedido(librosPedido) { this.#librosPedido = librosPedido; }

    get fecha() { return this.#fecha; }
    set fecha(fecha) {
        if (!Util.validarFecha(fecha)) {
            throw new Error("La fecha ingresada no es valida.");
        }
        this.#fecha = fecha;
    }

    get tipoEnvioPedido() { return this.#tipoEnvioPedido; }
    set tipoEnvioPedido(tipoEnvioPedido) {
        if (!TipoEnvio.validarTipoEnvio(tipoEnvioPedido)) {
            throw new Error("El tipo de pedido ingresado no es valido.");
        }
        this.#tipoEnvioPedido = tipoEnvioPedido;
    }

    get precioTotalSinEnvioSinIVA() { return this.#precioTotalSinEnvioSinIVA; }
    set precioTotalSinEnvioSinIVA(precioTotalSinEnvioSinIVA) {
        if (!Util.validarPrecio(precioTotalSinEnvioSinIVA)) {
            throw new Error("El precio ingresado no es valido.");
        }
        this.#precioTotalSinEnvioSinIVA = precioTotalSinEnvioSinIVA;
    }

    get precioTotalConEnvioSinIVA() { return this.#precioTotalConEnvioSinIVA; }
    set precioTotalConEnvioSinIVA(precioTotalConEnvioSinIVA) {
        if (!Util.validarPrecio(precioTotalConEnvioSinIVA)) {
            throw new Error("El precio ingresado no es valido.");
        }
        this.#precioTotalConEnvioSinIVA = precioTotalConEnvioSinIVA;
    }

    get precioTotalConEnvioConIVA() { return this.#precioTotalConEnvioConIVA; }
    set precioTotalConEnvioConIVA(precioTotalConEnvioConIVA) {
        if (!Util.validarPrecio(precioTotalConEnvioConIVA)) {
            throw new Error("El precio ingresado no es valido.");
        }
        this.#precioTotalConEnvioConIVA = precioTotalConEnvioConIVA;
    }

    get descuento() { return this.#descuento; }
    set descuento(descuento) {
        if (!Util.validarDescuento(descuento)) {
            throw new Error("El descuento ingresado no es valido.");
        }
        this.#descuento = descuento;
    }

    get abierto() { return this.#abierto; }
    set abierto(abierto) { this.#abierto = abierto; }


    hayLibros() {
        return this.librosPedido.length > 0;
    }
    mostrarDatosPedido(catalogoLibro) {
        let informacion = `Pedido Nº${this.id}\n`;

        this.librosPedido.forEach(libro => {
            informacion += `${libro.nombre} (${(libro instanceof Ebook) ? 'Ebook' : 'Libro en Papel'})\n`;
        });

        informacion += `Tipo de envio: ${this.tipoEnvioPedido}\n`;
        informacion += `Precio Neto: ${this.precioTotalSinEnvioSinIVA}`;
        informacion += `Con Envio: ${this.precioTotalConEnvioSinIVA}`;
        informacion += `TOTAL: ${this.precioTotalConEnvioConIVA}`;

        return informacion;
    }
    insertarLibro(libro, unidades) { // TODO: validar que no sobrepase el peso
        if (!Libro.validarLibro(libro)) {
            throw new Error("El libro enviado como parametro no es una instancia de Libro.");
        }

        if (libro instanceof Ebook) {
            this.librosPedido.set(libro.isbn, 1);
        } else {
            this.librosPedido.set(libro.isbn, unidades);
        }
    }

    /* 
    Establece un objeto de tipo TipoEnvio que recibe como parámetro. Si un pedido solo tiene Ebook no puede tener un tipo de envío. Devuelve true o false.
    También se tiene que comprobar que el peso de los libros físicos es acorde al máximo de peso permitido en el tipo de envío.
    */
    establecerTipoEnvio(tipoEnvio, catalogoLibro) { // TODO: preguntar por el peso maximo
        if (!TipoEnvio.validarTipoEnvio(tipoEnvio)) {
            console.log("El tipo de envio pasado no es valido o no es instancia de la clase.");
        }

        if (this.comprobarTodosEbook(catalogoLibro)) return false;

        this.tipoEnvioPedido = tipoEnvio;
    }

    /*
    Los libros de tipo Ebook no generan gastos de envío. Si el pedido contiene únicamente ebooks, el coste del envío será siempre 0.
    Si el pedido incluye al menos un LibroPapel, el envío se calcula según el tipo de envío seleccionado.
    */
    calcularTotal() { // TODO: revisar que se reduzca el libro cuando se pide.
        let precioTotal = 0;

        if (this.fecha.getMonth() === 10 || this.fecha.getMonth() === 11) {
            this.aplicarDescuento(Pedido.DESCUENTO_FIN_ANYO);
        }

        const miTienda = Tienda.getInstancia()

        this.librosPedido.forEach((cant, isbn) => {
            const libro = miTienda.pedirLibroPorISBN(isbn);
            precioTotal += libro.precio*cant;
        });

        this.precioTotalSinEnvioSinIVA = precioTotal;

        if (!this.comprobarTodosEbook(miTienda.libros) && this.tipoEnvioPedido) {
            this.precioTotalConEnvioSinIVA = this.precioTotalSinEnvioSinIVA + this.tipoEnvioPedido.precioSinIVA;
        }else{
            this.precioTotalConEnvioSinIVA = this.precioTotalSinEnvioSinIVA;
        }

        this.precioTotalConEnvioConIVA = this.precioTotalConEnvioSinIVA * (Tienda.IVA + 1);
    }

    /* 
    Aplica un descuento al total del pedido, reduciendo el coste de los libros en el porcentaje especificado. Devuelve true / false si se ha podido aplicar correctamente. El descuento debe ser aplicado únicamente a los libros, no al coste del envío.
    Recuerda que además si el pedido se realiza en noviembre y diciembre, se aplica un descuento del 10% a cada libro individualmente, antes de calcular los gastos de envío. Esto se hace de forma automática. 
    */
    aplicarDescuento(porcentaje, catalogoLibro) { // TODO: -MOVERLO A TIENDA-
        this.obtenerLibrosPedidos(catalogoLibro).forEach(libro => {
            libro.aplicarDescuentoLibro(porcentaje)// TODO: VERIFICAR
        });
    }

    static obtenerSiguienteId() { return ++Pedido.ultimoIdAsignado; }

    static validarPedido(pedido) {
        return typeof pedido === "object" && pedido instanceof Pedido;
    }

    comprobarTodosEbook(catalogoLibro) {
        let todosEbook = true;
        for (const libro of this.obtenerLibrosPedidos(catalogoLibro)) {// TODO: VERIFICAR
            if (libro instanceof LibroPapel) {
                todosEbook = false;
                break;
            }
        }
        return todosEbook;
    }

    obtenerLibrosPedidos(catalogoLibro) {
        // return catalogoLibro.filter(libro => this.librosPedido.keys().some(isbn => isbn === libro.isbn));
        const aux = [];
        this.librosPedido.forEach((cant, isbn )=> {
            const libroEncontrado = catalogoLibro.buscarLibroPorIsbn(isbn);
            if (libroEncontrado) {
                aux.push(libroEncontrado);
            }
        });

        return aux;
    }
}
